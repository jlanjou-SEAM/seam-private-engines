<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="DC.title" content="Observations and Analysis: Type and Area">
<meta name="DC.description" content="Displays Observations and Analysis Types and Areas for a user to choose from">
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
<title>Observations and Analysis: Type and Area</title>
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

<table class="noborder_center_100">
  <tr>
    <td style="text-align: center; width: 15%">
      <!-- back button -->
      <button id="backButton" class="nav_button" type="button">Back</button>
    </td>
    <td style="text-align: center">
      <!-- Heading -->
      <span class="page_heading">Observations and Analyses</span>
    </td>
    <td style="text-align: center; width: 15%">
      <!-- home button -->
      <button id="homeButton" class="nav_button" type="button">Home</button>
    </td>
  </tr>
</table>



<div class="center100" style="margin-top:20px;margin-bottom:20px">
      <span id="selection_prompt" class="page_sub_heading boldorange">To view images, select an Obs/Analysis Type and Obs/Analysis Area</span>
      <button id="resetSelectionButton" class="info_button" type="button">Reset Selection(s)</button>
</div>

    <script type="text/javascript"></script> 
<noscript><h3>The MAG website requires JavaScript. Please enable JavaScript.</h3></noscript> 

<table id="obstype" class="param_table " >
<tr>
<th id="Obs_and_Analysis_Type" colspan="3" class="param_header_bar "> 
<div class="param_text_header"> 
Obs / Analysis Type</div></th>
</tr>
<tr>
<td class="border_td UAIR " style="width:33.333333333333%"> 
<div class="param_text"><a id='obstype_UAIR' href='#' data-group-name='Observations and Analyses' data-model='UAIR' title='Upper Air Plots' class='model_link'>UAIR</a></div>
</td>
<td class="border_td SKEWT " style="width:33.333333333333%"> 
<div class="param_text"><a id='obstype_SKEWT' href='#' data-group-name='Observations and Analyses' data-model='SKEWT' title='Skew-T Plots' class='model_link'>SKEWT</a></div>
</td>
<td class="border_td RTMA " style="width:33.333333333333%"> 
<div class="param_text"><a id='obstype_RTMA' href='#' data-group-name='Observations and Analyses' data-model='RTMA' title='Real-Time Mesoscale Analysis' class='model_link'>RTMA</a></div>
</td>
</tr>
</table>
<table id="obsarea" class="param_table" >
<tr>
<th id="Obs_and_Analysis_Area" colspan="4" class="param_header_bar border_td "> 
<div class="param_text_header"> 
Obs / Analysis Area</div></th>
</tr><tr>
<td headers="Obs_and_Analysis_Area" class="NAMER border_td" style="width:25%">
<div class="param_text"><a id="obsarea_NAMER" href="#" 
            class="obs-area-link" 
            data-group-name="Observations and Analyses" 
            data-area="NAMER" 
            data-area-description="North America - US, Canada, and northern Mexico" title="North America - US, Canada, and northern Mexico">NAMER</a></div>
</td>
<td headers="Obs_and_Analysis_Area" class="CA border_td" style="width:25%">
<div class="param_text"><a id="obsarea_CA" href="#" 
            class="obs-area-link" 
            data-group-name="Observations and Analyses" 
            data-area="CA" 
            data-area-description="California" title="California">CA</a></div>
</td>
<td headers="Obs_and_Analysis_Area" class="CO border_td" style="width:25%">
<div class="param_text"><a id="obsarea_CO" href="#" 
            class="obs-area-link" 
            data-group-name="Observations and Analyses" 
            data-area="CO" 
            data-area-description="Colorado" title="Colorado">CO</a></div>
</td>
<td headers="Obs_and_Analysis_Area" class="FL border_td" style="width:25%">
<div class="param_text"><a id="obsarea_FL" href="#" 
            class="obs-area-link" 
            data-group-name="Observations and Analyses" 
            data-area="FL" 
            data-area-description="Florida" title="Florida">FL</a></div>
