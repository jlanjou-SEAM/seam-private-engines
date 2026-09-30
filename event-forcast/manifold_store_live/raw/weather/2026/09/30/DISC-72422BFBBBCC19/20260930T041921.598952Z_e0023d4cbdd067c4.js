// MAG Javascript library

// 2016-09 KAM User-selectable start/end forecast hour looping.
// 2016-12 KAM Use ajax to load forecast hours table.
// 2017-02 KAM HTML-5 Validation. Had to get rid of name attribute for <a> tages.
//         Was using "<a name" to store value to use for Time Select button.  
//         Value is part of "<a id" so wrote fhr_name() to pick out the appropriate text.
//         Change magwhite class to selected_cell.
// 2017-04 KAM Add skip factor to time range loops
// 2017-06 KAM New model group, Forecast Soundings
// 2017-08 PJF In showImage and printStaticURL, convert printed URL to link
// 2017-09 KAM New model, sref-clusters
// 2017-10 KAM Responsive design
// 2018-01 KAM Open help boxes as modal popups
// 2018-01 AQL Change skip factor from frame interval to constant time interval 
// 2018-02 KAM New function to clear text (change color) based on class name: clearEntireClass(className).
//             New function to hightlight text (change color) based on ID: highlightChosenCellId(type, id).
//             Remove setMoreInfoButton function (no longer needed).
// 2018-04 KAM Support putting image into HAniS container instead of <img> tag
// 2018-05 KAM Dynamically determine image_preserve areas for title and colorbar
// 2018-08 PJF New function to go to panel parameter page:  goToPanelParameter.
// 2018-11 PJF Fix typo in startLoop, which duplicated images from panel 1 in panel 4 if skip > 0.
// 2018-12 PJF In startLoop, in 4-panel section, check if array is populated before
//             using it to find loop_start and loop_end
// 2018-12 PJF startLoop: when editing lists for time select, edit the
//                valid time lists also, so the valid time displayed corresponds
//                to the image.  Also, use time_select=1 as the default (since
//                that is the default in the time select menu).
//             subset_list_interval: update to accept 2 arrays.
//                Use the first array to get the fhrs, but build the array
//                to return using values from the 2nd array.
// 2019-04 AQL Fix for when a time step of 1 is used for sub-hourly products. 
//             Have the code rebuild the list of images unless it's using the
//             time step of :15.
// 2019-04 AQL MAG-129: Fix for bug where incorrect values were selected in time-step selection
//             for sub-hourly products. Fix for bug where more than one forecast hours
//             were de-selected when clicking on the first or last forecast hour.
// 2019-09 AQL Added code to automatically fill in time step loop values. Added a check to only
//             do it if the user has not made any selections.
// 2019-11 AQL MAG-167: Fix time step bugs with subhourly products (HRRR) not populating correctly, and 
//             a bug where the time step is not being preserved when the user switches between products.
// 2020-02 AQL Remove unnecessary call to toggleLinkOff in selectLoopLink. Fix indentation in toggleLinkOn.
// 2020-02 KAM Fix to subhourly loops when clicking on start or end fhr link.
// 2021-04 KAM Remove image size variables. Add cycle change functions and data structures.
// 2023-09 Jake Zappin - Added gotoATCFImage() method to get image for ATCF Tropical Guidance Model
// 2025-01 Jake Zappin - Fixes and modifications for in-line JavaScript remediation


var save_scrollx, save_scrolly;
var current_index;      // index into arrays of image currently displayed
var fhr_mode;           // loop=looping. image=single image display
var loop_start;         // forecast hour for loop start.  -1 if not specified.
var loop_end;           // forecast hour for loop end.  -1 if not specified.
var loop_int;           // forecast hour interval for loop.  1 if not specified.
var id_num_length;      // set by model-guidance-model-parameter_body.php
                        // 3 for hourly, 5 for sub-hourly (15 minute intervals)
var subhour_product;    // set by model-guidance-model-parameter_body.php (true|false)
var underscores="";     // Placeholders for "start - end" button display
var fhr_array = [];

//style colors/text-decorations for anchor links
var anchor_on_color  = "red";
var anchor_off_color = "blue";
var anchor_off_decor = "none";
var anchor_on_decor  = "underline";

var convert_to_hour = 60*60*1000;

//var skip_num;


//--------------------------------------------------
// Setup function for Single-image page.
// - Set up listener for window resize
// - Set up forecast hour array
// - Set up shortcuts
// - Resize hanis div if page width is smaller
// - Initialize HAniS container
// - Display first image
//
// - image_preserve top-left(x,y), bottom-right(x,y)
//--------------------------------------------------
function hanis_image_setup() {
   // Set function to be called with the window is resized
   window.addEventListener("resize", function() {
      set_win_size();
   },false);

   shortcut_handler();

   if (document.getElementById("cycle_sel")) {
      g_cycle_index = document.getElementById("cycle_sel").selectedIndex;
   }

   var title_preserve    = get_title_coords();
   var colorbar_preserve = get_colorbar_coords();

   var param = 
       "use_progress_bar = false \n" +
       "start_looping = false \n" +
       "filenames = " + "\n" +
       "active_zoom=true \n" +
       "prevent_shortcuts=true \n" +
    // MAG-306: HTP: 10/2023 - stop using preserve areas and allow image to zoom normally
    //    "image_preserve = " + colorbar_preserve + "," + title_preserve + " \n" +
    "buttons_style = height:2.500em;width: 10%;background:linear-gradient(#2C3539,#999); \n" +
       "font-family:arial;font-size:12px;font-weight:bold;color:#fff;  flex:auto;margin:0px; \n"

   HAniS.setup(param,"handiv");

   if (current_index >= 0) {
        showImage(current_index);
   }

   scroll();

   //Keep this in mind. Want to get HAniS rezied upon page creation
   //window.dispatchEvent(new Event('resize'));

}

//------------------------------------------------------------------------------
// get_title_coords()
// Determine x1,y1,x2,y2 coordinates to be used for image_preserve of the
// image title while zooming.  Determined based on area and model.
// Variables "area" and "model" are set by Image_body.php and Imageanis_body.php
//------------------------------------------------------------------------------
function get_title_coords() {
   var coords = "";

   // Model Soundings
   if ((model == "nam-snd") || (model == "gfs-snd")) {
      coords = "0,0, 1024,49";
   }
   // Observations and Analysis
   else if (model == "uair") {
      switch(area) {
         case "alaska":     coords = "0,0, 1024,95";  break;
         case "wn-atl":     coords = "0,0, 1024,135"; break;
         default:           coords = "0,0, 1024,35";
      }
   }
   // Storm Tracks
   else if (model == "storm-tracks") {
        switch(area) {
            case "alaska":     coords = "0,0, 1024,45";  break;
            default:           coords = "0,0, 1024,25";
       }
   }

   // Model Guidance
   else {
      switch(area) {
         case "atl-pac":    coords = "0,0, 1024,140"; break;
         case "asia":       coords = "0,0, 1024,65";  break;
         case "south-pac":  coords = "0,0, 1024,55";  break;
         case "arctic":     coords = "0,0, 1024,97";  break;
         case "alaska":     coords = "0,0, 1024,35";  break;
         case "conus":      coords = "0,0, 1024,67";  break;
         case "hawaii":     coords = "0,0, 1024,49";  break;
         case "ne-coast":   coords = "0,0, 1024,46";  break;
         case "pr":         coords = "0,0, 1024,155"; break;
         case "us-samoa":   coords = "0,0, 1024,45";  break;
         case "north-pac":  
              if (model == "gfs" || model == "nam") coords = "0,0, 1024,65";  
              else                                  coords = "0,0, 1024,25";
                                                    break;
         case "polar":      
              if (model == "ice-drift") coords = "0,0, 1024,67";
              else                  coords = "0,0, 1024,35"; 
                                                     break;
         default:           coords = "0,0, 1024,25";
      }
   }
   return coords;
}

//-------------------------------------------------------------------------------
// get_colorbar_coords()
// Determine x1,y1,x2,y2 coordinates to be used for image_preserve of the
// colorbar while zooming the image.  Determined based on model and param.
// Variables "model" and "param" are set by Image_body.php and Imageanis_body.php
//-------------------------------------------------------------------------------
function get_colorbar_coords() {
   var coords = "";

   if (param == "10m_wnd") {
      coords = "0,0,75,768";
   }
   else {
      switch (model) {
         case "gefs-spag":  coords = "0,0,90,768"; break;
         case "estofs":     coords = "0,0,60,768"; break;
         case "ice-drift":  coords = "0,0,0,0";    break;
         case "nam-snd":    coords = "0,0,0,0";    break;
         case "gfs-snd":    coords = "0,0,0,0";    break;
         case "uair":       coords = "0,0,0,0";    break;
         default:           coords = "0,0,48,768";
      }
   }

   return coords;
}

