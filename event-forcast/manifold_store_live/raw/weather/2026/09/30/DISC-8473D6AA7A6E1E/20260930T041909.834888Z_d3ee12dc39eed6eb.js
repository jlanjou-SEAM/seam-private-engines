//------------------------------------------------------------------------
// nomads.js
// 
// 2020-03  Kathy Moore  Initial version
// 2020-09  Kathy Moore  Check and alter longitudes < 0. For Show URL, 
//                       only include lat/lon if make subregion is checked.
// 2020-10  Kathy Moore  Extra area choice introduced with blend dataset.
// 2021-02  Kathy Moore  New wfo directory: ds.yyyymmdd/wfo
// 2021-03  Kathy Moore  Add change_latlon()
// 2021-10  Kathy Moore  Add encodeURIComponent()
// 2022-01  Kathy Moore  More generic configuration
// 2022-11  Kathy Moore  Add uncheck_all_checkbox() 
//                       Call from check_all(), check_all_highlighted()
//------------------------------------------------------------------------

// Global variables

// Data from config file
var g_ds = "";         // Dataset (config file)

var divider = ":||:";
var subdivider = ":##:";

//------------------------------------------------------------
// set_breadcrumb
//------------------------------------------------------------
function set_breadcrumb() {
   var breadcrumb="";
   for (var i=0; i < subdirsArr.length; i++) {
      breadcrumb += "/" + subdirsArr[i];
   }
   if (document.getElementById("id_breadcrumb"))
       document.getElementById("id_breadcrumb").innerHTML = breadcrumb;
}

//------------------------------------------------------------
// make_all_unselected(classname)
// Remove the selected class from all objects with class 
// classname. (unselects all dataset or subdir links)
// - classname: datasets | subdir
// Called from click_dir() or click_cycle().
//------------------------------------------------------------
function make_all_unselected(classname) {
   var myNodeList = document.getElementsByClassName(classname);
   for (var i=0; i<myNodeList.length; i++) {
      myNodeList[i].classList.remove("selected");
   }
}

//------------------------------------------------------------
// make_all_unhighlighted(classname)
// Remove the highlighted class from all objects with class 
// classname. (unhighlights all parameter or level names)
// - classname: vars | levels
// Called from:
// - show_levels_for_var()
// - show_vars_for_level()
// - reset_form()
//------------------------------------------------------------
function make_all_unhighlighted(classname) {
   var myNodeList = document.getElementsByClassName(classname);
   for (var i=0; i<myNodeList.length; i++) {
      myNodeList[i].classList.remove("highlighted");
   }
}

//------------------------------------------------------------
// uncheck_all_checkbox(category)
// Uncheck the checkbox named "all" for variables or levels
//   category = var | lev
//------------------------------------------------------------
function uncheck_all_checkbox (category) {
   if ((category == "var") || (category == "lev")) {
      id = "all_" + category + "_chk";
      if (document.getElementById(id)) {
          document.getElementById(id).checked = false;
      }
   }
   // else do nothing
}

//------------------------------------------------------------
// check_all_highlighted(classname)
// User activated from clicking on "Check Highlighted" button.
// For every name that is highlighted, check its checkbox.
// - classname: vars | levels
//------------------------------------------------------------
function check_all_highlighted(classname) {
   var myNodeList = document.getElementsByClassName(classname);
   var found=false;
   for (var i=0; i<myNodeList.length; i++) {
      if (myNodeList[i].classList.contains("highlighted")) {
         document.getElementById("cb_"+myNodeList[i].id).checked = true;
         found=true;
      }
   }
   if (found) {
      // Uncheck the all checkbox
      if (classname == "vars") {
         uncheck_all_checkbox ("var");
      }
      else if (classname == "levels") {
         uncheck_all_checkbox ("lev");
      }
   }

}

//------------------------------------------------------------
// check_all(classname)
// User activated from clicking on "Check All" button.
// - classname: cb_vars | cb_levels
//------------------------------------------------------------
function check_all(classname) {
   var myNodeList = document.getElementsByClassName(classname);
   for (var i=0; i<myNodeList.length; i++) {
      document.getElementById(myNodeList[i].id).checked = true;
  }
  // Uncheck the all checkbox
  if (classname == "cb_vars") {
     uncheck_all_checkbox ("var");
  }
  else if (classname == "cb_levels") {
     uncheck_all_checkbox ("lev");
  }
}

