// ajax.js
//
// Functions used when processing ajax calls
//
// Revision history:
// 2016-11 Kathy Moore - Original AJAX work.
// 2017-02 Kathy Moore - Replace magwhite class with selected_cell class during HTML-5 work.
// 2017-04 Kathy Moore - Add skip factor to time range loops
// 2017-04 Kathy Moore - Auto-refresh of forecast hours table.
// 2017-06 Kathy Moore - New Forecast Soundings model.
// 2017-09 Kathy Moore - New model: sref-clusters.
// 2018-01 Kathy Moore - fhrs_load_model(): don't reset g_fourpan for cycle change
// 2018-02 Kathy Moore - Use new function, highlightChosenCellId() instead of highlightChosenCell
//                       Remove resizing button for Safari since text is now more compact
//                       No longer using product button to close help box
// 2018-04 Kathy Moore - For sref-cluster model, change button name to "Product Info"
// 2019-09 Ada Lockleigh - Added call to fillLoop in fhrs_load_model.
// 2021-04 Kathy Moore - Tropical Javascript data load. Add fhrs_load_cycle()
// 2025-01 Jake Zappin - Minor Updates for In-line JavaScript remediation.

//-------------------------------------------------------------------------------
// Description of how the ajax code works:
//
// xhttp is an XMLHttpRequest object that is used to exchange data with a server behind the 
// scenes. It is used to pass data to the server, then it is used to provide response data
// back to the client.
//
// xhttp reports back the following readyStates:
//    0: request not initialized
//    1: server connection established
//    2: request received
//    3: processing request
//    4: request finished and response is ready
//
// xhttp reports back the following statuses (among many):
//    200: "OK"
//    403: "Forbidden"
//    404: "Not Found"
//
// Process flow:
// Set up the parameter, for MAG, a php call to construct a forecast hours table.
// Send out the request, xhttp.open (GET, parameter,true)  True means use
// asynchronous processing.  Then wait for a readyState of 4, and a status of 200.
// When readyState=4 and status=200, we have finished, and we have a response
// in xhttp.responseText.  Put the responseText into a reserved div using innerHTML.
// Call load_js_data(model) to look for specific IDs in the responseText.  The IDs
// are for hidden tags that contain data to load into Javascript variables.
//-------------------------------------------------------------------------------

// Global variables to keep track of

var g_param="";
var g_cycle="";
var g_fourpan=""
var g_group;
var g_model;
var g_area;
var g_storm;
var g_ps;
var g_fourpan;
var g_size;
var g_type;
var g_value;
var g_fhr;
var fhr_array  = [];
var fhr_array1 = [];
var fhr_array2 = [];
var fhr_array3 = [];
var fhr_array4 = [];

var cluster_list_1="";
var cluster_list_2="";
var cluster_list_3="";
var cluster_list_4="";
var cluster_list_5="";
var cluster_list_6="";

// Flag to help out fhrs_load_* functions:
//   0 : fhrs_load_*() has not yet been called by user clicking on param or cycle.
//  >0 : fhrs_load_*() has been called by user-generated click.
var fhrs_user_loaded  = 0;

// Flag to indicate whether or not all valid forecast hours were found.
//   0 : not all valid hours found.
//   1 : all valid hours were found.
var found_all_fhrs = 0;

// ID returned from setInterval().  Use to pass to clearInterval().
// If 0, then setInterval is not running.
var autorefresh_ID = 0;

// Number of milliseconds to set for setInterval().
// (Time between refresh of forecast hours table reload: seconds * 1000.)
var refresh_ms = 60000;  // one minute

//------------------------------------------------------------------------------
// set_global_cycle_param()
// Set global cycle and/or global param value.
// Input parameters may or may not have values.  If they have a value, then
// set the appropriate global variable.
//------------------------------------------------------------------------------
function set_global_cycle_param (cycle, param) {
   if (cycle.length > 0) {
      g_cycle = cycle;
      highlightChosenCellId('cycle', cycle);
   }
   if (param.length > 0) {
      g_param = param;
      highlightChosenCellId('params', param);
   }
}