//-------------------------------------------------------
// Callback function executed when the window is resized
//-------------------------------------------------------
function set_win_size() {
   if (window.innerWidth < IMAGE_WIDTH) {
      var newW = window.innerWidth - 20;
      var newH = newW/1.33;
      HAniS.setWindowSize(newW, newH);
   }
}

//--------------------------------------------------------
// Set up page for skewt image
// Define resize callback
// Define HAniS parameters (filenames is only one image)
//--------------------------------------------------------
function skewt_setup() {
   // Set function to be called with the window is resized
   window.addEventListener("resize", function() {
      set_win_size();
   },false);


   var param = 
       "use_progress_bar = false \n" +
       "start_looping = false \n" +
       "filenames = " + skewt_image_path + "\n" +
       "active_zoom=true \n" +
       "image_preserve = 0,0, 1024,30 \n" +
       "buttons_style = height:2.500em;width: 10%;background:linear-gradient(#2C3539,#999); \n" +
       "font-family:arial;font-size:12px;font-weight:bold;color:#fff;  flex:auto;margin:0px; \n"

   HAniS.setup(param,"handiv");

   //Keep this in mind. Want to get HAniS rezied upon page creation
   //window.dispatchEvent(new Event('resize'));
}

// handle user selection on type 
function getUserSelection(selectedtype) {
          document.indexForm.page.value = selectedtype ;
          document.indexForm.cat.value = selectedtype ;
     	  document.indexForm.submit();
}

//findPos - find the position of the object.
//          from http://www.quirksmode.org/js/findpos.html;
function findPos(obj) {
   var curleft = curtop = 0;
   if (obj.offsetParent) {
      curleft = obj.offsetLeft
      curtop = obj.offsetTop
      while (obj = obj.offsetParent) {
         curleft += obj.offsetLeft
         curtop += obj.offsetTop
      }
   }
   return [curleft,curtop];
}

// init popup timer
var popupTimerHandle = null;
 
//Display a named menu, at the position of another object (parent)
function display_menu(parent,named) {

   // clear the popup timer, if it is not null.
   if (popupTimerHandle != null) {
        clearTimeout(popupTimerHandle);
        popupTimerHandle = null;
   }

   // handle menu position
   var menu_element = document.getElementById(named);
   menu_element.style.display = 'block';
}
 
//Hide a named menu
function hide_menu(named) {
   var menu_element = document.getElementById(named);
   menu_element.style.display = "none";
}

function set_hide_timer(named) {
   var menu_element = document.getElementById(named);
   popupTimerHandle = setTimeout("hide_menu('" + named + "');", 5);
}

function goToModel_nps() {
   window.location.href = "model-guidance-model-area.php";
   return;
}

function goToModel(group, model, area, ps) {
   window.location.href = "model-guidance-model-area.php?group=" + group + "&model=" +  model + "&area=" + area+ "&ps=" + ps;
   return;
}

function goToPanelParameter(group, model, area, cycle, param, fourpan, imageSize, preselected_formatted_cycle_date, ps, fhr_mode, loop_start, loop_end, skip_num) {

   var ret_string = 
         "model-panels-model-parameter.php?group=" + group + 
         "&model=" +  model + 
         "&area=" + area + 
         "&cycle=" +  preselected_formatted_cycle_date + 
         "&param=" +  param;

   if (fourpan != "")    ret_string += "&fourpan=" + fourpan;
   if (imageSize != "")  ret_string += "&imageSize=" + imageSize;
   if (ps != "")         ret_string += "&ps=" + ps;
   if (fhr_mode != "")   ret_string += "&fhr_mode=" + fhr_mode;
   if (loop_start != "") ret_string += "&loop_start=" + loop_start;
   if (loop_end != "")   ret_string += "&loop_end=" + loop_end;
   if (skip_num != "")   ret_string += "&skip_num=" + skip_num;

   window.location.href = ret_string;

   return;
}

function goToModelParameter(group, model, area, cycle, param, fourpan, imageSize, preselected_formatted_cycle_date, ps, fhr_mode, loop_start, loop_end, skip_num) {
   var ret_string = 
         "model-guidance-model-parameter.php?group=" + group + 
         "&model=" +  model + 
         "&area=" + area + 
         "&cycle=" +  preselected_formatted_cycle_date + 
         "&param=" +  param;

   if (fourpan != "")    ret_string += "&fourpan=" + fourpan;
   if (imageSize != "")  ret_string += "&imageSize=" + imageSize;
   if (ps != "")         ret_string += "&ps=" + ps;
   if (fhr_mode != "")   ret_string += "&fhr_mode=" + fhr_mode;
   if (loop_start != "") ret_string += "&loop_start=" + loop_start;
   if (loop_end != "")   ret_string += "&loop_end=" + loop_end;
   if (skip_num != "")   ret_string += "&skip_num=" + skip_num;

   window.location.href = ret_string;

   return;
}

function goToSoundingParameter(group, model, area, station, cycle, param, imageSize, preselected_formatted_cycle_date, fhr_mode, loop_start, loop_end, skip_num, tabch) {
   var goto = "sounding-model-parameter.php?group="+group + "&model="+model + "&area=namer&station="+station + "&cycle="+preselected_formatted_cycle_date + "&param="+param + "&tabch="+tabch + "&fhr_mode="+fhr_mode;

   if (fhr_mode == "loop") {
      goto += "&loop_start="+loop_start + "&loop_end="+loop_end + "&skip_num="+skip_num;
   }

   window.location.href = goto;

   return;
}

//
// Jump directly to the Forecast Soundings Model/Area page, bypassing Sounding Parameter page
//
function goToSoundingButton(model) {
       window.location.href = "/sounding-model-area.php?model="+model;
       return;
}

function goHome()
{
   window.location.href = "/";
   return;
}

function gup( name ) {
    // get value of URL parameter name from window.location.href
    // e.g. if URL is http://somesite.com&var1=value1&var2=value2,
    //      then gup('var2') = value2
    // pilfered from stackoverflow.com
       
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\?&]"+name+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec( window.location.href );
    if ( results == null ) {
       return "";
    }
    else {
       return results[1];
    }
}

// handle function to center image in different size
function scroll() {
    var myscx = gup('scrollx');
    var myscy = gup('scrolly');
    if ( ( myscx != "" ) && ( myscy != "" ) ) window.scrollTo( myscx, myscy );
}


//clear all statuses of all cells for given table id
function clearEntireCell(id) {
   var table = document.getElementById(id);

   var newas = getEntireElementsByClassName('a', table);
   for (var i=0; i<newas.length; i++) {
      removeClassName(newas[i], 'selected_cell');
      if ( id != 'cycle' && id != 'params' ) addClassName(newas[i], 'deselect');
   }
}


//-------------------------------------------------------
// clearEntireClass(className)
// clear statuses of all cells with the given class name
// "clear" means set the color to blue.
//-------------------------------------------------------
function clearEntireClass(className) {
   var classList = getElementsByClassName(className);
   for (var i=0; i<classList.length; i++) {
      classList[i].style.color = "blue";
   }
}

//--------------------------------------------------------------------
// highlightChosenCellId(type, id)
//
// Highlight the text of a cycle or parameter cell (set color to red).
// - type: 'cycle' or 'params'
// - id: id of the cell to look for to highlight
//--------------------------------------------------------------------
function highlightChosenCellId(type, id) {
   var chosen;
   var id = id.replace(/\s+/g, '');  // remove spaces

  // clear links: set font color to normal
  clearEntireClass(type+"_link");

  chosen = document.getElementById(id);

  if (chosen) {
     chosen.style.color = "red";
  }
}

// Function: markSelectableCell
//mark these element as selectable in white color

function markSelectableCell(id, name) {
var e = document.getElementById(id + "_" + name);
   if (e) {
      removeClassName(e, 'deselect');
   }
}


// locate element by class name and return 
function getElementsByClassName(className, tag, elm){
  
    // set testing class name for comparison 
    var testClass = new RegExp("(^|\\s)" + className + "(\\s|$)");

    // init tag variable 
    var tag = tag || "*";

    // associate document object 
    var elm = elm || document;

    // Get all elements 
    var elements = (tag == "*" && elm.all)? elm.all : elm.getElementsByTagName(tag);
    var returnElements = [];
    var current;
    var length = elements.length;
    for(var i=0; i<length; i++){
       current = elements[i];
       // test if current cell class name is a match then add to array 
       if(testClass.test(current.className)){
          returnElements.push(current);
       }
    }
    return returnElements;
}


// this will return all cells in given table which will be used to clear white or deselect mark 
function getEntireElementsByClassName(tag, elm){
    var tag = tag || "*";
    var elm = elm || document;

    // get the entire elements from input tag name  
    var elements = (tag == "*" && elm.all)? elm.all : elm.getElementsByTagName(tag);
    var returnElements = [];
    var current;

    // get the entire elements length 
    var length = elements.length;

    for(var i=0; i<length; i++){
       // add elements to array 
       current = elements[i];
       returnElements.push(current);
    }
    return returnElements;
}

