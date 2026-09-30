<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="DC.title" content="Model Guidance: Areas and Models">
<meta name="DC.description" content="Displays Model Guidance Areas and Model Types for a user to choose from">
<meta name="DC.creator" content="DOC/NOAA/NWS/NCEP Central Operations">
<meta name="DC.publisher" content="NOAA's National Weather Service">
<meta name="DC.contributor" content="NOAA/NWS/Software Development Branch">
<meta name="DC.rights" content="http://www.weather.gov/disclaimer.php">
<meta name="DC.robot" content="index,follow">
<meta name="DC.Distribution" content="Global">
<meta name="DC.date.created" content="2017-12-29">
<meta name="DC.date.reviewed" content="2018-01-15">
<meta name="DC.language" content="en-us">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Model Guidance: Areas and Models</title>
<link rel="stylesheet" href="/bundles/noaatemplating/css/weather.css?MAGv7.0.0">
<link rel="stylesheet" href="/css/main.css?MAGv7.0.0">
<link rel="stylesheet" href="/bundles/noaatemplating/css/com/header.css?MAGv7.0.0">
<link rel="stylesheet" href="/bundles/noaatemplating/css/com/navbar.css?MAGv7.0.0">
<link rel="stylesheet" href="/bundles/noaatemplating/css/com/footer.css?MAGv7.0.0">
<link rel="stylesheet" href="/css/mag_styles.css?MAGv7.0.0">
<script src="/bundles/noaatemplating/cdn/js/jquery.3.7.1.min.js?MAGv7.0.0"></script><script src="/js/image_scripts.js?MAGv7.0.0"></script>
<script src="/js/mag_scripts.js?MAGv7.0.0"></script>
<script src="/js/ajax.js?MAGv7.0.0"></script>
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-G1F0K33KY9"></script>
<script async src="js/google-analytics-setup.js"></script>
</head><body><main id="main"><header id="header" class="row">
   <a href="http://www.noaa.gov" id="header-noaa">
       <img src="/bundles/noaatemplating/images/header_noaa.png" 
            alt="National Oceanic and Atmospheric Administration">
   </a>
   <a href="https://www.weather.gov" id="header-nws">
       <img src="/bundles/noaatemplating/images/header_nws.png" 
            alt="National Weather Service">
   </a>
   <a href="http://www.commerce.gov" id="header-doc">
       <img src="/bundles/noaatemplating/images/header_doc.png" 
            alt="United States Department of Commerce">
   </a>
   <div style="clear:both"></div>
</header>

<div class="header-shadow">
  <div class="header-shadow-content"></div>
</div>
<nav id="topnav" class="nav navbar-top">
   <div id="m-menu" class="m-navbar">
      <button type="button" class="navbar-toggle">
         <span class="icon-bar"></span>
         <span class="icon-bar"></span>
         <span class="icon-bar"></span>
      </button>
   </div>
   <div id="menu" class="navbar">

      <ul class="nav-menu">
         <!--
         Doesn't work with the class.
         <li><a class="nav-menu-link" href="/">Home</a></li>
         -->
         <li><a class="" href="/">HOME</a></li>

         <li class="dropdown">
            <a class="nav-menu-link" href="https://www.weather.gov/forecastmaps">Forecast<span class="chevron"></span></a>
               <ul class="dropdown-menu" role="menu">
                  <li><a class="dropdown-link" href="https://www.weather.gov">Local</a></li>
                  <li><a class="dropdown-link" href="https://digital.weather.gov">Graphical</a></li>
                  <li><a class="dropdown-link" href="https://www.aviationweather.gov/">Aviation</a></li>
                  <li><a class="dropdown-link" href="https://www.weather.gov/marine">Marine</a></li>
                  <li><a class="dropdown-link" href="https://water.weather.gov/ahps/">Rivers and Lakes</a></li>
                  <li><a class="dropdown-link" href="https://www.nhc.noaa.gov/">Hurricanes</a></li>
                  <li><a class="dropdown-link" href="https://www.spc.noaa.gov/">Severe Weather</a></li>
                  <li><a class="dropdown-link" href="https://www.weather.gov/fire">Fire Weather</a></li>
                  <li><a class="dropdown-link" href="https://www.swpc.noaa.gov/">Space Weather</a></li>
                  <li><a class="dropdown-link" href="https://gml.noaa.gov/grad/solcalc/sunrise.html">Sun/Moon</a></li>
                  <li><a class="dropdown-link" href="https://www.cpc.ncep.noaa.gov/">Long Range Forecasts</a></li>
                  <li><a class="dropdown-link" href="https://www.cpc.ncep.noaa.gov">Climate Prediction</a></li>
               </ul>
         </li>

         <li class="dropdown">
            <a class="nav-menu-link" href="https://www.nws.noaa.gov/climate">Past&nbsp;Weather<span class="chevron"></span></a>
            <ul class="dropdown-menu" role="menu">
               <li><a href="https://w2.weather.gov/climate">Past Weather</a></li>
               <li><a href="https://w2.weather.gov/climate">Heating/Cooling Days</a></li>
               <li><a href="https://w2.weather.gov/climate">Monthly Temperatures</a></li>
               <li><a href="https://w2.weather.gov/climate">Records</a></li>
               <li><a href="https://www.usno.navy.mil">Astronomical Data</a></li>
            </ul>
         </li>

         <li class="dropdown">
            <a class="nav-menu-link" href="https://www.weather.gov/safety">Safety<span class="chevron"></span></a>
            <ul class="dropdown-menu" role="menu">
               <li><a href="https://www.weather.gov/safety/flood">Floods</a></li>
               <li><a href="https://www.nws.noaa.gov/om/Tsunami/index.html">Tsunami</a></li>
               <li><a href="https://www.weather.gov/safety/beachhazards">Beach Hazards</a></li>
               <li><a href="https://www.nws.noaa.gov/om/fire/">Wildfire</a></li>
               <li><a href="https://www.weather.gov/safety/cold">Cold</a></li>
               <li><a href="https://www.weather.gov/safety/tornado/">Tornadoes</a></li>
               <li><a href="https://www.weather.gov/safety/fog/">Fog</a>
               <li><a href="https://www.weather.gov/safety/airquality/">Air Quality</a></li>
               <li><a href="https://www.weather.gov/safety/heat">Heat</a></li>
               <li><a href="https://www.weather.gov/safety/hurricane">Hurricanes</a></li>
               <li><a href="https://www.weather.gov/safety/lightning">Lightning</a></li>
               <li><a href="https://www.weather.gov/safety/safeboating/">Safe Boating</a></li>
               <li><a href="https://www.weather.gov/safety/ripcurrent">Rip Currents</a></li>
               <li><a href="https://www.weather.gov/safety/thunderstorm/">Thunderstorms</a></li>
               <li><a href="https://www.weather.gov/safety/space">Space Weather</a></li>
               <li><a href="https://www.weather.gov/safety/heat-uv">Sun (Ultraviolet Radiation)</a></li>
               <li><a href="https://www.weather.gov/safetycampaign">Safety Campaigns</a></li>
               <li><a href="https://www.weather.gov/safety/wind">Wind</a></li>
               <li><a href="https://www.weather.gov/safety/drought/">Drought</a></li>
               <li><a href="https://www.weather.gov/safety/winter">Winter Weather</a></li>
            </ul>
         </li>

         <li class="dropdown">
            <a class="nav-menu-link" href="https://www.weather.gov/informationcenter">Information<span class="chevron"></span></a>
            <ul class="dropdown-menu" role="menu">
               <li><a href="https://www.weather.gov/wrn/wea">Wireless Emergency Alerts</a></li>
               <li><a href="https://www.weather.gov/owlie/publication_brochures">Brochures</a></li>
               <li><a href="https://www.weather.gov/wrn/">Weather-Ready Nation</a></li>
               <li><a href="https://www.nws.noaa.gov/om/coop/">Cooperative Observers</a></li>
               <li><a href="https://www.weather.gov/briefing/">Daily Briefing</a></li>
               <li><a href="https://www.nws.noaa.gov/om/hazstats.shtml">Damage/Fatality/Injury Statistics</a></li>
               <li><a href="https://mag.ncep.noaa.gov/">Forecast Models</a></li>
               <li><a href="https://www.weather.gov/gis">GIS Data Portal</a></li>
               <li><a href="https://www.nws.noaa.gov/nwr/">NOAA Weather Radio</a></li>
               <li><a href="https://www.weather.gov/publications">Publications</a></li>
               <li><a href="https://www.weather.gov/skywarn/">SKYWARN Storm Spotters</a></li>
               <li><a href="https://www.weather.gov/stormready/">StormReady</a></li>
               <li><a href="https://www.weather.gov/TsunamiReady">TsunamiReady</a></li>
               <li><a href="https://www.weather.gov/notification">Service Change Notices</a></li>
            </ul>
         </li>

         <li class="dropdown">
            <a class="nav-menu-link" href="https://www.weather.gov/owlie">Education<span class="chevron"></span></a>
            <ul class="dropdown-menu" role="menu">
               <li><a href="https://www.weather.gov/wrn/force">Be A Force of Nature</a></li>
               <li><a href="https://www.weather.gov/education">NWS Education Home</a></li>
            </ul>
         </li>

         <li class="dropdown">
            <a class="nav-menu-link" href="https://www.weather.gov/contact-media/">News<span class="chevron"></span></a>
            <ul class="dropdown-menu" role="menu">
               <li><a class="dropdown-link" href="https://www.weather.gov/news">NWS News</a></li>
               <li><a href="https://www.weather.gov/wrn/calendar">Events</a></li>
               <li><a href="https://www.weather.gov/socialmedia">Social Media</a></li>
               <li><a href="https://www.weather.gov/owlie/publication_brochures">Pubs/Brochures/Booklets </a></li>
               <li><a href="https://www.noaa.gov/NOAA-Communications">NWS Media Contacts</a></li>
            </ul>
         </li>

         <li class="dropdown">
            <a class="nav-menu-link site-search" href="https://www.weather.gov/search">Search<span class="chevron"></span></a>
            <ul class="dropdown-menu" role="menu" id="menu-search">
               <li>
                  <div id="site-search" class="">
                     <form method="get" action="//search.usa.gov/search">
                        <input type="hidden" name="v:project" value="firstgov">
                        <label for="query">Search For</label>
                        <input type="text" name="query" id="query" size="12">
                        <input type="submit" id="search-submit" value="Go">
                        <p>
                           <input type="radio" name="affiliate" checked="checked" value="nws.noaa.gov" id="nws">
                           <label for="nws" id="search-nws-label" class="search-scope">NWS</label>
                           <input type="radio" name="affiliate" value="noaa.gov" id="noaa">
                           <label for="noaa" id="search-noaa-label" class="search-scope">All NOAA</label>
                        </p>
                     </form>
                  </div>
               </li>
            </ul>
         </li>

         <li class="dropdown">
            <a class="nav-menu-link" href="https://www.weather.gov/about">About<span class="chevron"></span></a>
            <ul class="dropdown-menu" role="menu" id="menu-about">
               <li><a href="https://www.weather.gov/about">About NWS</a></li>
               <li><a href="https://www.weather.gov/organization">Organization</a></li>
               <li><a href="https://www.weather.gov/media/wrn/NWS_Weather-Ready-Nation_Strategic_Plan_2019-2022.pdf">Strategic Plan</a></li>
               <li><a href="https://www.weather.gov/careers/#diversity">Commitment to Diversity</a></li>
               <li><a href="https://sites.google.com/noaa.gov/nws-insider/home">For NWS Employees</a></li>
               <li><a href="https://www.weather.gov/international/">International</a></li>
               <li><a href="https://www.weather.gov/organization">National Centers</a></li>
               <li><a href="https://www.weather.gov/careers">Careers</a></li>
               <li><a href="https://www.weather.gov/contact">Contact Us</a></li>
               <li><a href="https://w1.weather.gov/glossary">Glossary</a></li>
            </ul>
         </li>

      </ul>

   </div> <!-- navbar -->
</nav>
<div class="mag_header_bar largefont">   Model Analyses and Guidance</div>
		


<table  class="noborder_center_100">
  <tr>
    <td style="text-align: center; width: 15%">
      <!-- back button -->
      <button class="nav_button" type="button" id="backButton">Back</button>
    </td>
    <td style="text-align: center">
      <!-- Heading -->
      <span class="page_heading">Model Guidance</span>
    </td>
    <td style="text-align: center; width: 15%">
      <!-- home button -->
      <button class="nav_button" type="button" id="homeButton">Home</button>
    </td>
  </tr>