//------------------------------------------------------------
// uncheck_all(classname)
// User activated from clicking on "Uncheck All" button.
// - classname: cb_vars | cb_levels
//------------------------------------------------------------
function uncheck_all(classname) {
   var myNodeList = document.getElementsByClassName(classname);
   for (var i=0; i<myNodeList.length; i++) {
      document.getElementById(myNodeList[i].id).checked = false;
  }
}

//------------------------------------------------------------
// show_levels_for_var(myVar)
// User activated from clicking on a variable (parameter).
// Given MyVar, find all levels that myVar is paired with in
// the var_lev array.  Highlight both myVar and all found levels.
//------------------------------------------------------------
function show_levels_for_var(myVar) {
   make_all_unhighlighted("vars");
   id = document.getElementById("var_"+myVar);
   id.classList.add("highlighted");

   make_all_unhighlighted("levels");
   for (var i=0; i<var_lev.length; ++i) {
      if (var_lev[i][0] == myVar) {
         id = document.getElementById("lev_"+var_lev[i][1]);
         if (id) {
            id.classList.add("highlighted");
         }
      }
   }
}

//------------------------------------------------------------
// show_vars_for_level(myLevel)
// User activated from clicking on a level.
// Give myLevel, find all variables that myLevel is paried with
// in the var_lev array.  Highlight both myLevel and all found
// variables (parameters).
//------------------------------------------------------------
function show_vars_for_level(myLevel) {
   make_all_unhighlighted("levels");
   id = document.getElementById("lev_"+myLevel);
   id.classList.add("highlighted");

   make_all_unhighlighted("vars");
   for (var i=0; i<var_lev.length; ++i) {
      if (var_lev[i][1] == myLevel) {
         id = document.getElementById("var_"+var_lev[i][0]);
         if (id) {
            id.classList.add("highlighted");
         }
      }
   }
}

//------------------------------------------------------------
// validate_form(form_id)
// - form_id: id of form
// Called when user clicks "Start download" button.
// Make files were found and selected.
// Make sure value for dir_id and file_id are not null
// If all OK, submit the form.
//------------------------------------------------------------
function validate_form(form_id) {
   // Check for the file selector
   if (document.getElementById("file_selector") == null) {
      alert("No files for this date.  Please select another date.");
      return;
   }

   // Make sure the form exists, and that inputs dir and file are filled in
   var form = document.getElementById(form_id);
   if (form) {
      if ((form.elements["dir"] == null) || (form.elements["dir"].value == "")) {
         alert("No directory chosen");
         return;
      }
      if ((form.elements["file"] == null) || (form.elements["file"].value == "")) {
         alert("No file name chosen");
         return;
      }

      //See if the "make subregion" checkbox is checked.
      //If it is, do lat/lon checks
      if (form.elements["subregion"].checked) {

         if (!adjust_longitudes(form)) {
            // Failed validation
            return;
         }
         if (!check_latitudes(form)) {
            // Failed validation
            return;
         }

      }

      form.submit();
   }
}

//------------------------------------------------------------
// Check longitude values.  We allow input of -180 to 180
// or 0 to 360.
//
// User input fields are id=leftlon_id and id=rightlon_id.

// If there is a need to alter the lat/lon values in the form,
// following is how to do it:

//   leftlon = leftlon.toFixed(2);
//   rightlon = rightlon.toFixed(2);
//   form.elements["leftlon"].value = leftlon;
//   form.elements["rightlon"].value = rightlon;
//------------------------------------------------------------
function adjust_longitudes(form) {

   var leftlon  = Number(document.getElementById("leftlon_id").value);
   var rightlon = Number(document.getElementById("rightlon_id").value);

   if (rightlon < leftlon) {
      rightlon += 360;
      rightlon = rightlon.toFixed(2);
      form.elements["rightlon"].value = rightlon;
   }

   if (rightlon - leftlon > 360) {
      alert("longitude range is greater than 360 degrees");
      return false;
   }

   return true;
}
//------------------------------------------------------------
// Make sure toplat (North) is > bottomlat (South)
//------------------------------------------------------------
function check_latitudes(form) {

   var toplat    = Number(form.elements["toplat"].value);
   var bottomlat = Number(form.elements["bottomlat"].value);

   if (toplat < bottomlat) {
      alert("Top latitude (North) must be greater than bottom latitude (South)");
      return false;
   }
   return true;
}