// mark element class name to select or deselect 
// 'white' will be added to the end of class name so style sheet can change color of the font  
function addClassName(elm, className){

    // append className to the end of class name  
    var currentClass = elm.className;
    if(!new RegExp(("(^|\\s)" + className + "(\\s|$)"), "i").test(currentClass)){
        elm.className = currentClass + ((currentClass.length > 0)? " " : "") + className;
    }
    return elm.className;
}

// remove white or deselect from class name 
// 'white' will be removed to the end of class name so style sheet can change color of the font  
function removeClassName(elm, className){

    // elm: td.[class name] className: on 
    // classToRemove: [class name]
    var classToRemove = new RegExp(("(^|\\s)" + className + "(\\s|$)"), "i");
    
    // Take the effect immediate by change the class name and css will take the action 
    elm.className = elm.className.replace(classToRemove, "").replace(/^\s+|\s+$/g, "");
    
    return elm.className;
}

function goToObsButton(group, obstype, area, ps) {
	   window.location.href = "observation-type-area.php?group=" + group + "&obstype=" +  obstype + "&area=" + area+ "&ps=" + ps;
	   
	   return;
	}


function goToObs() {
   window.location.href = "observation-type-area.php";
   return;
}


function goToObsParameter(group, model, area, cycle, param, preselected_formatted_cycle_date, ps) {
	
   window.location.href = "observation-parameter.php?group=" + group + "&obstype=" +  model + "&area=" + area + "&cycle=" +  preselected_formatted_cycle_date + "&param=" +  param + "&ps=" + ps ;
   return;
}

function goToTropical() {
   window.location.href = "tropical-guidance-model-storm.php";
   return;
}

function goToTropicalButton(group, model, storm, ps) {
	   window.location.href = "tropical-guidance-model-storm.php?group=" + group + "&model=" +  model + "&storm=" + storm+ "&ps=" + ps;
	   return;
}

function goToTropicalParameter(group, model,storm, cycle, param, preselected_formatted_cycle_date, ps) {
   window.location.href = "tropical-guidance-model-parameter.php?group=" + group + "&model=" +  model + "&storm=" + storm + "&cycle=" +  preselected_formatted_cycle_date + "&param=" +  param + "&ps=" + ps;
   return;
}

/*
 * fhr is the actual forecast hour
 * fnr_index is the index into the list of forecast hours
 */
function goToTropicalImage(fhr,fhr_index) {

    document.getElementById("fhr_id").value = fhr;
    document.getElementById("ImageForm_id").preselected_formatted_cycle_date.value=g_cycle;

    document.getElementById("cycle_list_id").value = cycle_list;
    if(document.getElementById("cycle_date_list_id")) {
       document.getElementById("form_cycle_date_list_id").value =
       document.getElementById("cycle_date_list_id").value;
    }
    document.getElementById("fhr_index_id").value = fhr_index;

    document.getElementById("ImageForm_id").submit();
}

function goToATCFImage(current_param, current_model, current_storm) {

   var list=g_cycle.split(" ");   // yyyymmdd cc UTC 
   var cyc=list[1];

   fhr="_000";

   var imagepath_format1 = "data/" + current_model + "/";
   var imagepath_format2 = "/" + current_model + "_" + current_storm + fhr + "_" + current_param + ".gif";

   document.getElementById("cycle_name_id").value = cyc;
   document.getElementById("imagepath_format1_id").value = imagepath_format1;
   document.getElementById("imagepath_format2_id").value = imagepath_format2;
   document.getElementById("ImageForm_id").submit();

}

function show_tab(nam) {
    document.getElementById("world_map_id").src="mag_images/selected/global-area-selected-" + nam.toLowerCase() + ".gif";
    document.getElementById("world_map_id").alt="mag_images/selected/global-area-selected-" + nam.toLowerCase() + ".gif";
    document.getElementById("world_map_id").title="MAG model and area coverage image";
}

/*
 * Display single image for fhr (forecast hour), or select fhr as start or end loop value.
 * - if fhr_mode = loop, then treat as loop select.
 * - else treat as posting the form that displays the image.
 */
function SubmitImageForm(fhr) {

    if (fhr_mode == "loop") {
        selectLoopLink(fhr);
    }
    else {
       // Current mode specifies jumping directly to the image
        if (document.getElementById("ImageForm_id") == null) {
            alert("ImageForm_id not found.");
            return;
        }
        document.getElementById("fhr_id").value = fhr;
        document.getElementById("fhr_index_id").value = find_fhr_index(fhr, fhr_array);
        document.getElementById("cycle_list_id").value = cycle_list;
        if(document.getElementById("cycle_date_list_id")) {
           document.getElementById("form_cycle_date_list_id").value = 
           document.getElementById("cycle_date_list_id").value;
        }
        document.getElementById("ImageForm_id").submit();
    }
}

/*
 * User has clicked on a forecast hour.
 * Find the link for that hour determine whether the link should be
 * turned off, or whether this should be a new start or end hour.
 * If setting a new start or end hour, fill in fhr links in between.
 */
function selectLoopLink(selected_fhr) {
    
    selected_fhr = parseInt(selected_fhr);
    var id = find_fhr_id(selected_fhr);

    if (!id) {
        console.log(selected_fhr + " not found");
        return;
    }

    // Make sure we have the correct skip_num before we begin filling in links.
    skip_num = 1;
    if (document.getElementById("skip_id")) {
        skip_num = parseInt(document.getElementById("skip_id").value);
    }
    if (subhour_product) {
       if (skip_num == 0) {
          // sub-hourly product where skip_num is set to 0:15
          skip_num = 15;
       }
       else {
          skip_num = 100;
          // sub-hourly product where skip_num is set to 1, 3, etc.
       }
    }

    if (selected_fhr == loop_start) {
        //Deselect current loop start
        toggleLinkOff(loop_start,loop_end);
        if (loop_end >= 0) {
            //Bump start to next existing fhr
            loop_start = loop_start + skip_num;
            if (subhour_product && (skip_num == 15)) {
               // Get the accumulated minutes.  If 60, then bump to next hour.
               // (%100 gets the minutes. %60==0, checks for minutes == 60)
               if (((loop_start % 100) % 60) == 0) {
                  loop_start = loop_start - 60 + 100;
               }
            }
            while (loop_start < loop_end) {
                if (find_fhr_id(loop_start)) {
                    //found one
                    break;
                }
                loop_start = loop_start + skip_num;
                if (subhour_product && (skip_num == 15)) {
                   // Bump to next hour if we've gotten to 60 minutes
                   if (((loop_start % 100) % 60) == 0) {
                      loop_start = loop_start - 60 + 100;
                   }
                }
            }
            if (loop_start >= loop_end) {
                //Didn't find a fhr in between
                loop_end = -1;
            }
        }
        else {
            //Since there was no loop end, and we just turned off
            //loop start, there are now no links selected. Set
            //loop start to -1 to indicate no loop start is selected.
            loop_start = -1;
        }
    }
    else if (selected_fhr == loop_end) {

        //Deselect current loop end
        toggleLinkOff(loop_start,loop_end);
        //Bump end to prev existing fhr
        if (subhour_product && (skip_num == 15)) {
           if ((loop_end %100) == 0) {
              // current end is a whole number
              // change the hour to 60 minutes
              loop_end = loop_end + 60 - 100;
           }
        }
        loop_end = loop_end - skip_num;
        while (loop_end > loop_start) {
            if (find_fhr_id(loop_end)) {
                //found one
                break;
            }
            if (subhour_product && (skip_num == 15)) {
               if ((loop_end %100) == 0) {
                  // current end is a whole number
                  // change the hour to 60 minutes
                  loop_end = loop_end + 60 - 100;
               }
            }
            loop_end = loop_end - skip_num;
        }
        if (loop_end <= loop_start) {
            //Didn't find a fhr in between
            loop_end = -1;
        }
    }
    else if (loop_start < 0) {
        // Neither start nor end is selected
        loop_start = selected_fhr;
    }
    else if (loop_end < 0) {
        // Start is selected, but end is not
        if (selected_fhr > loop_start) {
            loop_end = selected_fhr;
        }
        else if (selected_fhr < loop_start) {
            loop_end = loop_start;
            loop_start = selected_fhr;
        }
    }
    else {
        // Both start and end points are selected
        // De-select all links between current start and end
        toggleLinkOff(loop_start,loop_end);
        // Figure out whether new selection is closer to current start or end
        if (Math.abs(loop_start - selected_fhr) <= Math.abs(loop_end - selected_fhr)) {
            loop_start = selected_fhr;
        }
        else {
            loop_end = selected_fhr;
        }
    }

    if (typeof(Storage) !== "undefined") { 
        // Set the flag to let the code know that the user has made an update.
        sessionStorage.setItem("user_update_loop", "1");
    }

    toggleLinkOn(loop_start, loop_end);
}