//------------------------------------------------------------------------------
// fhrs_load_model
// Load the forecast hours table for Model Guidance.
//
// This function is called from:
// - Clicking on a param(product) link.
// - Clicking on a cycle link.
// - Auto-refresh.
//
// Parameters:
// - flag    : 0 = called by auto-refresh. 1 = called by user click on param|cycle link.
// - group   : group name (Model Guidance)
// - model   : model name (gfs, nam, sref, etc.)
// - area    : area name (namer, samer, africa, etc.)
// - ps      : last chosen selection (area | model). (Used on model-guidance-model-area_body.php)
// - fourpan : yes = four panel chart chosen. otherwise, single image.
// - size    : image size (S, M, L, or blank)
// - type    : 'params' if clicked on param link. 'cycle' if clicked on cycle link
// - value   : value of type ('precip_p01', '200_wnd_ht') | ('YYYYMMDD HH UTC')
//
// When called by user-click, reset the global values.
// When called by auto-refresh, use already set global values.
// Make ajax call to model-fhrs.php to build the forecast hours table.
// Log:
//   7/2018 Freeman - fhrs_load_model: Update for panels. panel-fhrs.php returns 
//                    both fhrs and cycles tables.  Split and load into appropriate divs.
//  11/2018 Freeman - In fhrs_load_model, if this is panels model and a new
//                    parameter is chosen, reset the loop_start and loop_end
//                    (time range fhrs will not necessarily translate to a new
//                    collection of models).
//------------------------------------------------------------------------------
//
function fhrs_load_model(flag, group, model, area, ps, fourpan, size, type, value, skip_num) {

   if (flag <= 0) {
      //Automatic refresh call
      //If this function has not been called before, return
      if (fhrs_user_loaded  <= 0)
         return;
   }
   else {
      //User click generated call
      //Set global values with new values
      g_group   = group;
      g_model   = model;
      g_area    = area;
      g_ps      = ps;
      g_size    = size;
      g_type    = type;
      g_value   = value;
      fhrs_user_loaded = 1;

      if (type && type.length > 0) {

         if (type == "params"){
            // Only change the fourpanel setting if this is a param change
            if ((fourpan == "yes") || (fourpan == "no")) {
               g_fourpan = fourpan;
               // If panels and a new param is chosen, reset fhr loop start/end
               if (g_model == "panels" && g_param != value ) {
                  loop_start=-1; loop_end=-1;
               }
            }
            g_param = value;
         }
         else if (type == "cycle") {
            g_cycle = value;
         }

         highlightChosenCellId(type, value);
      }
   }

   // Parameter needs a value before continuing
   if (g_param.length <= 0){
      return;
   }
   // If not panels, then cycle also needs a value
   if (g_model != 'panels') {
      if (g_cycle.length <= 0){
         return;
      }
   }

   // ajax code

   var xhttp;

   if (window.XMLHttpRequest) {
       xhttp = new XMLHttpRequest();
   }
   else {
       // IE5, IE6
       xhttp = new ActiveXObject("Microsoft.XMLHTTP");
   }
   xhttp.onreadystatechange = function() {

       if (this.readyState == 4 && this.status == 200) {

          if (g_model != 'panels') {

             // if not panels, the php code will return the fhrs table.
             // Load into fhrs_div 

              document.getElementById("fhrs_div").innerHTML = this.responseText;
              if (document.getElementById("more_info_div_id").style.display == "none")
                  document.getElementById("fhrs_div").style.display = "block";

          } else {
            // if panels, the php code returns the cycles panel and fhrs table
            // separated by ':||:'. Split and load into cycles_panel and fhrs_div

             var fhrsCyclesArray = this.responseText.split(":||:");
              document.getElementById("cycles_panel").innerHTML =  fhrsCyclesArray[0];
              document.getElementById("fhrs_div").innerHTML = fhrsCyclesArray[1]; 
              if (document.getElementById("more_info_div_id").style.display == "none")
                  document.getElementById("fhrs_div").style.display = "block";
          }
          load_js_data("model");
       }
   };

   if (g_model == "sref-cluster") {
      params="cluster-fhrs.php?group=Model Guidance&model="+g_model+
          "&area="+g_area+
          "&fourpan="+g_fourpan+
          "&imageSize="+g_size+
          "&preselected_formatted_cycle_date="+g_cycle+
          "&cycle="+g_cycle+"&param="+g_param+"&ps="+g_ps;
      if (g_fhr)
         params += "&fhr="+g_fhr;
   } else if (g_model == "panels") {
      params="panels-fhrs.php?group=Model Guidance&model="+g_model+"&fhr_mode="+fhr_mode+
          "&loop_start="+loop_start+"&loop_end="+loop_end+
          "&area="+g_area+"&skip_num="+skip_num+
          "&fourpan="+g_fourpan+
          "&imageSize="+g_size+
          "&preselected_formatted_cycle_date="+g_cycle+
          "&cycle="+g_cycle+"&param="+g_param+"&ps="+g_ps;
   } else {
      params="model-fhrs.php?group=Model Guidance&model="+g_model+"&fhr_mode="+fhr_mode+
          "&loop_start="+loop_start+"&loop_end="+loop_end+
          "&area="+g_area+"&skip_num="+skip_num+
          "&fourpan="+g_fourpan+
          "&imageSize="+g_size+
         "&preselected_formatted_cycle_date="+g_cycle+
          "&cycle="+g_cycle+"&param="+g_param+"&ps="+g_ps;
   }

   xhttp.open("GET", params, true);

   xhttp.send();

}
//------------------------------------------------------------------------------
// load_js_data(group)
//    Load data into javascript elements.
//    group:  "model" | "tropical" | "sounding" 
//
//    Look for a pre-determined id for array input strings:
//      <input id="fhr_arr_id" type="hidden"
//             value="num-1,num-2,num-3,...,num-n,">
//    Strip off possible trailing comma(s)
//    Split the string into an array, and assign values to fhr_array[]
//
//    Enable product information button
//    Show image size choices if applicable
//    Highlight start/end looping choices if applicable
//------------------------------------------------------------------------------
function load_js_data(group) {

   if (g_model == "sref-cluster") {

      cluster_list_1 = document.getElementById("cluster_data_1_id").value;
      cluster_list_2 = document.getElementById("cluster_data_2_id").value;
      cluster_list_3 = document.getElementById("cluster_data_3_id").value;
      cluster_list_4 = document.getElementById("cluster_data_4_id").value;
      cluster_list_5 = document.getElementById("cluster_data_5_id").value;
      cluster_list_6 = document.getElementById("cluster_data_6_id").value;

      var cluster_nums="";
      if (document.getElementById("current_cluster_nums_id")) {
         cluster_nums = document.getElementById("current_cluster_nums_id").value;
      }

      if (g_fhr && (cluster_nums != "")) {
         // A forecast hour was already selected &&
         // the cluster_nums list was passed back from cluster-fhrs.php
         populate_cluster_links(cluster_nums,g_fhr)
      }

      // Put "more info" text into the div
      if ((document.getElementById("more_info_text_div")) && (document.getElementById("more_info_text_id"))) {
        document.getElementById("more_info_text_div").innerHTML = 
        document.getElementById("more_info_text_id").value;
      }
      // Enable the Product Information button
      var id = document.getElementById("p_info_id");
      if (id) {
         id.innerHTML = "Product Info";
         id.title = "Information about the selected product";
         id.cursor = "Pointer";
      }
   }
   else if (group == "model") {
      var num_list;
      var id = document.getElementById("fhr_arr_id");
      if (id) {
         num_list = id.value;
         // Remove trailing comma
         while ((num_list.length > 0) && (num_list.substr(num_list.length-1,1) == ",")) {
            num_list = num_list.substr(0,num_list.length-1);
         }
         fhr_array = num_list.split(",");
      }

      id = document.getElementById("fhr_arr1_id");
      if (id) {
         num_list = id.value;
         // Remove trailing comma
         while ((num_list.length > 0) && (num_list.substr(num_list.length-1,1) == ",")) {
            num_list = num_list.substr(0,num_list.length-1);
         }
         fhr_array1 = num_list.split(",");
      }

      id = document.getElementById("fhr_arr2_id");
      if (id) {
         num_list = id.value;
         // Remove trailing comma
         while ((num_list.length > 0) && (num_list.substr(num_list.length-1,1) == ",")) {
            num_list = num_list.substr(0,num_list.length-1);
         }
         fhr_array2 = num_list.split(",");
      }

      id = document.getElementById("fhr_arr3_id");
      if (id) {
         num_list = id.value;
         // Remove trailing comma
         while ((num_list.length > 0) && (num_list.substr(num_list.length-1,1) == ",")) {
            num_list = num_list.substr(0,num_list.length-1);
         }
         fhr_array3 = num_list.split(",");
      }

      id = document.getElementById("fhr_arr4_id");
      if (id) {
         num_list = id.value;
         // Remove trailing comma
         while ((num_list.length > 0) && (num_list.substr(num_list.length-1,1) == ",")) {
            num_list = num_list.substr(0,num_list.length-1);
         }
         fhr_array4 = num_list.split(",");
      }

      //Once the forecast hours table is loaded, find and highlight the loop start and end links.
      findLinks(loop_start,loop_end);

      // Enable the Product Information button
      id = document.getElementById("p_info_id");
      if (id) {
         id.innerHTML = "Product Info";
         id.title = "Information about the selected product";
         id.cursor = "Pointer";
      }

      id2 = document.getElementById("fourpan_id");
      if (id2)
         g_fourpan = document.getElementById("fourpan_id").value;
      else
         g_fourpan="no";

      // Put "more info" text into the div
      if ((document.getElementById("more_info_text_div")) && (document.getElementById("more_info_text_id"))) {
        document.getElementById("more_info_text_div").innerHTML = 
        document.getElementById("more_info_text_id").value;
      }

   } // end of model js data

   else if (group == "sounding") {
      var num_list;
      var id = document.getElementById("fhr_arr_id");
      if (id) {
         num_list = id.value;
         // Remove trailing comma
         while ((num_list.length > 0) && (num_list.substr(num_list.length-1,1) == ",")) {
            num_list = num_list.substr(0,num_list.length-1);
         }
         fhr_array = num_list.split(",");
      }
      findLinks(loop_start,loop_end);
   }

   else if (group == "tropical") {
      // Tropical javascript data
      var id = document.getElementById("fhr_list_id");
      if (id) {
         fhr_array = id.value.split(",");
      }
   }

   if (document.getElementById("found_all_fhrs_id")) {
      if (document.getElementById("found_all_fhrs_id").value > 0)
         clearFhrsReload();      // Stop auto-refresh
      else
         setFhrsReload(group);   // Start auto-refresh
   }

   if (fhr_mode == "loop") {
      fillLoop();
   }
   
   if (fhr_mode == "image") {
      if (typeof(Storage) !== "undefined") {
         sessionStorage.setItem("user_update_loop", "0");
      }
   }


}