//------------------------------------------------------------
// reset_form(form_id)
// - form_id: id of form
// Called when user clicks the Reset button.  Do a form reset,
// plus clear all the highlighting, and the showurl textbox.
//------------------------------------------------------------
function reset_form(form_id) {
   id = document.getElementById(form_id);
   if (id) {
      make_all_unhighlighted("levels");
      make_all_unhighlighted("vars");
      id.reset();
   }
   if (document.getElementById("showurl_id"))
      document.getElementById("showurl_id").value = "";
}

//------------------------------------------------------------
// click_subdir(subdir_num, dir, obj)
// - subdir_num: nth subdirectory configured (0-?)
// - name:       directory name of the selected subdirectory
// - obj:        object that was clicked on (for changing the color)
// Called when user clicks on a subdirectory link
// Make ajax call to
// - Retrieve subdirectories for this directory
// - Retrieve files from subdirectory
//------------------------------------------------------------
function click_subdir(subdir_num, name, obj) {
   if (!(obj.type)) {
      // If not radio or select
      make_all_unselected("subdir_"+subdir_num);
      obj.classList.add ("selected");
   }

   subdirsArr[subdir_num] = name;

   // Ajax call to search the file system for subdirectories and files
   retrieve_subdirs_and_files(subdir_num, name);
}

//------------------------------------------------------------
// change_latlon
// When a user changes the value of any latitude or longitude
// text box, automatically check the "make subregion" checkbox
// so that it will be included in the ShowURL or Download File
// data.
//------------------------------------------------------------
function change_latlon () {
   if (document.getElementById("subregion_checkbox"))
       document.getElementById("subregion_checkbox").checked = true;
}

//------------------------------------------------------------
// setFile(filename)
// User activated by selecting file from select dropdown.
// Put the file name into the form
//------------------------------------------------------------
function setFile(filename) {
   if (document.getElementById("file_id"))
      document.getElementById("file_id").value = filename;
}

//-------------------------------------------------------------------------------
// ajax section
// Description of how the ajax code works:
//
// xhttp is an XMLHttpRequest object that is used to exchange data with a server
// behind the scenes. It is used to pass data to the server, then it is used to
// provide response data back to the client.
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
// - Set up the parameter, a php call to get something from the file system.
// - Send out the request:   xhttp.open (GET, parameter,true)
//   true means use asynchronous processing.
// - Wait for a readyState of 4, and a status of 200.
// - When readyState==4 and status==200, we have finished,
//   and we have a response in xhttp.responseText.  
// - Do something with the data in xhttp.responseText.
//-------------------------------------------------------------------------------

function retrieve_subdirs_and_files(subdir_num, name) {
   // Figure out the path
   path = "";
   for (var i=0; i<subdir_num; i++) {
      path += "/" + subdirsArr[i];
   }

   //param="http://nomadsdev-1.ncep.noaa.gov/find_subdirs_files.php?ds="
   param="/find_subdirs_files.php?ds=" + g_ds
          + "&path=" + path
          + "&subdir_num=" + subdir_num
          + "&subdir_name=" + name;

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
          var responseArr = this.responseText.split(divider);
          var i=0;
          while (i < responseArr.length) {
             var subresponseArr = responseArr[i].split(subdivider);
             var type     = subresponseArr[0].trim();
             if (type == "ERROR") {
                if (subresponseArr.length > 0)
                   alert(subresponseArr[1].trim());
                else
                   alert("Unknown error");
                return;
             }
             var num      = subresponseArr[1].trim();
             var choice   = subresponseArr[2].trim();
             var div_fill = subresponseArr[3].trim();
             var div_id;
             var filename = "";


             if (type == "SUBDIR") {
                div_id = "div_subdir_" + num;
                subdirsArr[num] = choice;
             }
             else if (type == "FILES") {
                div_id = "div_files";
                setFile('"' + choice + '"');
                filename = choice;
             }

             if (document.getElementById(div_id)) {
                document.getElementById(div_id).innerHTML = div_fill;
             }
             else {
                alert(div_id + " id not found");
             }
             ++i;
          }
          var dir = "";
          for (i=0; i<subdirsArr.length; ++i) {
             dir += "/" + subdirsArr[i];
          }
          if (document.getElementById("dir_id"))
              document.getElementById("dir_id").value = dir;

          if (document.getElementById("file_id"))
              document.getElementById("file_id").value = filename;
          set_breadcrumb();
       }
   }
   xhttp.open("GET", param, true);
   xhttp.send();
}