/*
 * Given a forecast hour, determine the link id by padding with zeros, based on id_num_length.  
 * id_num_length is set in php code based on whether or not there are subhour products.
 * Then using the determined link id, find and return the element on the curent page.
 */
function find_fhr_id(fhr) {
    fhr_str = "" + fhr;
    while (fhr_str.length < id_num_length) {
        fhr_str = "0" + fhr_str;
    }
    let padded_fhr = "fhr_id_"+fhr_str;
    return (document.getElementById(padded_fhr));
}

/*
 * Given 2 forecast hours, deselect them and all fhr links in between.
 */
function toggleLinkOff(fhr1,fhr2) {
    var a = find_fhr_id(fhr1);
    if (a) {
        a.style.color = anchor_off_color;
        a.style.textDecoration = anchor_off_decor;
    }
    for (var i=fhr1+1; i <= fhr2; ++i) {
        a = find_fhr_id(i);
        if (a) {
           a.style.color = anchor_off_color;
           a.style.textDecoration = anchor_off_decor;
        }
    }
}

/*
 * Called when Skip Factor select (dropdown) changes (onChange)
 * skip - the time step factor that we're using.
 * user_input - flag for whether or not the user has updated the forecast hours.
 */
function refresh_loop_links(skip, user_input) {
    if (typeof(Storage) !== "undefined") {
        if (user_input) {
            sessionStorage.setItem("user_update_step", "1");
        }
    }

    skip_num = parseInt(skip); //global variable
    if (loop_start > -1 && loop_end > -1)
        toggleLinkOn(loop_start, loop_end);
}

/*
 * Select links on the current page given 2 forecast hours fhr1 and fhr2.
 * A value of -1 indicates no fhr was selected.
 * If both fhr1 and fhr2 > -1, select them and all the fhr links in between.
 * If (fhr1 > -1) and (fhr2 = -1), just select fhr1.
 * If both are -1, nothing gets selected.
 * Also determine text for the "Time Range Loop" button.
 * underscores is set by php code based on the model name.
 * The optional skip is used for skipping fhrs.  
 * The skip value is the time step to use for skipping fhrs.
 * skip=0 (no skipping), skip=1 (keep every hour and skip sub-hourly times, if applicable)/
 * skip=3 (keep every 3 fhrs, skip others), etc.
 */
function toggleLinkOn(fhr1,fhr2) {
    var button_txt = "Time Range Loop ";

    if (fhr1 < 0) {
        set_loop_button_text(button_txt += "(" + underscores + " - " + underscores + ")");
        return;
    }

    var skip_value=1;
    if(typeof skip_num === 'undefined'){
        let session_skip_num = sessionStorage.getItem('skip_num');
        if(typeof session_skip_num != 'undefined'){
            if (session_skip_num === "0"){
                skip_value = 0;
                document.getElementById("skip_id").value = skip_value;
            } else {
                skip_value = session_skip_num;
                document.getElementById("skip_id").value = skip_value;
            }
        } else if (parseInt(document.getElementById("skip_id")).value > 1){
            skip_value = document.getElementById("skip_id")
        } else {
            if (document.getElementById("skip_id")){
                skip_value = document.getElementById("skip_id").value;
            }
        }
    } else if (parseInt(document.getElementById("skip_id")).value === 0) {
        skip_value = 1;
        document.getElementById("skip_id").value = skip_value;
    } else {
        if (skip_num > 99 ){
            let session_skip_num = sessionStorage.getItem('skip_num');
            if(session_skip_num != 1){
                skip_value = session_skip_num;
                document.getElementById("skip_id").value = skip_value;
            } else {
                skip_value = 1;
                document.getElementById("skip_id").value = skip_value;
            }
        } else {
            skip_value = skip_num;
            document.getElementById("skip_id").value = skip_value;
        }
    }

    //Reset value if we have subhours
    if(skip_value == "15"){
        skip_value = 0;
        document.getElementById("skip_id").value = 0;
    }

    sessionStorage.setItem('skip_num', skip_value);

    var skip = 1;
    if (skip_value > 1) {
        skip = skip_value;
    }

    // Starting fhr.
    var a1 = find_fhr_id(fhr1);
    if (a1) {
        a1.style.color = "red";
        a1.style.textDecoration = "underline";
        button_txt += "(F" + fhr_name(a1.id);
    }

    // If minutes are defined, extract the hour portion.
    var first_subhour = -1;
    if (id_num_length > 3) {
        first_subhour = parseInt((""+fhr1).slice(-2));
    }

    var str_fhr1 = fhr1+"";
    while (str_fhr1.length < id_num_length) {
        str_fhr1 = "0" + str_fhr1;
    }
    var hour1 = parseInt(str_fhr1.substring(0,3));

    var offset = hour1 % skip;

    // Fill in until ending fhr found.
    var last_valid_fhr = -1;
    for (var i=fhr1+1; i<=fhr2; i++) {

        var a2 = find_fhr_id(i);

        if (a2) {
            var str_fhr = i + "";
            while (str_fhr.length < id_num_length) {
                str_fhr = "0" + str_fhr;
            }
            var hour = parseInt(str_fhr.substring(0,3));
            var subhour = -1;
            // Get forecast minutes, if applicable.
            if (id_num_length > 3) {
                subhour = parseInt(str_fhr.substring(3,5));
            }
            
            if (hour % skip == offset && (subhour == -1 || skip_value == 0 || subhour == first_subhour)) {
               a2.style.color = anchor_on_color;
               a2.style.textDecoration = anchor_on_decor;
               last_valid_fhr = i;
            } 
            else {
               a2.style.color = anchor_off_color;
               a2.style.textDecoration = anchor_off_decor;
            }
        }
    }

    if (last_valid_fhr > -1) {
        loop_end = last_valid_fhr;
        a2 = find_fhr_id(last_valid_fhr);
    }

    // Ending fhr.  If a valid end was found, add to button text. Otherwise show it as blank.
    if (a2) {
        button_txt += " - F" + fhr_name(a2.id) + ")";
    }
    else {
        button_txt += " - " + underscores + ")";
    }

    set_loop_button_text(button_txt);
}

/*
 * Set the display text of the Time Range Loop button to txt
 */
function set_loop_button_text(txt) {
    if (document.getElementById("startLoop_but"))
        document.getElementById("startLoop_but").innerHTML = txt;
}

/*
 * Called when page is reposted.
 * Start and end links from the last page are passed as parameters.
 * Look to see if the start/end fhrs exist for new page.
 * Find them, or the nearest possible, and mark them as selected.
 */
function findLinks(start,end) {
    loop_start = -1;
    loop_end   = -1;

    if (start > -1) {
        if (end > -1) {
            //Try to match the starting index
            var new_start = start;
            while (new_start < end) {
                if (find_fhr_id(new_start)) {
                    loop_start = new_start;
                    break;
                }
                ++new_start;
            }

            //Try to match ending index
            new_end = end;
            while ((new_end > new_start) && (new_end > -1)) {
                if (find_fhr_id(new_end)) {
                    loop_end = new_end;
                    break;
                }
                --new_end;
            }

        }
        else {
            //We a start value, but no end value.  Set start if found.
            if (find_fhr_id(start)) {
                loop_start = start;
            }
      }

      toggleLinkOn(loop_start,loop_end);
    }
}

/*
 * Show or hide help text for the Time Range Looping feature.
 */
function start_end_help_box_display() {
    if (document.getElementById("start_end_help_id")) {
        if (document.getElementById("start_end_help_id").style.display == "block") { 
            //currently shown, turn it off
            document.getElementById("start_end_help_id").style.display="none";
        }
        else { 
            // Turn it on. Make sure all other such divs are off
            document.getElementById("start_end_help_id").style.display="block";
            document.getElementById("more_info_div_id").style.display="none";
        }
    }
}

/*
 * Given fhr_id:
 *    "fhr_id_HHH" or "fhr_id_HHHMM"
 * return a string suitable to use as a forecast hour label:
 *    HHH or HHH:MM
 */
function fhr_name(fhr_id){
   var n = fhr_id.lastIndexOf("_");
   if (n) {
      if ((fhr_id.length - n - 1) >= 5)   //HHHMM.  return HHH:MM
         return fhr_id.substr(n+1,3) + ":" + fhr_id.substring(n+4);
      else
         return fhr_id.substring(n+1);
   }
   else {
      return "";
   }
}

/*
 * openModalBox
 */
function openModalBox(div_id) {
   if (document.getElementById(div_id)) {
       document.getElementById(div_id).style.display="block";
   }
}