</table>

<div class="center100" style="margin-top:20px;margin-bottom:20px">
   <span id="selection_prompt" class="page_sub_heading boldorange" style="width:100%;text-align:center;">To view images, select a Model Area and Model Type</span>
   <button type="button" class="info_button" id="resetButton">Reset Selection(s)</button>
</div>

<noscript><h3>The MAG website requires JavaScript. Please enable JavaScript.</h3></noscript> 
<table id="modtype" class="param_table" > 
<tr><th id="model_type" class="Model Type param_header_bar" colspan="5" title="Model Type"><div class="param_text_header">Model Type</div></th> 
</tr><tr> 
<td class="border_td GFS" >
<div class="param_text"><a id="modtype_GFS" class="model_link GFS" href="#" data-model="GFS" data-group="Model Guidance" title="Global Forecast System Model: (000 - 120 every hour, 123 - 240 every 3 hours 252 - 384 every 12 hours)">GFS</a></div> 
</td>
<td class="border_td NAM" >
<div class="param_text"><a id="modtype_NAM" class="model_link NAM" href="#" data-model="NAM" data-group="Model Guidance" title="North American Mesoscale Model (000 - 084 every 3 hours)">NAM</a></div> 
</td>
<td class="border_td HRRR" >
<div class="param_text"><a id="modtype_HRRR" class="model_link HRRR" href="#" data-model="HRRR" data-group="Model Guidance" title="High Resolution Rapid Refresh (updated every quarter hour)">HRRR</a></div> 
</td>
<td class="border_td SREF" >
<div class="param_text"><a id="modtype_SREF" class="model_link SREF" href="#" data-model="SREF" data-group="Model Guidance" title="Short Range Ensemble Forecast Model (updated every 6 hours)">SREF</a></div> 
</td>
<td class="border_td GFS-WAVE" >
<div class="param_text"><a id="modtype_GFS-WAVE" class="model_link GFS-WAVE" href="#" data-model="GFS-WAVE" data-group="Model Guidance" title="GFS - Wave Model">GFS-WAVE</a></div> 
</td>
</tr>
<tr> 
<td class="border_td AIGFS" >
<div class="param_text"><a id="modtype_AIGFS" class="model_link AIGFS" href="#" data-model="AIGFS" data-group="Model Guidance" title="AI Global Forecast System Model">AIGFS</a></div> 
</td>
<td class="border_td NAM-HIRES" >
<div class="param_text"><a id="modtype_NAM-HIRES" class="model_link NAM-HIRES" href="#" data-model="NAM-HIRES" data-group="Model Guidance" title="United States Mesoscale Model 3km (000 - 060 every hour)">NAM-HIRES</a></div> 
</td>
<td class="border_td HRW-FV3" >
<div class="param_text"><a id="modtype_HRW-FV3" class="model_link HRW-FV3" href="#" data-model="HRW-FV3" data-group="Model Guidance" title="High Resolution Window/Non-Hydrostatic, hybrid, vert coordinate Mesoscale Model">HRW-FV3</a></div> 
</td>
<td class="border_td HREF" >
<div class="param_text"><a id="modtype_HREF" class="model_link HREF" href="#" data-model="HREF" data-group="Model Guidance" title="High Resolution Ensemble Forecast (every 1h)">HREF</a></div> 
</td>
<td class="border_td GEFS-WAVE" >
<div class="param_text"><a id="modtype_GEFS-WAVE" class="model_link GEFS-WAVE" href="#" data-model="GEFS-WAVE" data-group="Model Guidance" title="GEFS - Wave Model">GEFS-WAVE</a></div> 
</td>
</tr>
<tr> 
<td class="border_td GEFS-SPAG" >
<div class="param_text"><a id="modtype_GEFS-SPAG" class="model_link GEFS-SPAG" href="#" data-model="GEFS-SPAG" data-group="Model Guidance" title="Global Ensemble Forecast System - individual members (every 6 hours)">GEFS-SPAG</a></div> 
</td>
<td class="border_td FIREWX" >
<div class="param_text"><a id="modtype_FIREWX" class="model_link FIREWX" href="#" data-model="FIREWX" data-group="Model Guidance" title="NAM Fire Weather High Resolution Nested Runs">FIREWX</a></div> 
</td>
<td class="border_td HRW-ARW" >
<div class="param_text"><a id="modtype_HRW-ARW" class="model_link HRW-ARW" href="#" data-model="HRW-ARW" data-group="Model Guidance" title="High Resolution Window/Advanced Research Weather Research and Forecast Model">HRW-ARW</a></div> 
</td>
<td class="border_td NBM" >
<div class="param_text"><a id="modtype_NBM" class="model_link NBM" href="#" data-model="NBM" data-group="Model Guidance" title="National Blend of Models (every 1h)">NBM</a></div> 
</td>
<td class="border_td STOFS" >
<div class="param_text"><a id="modtype_STOFS" class="model_link STOFS" href="#" data-model="STOFS" data-group="Model Guidance" title="Surge and Tide Operational Forecast System - storm surge and total water level">STOFS</a></div> 
</td>
</tr>
<tr> 
<td class="border_td GEFS-MEAN-SPRD" >
<div class="param_text"><a id="modtype_GEFS-MEAN-SPRD" class="model_link GEFS-MEAN-SPRD" href="#" data-model="GEFS-MEAN-SPRD" data-group="Model Guidance" title="Global Ensemble Forecast System - mean and spread (every 6 hours)">GEFS-MEAN-SPRD</a></div> 
</td>
<td class="border_td RAP" >
<div class="param_text"><a id="modtype_RAP" class="model_link RAP" href="#" data-model="RAP" data-group="Model Guidance" title="Rapid Refresh Model (updated every hour)">RAP</a></div> 
</td>
<td class="border_td HRW-ARW2" >
<div class="param_text"><a id="modtype_HRW-ARW2" class="model_link HRW-ARW2" href="#" data-model="HRW-ARW2" data-group="Model Guidance" title="High Resolution Window/Advanced Research Weather Research and Forecast Model- Member 2">HRW-ARW2</a></div> 
</td>
<td class="border_td SREF-CLUSTER" >
<div class="param_text"><a id="modtype_SREF-CLUSTER" class="model_link SREF-CLUSTER" href="#" data-model="SREF-CLUSTER" data-group="Model Guidance" title="Short Range Ensemble Forecast Model Clusters (updated every 6 hours)">SREF-CLUSTER</a></div> 
</td>
<td class="border_td ICE-DRIFT" >
<div class="param_text"><a id="modtype_ICE-DRIFT" class="model_link ICE-DRIFT" href="#" data-model="ICE-DRIFT" data-group="Model Guidance" title="Polar Ice Drift Forecast Model (updated at 00 UTC daily)">ICE-DRIFT</a></div> 
</td>
</tr>
<tr> 
<td class="border_td NAEFS" >
<div class="param_text"><a id="modtype_NAEFS" class="model_link NAEFS" href="#" data-model="NAEFS" data-group="Model Guidance" title="North American Ensemble Forecast System - Bias Correction">NAEFS</a></div> 
</td>
<td class="border_td PANELS" >
<div class="param_text"><a id="modtype_PANELS" class="model_link PANELS" href="#" data-model="PANELS" data-group="Model Guidance" title="Model Four-Panels">PANELS</a></div> 
</td>
<td class="border_td STORM-TRACKS" >
<div class="param_text"><a id="modtype_STORM-TRACKS" class="model_link STORM-TRACKS" href="#" data-model="STORM-TRACKS" data-group="Model Guidance" title="Storm-tracks">STORM-TRACKS</a></div> 
</td>
<td class="border_td " >
&nbsp;</td>
<td class="border_td " >
&nbsp;</td>
</tr>
</table> 
<table id="modarea" class="param_table" > 
<tr><th id="model_area" colspan="6" class="param_header_bar " style="padding:0" title="Model Area"><div class="param_text_header">Model Area</div></th> 
</tr><tr> 
<td class="border_td NAMER" > 
<div class="param_text"><a id="modarea_NAMER" class="area_link NAMER" href="#" data-area="NAMER" data-group="Model Guidance" title="North America - US, Canada, and northern Mexico">NAMER</a></div> 
</td> 
<td class="border_td CONUS" > 
<div class="param_text"><a id="modarea_CONUS" class="area_link CONUS" href="#" data-area="CONUS" data-group="Model Guidance" title="Continental United States">CONUS</a></div> 
</td> 
<td class="border_td AFRICA" > 
<div class="param_text"><a id="modarea_AFRICA" class="area_link AFRICA" href="#" data-area="AFRICA" data-group="Model Guidance" title="Africa - Africa, Southern Europe, Southwest Asia">AFRICA</a></div> 
</td> 
<td class="border_td ALASKA" > 
<div class="param_text"><a id="modarea_ALASKA" class="area_link ALASKA" href="#" data-area="ALASKA" data-group="Model Guidance" title="Alaska Region">ALASKA</a></div> 
</td> 
<td class="border_td ARCTIC" > 
<div class="param_text"><a id="modarea_ARCTIC" class="area_link ARCTIC" href="#" data-area="ARCTIC" data-group="Model Guidance" title="Arctic Region">ARCTIC</a></div> 
</td> 
<td class="border_td ASIA" > 
<div class="param_text"><a id="modarea_ASIA" class="area_link ASIA" href="#" data-area="ASIA" data-group="Model Guidance" title="Asia">ASIA</a></div> 
</td> 
</tr> 
<tr> 
<td class="border_td ATL-PAC" > 
<div class="param_text"><a id="modarea_ATL-PAC" class="area_link ATL-PAC" href="#" data-area="ATL-PAC" data-group="Model Guidance" title="Entire North Atlantic and North Pacific Ocean">ATL-PAC</a></div> 
</td> 
<td class="border_td ATLANTIC" > 
<div class="param_text"><a id="modarea_ATLANTIC" class="area_link ATLANTIC" href="#" data-area="ATLANTIC" data-group="Model Guidance" title="Atlantic region">ATLANTIC</a></div> 
</td> 
<td class="border_td CONUS-AK" > 
<div class="param_text"><a id="modarea_CONUS-AK" class="area_link CONUS-AK" href="#" data-area="CONUS-AK" data-group="Model Guidance" title="Nested CONUS or Alaska Region">CONUS-AK</a></div> 
</td> 
<td class="border_td EAST-GOAK" > 
<div class="param_text"><a id="modarea_EAST-GOAK" class="area_link EAST-GOAK" href="#" data-area="EAST-GOAK" data-group="Model Guidance" title="East Gulf of Alaska">EAST-GOAK</a></div> 
</td> 
<td class="border_td EAST-GOAM" > 
<div class="param_text"><a id="modarea_EAST-GOAM" class="area_link EAST-GOAM" href="#" data-area="EAST-GOAM" data-group="Model Guidance" title="East Gulf of America">EAST-GOAM</a></div> 
</td> 
<td class="border_td EAST-PAC" > 
<div class="param_text"><a id="modarea_EAST-PAC" class="area_link EAST-PAC" href="#" data-area="EAST-PAC" data-group="Model Guidance" title="Eastern Pacific - Southern US, Mexico, East Pacific Ocean">EAST-PAC</a></div> 
</td> 
</tr> 
<tr> 
<td class="border_td EUROPE" > 
<div class="param_text"><a id="modarea_EUROPE" class="area_link EUROPE" href="#" data-area="EUROPE" data-group="Model Guidance" title="Europe">EUROPE</a></div> 
</td> 
<td class="border_td GOAM" > 
<div class="param_text"><a id="modarea_GOAM" class="area_link GOAM" href="#" data-area="GOAM" data-group="Model Guidance" title="Gulf of America">GOAM</a></div> 
</td> 
<td class="border_td GUAM" > 
<div class="param_text"><a id="modarea_GUAM" class="area_link GUAM" href="#" data-area="GUAM" data-group="Model Guidance" title="Guam">GUAM</a></div> 
</td> 
<td class="border_td HAWAII" > 
<div class="param_text"><a id="modarea_HAWAII" class="area_link HAWAII" href="#" data-area="HAWAII" data-group="Model Guidance" title="Hawaii">HAWAII</a></div> 
</td> 
<td class="border_td INDIA" > 
<div class="param_text"><a id="modarea_INDIA" class="area_link INDIA" href="#" data-area="INDIA" data-group="Model Guidance" title="India and Pakistan">INDIA</a></div> 
</td> 
<td class="border_td MID-ATL" > 
<div class="param_text"><a id="modarea_MID-ATL" class="area_link MID-ATL" href="#" data-area="MID-ATL" data-group="Model Guidance" title="US Mid-Atlantic Coast">MID-ATL</a></div> 
</td> 
</tr> 
<tr> 
<td class="border_td NE-COAST" > 
<div class="param_text"><a id="modarea_NE-COAST" class="area_link NE-COAST" href="#" data-area="NE-COAST" data-group="Model Guidance" title="US Northeast Coast">NE-COAST</a></div> 
</td> 
<td class="border_td NORTH-CAL" > 
<div class="param_text"><a id="modarea_NORTH-CAL" class="area_link NORTH-CAL" href="#" data-area="NORTH-CAL" data-group="Model Guidance" title="North California">NORTH-CAL</a></div> 
</td> 
<td class="border_td NORTH-PAC" > 
<div class="param_text"><a id="modarea_NORTH-PAC" class="area_link NORTH-PAC" href="#" data-area="NORTH-PAC" data-group="Model Guidance" title="North Pacific - Western US, Alaska, Western Canada, Hawaii, North Pacific Ocean">NORTH-PAC</a></div> 
</td> 
<td class="border_td PAC-REGION" > 
<div class="param_text"><a id="modarea_PAC-REGION" class="area_link PAC-REGION" href="#" data-area="PAC-REGION" data-group="Model Guidance" title="Pacific regions including the far South Pacific">PAC-REGION</a></div> 
</td> 
<td class="border_td POLAR" > 
<div class="param_text"><a id="modarea_POLAR" class="area_link POLAR" href="#" data-area="POLAR" data-group="Model Guidance" title="North Polar Region">POLAR</a></div> 
</td> 
<td class="border_td PR" > 
<div class="param_text"><a id="modarea_PR" class="area_link PR" href="#" data-area="PR" data-group="Model Guidance" title="Puerto Rico Region">PR</a></div> 
</td> 
</tr> 
<tr> 
<td class="border_td SAMER" > 
<div class="param_text"><a id="modarea_SAMER" class="area_link SAMER" href="#" data-area="SAMER" data-group="Model Guidance" title="South America - South America, Southern Caribbean Sea">SAMER</a></div> 
</td> 
<td class="border_td SE-COAST" > 
<div class="param_text"><a id="modarea_SE-COAST" class="area_link SE-COAST" href="#" data-area="SE-COAST" data-group="Model Guidance" title="US Southeast Coast">SE-COAST</a></div> 
</td> 
<td class="border_td SOUTH-CAL" > 
<div class="param_text"><a id="modarea_SOUTH-CAL" class="area_link SOUTH-CAL" href="#" data-area="SOUTH-CAL" data-group="Model Guidance" title="South California">SOUTH-CAL</a></div> 
</td> 
<td class="border_td SOUTH-PAC" > 
<div class="param_text"><a id="modarea_SOUTH-PAC" class="area_link SOUTH-PAC" href="#" data-area="SOUTH-PAC" data-group="Model Guidance" title="South Pacific">SOUTH-PAC</a></div> 
</td> 
<td class="border_td US-NC" > 
<div class="param_text"><a id="modarea_US-NC" class="area_link US-NC" href="#" data-area="US-NC" data-group="Model Guidance" title="North Central United States">US-NC</a></div> 
</td> 
<td class="border_td US-NE" > 
<div class="param_text"><a id="modarea_US-NE" class="area_link US-NE" href="#" data-area="US-NE" data-group="Model Guidance" title="North Eastern United States">US-NE</a></div> 
</td> 
</tr> 
<tr> 
<td class="border_td US-NW" > 
<div class="param_text"><a id="modarea_US-NW" class="area_link US-NW" href="#" data-area="US-NW" data-group="Model Guidance" title="North Western United States">US-NW</a></div> 
</td> 
<td class="border_td US-SAMOA" > 
<div class="param_text"><a id="modarea_US-SAMOA" class="area_link US-SAMOA" href="#" data-area="US-SAMOA" data-group="Model Guidance" title="American Samoa">US-SAMOA</a></div> 
</td> 
<td class="border_td US-SC" > 
<div class="param_text"><a id="modarea_US-SC" class="area_link US-SC" href="#" data-area="US-SC" data-group="Model Guidance" title="South Central United States">US-SC</a></div> 
</td> 
<td class="border_td US-SE" > 
<div class="param_text"><a id="modarea_US-SE" class="area_link US-SE" href="#" data-area="US-SE" data-group="Model Guidance" title="South Eastern United States">US-SE</a></div> 
</td> 
<td class="border_td US-SW" > 
<div class="param_text"><a id="modarea_US-SW" class="area_link US-SW" href="#" data-area="US-SW" data-group="Model Guidance" title="South Western United States">US-SW</a></div> 
</td> 
<td class="border_td WA-OR" > 
<div class="param_text"><a id="modarea_WA-OR" class="area_link WA-OR" href="#" data-area="WA-OR" data-group="Model Guidance" title="Washington and Oregon">WA-OR</a></div> 
</td> 
</tr> 
<tr> 
<td class="border_td WEST-ATL" > 
<div class="param_text"><a id="modarea_WEST-ATL" class="area_link WEST-ATL" href="#" data-area="WEST-ATL" data-group="Model Guidance" title="Western North Atlantic - Southeast US, Central America, Caribbean">WEST-ATL</a></div> 
</td> 
<td class="border_td WEST-GOAK" > 
<div class="param_text"><a id="modarea_WEST-GOAK" class="area_link WEST-GOAK" href="#" data-area="WEST-GOAK" data-group="Model Guidance" title="West Gulf of Alaska">WEST-GOAK</a></div> 
</td> 
<td class="border_td WEST-GOAM" > 
<div class="param_text"><a id="modarea_WEST-GOAM" class="area_link WEST-GOAM" href="#" data-area="WEST-GOAM" data-group="Model Guidance" title="West Gulf of America">WEST-GOAM</a></div> 
</td> 
<td class="border_td " > 
&nbsp;</td> 
<td class="border_td " > 
&nbsp;</td> 
<td class="border_td " > 
&nbsp;</td> 
</tr> 
</table> 