//-------------------------------------------------------------------------------
// retrieve_ds_descr_file(filename)
// Called when user clicks on Dataset Description link on the home page
// (column 1 of the table).
// Ajax call to go get the file and put it into the modal box area.
//-------------------------------------------------------------------------------
function retrieve_ds_descr_file(filename) {
   param="get_ds_descr.php?file=" + filename + "_txt.html";

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
         if (document.getElementById("ds_descr_txt")) {
             document.getElementById("ds_descr_txt").innerHTML = this.responseText;
             openModalBox('ds_descr_id');
         }
      }
   }

   xhttp.open("GET", param, true);
   xhttp.send();
}

//-------------------------------------------------------------------------------
// showUrl(server)
// - web server this code is running on.
// Called when a user click on the "Show URL" button.
// Clear the textbox.
// Make sure a file name has been selected.
// Gather all of the form name/value pairs, and create a URL that is the same
// result as what would happen when the form was posted via the Start download click.
//
// Use the function encodeURIComponent()to encode all except:
//    A-Z a-z 0-9 - _ . ! ~ * ' ( )
// This developer found the only character that really needed encoding to be:
//    =
//    (If the item name contains an "=" character change to html code "%3D")
//-------------------------------------------------------------------------------
function showUrl(server) {
   var url=server;
   var divider="?";
   var temp="";
   var form     = document.getElementById("form_id");
   var elements = document.getElementById("form_id").elements;
   var url_box  = document.getElementById("showurl_id");

   if ((elements == null) ||  (url_box == null)) {
      alert("No form or url textarea found");
      return;
   }

   // Dir
   var dir = "";
   for (i=0; i < subdirsArr.length; ++i)
      dir += "/" + subdirsArr[i];

   //See if the "make subregion" checkbox is checked.
   //If it is, do lat/lon checks
   if (form.elements["subregion"].checked) {

      if (!adjust_longitudes(form)) {
         // Failed validation
         return;
      }
      if (!check_latitudes(form)) {
         // Failed validation
         return;
      }
   }

   url_box.value = "";

   if (document.getElementById("file_selector") == null) {
      alert("No files for this date.  Please select another date.");
      return;
   }

   for(var i = 0 ; i < elements.length ; i++){
       var item = elements.item(i);
       if (item.type == "submit" || item.type == "reset" || item.type == "button" || item.name == "") {
         //skip
       }
       else if (item.name == "leftlon" || item.name == "rightlon" ||
                item.name == "toplat"  || item.name == "bottomlat") {
          // Only add lat,lon if "make subregion" is checked
          if (form.elements["subregion"].checked) {
             url += divider + item.name + "=" + item.value;
             divider="&";
          }
       }
       else if (item.type == "checkbox") {
          if (item.checked) {
             temp = "" + item.name;
             //temp = temp.replace(/=/g, "%3D");
             temp = encodeURIComponent(temp);
             url += divider + temp + "=" + item.value;
             divider="&";
          }
       }
       else {
          url += divider + item.name + "=" + encodeURIComponent(item.value);
          divider="&";
       }
   }

   url_box.value = url;
}

//-------------------------------------------------------------------------------
// copyUrl(item_id)
// - item_id: page id from which to copy text
// Copy text from item_id to the local clipboard.
//-------------------------------------------------------------------------------
function copyUrl(item_id) {
   if (document.getElementById(item_id)) {
       document.getElementById(item_id).select();
       document.execCommand("copy");
   }
}

//-------------------------------------------------------------------------------
// Modal boxes for help display
//-------------------------------------------------------------------------------

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