</td>
</tr>
<tr>
<td headers="Obs_and_Analysis_Area" class="MI border_td" style="width:25%">
<div class="param_text"><a id="obsarea_MI" href="#" 
            class="obs-area-link" 
            data-group-name="Observations and Analyses" 
            data-area="MI" 
            data-area-description="Michigan" title="Michigan">MI</a></div>
</td>
<td headers="Obs_and_Analysis_Area" class="MT border_td" style="width:25%">
<div class="param_text"><a id="obsarea_MT" href="#" 
            class="obs-area-link" 
            data-group-name="Observations and Analyses" 
            data-area="MT" 
            data-area-description="Montana" title="Montana">MT</a></div>
</td>
<td headers="Obs_and_Analysis_Area" class="TX border_td" style="width:25%">
<div class="param_text"><a id="obsarea_TX" href="#" 
            class="obs-area-link" 
            data-group-name="Observations and Analyses" 
            data-area="TX" 
            data-area-description="Texas" title="Texas">TX</a></div>
</td>
<td headers="Obs_and_Analysis_Area" class="WI border_td" style="width:25%">
<div class="param_text"><a id="obsarea_WI" href="#" 
            class="obs-area-link" 
            data-group-name="Observations and Analyses" 
            data-area="WI" 
            data-area-description="Wisconsin" title="Wisconsin">WI</a></div>
</td>
</tr>
<tr>
<td headers="Obs_and_Analysis_Area" class="AFRICA border_td" style="width:25%">
<div class="param_text"><a id="obsarea_AFRICA" href="#" 
            class="obs-area-link" 
            data-group-name="Observations and Analyses" 
            data-area="AFRICA" 
            data-area-description="Africa - Africa, Southern Europe, Southwest Asia" title="Africa - Africa, Southern Europe, Southwest Asia">AFRICA</a></div>
</td>
<td headers="Obs_and_Analysis_Area" class="ALASKA border_td" style="width:25%">
<div class="param_text"><a id="obsarea_ALASKA" href="#" 
            class="obs-area-link" 
            data-group-name="Observations and Analyses" 
            data-area="ALASKA" 
            data-area-description="Alaska Region" title="Alaska Region">ALASKA</a></div>
</td>
<td headers="Obs_and_Analysis_Area" class="GUAM border_td" style="width:25%">
<div class="param_text"><a id="obsarea_GUAM" href="#" 
            class="obs-area-link" 
            data-group-name="Observations and Analyses" 
            data-area="GUAM" 
            data-area-description="Guam" title="Guam">GUAM</a></div>
</td>
<td headers="Obs_and_Analysis_Area" class="GULF-COAST border_td" style="width:25%">
<div class="param_text"><a id="obsarea_GULF-COAST" href="#" 
            class="obs-area-link" 
            data-group-name="Observations and Analyses" 
            data-area="GULF-COAST" 
            data-area-description="Gulf Coast Region of United States" title="Gulf Coast Region of United States">GULF-COAST</a></div>
</td>
</tr>
<tr>
<td headers="Obs_and_Analysis_Area" class="MID-ATL border_td" style="width:25%">
<div class="param_text"><a id="obsarea_MID-ATL" href="#" 
            class="obs-area-link" 
            data-group-name="Observations and Analyses" 
            data-area="MID-ATL" 
            data-area-description="Mid-Atlantic Region of United States" title="Mid-Atlantic Region of United States">MID-ATL</a></div>
</td>
<td headers="Obs_and_Analysis_Area" class="MID-WEST border_td" style="width:25%">
<div class="param_text"><a id="obsarea_MID-WEST" href="#" 
            class="obs-area-link" 
            data-group-name="Observations and Analyses" 
            data-area="MID-WEST" 
            data-area-description="Midwest Region of United States" title="Midwest Region of United States">MID-WEST</a></div>