/*
 * closeModalBox
 */
function closeModalBox(div_id) {
   if (document.getElementById(div_id)) {
       document.getElementById(div_id).style.display="none";
   }
}

/*
 * Update then post form that will post the 4-image-viewing page,
 * or select a looping forecast hour link.
 */

function SubmitImage4Form(fhr) {

    if (fhr_mode == "loop") {
        selectLoopLink(fhr);
    }
    else {
        if (document.getElementById("Image4Form_id") == null) {
           alert("Image4Form_id not found.");
           return;
        }
        else if (document.getElementById("fhr4_id") == null) {
           alert("fhr4_id not found.");
           return;
        }
        document.getElementById("fhr4_id").value = find_fhr_index(fhr, fhr_array1);
        document.getElementById("Image4Form_id").submit();
     }
}

function goToImage() {
// This function can receive one argument or two:
// forecast hour
// forecast hour and forecast minute


    if (arguments.length == 1) {
      string=pad(arguments[0], 3);
    }

    else if (arguments.length == 2) {
      fhrString=pad(arguments[0], 3);
      fminString=pad(arguments[1], 2);
      string=fhrString + fminString
    }
    else {
      alert("goToImage needs 1 or 2 arguments");
      return;
    }

    if (document.getElementById("ImageForm_" + string) == null) {
      alert("ImageForm_" + string + " not found.");
      return;
    }

    size=getSizeButtonValue();
    if (size != "S" && size != "M" && size != "L")
      size = "M";
    document.getElementById("ImageForm_" + string).imageSize.value=size;
   document.getElementById("ImageForm_" + string).submit();
}

function pad(number, length) {
   
    var str = '' + number;
    while (str.length < length) {
        str = '0' + str;
    }
   
    return str;

}

/*
 * Toggle display between "Single Time Selection" and "Time Range Selection" modes.
 *    mode 1:  Activate Single Image Select mode
 *    mode 2:  Activate Time Range Select mode
 */
function toggleLoopSelect (mode) {

    var loop_div = document.getElementById("loop_mode_div_id");
    var fhr_div  = document.getElementById("fhr_mode_div_id");
    var loop_but = document.getElementById("startLoop_but");
    var fhr_mode_id = document.getElementById("fhr_mode_id");
    var extras = document.getElementById("start_end_extras_div");

    if (mode == 1) {
        // Activate Single Image Select mode
        loop_but.hidden = true;
        extras.style.display = "none";
        loop_div.className = "loop_toggle_off";
        fhr_div.className  = "loop_toggle_on";
        if (fhr_mode_id)
            fhr_mode_id.value = "image";
        fhr_mode = "image";
        clearLoop();
        if (typeof(Storage) !== "undefined") {
            sessionStorage.setItem("user_update_loop", "0");
            sessionStorage.setItem("user_update_step", "0");
        }
    }
    else if (mode == 2) {
        // Activate Time Range Select mode
        loop_but.hidden = false;
        extras.style.display = "block";
        loop_div.className = "loop_toggle_on";
        fhr_div.className  = "loop_toggle_off";
        if (fhr_mode_id)
            fhr_mode_id.value = "loop";
        fhr_mode = "loop";
        fillLoop();
    }
    else {
        //Programming Error. Don't do anything.
    }
}

/*
 * Deselect all fhr links using the global start and end loop settings.
 * Set the step number back to the first element in the list.
 */
function clearLoop() {
    toggleLinkOff(loop_start,loop_end);
    loop_start = -1;
    loop_end = -1;
    set_loop_button_text("Time Range Loop (" + underscores + " - " + underscores + ")");
    if (document.getElementById("skip_id")) {
        document.getElementById("skip_id").selectedIndex = 0;
    }
}


/*
 * Fill in the loop based upon the given fhrs_low, fhrs_high, and fhrs_interval values.
 */
function fillLoop() { 

    var loop_interval = 1;
    if (document.getElementById("fhrs_interval")) {
        loop_interval = document.getElementById("fhrs_interval").value;
    }

    if (typeof(Storage) !== "undefined") {        
        if (document.getElementById("skip_id") && sessionStorage.getItem("user_update_step") != "1") {
            document.getElementById("skip_id").value = loop_interval;
            refresh_loop_links(loop_interval, false);
        }
    }


    if (typeof(Storage) !== "undefined") {
        // If the user has not made any updates, fill in the loop.
        if (sessionStorage.getItem("user_update_loop") != "1") {                     
            var fhrsStart = -1;
            var fhrsEnd = -1;
            if (document.getElementById("fhrs_low")) {
                fhrsStart = parseInt(document.getElementById("fhrs_low").value);
            }

            if (document.getElementById("fhrs_high")) {
                fhrsEnd = parseInt(document.getElementById("fhrs_high").value);
            }

            // If we're dealing with forecast minutes, we need to change fhrsStart and fhrsEnd to be
            // 100 times bigger so that it can be properly processed by findLinks()
            if (id_num_length > 3) {
                fhrsStart *= 100;
                fhrsEnd *= 100;
            }
        }
   

        // Replace loop_start and loop_end with stored values, only if loop_start and loop_end
        // have not been set by either user click, or changing the time step value.
        if (loop_start == -1 && loop_end == -1) {
            loop_start = fhrsStart;
            loop_end = fhrsEnd;
        }
    }

    findLinks(loop_start, loop_end);

}

/*
 * Set up and post forms to start single or 4-panel looping.
 *
 * Edit the lists for Time Range Selection (only loop the selected
 * forecast hours) and for the time step selected (if > 1, edit
 * list to include only the the entries that correspond to
 * multiples of the selected time step)
 */