//------------------------------------------------------------------------------
// fhrs_load_tropical
// Load the forecast hours table for Tropical Guidance.
//
// This function is called from:
// -  Clicking on a param (product) link
// -  Clicking on a cycle link.  
// -  Auto-refresh.
//
// Parameters:
// - flag    : 0 = called by auto-refresh. 1 = called by user click on param|cycle link.
// - group   : group name (Model Guidance)
// - model   : model name (ghm-full, ghm-nester, hwrf-full, hwrf-nested)
// - storm   : storm name (seven07e, meari26w, etc.)
// - ps      : last chosen selection (area | model). (Used on tropical-guidance-model-storm_body.php)
//             for tropical, area actually means storm.
// - type    : 'params' if clicked on param link. 'cycle' if clicked on cycle link
// - value   : value of type ('precip_p06', '200_vort_ht') | ('YYYYMMDD HH UTC')
//
// When called by user-click, reset the global values.
// When called by auto-refresh, use already set global values.
// Make ajax call to tropical-fhrs.php to build the forecast hours table.
//------------------------------------------------------------------------------
function fhrs_load_tropical(flag, group, model, storm, ps, type, value) {

   if (flag <= 0) {
      //Automatic refresh call
      //If this function has not been called before, return
      if (fhrs_user_loaded  <= 0)
         return;
   }
   else {
      //User-click generated call
      //Set global values with new values
      g_group   = group;
      g_model   = model;
      g_storm   = storm;
      g_ps      = ps;
      fhrs_user_loaded = 1;

      if (type && type.length > 0) {
         if (type == "params"){
            g_param = value;
         }
         else if (type == "cycle") {
            g_cycle = value;
         }

         highlightChosenCellId(type, value);
      }
   }

   // Parameter and Cycle both need values before continuing
   if (g_param.length <=0 || g_cycle.length <= 0)
      return;

   // ajax code

   var xhttp;

   if (window.XMLHttpRequest) {
       xhttp = new XMLHttpRequest();
   }
   else {
       // IE5, IE6
       xhttp = new ActiveXObject("Microsoft.XMLHTTP");
   }
   xhttp.onreadystatechange = function() {
       if (this.readyState == 4 && this.status == 200) {

           //highlightChosenCell(g_param, g_cycle, type);
           document.getElementById("fhrs_div").innerHTML = this.responseText;

           load_js_data("tropical");
       }
   };
   params="tropical-fhrs.php?group=Tropical Guidance&model="+g_model+"&storm="+g_storm+"&cycle="+g_cycle+"&param="+g_param+"&ps="+g_ps;
   xhttp.open("GET", params, true);

   xhttp.send();

}