</td>
<td headers="Obs_and_Analysis_Area" class="NC_SC border_td" style="width:25%">
<div class="param_text"><a id="obsarea_NC_SC" href="#" 
            class="obs-area-link" 
            data-group-name="Observations and Analyses" 
            data-area="NC_SC" 
            data-area-description="Carolinas" title="Carolinas">NC_SC</a></div>
</td>
<td headers="Obs_and_Analysis_Area" class="ND_SD border_td" style="width:25%">
<div class="param_text"><a id="obsarea_ND_SD" href="#" 
            class="obs-area-link" 
            data-group-name="Observations and Analyses" 
            data-area="ND_SD" 
            data-area-description="Dakotas" title="Dakotas">ND_SD</a></div>
</td>
</tr>
<tr>
<td headers="Obs_and_Analysis_Area" class="NEW-ENG border_td" style="width:25%">
<div class="param_text"><a id="obsarea_NEW-ENG" href="#" 
            class="obs-area-link" 
            data-group-name="Observations and Analyses" 
            data-area="NEW-ENG" 
            data-area-description="New England Region of United States" title="New England Region of United States">NEW-ENG</a></div>
</td>
<td headers="Obs_and_Analysis_Area" class="NORTH-PAC border_td" style="width:25%">
<div class="param_text"><a id="obsarea_NORTH-PAC" href="#" 
            class="obs-area-link" 
            data-group-name="Observations and Analyses" 
            data-area="NORTH-PAC" 
            data-area-description="North Pacific - Western US, Alaska, Western Canada, Hawaii, North Pacific Ocean" title="North Pacific - Western US, Alaska, Western Canada, Hawaii, North Pacific Ocean">NORTH-PAC</a></div>
</td>
<td headers="Obs_and_Analysis_Area" class="NW-PACIFIC border_td" style="width:25%">
<div class="param_text"><a id="obsarea_NW-PACIFIC" href="#" 
            class="obs-area-link" 
            data-group-name="Observations and Analyses" 
            data-area="NW-PACIFIC" 
            data-area-description="Pacific Northwest Region of United States" title="Pacific Northwest Region of United States">NW-PACIFIC</a></div>
</td>
<td headers="Obs_and_Analysis_Area" class="OHIO-VALLEY border_td" style="width:25%">
<div class="param_text"><a id="obsarea_OHIO-VALLEY" href="#" 
            class="obs-area-link" 
            data-group-name="Observations and Analyses" 
            data-area="OHIO-VALLEY" 
            data-area-description="Ohio Valley Region of United States" title="Ohio Valley Region of United States">OHIO-VALLEY</a></div>
</td>
</tr>
<tr>
<td headers="Obs_and_Analysis_Area" class="SAMER border_td" style="width:25%">
<div class="param_text"><a id="obsarea_SAMER" href="#" 
            class="obs-area-link" 
            data-group-name="Observations and Analyses" 
            data-area="SAMER" 
            data-area-description="South America - South America, Southern Caribbean Sea" title="South America - South America, Southern Caribbean Sea">SAMER</a></div>
</td>
<td headers="Obs_and_Analysis_Area" class="SW_US border_td" style="width:25%">
<div class="param_text"><a id="obsarea_SW_US" href="#" 
            class="obs-area-link" 
            data-group-name="Observations and Analyses" 
            data-area="SW_US" 
            data-area-description="Southwest Region of United States" title="Southwest Region of United States">SW_US</a></div>
</td>
<td headers="Obs_and_Analysis_Area" class="WEST-ATL border_td" style="width:25%">
<div class="param_text"><a id="obsarea_WEST-ATL" href="#" 
            class="obs-area-link" 
            data-group-name="Observations and Analyses" 
            data-area="WEST-ATL" 
            data-area-description="Western North Atlantic - Southeast US, Central America, Caribbean" title="Western North Atlantic - Southeast US, Central America, Caribbean">WEST-ATL</a></div>
</td>
<td headers="Obs_and_Analysis_Area" class=" border_td" style="width:25%">
&nbsp;</td>
</tr>