function startLoop(num_panels) {

    if ((loop_start < 0) || (loop_end < 0)) {
        alert("Please select 2 forecast hours to use as start and end points for the loop.\n\nTo select a forecast hour, click on the hour in the table below.");
        return;
    }

    // step_num is the timestep.  If not defined, default to 1.
    var step_num;
    if(document.getElementById("skip_id")){
        step_num = document.getElementById("skip_id").value;
    } else {
        step_num = 1;
    }

    if (num_panels != 4) {

        // Single-panel Loop
        
        // Find the index into the array of the start fhr and end fhr
        
        var loop_start_idx = find_fhr_index(loop_start, fhr_array);
        var loop_end_idx   = find_fhr_index(loop_end, fhr_array);
        var ll_id = document.getElementById("anis_list_id");

        if (ll_id) {

            // Find the start and end positions in the list string
            var ilist = ll_id.value;
            var n = findEndLoc(ilist,loop_end_idx);
            var m = findStartLoc(ilist,loop_start_idx);
            var new_list;

            if (step_num >= 1) {
               // Trim any fhrs before the start and after the end
               // Edit the list to include only those fhrs that are
               // multiples of step_num

                new_list = ilist.substring(m+1, n) + ",";
                new_list = subset_list_interval(new_list, new_list, step_num);
            }
            else {
                new_list = ilist.substring(m+1, n);
            }
            document.getElementById("anis_list_id").value = new_list;
            document.getElementById("anis_loop_start_id").value = loop_start;
            document.getElementById("anis_loop_end_id").value = loop_end;
            document.getElementById("anis_skip_id").value = step_num;
            document.getElementById("ImageAnisForm_id").submit();
        }
    }
    else {

       // Four-panel loop
    
        var loop_start_idx = 0;
        var loop_end_idx   = 0;

        // Find the index into the arrays of the start fhr and end fhr
        if (fhr_array1.length > 0 ) {
           loop_start_idx = find_fhr_index(loop_start, fhr_array1);
           loop_end_idx   = find_fhr_index(loop_end, fhr_array1);
        } else if (fhr_array2.length > 0 ) {
           loop_start_idx = find_fhr_index(loop_start, fhr_array2);
           loop_end_idx   = find_fhr_index(loop_end, fhr_array2);
        } else if (fhr_array3.length > 0 ) {
           loop_start_idx = find_fhr_index(loop_start, fhr_array3);
           loop_end_idx   = find_fhr_index(loop_end, fhr_array3);
        } else if (fhr_array4.length > 0 ) {
           loop_start_idx = find_fhr_index(loop_start, fhr_array4);
           loop_end_idx   = find_fhr_index(loop_end, fhr_array4);
        } else {
           alert("No images available for any of the 4 panels. Select a different cycle. ");
           return;
        }

        var anis_list1 = document.getElementById("anis_list1_id");
        var anis_list2 = document.getElementById("anis_list2_id");
        var anis_list3 = document.getElementById("anis_list3_id");
        var anis_list4 = document.getElementById("anis_list4_id");

        var anis_valid_time_list1 = document.getElementById("anis_valid_time_list1_id");
        var anis_valid_time_list2 = document.getElementById("anis_valid_time_list2_id");
        var anis_valid_time_list3 = document.getElementById("anis_valid_time_list3_id");
        var anis_valid_time_list4 = document.getElementById("anis_valid_time_list4_id");


        if (anis_list1 && anis_list2 && anis_list3 && anis_list4) {

            document.getElementById("animate_id").value = 1;
            document.getElementById("fhr_mode_id").value = "loop";
            document.getElementById("4anis_loop_start_id").value = loop_start;
            document.getElementById("4anis_loop_end_id").value = loop_end;
            if(typeof skip_num === 'undefined'){
                skip_num = sessionStorage.getItem('skip_num');
            }
            document.getElementById("4anis_skip_id").value = skip_num;

            // Fetch the product name lists
            var ilist1 = anis_list1.value;
            var ilist2 = anis_list2.value;
            var ilist3 = anis_list3.value;
            var ilist4 = anis_list4.value;

            // Find the positions of the start and end indexes in each 
            // of the four-panel product list strings. 
            var n1 = findEndLoc(ilist1, loop_end_idx);
            var m1 = findStartLoc(ilist1, loop_start_idx);
            var n2 = findEndLoc(ilist2, loop_end_idx);
            var m2 = findStartLoc(ilist2, loop_start_idx);
            var n3 = findEndLoc(ilist3, loop_end_idx);
            var m3 = findStartLoc(ilist3, loop_start_idx);
            var n4 = findEndLoc(ilist4, loop_end_idx);
            var m4 = findStartLoc(ilist4, loop_start_idx);

            // Trim the product list strings to remove all images
            // before and after the start and end fhrs
            //
            new_list1 = ilist1.substring(m1+1, n1) + ",";
            new_list2 = ilist2.substring(m2+1, n2) + ",";
            new_list3 = ilist3.substring(m3+1, n3) + ",";
            new_list4 = ilist4.substring(m4+1, n4) + ",";

           // If the valid time lists exist:

             if ( (anis_valid_time_list1 != null) &&
                  (anis_valid_time_list2 != null) &&
                  (anis_valid_time_list3 != null) &&
                  (anis_valid_time_list4 != null) ) {

                var ivalidtimelist1 = anis_valid_time_list1.value;
                var ivalidtimelist2 = anis_valid_time_list2.value;
                var ivalidtimelist3 = anis_valid_time_list3.value;
                var ivalidtimelist4 = anis_valid_time_list4.value;

                // Find positions of the start and end indexes in each of the 
                // valid time list strings. 
                
                var nv1 = findEndLoc(ivalidtimelist1, loop_end_idx);
                var mv1 = findStartLoc(ivalidtimelist1, loop_start_idx);
                var nv2 = findEndLoc(ivalidtimelist2, loop_end_idx);
                var mv2 = findStartLoc(ivalidtimelist2, loop_start_idx);
                var nv3 = findEndLoc(ivalidtimelist3, loop_end_idx);
                var mv3 = findStartLoc(ivalidtimelist3, loop_start_idx);
                var nv4 = findEndLoc(ivalidtimelist4, loop_end_idx);
                var mv4 = findStartLoc(ivalidtimelist4, loop_start_idx);
   
                var new_valid_time_list1, new_valid_time_list2, new_valid_time_list3, new_valid_time_list4;         

                // Trim the valid time list strings to remove all entries 
                // before and after the start and end fhrs
                new_valid_time_list1 = ivalidtimelist1.substring(mv1+1, nv1) + ",";
                new_valid_time_list2 = ivalidtimelist2.substring(mv2+1, nv2) + ",";
                new_valid_time_list3 = ivalidtimelist3.substring(mv3+1, nv3) + ",";
                new_valid_time_list4 = ivalidtimelist4.substring(mv4+1, nv4) + ",";
            }
   
            // Edit lists for requested timestep
            
            var new_list1, new_list2, new_list3, new_list4;         


            if (step_num > 1) {
                // step_num > 1, so need to edit down the lists to
                // include only entries that are multiples of the
                // step_num

                // Edit down the valid time lists first, because the
                // subset_list_interval function uses the fhrs from the
                // product lists to build the edited vallid time lists.

                // If the valid time lists exist:
                // create the new valid time lists using the fhrs from 
                // the product file lists, returning the corresponding
                // valid time entries that match the time step.
                //
                if ( (anis_valid_time_list1 != null) &&
                     (anis_valid_time_list2 != null) &&
                     (anis_valid_time_list3 != null) &&
                     (anis_valid_time_list4 != null) ) {

                   new_valid_time_list1 = subset_list_interval(new_list1, new_valid_time_list1, step_num);
   
                   new_valid_time_list2 = subset_list_interval(new_list2, new_valid_time_list2, step_num);
   
                   new_valid_time_list3 = subset_list_interval(new_list3, new_valid_time_list3, step_num);
   
                   new_valid_time_list4 = subset_list_interval(new_list4, new_valid_time_list4, step_num);
   
                   // replace the valid time values in the form with new lists.
                   //
                   anis_valid_time_list1.value = new_valid_time_list1;
                   anis_valid_time_list2.value = new_valid_time_list2;
                   anis_valid_time_list3.value = new_valid_time_list3;
                   anis_valid_time_list4.value = new_valid_time_list4;
                }

                // Edit the product lists to contain only
                // include only entries that are multiples of the
                // step_num


                new_list1 = subset_list_interval(new_list1, new_list1, step_num);

                new_list2 = subset_list_interval(new_list2, new_list2, step_num);

                new_list3 = subset_list_interval(new_list3, new_list3, step_num);

                new_list4 = subset_list_interval(new_list4, new_list4, step_num);

                
            }


            // replace the product list values in the form with new lists.
            // If the valid time lists exists, replace those too.
            //
            anis_list1.value = new_list1;
            anis_list2.value = new_list2;
            anis_list3.value = new_list3;
            anis_list4.value = new_list4;

            if ( (anis_valid_time_list1 != null) &&
                 (anis_valid_time_list2 != null) &&
                 (anis_valid_time_list3 != null) &&
                 (anis_valid_time_list4 != null) ) {
                anis_valid_time_list1.value = new_valid_time_list1;
                anis_valid_time_list2.value = new_valid_time_list2;
                anis_valid_time_list3.value = new_valid_time_list3;
                anis_valid_time_list4.value = new_valid_time_list4;
            }

            document.getElementById("Image4Form_id").submit();
        }
    }
}

/*
 * Given a forecast hour, find the index into the forecast hours array.
 */
function find_fhr_index(fhr, farray){
    for (var i = 0; i < farray.length; i++) {
        if (parseInt(fhr) === parseInt(farray[i])) {
            return i;
        }
    }
    return -1;
}

/*
 * Given a forecast hour, find the index into the array of cluster filenames.
 */
function find_fhr_index_cluster(fhr, farray){
    for (var i = 0; i < farray.length; i++) {
        if (farray[i] === fhr)
            return i;
    }
    return -1;
}

/*
 * Find the position of end_idx in a given comma-separated list.
 */
function findEndLoc(ilist,end_idx) {
    var n = 0;
    var i = 0;
    while ((n < ilist.length) && (i <= end_idx)) {
        n = ilist.indexOf(",",n+1);
        ++i;
    }
    return n;
}

/*
 * Find the position of start_idx in a given comma-separated list.
 */
function findStartLoc(ilist,start_idx) {
    var n = -1;
    var i = 0;
    while ((n < ilist.length) && (i < start_idx)) {
        n = ilist.indexOf(",",n+1);
        ++i;
    }
    return n;
}

/*
 * subset_list_interval.
 *     Create a new list, extracting elements based on the forecast hour,
 *     returning elements that match every step hour.
 *     The forecast hour will be fetched from filenames in the first list.
 *     The elements for the new list will be taken from the 2nd list.
 *     This is called for single-image and 4-panel looping, 
 *     which uses the HANIS package.
 * 
 */
function subset_list_interval(ilist, jlist, step) {  
    var new_list = "";
    var start = -1;
    var start_subhour = -1;
    var offset = -1;

    var product_array = ilist.split(",");
    var target_array = jlist.split(",");

    for (var i in product_array) {   
        var product = product_array[i];
        var target=target_array[i];

        // Continue if we have a product, otherwise skip.
        if (product.length > 2) {
            // Determine the file name. (e.g. If the path is data/nam/12/nam_namer_003_precip_p03.gif, the file name is nam_namer_003_precip_p03.gif)
            var product_split = product.split("/");
            var file_name = product_split[product_split.length-1];

            // Determine the forecast hour from the file name. (e.g. 003)
            var str_hour = file_name.split("_")[2];
            var hour = parseInt(str_hour.substring(0,3));
            
            // Determine the forecast subhour, if applicable.
            var str_subhour = str_hour.substring(3,5);
            var subhour = -1;
            if (str_subhour.length > 0) {
                subhour = parseInt(str_subhour);
            }

            // Set the starting hour if it has not been set yet.
            if (start < 0) {
                start = hour;
                offset = start % step;
                start_subhour = subhour; 
            }

            // If the forecast hour matches the time step, add it to the list. 
            if (hour % step == offset) {
                if (subhour < 0 || step == 0 || start_subhour == subhour) {
                    new_list += (target + ",");
                }
            }

            
        }
    }

    return new_list;
}