//------------------------------------------------------------------------------
// fhrs_load_sounding
// Load the forecast hours table for Forecast Sounding.
//
// This function is called from:
// -  Clicking on a param (product) link
// -  Clicking on a cycle link.  
// -  Auto-refresh.
//
// Parameters:
// - flag    : 0 = called by auto-refresh. 1 = called by user click on param|cycle link.
// - group   : group name (Sounding Guidance)
// - model   : model name ()
// - station : station name ()
// - tabch   : tab choice for soundings page (map or table)
// - ps      : last chosen selection (area | model). (Used on tropical-guidance-model-storm_body.php)
// - type    : 'params' if clicked on param link. 'cycle' if clicked on cycle link
// - value   : value of type ('precip_p06', '200_vort_ht') | ('YYYYMMDD HH UTC')
//
// When called by user-click, reset the global values.
// When called by auto-refresh, use already set global values.
// Make ajax call to tropical-fhrs.php to build the forecast hours table.
//------------------------------------------------------------------------------
function fhrs_load_sounding(flag, group, model, station, tabch, ps, type, value, skip_num) {

   if (flag <= 0) {
      //Automatic refresh call
      //If this function has not been called before, return
      if (fhrs_user_loaded  <= 0)
         return;
   }
   else {
      //User-click generated call
      //Set global values with new values
      g_group   = group;
      g_model   = model;
      g_station = station;
      g_tabch   = tabch;
      g_ps      = ps;
      fhrs_user_loaded = 1;

      if (type && type.length > 0) {
         if (type == "params"){
            g_param = value;
         }
         else if (type == "cycle") {
            g_cycle = value;
         }
         
         highlightChosenCellId(type, value);
      }
   }

   // Parameter and Cycle both need values before continuing
   if (g_param.length <=0 || g_cycle.length <= 0)
      return;

   // ajax code

   var xhttp;

   if (window.XMLHttpRequest) {
       xhttp = new XMLHttpRequest();
   }
   else {
       // IE5, IE6
       xhttp = new ActiveXObject("Microsoft.XMLHTTP");
   }
   xhttp.onreadystatechange = function() {
       if (this.readyState == 4 && this.status == 200) {

           //highlightChosenCell(g_param, g_cycle, type);

           //document.getElementById("fhrs_div").innerHTML = this.responseText;

           var parser = new DOMParser();
            var doc = parser.parseFromString(this.responseText, "text/html");

            // Remove all <script> tags
            doc.querySelectorAll("script").forEach(script => script.remove());

            // Remove event handler attributes to comply with CSP
            doc.querySelectorAll("*").forEach(el => {
               [...el.attributes].forEach(attr => {
                  if (attr.name.startsWith("on")) {
                        el.removeAttribute(attr.name);
                  }
               });
            });

            var targetElement = document.getElementById("fhrs_div");

            if (targetElement) {
               // Create a safe container for content
               var safeContainer = document.createElement("div");
               
               // Append only safe elements from the parsed document
               while (doc.body.firstChild) {
                  safeContainer.appendChild(doc.body.firstChild);
               }

               // Replace the content safely
               targetElement.replaceChildren(...safeContainer.childNodes);
            } else {
               console.error("Element #fhrs_div not found in the DOM.");
            }



           load_js_data("sounding");
       }
   };

   params="sounding-fhrs.php?group=Forecast Soundings&model="+g_model+"&fhr_mode="+fhr_mode+
           "&loop_start="+loop_start+"&loop_end="+loop_end+"&skip_num="+skip_num+
           "&station="+g_station+"&tabch="+g_tabch+"&cycle="+g_cycle+"&param="+g_param+"&ps="+g_ps;
   xhttp.open("GET", params, true);

   xhttp.send();

}