</table>


<table class="center100" style="background-color:#FFFFFF;" >
<tr>
   <td>
       <img src="mag_images/mag-world-background.gif" id="world_map_id"
          style="max-width:582px;margin-top:5px;margin-bottom:5px"
          title="NCEP MAG world map image" alt="NCO World Page">

      </td>
</tr>
</table>

<script id="appConfig" type="application/json">{"chosen_group":"\"Observations and Analyses\"","chosen_model":"null","chosen_area":"null","chosen_fourpanel":"null","cycle_list":[""],"chosen_cycle":"undefined","chosen_param":"undefined"}</script><div id="fourPanelData" data-fourpanel="&quot;&quot;"></div><div id="pageInfo" data-self-url="/observation-type-area.php"></div><div id="modelStorm2dData" data-storms="&quot;&quot;"></div><div id="modelArea2dData" data-model-areas="[[],{&quot;1&quot;:&quot;RTMA&quot;,&quot;2&quot;:&quot;GUAM&quot;},{&quot;1&quot;:&quot;RTMA&quot;,&quot;2&quot;:&quot;ALASKA&quot;},{&quot;1&quot;:&quot;RTMA&quot;,&quot;2&quot;:&quot;SW_US&quot;},{&quot;1&quot;:&quot;RTMA&quot;,&quot;2&quot;:&quot;CA&quot;},{&quot;1&quot;:&quot;RTMA&quot;,&quot;2&quot;:&quot;NC_SC&quot;},{&quot;1&quot;:&quot;RTMA&quot;,&quot;2&quot;:&quot;CO&quot;},{&quot;1&quot;:&quot;RTMA&quot;,&quot;2&quot;:&quot;ND_SD&quot;},{&quot;1&quot;:&quot;RTMA&quot;,&quot;2&quot;:&quot;MID-WEST&quot;},{&quot;1&quot;:&quot;RTMA&quot;,&quot;2&quot;:&quot;GULF-COAST&quot;},{&quot;1&quot;:&quot;RTMA&quot;,&quot;2&quot;:&quot;MID-ATL&quot;},{&quot;1&quot;:&quot;RTMA&quot;,&quot;2&quot;:&quot;MI&quot;},{&quot;1&quot;:&quot;RTMA&quot;,&quot;2&quot;:&quot;MT&quot;},{&quot;1&quot;:&quot;RTMA&quot;,&quot;2&quot;:&quot;NEW-ENG&quot;},{&quot;1&quot;:&quot;RTMA&quot;,&quot;2&quot;:&quot;OHIO-VALLEY&quot;},{&quot;1&quot;:&quot;RTMA&quot;,&quot;2&quot;:&quot;TX&quot;},{&quot;1&quot;:&quot;RTMA&quot;,&quot;2&quot;:&quot;NW-PACIFIC&quot;},{&quot;1&quot;:&quot;RTMA&quot;,&quot;2&quot;:&quot;WI&quot;},{&quot;1&quot;:&quot;RTMA&quot;,&quot;2&quot;:&quot;FL&quot;},{&quot;1&quot;:&quot;SKEWT&quot;,&quot;2&quot;:&quot;NAMER&quot;},{&quot;1&quot;:&quot;SKEWT&quot;,&quot;2&quot;:&quot;SAMER&quot;},{&quot;1&quot;:&quot;SKEWT&quot;,&quot;2&quot;:&quot;AFRICA&quot;},{&quot;1&quot;:&quot;SKEWT&quot;,&quot;2&quot;:&quot;NORTH-PAC&quot;},{&quot;1&quot;:&quot;UAIR&quot;,&quot;2&quot;:&quot;NAMER&quot;},{&quot;1&quot;:&quot;UAIR&quot;,&quot;2&quot;:&quot;SAMER&quot;},{&quot;1&quot;:&quot;UAIR&quot;,&quot;2&quot;:&quot;AFRICA&quot;},{&quot;1&quot;:&quot;UAIR&quot;,&quot;2&quot;:&quot;ALASKA&quot;},{&quot;1&quot;:&quot;UAIR&quot;,&quot;2&quot;:&quot;WEST-ATL&quot;}]"></div><div id="stormModel2dData" data-storms-models="&quot;&quot;"></div><div id="areaModel2dData" data-area-models="[[],{&quot;1&quot;:&quot;GUAM&quot;,&quot;2&quot;:&quot;RTMA&quot;},{&quot;1&quot;:&quot;ALASKA&quot;,&quot;2&quot;:&quot;RTMA&quot;},{&quot;1&quot;:&quot;ALASKA&quot;,&quot;2&quot;:&quot;UAIR&quot;},{&quot;1&quot;:&quot;SW_US&quot;,&quot;2&quot;:&quot;RTMA&quot;},{&quot;1&quot;:&quot;CA&quot;,&quot;2&quot;:&quot;RTMA&quot;},{&quot;1&quot;:&quot;NC_SC&quot;,&quot;2&quot;:&quot;RTMA&quot;},{&quot;1&quot;:&quot;CO&quot;,&quot;2&quot;:&quot;RTMA&quot;},{&quot;1&quot;:&quot;ND_SD&quot;,&quot;2&quot;:&quot;RTMA&quot;},{&quot;1&quot;:&quot;MID-WEST&quot;,&quot;2&quot;:&quot;RTMA&quot;},{&quot;1&quot;:&quot;GULF-COAST&quot;,&quot;2&quot;:&quot;RTMA&quot;},{&quot;1&quot;:&quot;MID-ATL&quot;,&quot;2&quot;:&quot;RTMA&quot;},{&quot;1&quot;:&quot;MI&quot;,&quot;2&quot;:&quot;RTMA&quot;},{&quot;1&quot;:&quot;MT&quot;,&quot;2&quot;:&quot;RTMA&quot;},{&quot;1&quot;:&quot;NEW-ENG&quot;,&quot;2&quot;:&quot;RTMA&quot;},{&quot;1&quot;:&quot;OHIO-VALLEY&quot;,&quot;2&quot;:&quot;RTMA&quot;},{&quot;1&quot;:&quot;TX&quot;,&quot;2&quot;:&quot;RTMA&quot;},{&quot;1&quot;:&quot;NW-PACIFIC&quot;,&quot;2&quot;:&quot;RTMA&quot;},{&quot;1&quot;:&quot;WI&quot;,&quot;2&quot;:&quot;RTMA&quot;},{&quot;1&quot;:&quot;FL&quot;,&quot;2&quot;:&quot;RTMA&quot;},{&quot;1&quot;:&quot;NAMER&quot;,&quot;2&quot;:&quot;SKEWT&quot;},{&quot;1&quot;:&quot;NAMER&quot;,&quot;2&quot;:&quot;UAIR&quot;},{&quot;1&quot;:&quot;SAMER&quot;,&quot;2&quot;:&quot;SKEWT&quot;},{&quot;1&quot;:&quot;SAMER&quot;,&quot;2&quot;:&quot;UAIR&quot;},{&quot;1&quot;:&quot;AFRICA&quot;,&quot;2&quot;:&quot;SKEWT&quot;},{&quot;1&quot;:&quot;AFRICA&quot;,&quot;2&quot;:&quot;UAIR&quot;},{&quot;1&quot;:&quot;NORTH-PAC&quot;,&quot;2&quot;:&quot;SKEWT&quot;},{&quot;1&quot;:&quot;WEST-ATL&quot;,&quot;2&quot;:&quot;UAIR&quot;}]"></div><div id="cycleInfo" data-cycle-name="&quot;&quot;"></div><div id="paramData" data-param-name="&quot;&quot;"></div>

    <script src="js/mag_scripts_json.js"></script>
    <script src="js/oa_scripts.js"></script>
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