function goToLoop(day) {
   if (day == undefined) {
       day = 'All';
   }

   if (document.getElementById("fhr_mode_daily_" + day + "_id") != null)
       document.getElementById("fhr_mode_daily_" + day + "_id").value = fhr_mode;

   if (document.getElementById("daily_loop_" + day + "_start_id") != null)
       document.getElementById("daily_loop_" + day + "_start_id").value = loop_start;

   if (document.getElementById("daily_loop_" + day + "_end_id") != null)
       document.getElementById("daily_loop_" + day + "_end_id").value = loop_end;

   var skip_num = 0;
   if (document.getElementById("skip_id"))
       skip_num = document.getElementById("skip_id").value;

   if(document.getElementById("daily_loop_"+day+"_skip_id"))
      document.getElementById("daily_loop_"+day+"_skip_id").value = skip_num;

   if (document.getElementById("LoopForm_" + day) != null)
       document.getElementById("LoopForm_" + day).submit();
}

function goTo4Loop(day) {
   if (day == undefined) {
       day = 'All';
   }

   if (document.getElementById("fhr_mode_daily_" + day + "_id") != null)
       document.getElementById("fhr_mode_daily_" + day + "_id").value = fhr_mode;

   if (document.getElementById("daily_loop_" + day + "_start_id") != null)
       document.getElementById("daily_loop_" + day + "_start_id").value = loop_start;

   if (document.getElementById("daily_loop_" + day + "_end_id") != null)
       document.getElementById("daily_loop_" + day + "_end_id").value = loop_end;

   var loop_interval = 1;
   if(document.getElementById("skip_id"))
       loop_interval = document.getElementById("skip_id").value;

   if (document.getElementById("daily_loop_" + day + "_skip_id") != null)
       document.getElementById("daily_loop_" + day + "_skip_id").value = loop_interval;

   if (document.getElementById("Loop4Form_" + day) != null)
       document.getElementById("Loop4Form_" + day).submit();
}


//-------------------------------------------------------------
// Create links that will open the cluster image viewing page.
// - cluster_nums contains a comma-separated list of numbers,
//   example:  "1,3,4" meaning 3 clusters were found for the
//   forecast hour: cluster1, cluster3, cluster4.
// - fhr: forecast hour
//-------------------------------------------------------------
function populate_cluster_links(cluster_nums,fhr) {
   var cluster_array  = [];
   var new_link;
   var id;
   var fhr_str;

   // If a forecast hour link was previously clicked, make sure it is unselected
   if (g_fhr && (g_fhr >= 0)) {
      unhighlightChosenfhr(g_fhr);
   }

   // Save fhr as global variable
   g_fhr = fhr;

   fhr_str = "00" + fhr;
   fhr_str = fhr_str.substr(fhr_str.length - 3);

   cluster_array = cluster_nums.split(",");
   clear_cluster_links();

   if (document.getElementById("fhr_cluster_id"))
       document.getElementById("fhr_cluster_id").innerHTML = 
         "Clusters for forecast hour F" + fhr_str + ":";

   for (var i=0; i<cluster_array.length; i++) {
      id = document.getElementById("cluster" + cluster_array[i] + "_id");
      if (id) {
        //  new_link = "<a href=\"#\" onclick=\"open_cluster_page(" +cluster_array[i] + "," + fhr + 
        //             ")\" class=\"redhover\">Cluster " + cluster_array[i] + "</a>";
        new_link = `<a href="#" class="redhover cluster-link" 
                data-cluster="${cluster_array[i]}" 
                data-fhr="${fhr}">
                Cluster ${cluster_array[i]}
            </a>`;
         id.innerHTML = new_link;
         id.className = "cluster_txt_enabled";
      }
   }
   document.getElementById("cluster_div").style.display="block";

   // Highlight the forecast hour that was clicked
   highlightChosenfhr(fhr);
}

//------------------------------------------------------------------------------
// Highlight the text of a fhr cell.
// Used for Model Guidance, Cluster model
//------------------------------------------------------------------------------
function highlightChosenfhr(fhr) {
   var fhr_str = "00" + fhr;
   fhr_str = "fhr_id_" + fhr_str.substr(fhr_str.length - 3);
   if (document.getElementById(fhr_str))
      document.getElementById(fhr_str).style.color = "red";
}

//------------------------------------------------------------------------------
// Un-highlight the text of a fhr cell.
// Used for Model Guidance, Cluster model
//------------------------------------------------------------------------------
function unhighlightChosenfhr(fhr) {
   var fhr_str = "00" + fhr;
   fhr_str = "fhr_id_" + fhr_str.substr(fhr_str.length - 3);
   if (document.getElementById(fhr_str))
       document.getElementById(fhr_str).style.color = "blue";
}

//-------------------------------------------------------------
// Clear all the cluster links
//-------------------------------------------------------------
function clear_cluster_links() {
   var id;
   for (var i=1; i<7; i++) {
      id = "cluster" + i + "_id";
      if (document.getElementById(id)) {
          document.getElementById(id).innerHTML = "Cluster " + i;
          document.getElementById(id).className = "cluster_txt_disabled";
      }
   }
}