<table class="center100" style="background-color:#FFFFFF;" >
<tr>
   <td>
       <img src="mag_images/mag-world-background.gif" id="world_map_id"
        style="max-width:582px; margin-top:5px; margin-bottom:5px"
        title="NCEP MAG world map image" alt="NCO world Page">
   </td>
</tr>
</table>

<div id="fourPanelData" data-fourpanel="&quot;&quot;"></div><div id="pageInfo" data-self-url="/model-guidance-model-area.php"></div><div id="modelStorm2dData" data-storms="&quot;&quot;"></div><div id="modelArea2dData" data-model-areas="[[],{&quot;1&quot;:&quot;STOFS&quot;,&quot;2&quot;:&quot;WEST-GOAK&quot;},{&quot;1&quot;:&quot;STOFS&quot;,&quot;2&quot;:&quot;EAST-GOAK&quot;},{&quot;1&quot;:&quot;STOFS&quot;,&quot;2&quot;:&quot;WA-OR&quot;},{&quot;1&quot;:&quot;STOFS&quot;,&quot;2&quot;:&quot;NORTH-CAL&quot;},{&quot;1&quot;:&quot;STOFS&quot;,&quot;2&quot;:&quot;SOUTH-CAL&quot;},{&quot;1&quot;:&quot;STOFS&quot;,&quot;2&quot;:&quot;HAWAII&quot;},{&quot;1&quot;:&quot;STOFS&quot;,&quot;2&quot;:&quot;NE-COAST&quot;},{&quot;1&quot;:&quot;STOFS&quot;,&quot;2&quot;:&quot;MID-ATL&quot;},{&quot;1&quot;:&quot;STOFS&quot;,&quot;2&quot;:&quot;SE-COAST&quot;},{&quot;1&quot;:&quot;STOFS&quot;,&quot;2&quot;:&quot;EAST-GOAM&quot;},{&quot;1&quot;:&quot;STOFS&quot;,&quot;2&quot;:&quot;WEST-GOAM&quot;},{&quot;1&quot;:&quot;STOFS&quot;,&quot;2&quot;:&quot;NORTH-PAC&quot;},{&quot;1&quot;:&quot;STOFS&quot;,&quot;2&quot;:&quot;GUAM&quot;},{&quot;1&quot;:&quot;FIREWX&quot;,&quot;2&quot;:&quot;CONUS-AK&quot;},{&quot;1&quot;:&quot;GEFS-MEAN-SPRD&quot;,&quot;2&quot;:&quot;NAMER&quot;},{&quot;1&quot;:&quot;GEFS-MEAN-SPRD&quot;,&quot;2&quot;:&quot;CONUS&quot;},{&quot;1&quot;:&quot;GEFS-MEAN-SPRD&quot;,&quot;2&quot;:&quot;ALASKA&quot;},{&quot;1&quot;:&quot;GEFS-MEAN-SPRD&quot;,&quot;2&quot;:&quot;SAMER&quot;},{&quot;1&quot;:&quot;GEFS-MEAN-SPRD&quot;,&quot;2&quot;:&quot;AFRICA&quot;},{&quot;1&quot;:&quot;GEFS-MEAN-SPRD&quot;,&quot;2&quot;:&quot;NORTH-PAC&quot;},{&quot;1&quot;:&quot;GEFS-MEAN-SPRD&quot;,&quot;2&quot;:&quot;EAST-PAC&quot;},{&quot;1&quot;:&quot;GEFS-MEAN-SPRD&quot;,&quot;2&quot;:&quot;WEST-ATL&quot;},{&quot;1&quot;:&quot;GEFS-MEAN-SPRD&quot;,&quot;2&quot;:&quot;ATLANTIC&quot;},{&quot;1&quot;:&quot;GEFS-MEAN-SPRD&quot;,&quot;2&quot;:&quot;POLAR&quot;},{&quot;1&quot;:&quot;GEFS-MEAN-SPRD&quot;,&quot;2&quot;:&quot;EUROPE&quot;},{&quot;1&quot;:&quot;GEFS-MEAN-SPRD&quot;,&quot;2&quot;:&quot;ASIA&quot;},{&quot;1&quot;:&quot;GEFS-MEAN-SPRD&quot;,&quot;2&quot;:&quot;SOUTH-PAC&quot;},{&quot;1&quot;:&quot;GEFS-MEAN-SPRD&quot;,&quot;2&quot;:&quot;ARCTIC&quot;},{&quot;1&quot;:&quot;GEFS-MEAN-SPRD&quot;,&quot;2&quot;:&quot;INDIA&quot;},{&quot;1&quot;:&quot;GEFS-SPAG&quot;,&quot;2&quot;:&quot;NAMER&quot;},{&quot;1&quot;:&quot;GEFS-SPAG&quot;,&quot;2&quot;:&quot;SAMER&quot;},{&quot;1&quot;:&quot;GEFS-SPAG&quot;,&quot;2&quot;:&quot;AFRICA&quot;},{&quot;1&quot;:&quot;GEFS-SPAG&quot;,&quot;2&quot;:&quot;NORTH-PAC&quot;},{&quot;1&quot;:&quot;GEFS-SPAG&quot;,&quot;2&quot;:&quot;EAST-PAC&quot;},{&quot;1&quot;:&quot;GEFS-SPAG&quot;,&quot;2&quot;:&quot;WEST-ATL&quot;},{&quot;1&quot;:&quot;GEFS-SPAG&quot;,&quot;2&quot;:&quot;ATLANTIC&quot;},{&quot;1&quot;:&quot;GEFS-SPAG&quot;,&quot;2&quot;:&quot;EUROPE&quot;},{&quot;1&quot;:&quot;GEFS-SPAG&quot;,&quot;2&quot;:&quot;ASIA&quot;},{&quot;1&quot;:&quot;GEFS-SPAG&quot;,&quot;2&quot;:&quot;SOUTH-PAC&quot;},{&quot;1&quot;:&quot;GEFS-SPAG&quot;,&quot;2&quot;:&quot;INDIA&quot;},{&quot;1&quot;:&quot;GFS&quot;,&quot;2&quot;:&quot;NAMER&quot;},{&quot;1&quot;:&quot;GFS&quot;,&quot;2&quot;:&quot;CONUS&quot;},{&quot;1&quot;:&quot;GFS&quot;,&quot;2&quot;:&quot;SAMER&quot;},{&quot;1&quot;:&quot;GFS&quot;,&quot;2&quot;:&quot;AFRICA&quot;},{&quot;1&quot;:&quot;GFS&quot;,&quot;2&quot;:&quot;NORTH-PAC&quot;},{&quot;1&quot;:&quot;GFS&quot;,&quot;2&quot;:&quot;EAST-PAC&quot;},{&quot;1&quot;:&quot;GFS&quot;,&quot;2&quot;:&quot;WEST-ATL&quot;},{&quot;1&quot;:&quot;GFS&quot;,&quot;2&quot;:&quot;ATLANTIC&quot;},{&quot;1&quot;:&quot;GFS&quot;,&quot;2&quot;:&quot;POLAR&quot;},{&quot;1&quot;:&quot;GFS&quot;,&quot;2&quot;:&quot;EUROPE&quot;},{&quot;1&quot;:&quot;GFS&quot;,&quot;2&quot;:&quot;ASIA&quot;},{&quot;1&quot;:&quot;GFS&quot;,&quot;2&quot;:&quot;SOUTH-PAC&quot;},{&quot;1&quot;:&quot;GFS&quot;,&quot;2&quot;:&quot;ARCTIC&quot;},{&quot;1&quot;:&quot;GFS&quot;,&quot;2&quot;:&quot;ALASKA&quot;},{&quot;1&quot;:&quot;GFS&quot;,&quot;2&quot;:&quot;INDIA&quot;},{&quot;1&quot;:&quot;GFS&quot;,&quot;2&quot;:&quot;US-SAMOA&quot;},{&quot;1&quot;:&quot;GFS&quot;,&quot;2&quot;:&quot;PAC-REGION&quot;},{&quot;1&quot;:&quot;AIGFS&quot;,&quot;2&quot;:&quot;NAMER&quot;},{&quot;1&quot;:&quot;AIGFS&quot;,&quot;2&quot;:&quot;CONUS&quot;},{&quot;1&quot;:&quot;AIGFS&quot;,&quot;2&quot;:&quot;SAMER&quot;},{&quot;1&quot;:&quot;AIGFS&quot;,&quot;2&quot;:&quot;AFRICA&quot;},{&quot;1&quot;:&quot;AIGFS&quot;,&quot;2&quot;:&quot;NORTH-PAC&quot;},{&quot;1&quot;:&quot;AIGFS&quot;,&quot;2&quot;:&quot;EAST-PAC&quot;},{&quot;1&quot;:&quot;AIGFS&quot;,&quot;2&quot;:&quot;WEST-ATL&quot;},{&quot;1&quot;:&quot;AIGFS&quot;,&quot;2&quot;:&quot;ATLANTIC&quot;},{&quot;1&quot;:&quot;AIGFS&quot;,&quot;2&quot;:&quot;POLAR&quot;},{&quot;1&quot;:&quot;AIGFS&quot;,&quot;2&quot;:&quot;EUROPE&quot;},{&quot;1&quot;:&quot;AIGFS&quot;,&quot;2&quot;:&quot;ASIA&quot;},{&quot;1&quot;:&quot;AIGFS&quot;,&quot;2&quot;:&quot;SOUTH-PAC&quot;},{&quot;1&quot;:&quot;AIGFS&quot;,&quot;2&quot;:&quot;ARCTIC&quot;},{&quot;1&quot;:&quot;AIGFS&quot;,&quot;2&quot;:&quot;ALASKA&quot;},{&quot;1&quot;:&quot;AIGFS&quot;,&quot;2&quot;:&quot;INDIA&quot;},{&quot;1&quot;:&quot;AIGFS&quot;,&quot;2&quot;:&quot;US-SAMOA&quot;},{&quot;1&quot;:&quot;AIGFS&quot;,&quot;2&quot;:&quot;PAC-REGION&quot;},{&quot;1&quot;:&quot;HREF&quot;,&quot;2&quot;:&quot;CONUS&quot;},{&quot;1&quot;:&quot;HREF&quot;,&quot;2&quot;:&quot;US-NW&quot;},{&quot;1&quot;:&quot;HREF&quot;,&quot;2&quot;:&quot;US-SW&quot;},{&quot;1&quot;:&quot;HREF&quot;,&quot;2&quot;:&quot;US-NC&quot;},{&quot;1&quot;:&quot;HREF&quot;,&quot;2&quot;:&quot;US-SC&quot;},{&quot;1&quot;:&quot;HREF&quot;,&quot;2&quot;:&quot;US-NE&quot;},{&quot;1&quot;:&quot;HREF&quot;,&quot;2&quot;:&quot;US-SE&quot;},{&quot;1&quot;:&quot;HRW-ARW2&quot;,&quot;2&quot;:&quot;US-NW&quot;},{&quot;1&quot;:&quot;HRW-ARW2&quot;,&quot;2&quot;:&quot;US-SW&quot;},{&quot;1&quot;:&quot;HRW-ARW2&quot;,&quot;2&quot;:&quot;US-NC&quot;},{&quot;1&quot;:&quot;HRW-ARW2&quot;,&quot;2&quot;:&quot;US-SC&quot;},{&quot;1&quot;:&quot;HRW-ARW2&quot;,&quot;2&quot;:&quot;US-NE&quot;},{&quot;1&quot;:&quot;HRW-ARW2&quot;,&quot;2&quot;:&quot;US-SE&quot;},{&quot;1&quot;:&quot;HRW-ARW2&quot;,&quot;2&quot;:&quot;CONUS&quot;},{&quot;1&quot;:&quot;HRW-ARW2&quot;,&quot;2&quot;:&quot;HAWAII&quot;},{&quot;1&quot;:&quot;HRW-ARW2&quot;,&quot;2&quot;:&quot;PR&quot;},{&quot;1&quot;:&quot;HRW-ARW2&quot;,&quot;2&quot;:&quot;ALASKA&quot;},{&quot;1&quot;:&quot;NBM&quot;,&quot;2&quot;:&quot;NAMER&quot;},{&quot;1&quot;:&quot;NBM&quot;,&quot;2&quot;:&quot;CONUS&quot;},{&quot;1&quot;:&quot;NBM&quot;,&quot;2&quot;:&quot;ALASKA&quot;},{&quot;1&quot;:&quot;NBM&quot;,&quot;2&quot;:&quot;PR&quot;},{&quot;1&quot;:&quot;NBM&quot;,&quot;2&quot;:&quot;HAWAII&quot;},{&quot;1&quot;:&quot;HRRR&quot;,&quot;2&quot;:&quot;US-NW&quot;},{&quot;1&quot;:&quot;HRRR&quot;,&quot;2&quot;:&quot;US-SW&quot;},{&quot;1&quot;:&quot;HRRR&quot;,&quot;2&quot;:&quot;US-NC&quot;},{&quot;1&quot;:&quot;HRRR&quot;,&quot;2&quot;:&quot;US-SC&quot;},{&quot;1&quot;:&quot;HRRR&quot;,&quot;2&quot;:&quot;US-NE&quot;},{&quot;1&quot;:&quot;HRRR&quot;,&quot;2&quot;:&quot;US-SE&quot;},{&quot;1&quot;:&quot;HRRR&quot;,&quot;2&quot;:&quot;CONUS&quot;},{&quot;1&quot;:&quot;HRRR&quot;,&quot;2&quot;:&quot;ALASKA&quot;},{&quot;1&quot;:&quot;HRW-ARW&quot;,&quot;2&quot;:&quot;US-NW&quot;},{&quot;1&quot;:&quot;HRW-ARW&quot;,&quot;2&quot;:&quot;US-SW&quot;},{&quot;1&quot;:&quot;HRW-ARW&quot;,&quot;2&quot;:&quot;US-NC&quot;},{&quot;1&quot;:&quot;HRW-ARW&quot;,&quot;2&quot;:&quot;US-SC&quot;},{&quot;1&quot;:&quot;HRW-ARW&quot;,&quot;2&quot;:&quot;US-NE&quot;},{&quot;1&quot;:&quot;HRW-ARW&quot;,&quot;2&quot;:&quot;US-SE&quot;},{&quot;1&quot;:&quot;HRW-ARW&quot;,&quot;2&quot;:&quot;CONUS&quot;},{&quot;1&quot;:&quot;HRW-ARW&quot;,&quot;2&quot;:&quot;HAWAII&quot;},{&quot;1&quot;:&quot;HRW-ARW&quot;,&quot;2&quot;:&quot;GUAM&quot;},{&quot;1&quot;:&quot;HRW-ARW&quot;,&quot;2&quot;:&quot;PR&quot;},{&quot;1&quot;:&quot;HRW-ARW&quot;,&quot;2&quot;:&quot;ALASKA&quot;},{&quot;1&quot;:&quot;HRW-FV3&quot;,&quot;2&quot;:&quot;US-NW&quot;},{&quot;1&quot;:&quot;HRW-FV3&quot;,&quot;2&quot;:&quot;US-SW&quot;},{&quot;1&quot;:&quot;HRW-FV3&quot;,&quot;2&quot;:&quot;US-NC&quot;},{&quot;1&quot;:&quot;HRW-FV3&quot;,&quot;2&quot;:&quot;US-SC&quot;},{&quot;1&quot;:&quot;HRW-FV3&quot;,&quot;2&quot;:&quot;US-NE&quot;},{&quot;1&quot;:&quot;HRW-FV3&quot;,&quot;2&quot;:&quot;US-SE&quot;},{&quot;1&quot;:&quot;HRW-FV3&quot;,&quot;2&quot;:&quot;CONUS&quot;},{&quot;1&quot;:&quot;HRW-FV3&quot;,&quot;2&quot;:&quot;HAWAII&quot;},{&quot;1&quot;:&quot;HRW-FV3&quot;,&quot;2&quot;:&quot;GUAM&quot;},{&quot;1&quot;:&quot;HRW-FV3&quot;,&quot;2&quot;:&quot;PR&quot;},{&quot;1&quot;:&quot;HRW-FV3&quot;,&quot;2&quot;:&quot;ALASKA&quot;},{&quot;1&quot;:&quot;NAEFS&quot;,&quot;2&quot;:&quot;NAMER&quot;},{&quot;1&quot;:&quot;NAEFS&quot;,&quot;2&quot;:&quot;SAMER&quot;},{&quot;1&quot;:&quot;NAEFS&quot;,&quot;2&quot;:&quot;CONUS&quot;},{&quot;1&quot;:&quot;NAEFS&quot;,&quot;2&quot;:&quot;ALASKA&quot;},{&quot;1&quot;:&quot;NAEFS&quot;,&quot;2&quot;:&quot;AFRICA&quot;},{&quot;1&quot;:&quot;NAEFS&quot;,&quot;2&quot;:&quot;NORTH-PAC&quot;},{&quot;1&quot;:&quot;NAEFS&quot;,&quot;2&quot;:&quot;EAST-PAC&quot;},{&quot;1&quot;:&quot;NAEFS&quot;,&quot;2&quot;:&quot;WEST-ATL&quot;},{&quot;1&quot;:&quot;NAEFS&quot;,&quot;2&quot;:&quot;ATLANTIC&quot;},{&quot;1&quot;:&quot;NAEFS&quot;,&quot;2&quot;:&quot;POLAR&quot;},{&quot;1&quot;:&quot;NAEFS&quot;,&quot;2&quot;:&quot;EUROPE&quot;},{&quot;1&quot;:&quot;NAEFS&quot;,&quot;2&quot;:&quot;ASIA&quot;},{&quot;1&quot;:&quot;NAEFS&quot;,&quot;2&quot;:&quot;SOUTH-PAC&quot;},{&quot;1&quot;:&quot;NAEFS&quot;,&quot;2&quot;:&quot;ARCTIC&quot;},{&quot;1&quot;:&quot;NAEFS&quot;,&quot;2&quot;:&quot;INDIA&quot;},{&quot;1&quot;:&quot;NAM&quot;,&quot;2&quot;:&quot;NAMER&quot;},{&quot;1&quot;:&quot;NAM&quot;,&quot;2&quot;:&quot;CONUS&quot;},{&quot;1&quot;:&quot;NAM&quot;,&quot;2&quot;:&quot;NORTH-PAC&quot;},{&quot;1&quot;:&quot;NAM&quot;,&quot;2&quot;:&quot;EAST-PAC&quot;},{&quot;1&quot;:&quot;NAM&quot;,&quot;2&quot;:&quot;WEST-ATL&quot;},{&quot;1&quot;:&quot;NAM-HIRES&quot;,&quot;2&quot;:&quot;CONUS&quot;},{&quot;1&quot;:&quot;NAM-HIRES&quot;,&quot;2&quot;:&quot;US-NW&quot;},{&quot;1&quot;:&quot;NAM-HIRES&quot;,&quot;2&quot;:&quot;US-SW&quot;},{&quot;1&quot;:&quot;NAM-HIRES&quot;,&quot;2&quot;:&quot;US-NC&quot;},{&quot;1&quot;:&quot;NAM-HIRES&quot;,&quot;2&quot;:&quot;US-SC&quot;},{&quot;1&quot;:&quot;NAM-HIRES&quot;,&quot;2&quot;:&quot;US-NE&quot;},{&quot;1&quot;:&quot;NAM-HIRES&quot;,&quot;2&quot;:&quot;US-SE&quot;},{&quot;1&quot;:&quot;NAM-HIRES&quot;,&quot;2&quot;:&quot;ALASKA&quot;},{&quot;1&quot;:&quot;NAM-HIRES&quot;,&quot;2&quot;:&quot;HAWAII&quot;},{&quot;1&quot;:&quot;ICE-DRIFT&quot;,&quot;2&quot;:&quot;POLAR&quot;},{&quot;1&quot;:&quot;RAP&quot;,&quot;2&quot;:&quot;CONUS&quot;},{&quot;1&quot;:&quot;RAP&quot;,&quot;2&quot;:&quot;NAMER&quot;},{&quot;1&quot;:&quot;SREF&quot;,&quot;2&quot;:&quot;NAMER&quot;},{&quot;1&quot;:&quot;SREF&quot;,&quot;2&quot;:&quot;ALASKA&quot;},{&quot;1&quot;:&quot;SREF-CLUSTER&quot;,&quot;2&quot;:&quot;CONUS&quot;},{&quot;1&quot;:&quot;GFS-WAVE&quot;,&quot;2&quot;:&quot;NORTH-PAC&quot;},{&quot;1&quot;:&quot;GFS-WAVE&quot;,&quot;2&quot;:&quot;EAST-PAC&quot;},{&quot;1&quot;:&quot;GFS-WAVE&quot;,&quot;2&quot;:&quot;WEST-ATL&quot;},{&quot;1&quot;:&quot;GFS-WAVE&quot;,&quot;2&quot;:&quot;ATLANTIC&quot;},{&quot;1&quot;:&quot;GFS-WAVE&quot;,&quot;2&quot;:&quot;ATL-PAC&quot;},{&quot;1&quot;:&quot;GFS-WAVE&quot;,&quot;2&quot;:&quot;PAC-REGION&quot;},{&quot;1&quot;:&quot;GFS-WAVE&quot;,&quot;2&quot;:&quot;ALASKA&quot;},{&quot;1&quot;:&quot;GFS-WAVE&quot;,&quot;2&quot;:&quot;HAWAII&quot;},{&quot;1&quot;:&quot;GFS-WAVE&quot;,&quot;2&quot;:&quot;ARCTIC&quot;},{&quot;1&quot;:&quot;GFS-WAVE&quot;,&quot;2&quot;:&quot;NE-COAST&quot;},{&quot;1&quot;:&quot;GFS-WAVE&quot;,&quot;2&quot;:&quot;SE-COAST&quot;},{&quot;1&quot;:&quot;GFS-WAVE&quot;,&quot;2&quot;:&quot;WA-OR&quot;},{&quot;1&quot;:&quot;GFS-WAVE&quot;,&quot;2&quot;:&quot;GOAM&quot;},{&quot;1&quot;:&quot;GFS-WAVE&quot;,&quot;2&quot;:&quot;NORTH-CAL&quot;},{&quot;1&quot;:&quot;GFS-WAVE&quot;,&quot;2&quot;:&quot;SOUTH-CAL&quot;},{&quot;1&quot;:&quot;GFS-WAVE&quot;,&quot;2&quot;:&quot;POLAR&quot;},{&quot;1&quot;:&quot;GFS-WAVE&quot;,&quot;2&quot;:&quot;AFRICA&quot;},{&quot;1&quot;:&quot;GFS-WAVE&quot;,&quot;2&quot;:&quot;EAST-GOAK&quot;},{&quot;1&quot;:&quot;GFS-WAVE&quot;,&quot;2&quot;:&quot;EUROPE&quot;},{&quot;1&quot;:&quot;GFS-WAVE&quot;,&quot;2&quot;:&quot;GUAM&quot;},{&quot;1&quot;:&quot;GFS-WAVE&quot;,&quot;2&quot;:&quot;INDIA&quot;},{&quot;1&quot;:&quot;GFS-WAVE&quot;,&quot;2&quot;:&quot;MID-ATL&quot;},{&quot;1&quot;:&quot;GFS-WAVE&quot;,&quot;2&quot;:&quot;PR&quot;},{&quot;1&quot;:&quot;GFS-WAVE&quot;,&quot;2&quot;:&quot;US-SAMOA&quot;},{&quot;1&quot;:&quot;GFS-WAVE&quot;,&quot;2&quot;:&quot;WEST-GOAK&quot;},{&quot;1&quot;:&quot;PANELS&quot;,&quot;2&quot;:&quot;NAMER&quot;},{&quot;1&quot;:&quot;PANELS&quot;,&quot;2&quot;:&quot;SAMER&quot;},{&quot;1&quot;:&quot;PANELS&quot;,&quot;2&quot;:&quot;AFRICA&quot;},{&quot;1&quot;:&quot;PANELS&quot;,&quot;2&quot;:&quot;NORTH-PAC&quot;},{&quot;1&quot;:&quot;PANELS&quot;,&quot;2&quot;:&quot;EAST-PAC&quot;},{&quot;1&quot;:&quot;PANELS&quot;,&quot;2&quot;:&quot;WEST-ATL&quot;},{&quot;1&quot;:&quot;PANELS&quot;,&quot;2&quot;:&quot;ATLANTIC&quot;},{&quot;1&quot;:&quot;PANELS&quot;,&quot;2&quot;:&quot;POLAR&quot;},{&quot;1&quot;:&quot;PANELS&quot;,&quot;2&quot;:&quot;EUROPE&quot;},{&quot;1&quot;:&quot;PANELS&quot;,&quot;2&quot;:&quot;ASIA&quot;},{&quot;1&quot;:&quot;PANELS&quot;,&quot;2&quot;:&quot;SOUTH-PAC&quot;},{&quot;1&quot;:&quot;PANELS&quot;,&quot;2&quot;:&quot;ARCTIC&quot;},{&quot;1&quot;:&quot;PANELS&quot;,&quot;2&quot;:&quot;ALASKA&quot;},{&quot;1&quot;:&quot;PANELS&quot;,&quot;2&quot;:&quot;INDIA&quot;},{&quot;1&quot;:&quot;PANELS&quot;,&quot;2&quot;:&quot;US-SAMOA&quot;},{&quot;1&quot;:&quot;PANELS&quot;,&quot;2&quot;:&quot;CONUS&quot;},{&quot;1&quot;:&quot;PANELS&quot;,&quot;2&quot;:&quot;US-NW&quot;},{&quot;1&quot;:&quot;PANELS&quot;,&quot;2&quot;:&quot;US-SW&quot;},{&quot;1&quot;:&quot;PANELS&quot;,&quot;2&quot;:&quot;US-NC&quot;},{&quot;1&quot;:&quot;PANELS&quot;,&quot;2&quot;:&quot;US-SC&quot;},{&quot;1&quot;:&quot;PANELS&quot;,&quot;2&quot;:&quot;US-NE&quot;},{&quot;1&quot;:&quot;PANELS&quot;,&quot;2&quot;:&quot;US-SE&quot;},{&quot;1&quot;:&quot;STORM-TRACKS&quot;,&quot;2&quot;:&quot;ASIA&quot;},{&quot;1&quot;:&quot;STORM-TRACKS&quot;,&quot;2&quot;:&quot;ATLANTIC&quot;},{&quot;1&quot;:&quot;STORM-TRACKS&quot;,&quot;2&quot;:&quot;ALASKA&quot;},{&quot;1&quot;:&quot;STORM-TRACKS&quot;,&quot;2&quot;:&quot;CONUS&quot;},{&quot;1&quot;:&quot;STORM-TRACKS&quot;,&quot;2&quot;:&quot;EUROPE&quot;},{&quot;1&quot;:&quot;STORM-TRACKS&quot;,&quot;2&quot;:&quot;NORTH-PAC&quot;},{&quot;1&quot;:&quot;GEFS-WAVE&quot;,&quot;2&quot;:&quot;WEST-ATL&quot;},{&quot;1&quot;:&quot;GEFS-WAVE&quot;,&quot;2&quot;:&quot;EAST-PAC&quot;},{&quot;1&quot;:&quot;GEFS-WAVE&quot;,&quot;2&quot;:&quot;ATLANTIC&quot;},{&quot;1&quot;:&quot;GEFS-WAVE&quot;,&quot;2&quot;:&quot;ATL-PAC&quot;},{&quot;1&quot;:&quot;GEFS-WAVE&quot;,&quot;2&quot;:&quot;PAC-REGION&quot;},{&quot;1&quot;:&quot;GEFS-WAVE&quot;,&quot;2&quot;:&quot;ALASKA&quot;},{&quot;1&quot;:&quot;GEFS-WAVE&quot;,&quot;2&quot;:&quot;HAWAII&quot;},{&quot;1&quot;:&quot;GEFS-WAVE&quot;,&quot;2&quot;:&quot;ARCTIC&quot;},{&quot;1&quot;:&quot;GEFS-WAVE&quot;,&quot;2&quot;:&quot;NE-COAST&quot;},{&quot;1&quot;:&quot;GEFS-WAVE&quot;,&quot;2&quot;:&quot;SE-COAST&quot;},{&quot;1&quot;:&quot;GEFS-WAVE&quot;,&quot;2&quot;:&quot;WA-OR&quot;},{&quot;1&quot;:&quot;GEFS-WAVE&quot;,&quot;2&quot;:&quot;GOAM&quot;},{&quot;1&quot;:&quot;GEFS-WAVE&quot;,&quot;2&quot;:&quot;NORTH-CAL&quot;},{&quot;1&quot;:&quot;GEFS-WAVE&quot;,&quot;2&quot;:&quot;SOUTH-CAL&quot;},{&quot;1&quot;:&quot;GEFS-WAVE&quot;,&quot;2&quot;:&quot;NORTH-PAC&quot;},{&quot;1&quot;:&quot;GEFS-WAVE&quot;,&quot;2&quot;:&quot;WEST-GOAK&quot;},{&quot;1&quot;:&quot;GEFS-WAVE&quot;,&quot;2&quot;:&quot;POLAR&quot;},{&quot;1&quot;:&quot;GEFS-WAVE&quot;,&quot;2&quot;:&quot;AFRICA&quot;},{&quot;1&quot;:&quot;GEFS-WAVE&quot;,&quot;2&quot;:&quot;EAST-GOAK&quot;},{&quot;1&quot;:&quot;GEFS-WAVE&quot;,&quot;2&quot;:&quot;EUROPE&quot;},{&quot;1&quot;:&quot;GEFS-WAVE&quot;,&quot;2&quot;:&quot;GUAM&quot;},{&quot;1&quot;:&quot;GEFS-WAVE&quot;,&quot;2&quot;:&quot;INDIA&quot;},{&quot;1&quot;:&quot;GEFS-WAVE&quot;,&quot;2&quot;:&quot;MID-ATL&quot;},{&quot;1&quot;:&quot;GEFS-WAVE&quot;,&quot;2&quot;:&quot;PR&quot;},{&quot;1&quot;:&quot;GEFS-WAVE&quot;,&quot;2&quot;:&quot;US-SAMOA&quot;}]"></div><div id="stormModel2dData" data-storms-models="&quot;&quot;"></div><div id="areaModel2dData" data-area-models="[[],{&quot;1&quot;:&quot;WEST-GOAK&quot;,&quot;2&quot;:&quot;STOFS&quot;},{&quot;1&quot;:&quot;WEST-GOAK&quot;,&quot;2&quot;:&quot;GFS-WAVE&quot;},{&quot;1&quot;:&quot;WEST-GOAK&quot;,&quot;2&quot;:&quot;GEFS-WAVE&quot;},{&quot;1&quot;:&quot;EAST-GOAK&quot;,&quot;2&quot;:&quot;STOFS&quot;},{&quot;1&quot;:&quot;EAST-GOAK&quot;,&quot;2&quot;:&quot;GFS-WAVE&quot;},{&quot;1&quot;:&quot;EAST-GOAK&quot;,&quot;2&quot;:&quot;GEFS-WAVE&quot;},{&quot;1&quot;:&quot;WA-OR&quot;,&quot;2&quot;:&quot;STOFS&quot;},{&quot;1&quot;:&quot;WA-OR&quot;,&quot;2&quot;:&quot;GFS-WAVE&quot;},{&quot;1&quot;:&quot;WA-OR&quot;,&quot;2&quot;:&quot;GEFS-WAVE&quot;},{&quot;1&quot;:&quot;NORTH-CAL&quot;,&quot;2&quot;:&quot;STOFS&quot;},{&quot;1&quot;:&quot;NORTH-CAL&quot;,&quot;2&quot;:&quot;GFS-WAVE&quot;},{&quot;1&quot;:&quot;NORTH-CAL&quot;,&quot;2&quot;:&quot;GEFS-WAVE&quot;},{&quot;1&quot;:&quot;SOUTH-CAL&quot;,&quot;2&quot;:&quot;STOFS&quot;},{&quot;1&quot;:&quot;SOUTH-CAL&quot;,&quot;2&quot;:&quot;GFS-WAVE&quot;},{&quot;1&quot;:&quot;SOUTH-CAL&quot;,&quot;2&quot;:&quot;GEFS-WAVE&quot;},{&quot;1&quot;:&quot;HAWAII&quot;,&quot;2&quot;:&quot;STOFS&quot;},{&quot;1&quot;:&quot;HAWAII&quot;,&quot;2&quot;:&quot;HRW-ARW2&quot;},{&quot;1&quot;:&quot;HAWAII&quot;,&quot;2&quot;:&quot;NBM&quot;},{&quot;1&quot;:&quot;HAWAII&quot;,&quot;2&quot;:&quot;HRW-ARW&quot;},{&quot;1&quot;:&quot;HAWAII&quot;,&quot;2&quot;:&quot;HRW-FV3&quot;},{&quot;1&quot;:&quot;HAWAII&quot;,&quot;2&quot;:&quot;NAM-HIRES&quot;},{&quot;1&quot;:&quot;HAWAII&quot;,&quot;2&quot;:&quot;GFS-WAVE&quot;},{&quot;1&quot;:&quot;HAWAII&quot;,&quot;2&quot;:&quot;GEFS-WAVE&quot;},{&quot;1&quot;:&quot;NE-COAST&quot;,&quot;2&quot;:&quot;STOFS&quot;},{&quot;1&quot;:&quot;NE-COAST&quot;,&quot;2&quot;:&quot;GFS-WAVE&quot;},{&quot;1&quot;:&quot;NE-COAST&quot;,&quot;2&quot;:&quot;GEFS-WAVE&quot;},{&quot;1&quot;:&quot;MID-ATL&quot;,&quot;2&quot;:&quot;STOFS&quot;},{&quot;1&quot;:&quot;MID-ATL&quot;,&quot;2&quot;:&quot;GFS-WAVE&quot;},{&quot;1&quot;:&quot;MID-ATL&quot;,&quot;2&quot;:&quot;GEFS-WAVE&quot;},{&quot;1&quot;:&quot;SE-COAST&quot;,&quot;2&quot;:&quot;STOFS&quot;},{&quot;1&quot;:&quot;SE-COAST&quot;,&quot;2&quot;:&quot;GFS-WAVE&quot;},{&quot;1&quot;:&quot;SE-COAST&quot;,&quot;2&quot;:&quot;GEFS-WAVE&quot;},{&quot;1&quot;:&quot;EAST-GOAM&quot;,&quot;2&quot;:&quot;STOFS&quot;},{&quot;1&quot;:&quot;WEST-GOAM&quot;,&quot;2&quot;:&quot;STOFS&quot;},{&quot;1&quot;:&quot;NORTH-PAC&quot;,&quot;2&quot;:&quot;STOFS&quot;},{&quot;1&quot;:&quot;NORTH-PAC&quot;,&quot;2&quot;:&quot;GEFS-MEAN-SPRD&quot;},{&quot;1&quot;:&quot;NORTH-PAC&quot;,&quot;2&quot;:&quot;GEFS-SPAG&quot;},{&quot;1&quot;:&quot;NORTH-PAC&quot;,&quot;2&quot;:&quot;GFS&quot;},{&quot;1&quot;:&quot;NORTH-PAC&quot;,&quot;2&quot;:&quot;AIGFS&quot;},{&quot;1&quot;:&quot;NORTH-PAC&quot;,&quot;2&quot;:&quot;NAEFS&quot;},{&quot;1&quot;:&quot;NORTH-PAC&quot;,&quot;2&quot;:&quot;NAM&quot;},{&quot;1&quot;:&quot;NORTH-PAC&quot;,&quot;2&quot;:&quot;GFS-WAVE&quot;},{&quot;1&quot;:&quot;NORTH-PAC&quot;,&quot;2&quot;:&quot;PANELS&quot;},{&quot;1&quot;:&quot;NORTH-PAC&quot;,&quot;2&quot;:&quot;STORM-TRACKS&quot;},{&quot;1&quot;:&quot;NORTH-PAC&quot;,&quot;2&quot;:&quot;STORM-TRACKS-GFS-NORTHPAC&quot;},{&quot;1&quot;:&quot;NORTH-PAC&quot;,&quot;2&quot;:&quot;STORM-TRACKS-GEFS-NORTHPAC&quot;},{&quot;1&quot;:&quot;NORTH-PAC&quot;,&quot;2&quot;:&quot;STORM-TRACKS-GEFS-NORTHPAC-PROB&quot;},{&quot;1&quot;:&quot;NORTH-PAC&quot;,&quot;2&quot;:&quot;GEFS-WAVE&quot;},{&quot;1&quot;:&quot;GUAM&quot;,&quot;2&quot;:&quot;STOFS&quot;},{&quot;1&quot;:&quot;GUAM&quot;,&quot;2&quot;:&quot;HRW-ARW&quot;},{&quot;1&quot;:&quot;GUAM&quot;,&quot;2&quot;:&quot;HRW-FV3&quot;},{&quot;1&quot;:&quot;GUAM&quot;,&quot;2&quot;:&quot;GFS-WAVE&quot;},{&quot;1&quot;:&quot;GUAM&quot;,&quot;2&quot;:&quot;GEFS-WAVE&quot;},{&quot;1&quot;:&quot;CONUS-AK&quot;,&quot;2&quot;:&quot;FIREWX&quot;},{&quot;1&quot;:&quot;NAMER&quot;,&quot;2&quot;:&quot;GEFS-MEAN-SPRD&quot;},{&quot;1&quot;:&quot;NAMER&quot;,&quot;2&quot;:&quot;GEFS-SPAG&quot;},{&quot;1&quot;:&quot;NAMER&quot;,&quot;2&quot;:&quot;GFS&quot;},{&quot;1&quot;:&quot;NAMER&quot;,&quot;2&quot;:&quot;AIGFS&quot;},{&quot;1&quot;:&quot;NAMER&quot;,&quot;2&quot;:&quot;NBM&quot;},{&quot;1&quot;:&quot;NAMER&quot;,&quot;2&quot;:&quot;NAEFS&quot;},{&quot;1&quot;:&quot;NAMER&quot;,&quot;2&quot;:&quot;NAM&quot;},{&quot;1&quot;:&quot;NAMER&quot;,&quot;2&quot;:&quot;RAP&quot;},{&quot;1&quot;:&quot;NAMER&quot;,&quot;2&quot;:&quot;SREF&quot;},{&quot;1&quot;:&quot;NAMER&quot;,&quot;2&quot;:&quot;PANELS&quot;},{&quot;1&quot;:&quot;CONUS&quot;,&quot;2&quot;:&quot;GEFS-MEAN-SPRD&quot;},{&quot;1&quot;:&quot;CONUS&quot;,&quot;2&quot;:&quot;GFS&quot;},{&quot;1&quot;:&quot;CONUS&quot;,&quot;2&quot;:&quot;AIGFS&quot;},{&quot;1&quot;:&quot;CONUS&quot;,&quot;2&quot;:&quot;HREF&quot;},{&quot;1&quot;:&quot;CONUS&quot;,&quot;2&quot;:&quot;HRW-ARW2&quot;},{&quot;1&quot;:&quot;CONUS&quot;,&quot;2&quot;:&quot;NBM&quot;},{&quot;1&quot;:&quot;CONUS&quot;,&quot;2&quot;:&quot;HRRR&quot;},{&quot;1&quot;:&quot;CONUS&quot;,&quot;2&quot;:&quot;HRRR-SUBH&quot;},{&quot;1&quot;:&quot;CONUS&quot;,&quot;2&quot;:&quot;HRW-ARW&quot;},{&quot;1&quot;:&quot;CONUS&quot;,&quot;2&quot;:&quot;HRW-FV3&quot;},{&quot;1&quot;:&quot;CONUS&quot;,&quot;2&quot;:&quot;NAEFS&quot;},{&quot;1&quot;:&quot;CONUS&quot;,&quot;2&quot;:&quot;NAM&quot;},{&quot;1&quot;:&quot;CONUS&quot;,&quot;2&quot;:&quot;NAM-HIRES&quot;},{&quot;1&quot;:&quot;CONUS&quot;,&quot;2&quot;:&quot;RAP&quot;},{&quot;1&quot;:&quot;CONUS&quot;,&quot;2&quot;:&quot;SREF-CLUSTER&quot;},{&quot;1&quot;:&quot;CONUS&quot;,&quot;2&quot;:&quot;PANELS&quot;},{&quot;1&quot;:&quot;CONUS&quot;,&quot;2&quot;:&quot;STORM-TRACKS&quot;},{&quot;1&quot;:&quot;CONUS&quot;,&quot;2&quot;:&quot;STORM-TRACKS-GFS-ACE&quot;},{&quot;1&quot;:&quot;CONUS&quot;,&quot;2&quot;:&quot;STORM-TRACKS-NAM&quot;},{&quot;1&quot;:&quot;CONUS&quot;,&quot;2&quot;:&quot;STORM-TRACKS-GEFS-CONUS&quot;},{&quot;1&quot;:&quot;CONUS&quot;,&quot;2&quot;:&quot;STORM-TRACKS-GFSNAM&quot;},{&quot;1&quot;:&quot;CONUS&quot;,&quot;2&quot;:&quot;STORM-TRACKS-GEFS-CONUS-PROB&quot;},{&quot;1&quot;:&quot;ALASKA&quot;,&quot;2&quot;:&quot;GEFS-MEAN-SPRD&quot;},{&quot;1&quot;:&quot;ALASKA&quot;,&quot;2&quot;:&quot;GFS&quot;},{&quot;1&quot;:&quot;ALASKA&quot;,&quot;2&quot;:&quot;AIGFS&quot;},{&quot;1&quot;:&quot;ALASKA&quot;,&quot;2&quot;:&quot;HRW-ARW2&quot;},{&quot;1&quot;:&quot;ALASKA&quot;,&quot;2&quot;:&quot;NBM&quot;},{&quot;1&quot;:&quot;ALASKA&quot;,&quot;2&quot;:&quot;HRRR&quot;},{&quot;1&quot;:&quot;ALASKA&quot;,&quot;2&quot;:&quot;HRRR-SUBH&quot;},{&quot;1&quot;:&quot;ALASKA&quot;,&quot;2&quot;:&quot;HRW-ARW&quot;},{&quot;1&quot;:&quot;ALASKA&quot;,&quot;2&quot;:&quot;HRW-FV3&quot;},{&quot;1&quot;:&quot;ALASKA&quot;,&quot;2&quot;:&quot;NAEFS&quot;},{&quot;1&quot;:&quot;ALASKA&quot;,&quot;2&quot;:&quot;NAM-HIRES&quot;},{&quot;1&quot;:&quot;ALASKA&quot;,&quot;2&quot;:&quot;SREF&quot;},{&quot;1&quot;:&quot;ALASKA&quot;,&quot;2&quot;:&quot;GFS-WAVE&quot;},{&quot;1&quot;:&quot;ALASKA&quot;,&quot;2&quot;:&quot;PANELS&quot;},{&quot;1&quot;:&quot;ALASKA&quot;,&quot;2&quot;:&quot;STORM-TRACKS&quot;},{&quot;1&quot;:&quot;ALASKA&quot;,&quot;2&quot;:&quot;STORM-TRACKS-GFS-ACE&quot;},{&quot;1&quot;:&quot;ALASKA&quot;,&quot;2&quot;:&quot;STORM-TRACKS-NAM&quot;},{&quot;1&quot;:&quot;ALASKA&quot;,&quot;2&quot;:&quot;STORM-TRACKS-GEFS-ALASKA&quot;},{&quot;1&quot;:&quot;ALASKA&quot;,&quot;2&quot;:&quot;STORM-TRACKS-SREF-ALASKA&quot;},{&quot;1&quot;:&quot;ALASKA&quot;,&quot;2&quot;:&quot;STORM-TRACKS-GFSNAM&quot;},{&quot;1&quot;:&quot;ALASKA&quot;,&quot;2&quot;:&quot;STORM-TRACKS-GEFS-ALASKA-PROB&quot;},{&quot;1&quot;:&quot;ALASKA&quot;,&quot;2&quot;:&quot;STORM-TRACKS-SREF-ALASKA-PROB&quot;},{&quot;1&quot;:&quot;ALASKA&quot;,&quot;2&quot;:&quot;GEFS-WAVE&quot;},{&quot;1&quot;:&quot;SAMER&quot;,&quot;2&quot;:&quot;GEFS-MEAN-SPRD&quot;},{&quot;1&quot;:&quot;SAMER&quot;,&quot;2&quot;:&quot;GEFS-SPAG&quot;},{&quot;1&quot;:&quot;SAMER&quot;,&quot;2&quot;:&quot;GFS&quot;},{&quot;1&quot;:&quot;SAMER&quot;,&quot;2&quot;:&quot;AIGFS&quot;},{&quot;1&quot;:&quot;SAMER&quot;,&quot;2&quot;:&quot;NAEFS&quot;},{&quot;1&quot;:&quot;SAMER&quot;,&quot;2&quot;:&quot;PANELS&quot;},{&quot;1&quot;:&quot;AFRICA&quot;,&quot;2&quot;:&quot;GEFS-MEAN-SPRD&quot;},{&quot;1&quot;:&quot;AFRICA&quot;,&quot;2&quot;:&quot;GEFS-SPAG&quot;},{&quot;1&quot;:&quot;AFRICA&quot;,&quot;2&quot;:&quot;GFS&quot;},{&quot;1&quot;:&quot;AFRICA&quot;,&quot;2&quot;:&quot;AIGFS&quot;},{&quot;1&quot;:&quot;AFRICA&quot;,&quot;2&quot;:&quot;NAEFS&quot;},{&quot;1&quot;:&quot;AFRICA&quot;,&quot;2&quot;:&quot;GFS-WAVE&quot;},{&quot;1&quot;:&quot;AFRICA&quot;,&quot;2&quot;:&quot;PANELS&quot;},{&quot;1&quot;:&quot;AFRICA&quot;,&quot;2&quot;:&quot;GEFS-WAVE&quot;},{&quot;1&quot;:&quot;EAST-PAC&quot;,&quot;2&quot;:&quot;GEFS-MEAN-SPRD&quot;},{&quot;1&quot;:&quot;EAST-PAC&quot;,&quot;2&quot;:&quot;GEFS-SPAG&quot;},{&quot;1&quot;:&quot;EAST-PAC&quot;,&quot;2&quot;:&quot;GFS&quot;},{&quot;1&quot;:&quot;EAST-PAC&quot;,&quot;2&quot;:&quot;AIGFS&quot;},{&quot;1&quot;:&quot;EAST-PAC&quot;,&quot;2&quot;:&quot;NAEFS&quot;},{&quot;1&quot;:&quot;EAST-PAC&quot;,&quot;2&quot;:&quot;NAM&quot;},{&quot;1&quot;:&quot;EAST-PAC&quot;,&quot;2&quot;:&quot;GFS-WAVE&quot;},{&quot;1&quot;:&quot;EAST-PAC&quot;,&quot;2&quot;:&quot;PANELS&quot;},{&quot;1&quot;:&quot;EAST-PAC&quot;,&quot;2&quot;:&quot;GEFS-WAVE&quot;},{&quot;1&quot;:&quot;WEST-ATL&quot;,&quot;2&quot;:&quot;GEFS-MEAN-SPRD&quot;},{&quot;1&quot;:&quot;WEST-ATL&quot;,&quot;2&quot;:&quot;GEFS-SPAG&quot;},{&quot;1&quot;:&quot;WEST-ATL&quot;,&quot;2&quot;:&quot;GFS&quot;},{&quot;1&quot;:&quot;WEST-ATL&quot;,&quot;2&quot;:&quot;AIGFS&quot;},{&quot;1&quot;:&quot;WEST-ATL&quot;,&quot;2&quot;:&quot;NAEFS&quot;},{&quot;1&quot;:&quot;WEST-ATL&quot;,&quot;2&quot;:&quot;NAM&quot;},{&quot;1&quot;:&quot;WEST-ATL&quot;,&quot;2&quot;:&quot;GFS-WAVE&quot;},{&quot;1&quot;:&quot;WEST-ATL&quot;,&quot;2&quot;:&quot;PANELS&quot;},{&quot;1&quot;:&quot;WEST-ATL&quot;,&quot;2&quot;:&quot;GEFS-WAVE&quot;},{&quot;1&quot;:&quot;ATLANTIC&quot;,&quot;2&quot;:&quot;GEFS-MEAN-SPRD&quot;},{&quot;1&quot;:&quot;ATLANTIC&quot;,&quot;2&quot;:&quot;GEFS-SPAG&quot;},{&quot;1&quot;:&quot;ATLANTIC&quot;,&quot;2&quot;:&quot;GFS&quot;},{&quot;1&quot;:&quot;ATLANTIC&quot;,&quot;2&quot;:&quot;AIGFS&quot;},{&quot;1&quot;:&quot;ATLANTIC&quot;,&quot;2&quot;:&quot;NAEFS&quot;},{&quot;1&quot;:&quot;ATLANTIC&quot;,&quot;2&quot;:&quot;GFS-WAVE&quot;},{&quot;1&quot;:&quot;ATLANTIC&quot;,&quot;2&quot;:&quot;PANELS&quot;},{&quot;1&quot;:&quot;ATLANTIC&quot;,&quot;2&quot;:&quot;STORM-TRACKS&quot;},{&quot;1&quot;:&quot;ATLANTIC&quot;,&quot;2&quot;:&quot;STORM-TRACKS-GFS-ATLANTIC&quot;},{&quot;1&quot;:&quot;ATLANTIC&quot;,&quot;2&quot;:&quot;STORM-TRACKS-GEFS-ATLANTIC&quot;},{&quot;1&quot;:&quot;ATLANTIC&quot;,&quot;2&quot;:&quot;STORM-TRACKS-GEFS-ATLANTIC-PROB&quot;},{&quot;1&quot;:&quot;ATLANTIC&quot;,&quot;2&quot;:&quot;GEFS-WAVE&quot;},{&quot;1&quot;:&quot;POLAR&quot;,&quot;2&quot;:&quot;GEFS-MEAN-SPRD&quot;},{&quot;1&quot;:&quot;POLAR&quot;,&quot;2&quot;:&quot;GFS&quot;},{&quot;1&quot;:&quot;POLAR&quot;,&quot;2&quot;:&quot;AIGFS&quot;},{&quot;1&quot;:&quot;POLAR&quot;,&quot;2&quot;:&quot;NAEFS&quot;},{&quot;1&quot;:&quot;POLAR&quot;,&quot;2&quot;:&quot;ICE-DRIFT&quot;},{&quot;1&quot;:&quot;POLAR&quot;,&quot;2&quot;:&quot;GFS-WAVE&quot;},{&quot;1&quot;:&quot;POLAR&quot;,&quot;2&quot;:&quot;PANELS&quot;},{&quot;1&quot;:&quot;POLAR&quot;,&quot;2&quot;:&quot;GEFS-WAVE&quot;},{&quot;1&quot;:&quot;EUROPE&quot;,&quot;2&quot;:&quot;GEFS-MEAN-SPRD&quot;},{&quot;1&quot;:&quot;EUROPE&quot;,&quot;2&quot;:&quot;GEFS-SPAG&quot;},{&quot;1&quot;:&quot;EUROPE&quot;,&quot;2&quot;:&quot;GFS&quot;},{&quot;1&quot;:&quot;EUROPE&quot;,&quot;2&quot;:&quot;AIGFS&quot;},{&quot;1&quot;:&quot;EUROPE&quot;,&quot;2&quot;:&quot;NAEFS&quot;},{&quot;1&quot;:&quot;EUROPE&quot;,&quot;2&quot;:&quot;GFS-WAVE&quot;},{&quot;1&quot;:&quot;EUROPE&quot;,&quot;2&quot;:&quot;PANELS&quot;},{&quot;1&quot;:&quot;EUROPE&quot;,&quot;2&quot;:&quot;STORM-TRACKS&quot;},{&quot;1&quot;:&quot;EUROPE&quot;,&quot;2&quot;:&quot;STORM-TRACKS-GFS-ACE&quot;},{&quot;1&quot;:&quot;EUROPE&quot;,&quot;2&quot;:&quot;STORM-TRACKS-GEFS-EUROPE&quot;},{&quot;1&quot;:&quot;EUROPE&quot;,&quot;2&quot;:&quot;STORM-TRACKS-GEFS-EUROPE-PROB&quot;},{&quot;1&quot;:&quot;EUROPE&quot;,&quot;2&quot;:&quot;GEFS-WAVE&quot;},{&quot;1&quot;:&quot;ASIA&quot;,&quot;2&quot;:&quot;GEFS-MEAN-SPRD&quot;},{&quot;1&quot;:&quot;ASIA&quot;,&quot;2&quot;:&quot;GEFS-SPAG&quot;},{&quot;1&quot;:&quot;ASIA&quot;,&quot;2&quot;:&quot;GFS&quot;},{&quot;1&quot;:&quot;ASIA&quot;,&quot;2&quot;:&quot;AIGFS&quot;},{&quot;1&quot;:&quot;ASIA&quot;,&quot;2&quot;:&quot;NAEFS&quot;},{&quot;1&quot;:&quot;ASIA&quot;,&quot;2&quot;:&quot;PANELS&quot;},{&quot;1&quot;:&quot;ASIA&quot;,&quot;2&quot;:&quot;STORM-TRACKS&quot;},{&quot;1&quot;:&quot;ASIA&quot;,&quot;2&quot;:&quot;STORM-TRACKS-GFS-ASIA&quot;},{&quot;1&quot;:&quot;ASIA&quot;,&quot;2&quot;:&quot;STORM-TRACKS-GEFS-ASIA&quot;},{&quot;1&quot;:&quot;ASIA&quot;,&quot;2&quot;:&quot;STORM-TRACKS-GEFS-ASIA-PROB&quot;},{&quot;1&quot;:&quot;SOUTH-PAC&quot;,&quot;2&quot;:&quot;GEFS-MEAN-SPRD&quot;},{&quot;1&quot;:&quot;SOUTH-PAC&quot;,&quot;2&quot;:&quot;GEFS-SPAG&quot;},{&quot;1&quot;:&quot;SOUTH-PAC&quot;,&quot;2&quot;:&quot;GFS&quot;},{&quot;1&quot;:&quot;SOUTH-PAC&quot;,&quot;2&quot;:&quot;AIGFS&quot;},{&quot;1&quot;:&quot;SOUTH-PAC&quot;,&quot;2&quot;:&quot;NAEFS&quot;},{&quot;1&quot;:&quot;SOUTH-PAC&quot;,&quot;2&quot;:&quot;PANELS&quot;},{&quot;1&quot;:&quot;ARCTIC&quot;,&quot;2&quot;:&quot;GEFS-MEAN-SPRD&quot;},{&quot;1&quot;:&quot;ARCTIC&quot;,&quot;2&quot;:&quot;GFS&quot;},{&quot;1&quot;:&quot;ARCTIC&quot;,&quot;2&quot;:&quot;AIGFS&quot;},{&quot;1&quot;:&quot;ARCTIC&quot;,&quot;2&quot;:&quot;NAEFS&quot;},{&quot;1&quot;:&quot;ARCTIC&quot;,&quot;2&quot;:&quot;GFS-WAVE&quot;},{&quot;1&quot;:&quot;ARCTIC&quot;,&quot;2&quot;:&quot;PANELS&quot;},{&quot;1&quot;:&quot;ARCTIC&quot;,&quot;2&quot;:&quot;GEFS-WAVE&quot;},{&quot;1&quot;:&quot;INDIA&quot;,&quot;2&quot;:&quot;GEFS-MEAN-SPRD&quot;},{&quot;1&quot;:&quot;INDIA&quot;,&quot;2&quot;:&quot;GEFS-SPAG&quot;},{&quot;1&quot;:&quot;INDIA&quot;,&quot;2&quot;:&quot;GFS&quot;},{&quot;1&quot;:&quot;INDIA&quot;,&quot;2&quot;:&quot;AIGFS&quot;},{&quot;1&quot;:&quot;INDIA&quot;,&quot;2&quot;:&quot;NAEFS&quot;},{&quot;1&quot;:&quot;INDIA&quot;,&quot;2&quot;:&quot;GFS-WAVE&quot;},{&quot;1&quot;:&quot;INDIA&quot;,&quot;2&quot;:&quot;PANELS&quot;},{&quot;1&quot;:&quot;INDIA&quot;,&quot;2&quot;:&quot;GEFS-WAVE&quot;},{&quot;1&quot;:&quot;US-SAMOA&quot;,&quot;2&quot;:&quot;GFS&quot;},{&quot;1&quot;:&quot;US-SAMOA&quot;,&quot;2&quot;:&quot;AIGFS&quot;},{&quot;1&quot;:&quot;US-SAMOA&quot;,&quot;2&quot;:&quot;GFS-WAVE&quot;},{&quot;1&quot;:&quot;US-SAMOA&quot;,&quot;2&quot;:&quot;PANELS&quot;},{&quot;1&quot;:&quot;US-SAMOA&quot;,&quot;2&quot;:&quot;GEFS-WAVE&quot;},{&quot;1&quot;:&quot;PAC-REGION&quot;,&quot;2&quot;:&quot;GFS&quot;},{&quot;1&quot;:&quot;PAC-REGION&quot;,&quot;2&quot;:&quot;AIGFS&quot;},{&quot;1&quot;:&quot;PAC-REGION&quot;,&quot;2&quot;:&quot;GFS-WAVE&quot;},{&quot;1&quot;:&quot;PAC-REGION&quot;,&quot;2&quot;:&quot;GEFS-WAVE&quot;},{&quot;1&quot;:&quot;US-NW&quot;,&quot;2&quot;:&quot;HREF&quot;},{&quot;1&quot;:&quot;US-NW&quot;,&quot;2&quot;:&quot;HRW-ARW2&quot;},{&quot;1&quot;:&quot;US-NW&quot;,&quot;2&quot;:&quot;HRRR&quot;},{&quot;1&quot;:&quot;US-NW&quot;,&quot;2&quot;:&quot;HRRR-SUBH&quot;},{&quot;1&quot;:&quot;US-NW&quot;,&quot;2&quot;:&quot;HRW-ARW&quot;},{&quot;1&quot;:&quot;US-NW&quot;,&quot;2&quot;:&quot;HRW-FV3&quot;},{&quot;1&quot;:&quot;US-NW&quot;,&quot;2&quot;:&quot;NAM-HIRES&quot;},{&quot;1&quot;:&quot;US-NW&quot;,&quot;2&quot;:&quot;PANELS&quot;},{&quot;1&quot;:&quot;US-SW&quot;,&quot;2&quot;:&quot;HREF&quot;},{&quot;1&quot;:&quot;US-SW&quot;,&quot;2&quot;:&quot;HRW-ARW2&quot;},{&quot;1&quot;:&quot;US-SW&quot;,&quot;2&quot;:&quot;HRRR&quot;},{&quot;1&quot;:&quot;US-SW&quot;,&quot;2&quot;:&quot;HRRR-SUBH&quot;},{&quot;1&quot;:&quot;US-SW&quot;,&quot;2&quot;:&quot;HRW-ARW&quot;},{&quot;1&quot;:&quot;US-SW&quot;,&quot;2&quot;:&quot;HRW-FV3&quot;},{&quot;1&quot;:&quot;US-SW&quot;,&quot;2&quot;:&quot;NAM-HIRES&quot;},{&quot;1&quot;:&quot;US-SW&quot;,&quot;2&quot;:&quot;PANELS&quot;},{&quot;1&quot;:&quot;US-NC&quot;,&quot;2&quot;:&quot;HREF&quot;},{&quot;1&quot;:&quot;US-NC&quot;,&quot;2&quot;:&quot;HRW-ARW2&quot;},{&quot;1&quot;:&quot;US-NC&quot;,&quot;2&quot;:&quot;HRRR&quot;},{&quot;1&quot;:&quot;US-NC&quot;,&quot;2&quot;:&quot;HRRR-SUBH&quot;},{&quot;1&quot;:&quot;US-NC&quot;,&quot;2&quot;:&quot;HRW-ARW&quot;},{&quot;1&quot;:&quot;US-NC&quot;,&quot;2&quot;:&quot;HRW-FV3&quot;},{&quot;1&quot;:&quot;US-NC&quot;,&quot;2&quot;:&quot;NAM-HIRES&quot;},{&quot;1&quot;:&quot;US-NC&quot;,&quot;2&quot;:&quot;PANELS&quot;},{&quot;1&quot;:&quot;US-SC&quot;,&quot;2&quot;:&quot;HREF&quot;},{&quot;1&quot;:&quot;US-SC&quot;,&quot;2&quot;:&quot;HRW-ARW2&quot;},{&quot;1&quot;:&quot;US-SC&quot;,&quot;2&quot;:&quot;HRRR&quot;},{&quot;1&quot;:&quot;US-SC&quot;,&quot;2&quot;:&quot;HRRR-SUBH&quot;},{&quot;1&quot;:&quot;US-SC&quot;,&quot;2&quot;:&quot;HRW-ARW&quot;},{&quot;1&quot;:&quot;US-SC&quot;,&quot;2&quot;:&quot;HRW-FV3&quot;},{&quot;1&quot;:&quot;US-SC&quot;,&quot;2&quot;:&quot;NAM-HIRES&quot;},{&quot;1&quot;:&quot;US-SC&quot;,&quot;2&quot;:&quot;PANELS&quot;},{&quot;1&quot;:&quot;US-NE&quot;,&quot;2&quot;:&quot;HREF&quot;},{&quot;1&quot;:&quot;US-NE&quot;,&quot;2&quot;:&quot;HRW-ARW2&quot;},{&quot;1&quot;:&quot;US-NE&quot;,&quot;2&quot;:&quot;HRRR&quot;},{&quot;1&quot;:&quot;US-NE&quot;,&quot;2&quot;:&quot;HRRR-SUBH&quot;},{&quot;1&quot;:&quot;US-NE&quot;,&quot;2&quot;:&quot;HRW-ARW&quot;},{&quot;1&quot;:&quot;US-NE&quot;,&quot;2&quot;:&quot;HRW-FV3&quot;},{&quot;1&quot;:&quot;US-NE&quot;,&quot;2&quot;:&quot;NAM-HIRES&quot;},{&quot;1&quot;:&quot;US-NE&quot;,&quot;2&quot;:&quot;PANELS&quot;},{&quot;1&quot;:&quot;US-SE&quot;,&quot;2&quot;:&quot;HREF&quot;},{&quot;1&quot;:&quot;US-SE&quot;,&quot;2&quot;:&quot;HRW-ARW2&quot;},{&quot;1&quot;:&quot;US-SE&quot;,&quot;2&quot;:&quot;HRRR&quot;},{&quot;1&quot;:&quot;US-SE&quot;,&quot;2&quot;:&quot;HRRR-SUBH&quot;},{&quot;1&quot;:&quot;US-SE&quot;,&quot;2&quot;:&quot;HRW-ARW&quot;},{&quot;1&quot;:&quot;US-SE&quot;,&quot;2&quot;:&quot;HRW-FV3&quot;},{&quot;1&quot;:&quot;US-SE&quot;,&quot;2&quot;:&quot;NAM-HIRES&quot;},{&quot;1&quot;:&quot;US-SE&quot;,&quot;2&quot;:&quot;PANELS&quot;},{&quot;1&quot;:&quot;PR&quot;,&quot;2&quot;:&quot;HRW-ARW2&quot;},{&quot;1&quot;:&quot;PR&quot;,&quot;2&quot;:&quot;NBM&quot;},{&quot;1&quot;:&quot;PR&quot;,&quot;2&quot;:&quot;HRW-ARW&quot;},{&quot;1&quot;:&quot;PR&quot;,&quot;2&quot;:&quot;HRW-FV3&quot;},{&quot;1&quot;:&quot;PR&quot;,&quot;2&quot;:&quot;GFS-WAVE&quot;},{&quot;1&quot;:&quot;PR&quot;,&quot;2&quot;:&quot;GEFS-WAVE&quot;},{&quot;1&quot;:&quot;ATL-PAC&quot;,&quot;2&quot;:&quot;GFS-WAVE&quot;},{&quot;1&quot;:&quot;ATL-PAC&quot;,&quot;2&quot;:&quot;GEFS-WAVE&quot;},{&quot;1&quot;:&quot;GOAM&quot;,&quot;2&quot;:&quot;GFS-WAVE&quot;},{&quot;1&quot;:&quot;GOAM&quot;,&quot;2&quot;:&quot;GEFS-WAVE&quot;}]"></div><div id="cycleInfo" data-cycle-name="&quot;&quot;"></div><div id="paramData" data-param-name="&quot;&quot;"></div>
    <script src="js/mag_scripts_json.js"></script>
    <script src="js/model_guidance_scripts.js"></script>