//------------------------------------------------------------------------------
// Highlight the text of a cycle or parameter cell.
// - type: 'cycle' or 'params'
// - value: value of the cell to look for to highlight
//------------------------------------------------------------------------------
function highlightChosenCell(type, value) {

   var chosen;
   var table = document.getElementById(type);

  // clear the Parameter cell font color to normal
  clearEntireCell(type);

  // get cell object document
  var as = table.getElementsByTagName('a');

  // as.length is the total number of all cells
  // remove white font status from the one not chosen
  for (var m=0; m<as.length; m++) {
    removeClassName(as[m], 'selected_cell');
  }

  if (type == "cycle") {
     // add the class 'on' to the selected td
     chosen = value.replace(/ /g, "");

     // set the cycle in the form to be posted that displays the image
     var cni = document.getElementById("cycle_name_id");
     if (cni) cni.value = chosen;
  }
  else {
     chosen = value;
  }

  // Set selected cell font color to selected_cell
  var newas = getElementsByClassName(chosen, 'a', table);
  for (var i=0; i<newas.length; i++) {
    addClassName(newas[i], 'selected_cell');
  }

}

//------------------------------------------------------------------------------
// setFhrsReload(group)
// Turn on auto-refresh by calling setInterval().  
// group:  "model" | "tropical"
//
// setInterval takes the following parameters:
// - a function to call: fhrs_load_model() | fhrs_load_tropical()
// - the time interval between calls, in milliseconds, set in variable: refresh_ms
//
// The function will be called every refresh_ms number of milliseconds until
// clearInterval() is called, or the web page is exited.
//
// setInterval returns an ID value, which is later passed to clearInterval to stop
// the repeated calling of the function.
// This ID value is stored in the global variable, autorefresh_ID.
// We don't want to call setInterval over and over, so only call it if autorefresh_ID
// has not been set, i.e., it is zero.
//------------------------------------------------------------------------------
function setFhrsReload(group) {
   // Only call setInterval if it is not currently running
   if (autorefresh_ID <= 0) {
      if (group == "model") {
         autorefresh_ID = setInterval(function(){ fhrs_load_model('0', '', '', '', '', '', '', '', '') }, refresh_ms);
      }
      else if (group == "tropical") {
         autorefresh_ID = setInterval(function(){ fhrs_load_tropical('0', '', '', '', '', '', '') }, refresh_ms);
      }
   }
}