//-------------------------------------------------------------
// Set up form values, then post the form cluster.php
//-------------------------------------------------------------
function open_cluster_page(cluster_num,fhr) {
   if (document.getElementById("ClusterForm_id")) {
      var fhr_str = "00" + fhr;
      fhr_str = fhr_str.substr(fhr_str.length - 3);
      var fhr_index = 0;

      if (document.getElementById("cluster_id"))
          document.getElementById("cluster_id").value = cluster_num;

      var cluster_list_1 = document.getElementById("cluster_data_1_id");
      var cluster_list_2 = document.getElementById("cluster_data_2_id");
      var cluster_list_3 = document.getElementById("cluster_data_3_id");
      var cluster_list_4 = document.getElementById("cluster_data_4_id");
      var cluster_list_5 = document.getElementById("cluster_data_5_id");
      var cluster_list_6 = document.getElementById("cluster_data_6_id");

      fhr_array = [];

      if (id) {
         switch(parseInt(cluster_num)) {
            case 1:  fhr_array = cluster_list_1.value;break;
            case 2:  fhr_array = cluster_list_2.value;break;
            case 3:  fhr_array = cluster_list_3.value;break;
            case 4:  fhr_array = cluster_list_4.value;break;
            case 5:  fhr_array = cluster_list_5.value;break;
            case 6:  fhr_array = cluster_list_6.value;break;
            default: id.value = "";
         }

         fhr_array = fhr_array.split(",").map(item => item.replace(/'/g, "").trim());
         fhr_index = find_fhr_index_cluster(fhr_str, fhr_array);

         if(document.getElementById("fhr_list_id"))
            document.getElementById("fhr_list_id").value = fhr_array;

         if (document.getElementById("fhr_index_id"))
             document.getElementById("fhr_index_id").value = fhr_index;

         if (document.getElementById("fhr_id"))
             document.getElementById("fhr_id").value = fhr;

         if (document.getElementById("num_fhrs_id"))
             document.getElementById("num_fhrs_id").value = fhr_array.length;
      }
      document.getElementById("ClusterForm_id").submit();
   }
   else {
      // programming error
      alert("ClusterForm_id not found");
   }
}

function shortcut_handler() {

   // Capture keystroke
   // If 'j' is pressed, submit prevForm to go to the previous image
   // If 'k' is pressed, submit nextForm to go to the next image
   
   document.onkeyup=function(e){
   
      // IE uses window.event
      if (!e) e = window.event;

      // IE has keyCode, Firefox has charCode

      try { code = e.charCode } catch (foo) {};
      try { code = e.keyCode } catch (foo) {};

     // alert("you pressed key " + code);

      if (code == 74) {
           prev();
           return false;
      }
      if (code == 75) {
           next();
           return false;
      }

   }
}


// Previous forecast hour image

function prev() {

    if (current_index > 0) {
       current_index--;
       showImage(current_index);
       if (current_index < 1) {
          document.getElementById("prev_id1").style.display = "none";
          document.getElementById("prev_id2").style.display = "none";
       }
       if (current_index < num_images) {
          document.getElementById("next_id1").style.display = "block";
          document.getElementById("next_id2").style.display = "block";
       }
    }
}

// Next forecast hour images

function next() {

    if (parseInt(current_index) + 1 < parseInt(num_images)) {
       current_index++;
       showImage(current_index);
       if (current_index >= num_images-1) {
          document.getElementById("next_id1").style.display = "none";
          document.getElementById("next_id2").style.display = "none";
       }
       if (current_index > 0) {
          document.getElementById("prev_id1").style.display = "block";
          document.getElementById("prev_id2").style.display = "block";
       }
    }
}

//----------------------------------------------------------------------------------
// showImage(img)
// Display the image of the forecast hour of index img, in the forecast hours array 
// for the current cycle (g_cycle)
//----------------------------------------------------------------------------------
function showImage(img) {

   if (cyclesFhrsArr[g_cycle][img]) {

      var fhr  = "" + cyclesFhrsArr[g_cycle][img]

      var image_path = imagepath_format1 + g_cycle + imagepath_format2;
      //Substitue '%' placeholder with current forecast hour
      image_path = image_path.replace("%",fhr);

      // if cluster number <> -1, substitute 2nd % with cluster
      if (cluster)
         image_path = image_path.replace("%",cluster);

      var index;
      var iLab=document.getElementById("path_id");
      var hLab=document.getElementById("fhr_display");

      // Set the src, alt, and title in the tag to the current image

      HAniS.newFilenames(image_path);

      // set the href and text in the link to the current image
      //
      if (iLab) {
         iLab.href = my_server + image_path;
         iLab.text = my_server + image_path;
         if (iLab.text == "")
            iLab.text="Missing";
      }

      // Set the label html to the forecast hour
      //
      if (hLab) {
         if (fhr.length == 5) {
            // HHH:MM
            hLab.innerHTML = fhr.substring(0,3) +  ":" + fhr.substring(3,5);
         }
         else {
            hLab.innerHTML = fhr;
         }
      }
   }
   else {
        alert("No forecast hour " + img + " for cycle " + g_cycle);
   }
}

//----------------------------------------------------------------------------------
// changeCycle
// Change to a new cycle.  Figure out the time change between the cycles using the
// Cycle Dates Array.  Add the time change to the current fhr to get a new forecast hour.  
// Then see if that forecast hour is available in the list of forecast hours for the new cycle.
//----------------------------------------------------------------------------------
function changeCycle(new_cycle, new_cycle_index) {
   var new_cycle_date =  cycleDatesArr[new_cycle_index];
   var current_cycle_date = cycleDatesArr[g_cycle_index];
   var time_change = (current_cycle_date - new_cycle_date)/convert_to_hour;
   if (use_mins == "yes") {
      time_change *= 100;
   }

   var current_cycle = g_cycle; 
   var new_cycle     = document.getElementById("cycle_sel").value;

   var current_fhr = g_fhr;
   var new_fhr     = Number(current_fhr) + time_change

   if (cyclesFhrsArr[new_cycle]) {
      image_new_cycle(new_fhr, new_cycle);
   }
   else {
      // Don't have them yet.  Go get fhrs for this cycle.
      var image_path = imagepath_format1 + new_cycle + imagepath_format2;
      fhrs_load_cycle(image_path, new_cycle, new_fhr);
      // This function will then call image_new_cycle()
   }
}

//----------------------------------------------------------------------------------
// PrevCycle
// Previous (older) cycle
// Calculation same as changeCycle()
//----------------------------------------------------------------------------------
function PrevCycle() {
   var cycle_idx = document.getElementById("cycle_sel").selectedIndex;
   var prev_cycle_idx = cycle_idx + 1;

   if (prev_cycle_idx < document.getElementById("cycle_sel").length) {
      // A previous cycle does exist. Figure out matching fhr.
      var current_cycle_date =  cycleDatesArr[cycle_idx];
      var prev_cycle_date    =  cycleDatesArr[prev_cycle_idx];
      var time_change = (current_cycle_date - prev_cycle_date)/convert_to_hour;

      if (use_mins == "yes") {
         time_change *= 100;
      }

      var current_cycle = document.getElementById("cycle_sel").value;
      var prev_cycle = document.getElementById("cycle_sel").options[prev_cycle_idx].value;

      var current_fhr  = cyclesFhrsArr[g_cycle][current_index];
      var new_fhr      = Number(current_fhr) + time_change;

      // Do we have the fhrs for this cycle?
      if (cyclesFhrsArr[prev_cycle]) {
         // yes
         image_new_cycle(new_fhr, prev_cycle);
      }
      else {
         // no - go get fhrs for this cycle
         var image_path = imagepath_format1 + prev_cycle + imagepath_format2;
         fhrs_load_cycle(image_path, prev_cycle, new_fhr);
      }
   }
} 

//----------------------------------------------------------------------------------
// NextCycle
// Next (newer) cycle
// Calculation same as changeCycle()
//----------------------------------------------------------------------------------
function NextCycle() {
   // Next cycle is the previous cycle in the dropdown
   var cycle_idx = document.getElementById("cycle_sel").selectedIndex;
   var next_cycle_idx = cycle_idx - 1;

   if (next_cycle_idx >= 0 ) {
      // A next cycle does exist. Figure out matching fhr.
      var current_cycle_date =  cycleDatesArr[cycle_idx];
      var prev_cycle_date    =  cycleDatesArr[next_cycle_idx];
      var time_change = (current_cycle_date - prev_cycle_date)/convert_to_hour;

      if (use_mins == "yes") {
         time_change *= 100;
      }

      var current_cycle = document.getElementById("cycle_sel").value;
      var next_cycle = document.getElementById("cycle_sel").options[next_cycle_idx].value;

      var current_fhr  = cyclesFhrsArr[g_cycle][current_index];
      var new_fhr      = Number(current_fhr) + time_change;

      // Do we have the fhrs for this cycle?
      if (cyclesFhrsArr[next_cycle]) {
         // yes
         image_new_cycle(new_fhr, next_cycle);
      }
      else {
         // no - go get fhrs for this cycle
         var image_path = imagepath_format1 + next_cycle + imagepath_format2;
         fhrs_load_cycle(image_path, next_cycle, new_fhr);
      }
   }
}

//----------------------------------------------------------------------------------
// image_new_cycle
// If new_fhr is found in the fhrs array for new_cycle.  If it is:
//   - set the cycles dropdown to the new cycle
//   - display the new image
//   - set global variables
// Else
//   - give alert that there is no fhr found in this cycle
//   - reset the cycles dropdown
//----------------------------------------------------------------------------------
function image_new_cycle(new_fhr, new_cycle) {

   var new_index = find_fhr_index(new_fhr, cyclesFhrsArr[new_cycle]);
   if (new_index >= 0) {
      // found
      g_cycle = new_cycle;
      g_fhr   = new_fhr;
      current_index = new_index;
      // Change the select dropdown.
      document.getElementById("cycle_sel").value = new_cycle;
      g_cycle_index = document.getElementById("cycle_sel").selectedIndex;
      showImage(new_index);
      num_images = cyclesFhrsArr[g_cycle].length;
   }
   else {
      alert("Not found for cycle " + new_cycle);
      // Reset cycle select dropdown
      document.getElementById("cycle_sel").value = g_cycle;
      g_cycle_index = document.getElementById("cycle_sel").selectedIndex;
   }
}

function make_all_unselected(classname) {
   var myNodeList = document.getElementsByClassName(classname);
   for (var i=0; i<myNodeList.length; i++) {
      myNodeList[i].classList.remove("selected_value");
   }
}

// Fetch parameter from the url line

function getURLParameter(name) {
   return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null
}

// Display the static URL of the image

function printStaticURL(img_name) {

   var staticURL = window.location.protocol + "//" + window.location.host + "/" +   img_name;
   var staticURLlink="<a href=" + staticURL + " target=\"_blank\" " + ">" + staticURL + "</a>";

   document.write(staticURLlink);
}


// Control the display of the parameter information area and close button
// If visible =="yes", capture and save the scroll
// position, make it visible, and scroll down to it.
// If visible =="no",  make it invisible and
// scroll back to the saved position.

function display_param_info(visible) {
      var ploc;
      var param_element = document.getElementById("param_info");
      var param_close_element = document.getElementById("p_info_close");

      if (visible=="no") {
         param_element.style.display = 'none';
         param_close_element.style.display = 'none';
         param_info_visible=false;
         window.scrollTo(save_scrollx, save_scrolly);
      } else {
         if (visible=="yes") {
            //Restore image size so it doesn't overflow param info text
            zoom('restore'); 
            // save the scroll position 
            save_scrolly = typeof window.pageYOffset != 'undefined' ? window.pageYOffset : document.documentElement.scrollTop;
            save_scrollx = typeof window.pageXOffset != 'undefined' ? window.pageXOffset : document.documentElement.scrollLeft;
            param_element.style.display = 'block';
            param_close_element.style.display = 'block';
            param_info_visible=true;
            ploc=findPos(param_close_element);
            window.scrollTo(ploc[0],ploc[1]);
         }
      }
}

function do_nothing() {
}