<div id="mag_info_bar" class="center smallfont">
  <a class="redhover" href="version_updates.php" target="_blank">What's New | </a>
  <a class="redhover" href="help/index.php" target="_blank">User's Guide |</a>
  <a class="redhover" href="docs/faq.pdf" target="_blank">Frequently Asked Questions | </a>
  <a class="redhover" href="docs/NCEP_PDD_MAG.pdf" target="_blank">Product Description Document</a>

  <br>

  MAG v7.0.0
  &nbsp; &nbsp; &nbsp; College Park, MD

</div>

<footer id="footer">
   <!-- footer.twig -->
   <div class="footer-legal">

      <div id="footerLogo" class="grid col-20">
         <a href="http://www.usa.gov"><img src="/bundles/noaatemplating/images/usa_gov.png" alt="usa.gov" width="110" height="30"></a>
      </div>

      <div class="grid col-25">
         <ul class="list-unstyled">
            <li><a href="http://www.commerce.gov">US Dept of Commerce</a></li>
            <li><a href="http://www.noaa.gov">National Oceanic and Atmospheric Administration</a></li>
            <li><a href="https://www.weather.gov">National Weather Service</a></li>
            <li><a href="http://www.ncep.noaa.gov/">National Centers for Environmental Prediction</a></li>
            <li><span class="smallTxt" style="color:blue">5830 University Research Court</span></li>
            <li><span class="smallTxt" style="color:blue">College Park, MD  20740</span></li>
            <li><a href="http://www.nco.ncep.noaa.gov/mail_webmaster/">NCEP Internet Services Team</a></li>
         </ul>
      </div>

      <div class="grid col-25">
         <ul class="list-unstyled">
            <li><a href="https://www.weather.gov/disclaimer">Disclaimer</a></li>
            <li><a href="http://www.cio.noaa.gov/services_programs/info_quality.html">Information Quality</a></li>
            <li><a href="https://www.weather.gov/help">Help</a></li>
            <li><a href="https://www.weather.gov/glossary">Glossary</a></li>
            <li><a href="https://www.weather.gov/contact">Comments? Questions? Please Contact Us</a></li>
         </ul>
      </div>

      <div class="grid col-25">
         <ul class="list-unstyled">
            <li><a href="https://www.weather.gov/privacy">Privacy Policy</a></li>
            <li><a href="https://www.foia.gov/">Freedom of Information Act (FOIA)</a></li>
            <li><a href="https://www.weather.gov/about">About Us</a></li>
            <li><a href="https://www.weather.gov/careers">Career Opportunities</a></li>
         </ul>
      </div>

   </div>
   <!-- end footer.twig -->
</footer>
<span class="gray" style="margin-left:20px">Page last modified:August 17 2026 18:43 PM UTC.</span><script src="/bundles/noaatemplating/js/general-dom.js?MAGv7.0.0"></script>
<script src="/bundles/noaatemplating/cdn/js/modernizr.2.8.3.min.js?MAGv7.0.0"></script>
<script src="/bundles/noaatemplating/js/nav.js?MAGv7.0.0"></script>
<script src="/bundles/noaatemplating/cdn/js/jquery.autocomplete.1.2.22.min.js?MAGv7.0.0"></script>
<script src="/bundles/noaatemplating/cdn/js/store+json.1.3.20.min.js?MAGv7.0.0"></script>
<script src="/bundles/noaatemplating/js/forecast.search.js?MAGv7.0.0"></script>

</main>
</body>
</html>