//------------------------------------------------------------------------------
// Turn off auto-refresh by calling clearInterval().
// The global variable, autorefresh_ID will be > 0 if setInterval is running.
// Therefore only call clearInterval if autorefresh_ID > 0.
//------------------------------------------------------------------------------
function clearFhrsReload() {
   // If setInterval is currently running, clear it and set the ID back to 0
   if (autorefresh_ID > 0) {
      clearInterval(autorefresh_ID);
      autorefresh_ID = 0;
   }
}

//------------------------------------------------------------------------------
// fhrs_load_cycle
// - impagepath: directory path + filename pattern
//   example: data/gfs/12/namer/precip_p03/gfs_namer_%_precip_p03.gif
// - new_cycle: index into array: cyclesFhrsArr[new_cycle]
// - new_fhr: new forecast hour we want to display
// 
// Make ajax call to cycle-fhrs.php, passing imagepath.  php program will
// look in the directory (data/gfs/12/namer/precip_p03) for files matching
// the filename (gfs_namer_*_precip_p03.gif.  * gets replaced by forecast
// hour numbers.  php program returns string of forecast hours separated
// by [space or comma].
//
// Add the list of cycles to the array 
//------------------------------------------------------------------------------
function fhrs_load_cycle(imagepath, new_cycle, new_fhr) {
   
   // ajax code

   var xhttp;

   if (window.XMLHttpRequest) {
       xhttp = new XMLHttpRequest();
   }
   else {
       // IE5, IE6
       xhttp = new ActiveXObject("Microsoft.XMLHTTP");
   }

   xhttp.onreadystatechange = function() {

      if (this.readyState == 4 && this.status == 200) {
         // Add Forecast Hours to cycles-fhrs array
         cyclesFhrsArr[new_cycle] = this.responseText.split(",");

         // Load the new image based on new cycle and fhr
         image_new_cycle(new_fhr, new_cycle);
      }
   };

   var params="cycle-fhrs.php?imagePath="+imagepath;
   xhttp.open("GET", params, true);

   xhttp.send();
}
