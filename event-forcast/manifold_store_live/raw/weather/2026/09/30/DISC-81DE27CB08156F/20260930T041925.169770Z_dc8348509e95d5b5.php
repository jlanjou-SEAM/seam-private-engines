<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="DC.title" content="Model Analyses and Guidance">
<meta name="DC.description" content="Model Analyses and Guidance">
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
<title>Model Analyses and Guidance</title>
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

<div id="text_page_container" 
style="font-family: Arial, Helvetica, San Serif;margin-left:40px;margin-right:40px;margin-bottom:40px;"> <!-- Main Container -->

<!-- Define the back, home, and group buttons     -->


<div class="three_items"  >

   <div class="left" >
      <button class="nav_button" type="button" id="backButton">Back</button>
   </div>
   <div class="middle" >
     <div class="boldblue largefont">MAG Version Updates</div>
   </div>
   <div class="right" >
      <button class="nav_button" type="button" id="homeButton">Home</button>
   </div>
</div>

<div class="mediumnormalfont">
<div style="clear:both;"></div>

<div id="version_updates">
<h1>MAG 7.0.0 - August 2026</h1>
<h2>New Models, Products, and Areas:</h2>
<ul>
<li>Added a new model, Artificial Intelligence Global Forecast System (AIGFS) for the following domains and products:</li>
<ul>
<li class="li3">Domains:</h3>
<ul>
        <li class="li2">NAMER</li>
        <li class="li2">CONUS</li>
        <li class="li2">Africa</li>
        <li class="li2">Alaska</li>
        <li class="li2">Arctic</li>
        <li class="li2">Asia</li>
        <li class="li2">Atlantic</li>
        <li class="li2">East-Pac</li>
        <li class="li2">Europe</li>
        <li class="li2">India</li>
        <li class="li2">North-Pac</li>
        <li class="li2">Pac-region</li>
        <li class="li2">Polar</li>
        <li class="li2">SAMER</li>
        <li class="li2">South-Pac</li>
        <li class="li2">US-Samoa</li>
        <li class="li2">West-Atl</li>
</ul>
<li class="li3">Products:</h3>
<ul>
        <li class="li2">precip_p06/p12/p24/p36/p48/p60/precip_ptot</li>
<ul>
        <li class="li2">Precipitation products are not plotted for the Polar domain.</li>
</ul>
        <li class="li2">1000_500_thick</li>
        <li class="li2">1000_850_thick</li>
        <li class="li2">850_700_thick</li>
        <li class="li2">850_temp_mslp_precip</li>
        <li class="li2">10m_wnd_precip</li>
        <li class="li2">10m_wnd_2m_precip</li>
        <li class="li2">200/250/300/500_wnd_ht</li>
        <li class="li2">500/700/850_rh_ht</li>
        <li class="li2">500/850_vort_ht</li>
        <li class="li2">850_temp_ht</li>
        <li class="li2">850vor_500ht_200wd</li>
        <li class="li2">925_temp_ht</li>
</ul>
</ul>
<li>Added the following new products for tropical guidance:</li>
<ul>
        <li class="li3">HFSA/B-PARENT:</h3>
<ul>
        <li class="li2">pwat - Precipitable water</li>
        <li class="li2">composite reflectivity</li>
        <li class="li2">2m_temp_mslp_10wnd</li>
        <li class="li2">sensible_heat_flux</li>
        <li class="li2">latent_heat_flux</li>
        <li class="li2">sea_surface_temp</li>
        <li class="li2">sea_surface_salinity</li>
        <li class="li2">mixed_layer_depth</li>
        <li class="li2">mid_level_rh</li>
        <li class="li2">850_temp_ht</li>
        <li class="li2">vertical_wind_shear</li>
        <li class="li2">brightness_temp_band9</li>
        <li class="li2">brightness_temp_band13</li>
</ul>
        <li class="li3">HFSA/B-NESTED:</h3>
<ul>
        <li class="li2">pwat - Precipitable water</li>
        <li class="li2">composite reflectivity</li>
        <li class="li2">2m_temp_mslp_10wnd</li>
	<li class="li2">mid_level_rh</li>
        <li class="li2">850_temp_ht</li>
        <li class="li2">vertical_wind_shear</li>
        <li class="li2">brightness_temp_band9</li>
        <li class="li2">brightness_temp_band13</li>
</ul>
</ul>
<ul>
</ul>
<li>Added the following new domains to STOFS model:</li>
<ul>
        <li class="li3">GUAM</h3>
        <li class="li3">North-Pac</h3>
</ul>

</ul>
<h2>Other updates:</h2>
<ul>
        <li>Improved Tropical Guidance model output image quality and color palette.</li>
	<li>Renamed mslp_10wnd as mslp_10mwnd_sfc_temp for the HFSA/B -PARENT/NESTED Tropical Guidance models.</li>
</ul>
</ul>
</ul>
<h1>MAG 6.0.1 - May 2026</h1>
<h2>New Models, Products, and Areas:</h2>
<ul>
<li>In conjunction with the Blend model upgrade, the release includes the following changes:</li>
<ul>
	<li class="li3">Addition of hourly forecast hours images from 036 to 048 for the following products:</h3>
</ul>
<ul>
<ul>	
	<li class="li2">precip_p01</li>
        <li class="li2">1hour_precip_chance</li>
        <li class="li2">prob_rain </li>
        <li class="li2">prob_snow</li>
	<li class="li2">prob_sleet</li>
	<li class="li2">prob_freezing_rain</li>
	<li class="li2">snow_liquid_ratio</li>
	<li class="li2">1hour_accu_snow</li>
	<li class="li2">10th_percentile_1hr_snow</li>
	<li class="li2">50th_percentile_1hr_snow</li>
	<li class="li2">90th_percentile_1hr_snow</li>
	<li class="li2">prob_1h_snow_0.1in</li>
	<li class="li2">prob_1h_snow_0.5in</li>
	<li class="li2">prob_1h_snow_1in</li>
	<li class="li2">prob_1h_snow_1.5in</li>
	<li class="li2">prob_1h_snow_2in</li>
	<li class="li2">prob_1h_snow_3in</li>
	<li class="li2">prob_1h_snow_4in</li>
	<li class="li2">2m_temp_10m_wnd</li>
	<li class="li2">2m_dewp_10m_wnd</li>
	<li class="li2">2m_relh_10m_wnd</li>
	<li class="li2">2m_apparent_temp</li>
	<li class="li2">10m_wnd_gust</li>
	<li class="li2">total_cloud_cover</li>
	<li class="li2">echo_top</li>
</ul>
	<li class="li3">Addition of three hourly forecast hours images from 036 to 048 for the following products:</h3>
</ul>
<ul>
<ul>
	<li class="li2">prob_vis_5mi</li>
	<li class="li2">prob_vis_3mi</li>
	<li class="li2">prob_vis_1mi</li>
	<li class="li2">prob_ceil_1000ft</li>
	<li class="li2">prob_ceil_3000ft</li>
</ul>
<li class="li3">The following products are removed:</h3>
</ul>
<ul>
<ul>
        <li class="li2">prob_1h_snow_0.3in</li>
        <li class="li2">prob_1h_snow_0.7in</li>
</ul>
</ul>

</ul>
</ul>
</ul>
</ul>
</ul>


<h1>MAG 6.0 - August 2025</h1>
<h2>New Products:</h2>
<ul>
<li>Added the following new product for GUAM to RTMA </li>
<ul>
        <li class="li2">ceiling</li>
</ul>
<li>Added the following new products for National Blend of Models (NBM) </li>
<ul>
        <li class="li2">precip_p01</li>
        <li class="li2">1hour_precip_chance</li>
	<li class="li2">6hour_precip_chance </li>
	<li class="li2">12hour_precip_chance</li>
	<li class="li2">precip_duration (NAMER and CONUS domains only)</li>
	<li class="li2">prob_rain (NAMER, CONUS, and Alaska domains only)</li>
	<li class="li2">prob_snow (NAMER, CONUS, and Alaska domains only) </li>
	<li class="li2">prob_sleet (NAMER, CONUS, and Alaska domains only)</li>
	<li class="li2">prob_freezing_rain (NAMER, CONUS, and Alaska domains only)</li>
	<li class="li2">snow_liquid_ratio (NAMER, CONUS, and Alaska domains only)</li>
	<li class="li2">1hour_accu_snow (NAMER, CONUS, and Alaska domains only)</li>
	<li class="li2">6hour_accu_snow (NAMER, CONUS, and Alaska domains only)</li>
	<li class="li2">total_accu_snow (NAMER, CONUS, and Alaska domains only)</li>
	<li class="li2">10th_percentile_1hr_snow (NAMER, CONUS, and Alaska domains only)</li>
	<li class="li2">50th_percentile_1hr_snow (NAMER, CONUS, and Alaska domains only)</li>
	<li class="li2">90th_percentile_1hr_snow (NAMER, CONUS, and Alaska domains only)</li>
	<li class="li2">prob_1h_snow_0.1in (NAMER, CONUS, and Alaska domains only)</li>
	<li class="li2">prob_1h_snow_0.3in (NAMER, CONUS, and Alaska domains only)</li>
	<li class="li2">prob_1h_snow_0.5in (NAMER, CONUS, and Alaska domains only)</li>
	<li class="li2">prob_1h_snow_0.7in (NAMER, CONUS, and Alaska domains only</li>
	<li class="li2">prob_1h_snow_1in (NAMER, CONUS, and Alaska domains only)</li>
	<li class="li2">prob_1h_snow_1.5in (NAMER, CONUS, and Alaska domains only)</li>
	<li class="li2">prob_1h_snow_2in (NAMER, CONUS, and Alaska domains only)</li>
	<li class="li2">prob_1h_snow_3in (NAMER, CONUS, and Alaska domains only)</li>
	<li class="li2">prob_1h_snow_4in (NAMER, CONUS, and Alaska domains only)</li>
	<li class="li2">tstm_coverage</li>
	<li class="li2">visibility</li>
	<li class="li2">ceiling</li>
	<li class="li2">cape</li>
	<li class="li2">echo_top</li>
	<li class="li2">prob_tstm</li>
	<li class="li2">prob_vis_5mi (NAMER and CONUS domains only)</li>
	<li class="li2">prob_vis_3mi (NAMER and CONUS domains only)</li>
	<li class="li2">prob_vis_2mi (NAMER and CONUS domains only)</li>
	<li class="li2">prob_vis_1mi (NAMER and CONUS domains only)</li>
	<li class="li2">prob_ceil_1000ft (NAMER and CONUS domains only)</li>
	<li class="li2">prob_ceil_2000ft (NAMER and CONUS domains only)</li>
	<li class="li2">prob_ceil_3000ft (NAMER and CONUS domains only)</li>
	<li class="li2">prob_ceil_6500ft (NAMER and CONUS domains only)</li>
</ul>
</ul>
<h2>Other updates:</h2>
<ul>
        <li>Improved Real Time Mesoscale Analysis (RTMA) and National Blend of Models (NBM) model output image quality and color palette.</li>
	<li class="li2">For NAM Fire Weather Hi-Resolution Nested Model Output:</h3>
	<ul>
        <li class="li2">Fixed Display of Extra Domain.</li>
</ul>
	<li>For the NAM-HIRES, HRW-ARW, and HRW-ARW2 accu_max_updraft_hlcy product:</li>
	<ul>
        <li class="li2">Fixed data flickering</li>
</ul>

	<li>For the HRW-FV3 accu_max_updraft_hlcy product:</li>
        <ul>
        <li class="li2">Truncated forecast hours to 48 to ensure accurate output.</li>
</ul>
	<li>Fixed occasional filling of one probability value in the entire domain for probability of storm-tracks maps.</li>

</li>
</ul>
</ul>



<h1>MAG 5.2.0 - April 2025</h1>
<h2>Upgrade to the RHEL8 environment:</h2>
<ul>
<li>Backend improvements to enhance the stability, performance and security of the application.</li>
<ul>
<li>Upgrade to PHP8.</li>
<li>Implement additional security measures.</li>
</ul>
</ul>

<h1>MAG 5.1.1 - March 2025</h1>
<h2>In compliance with the Executive Order 14172, 'Restoring Names to Honor American Greatness':</h2>
<ul>
<li> Following domain names and/or associated acronyms have changed: </li>
<ul>
        <li class="li2">Gulf of Mexico (GOM)  &nbsp&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;  →&nbsp Gulf of America (GOAM)</h3>
        <li class="li2">East Gulf of Mexico (EAST-GOM)&nbsp &emsp; →&nbsp East Gulf of America (EAST-GOAM)</h3>
        <li class="li2">West Gulf of Mexico (WEST-GOM)&emsp; →&nbsp West Gulf of America (WEST-GOAM)</h3>
        <li class="li2">East Gulf of Alaska (EAST-GOA)&nbsp &emsp;&nbsp →&nbsp East Gulf of Alaska (EAST-GOAK)</h3>
        <li class="li2">West Gulf of Alaska (WEST-GOA)&nbsp&emsp; →&nbsp West Gulf of Alaska (WEST-GOAK)</h3>

</ul>
</ul>

<h1>MAG 5.1 - July 2024</h1>
<h2>New Models, Products, and Areas:</h2>
<ul>
<li>In conjunction with the STOFS model upgrade, the following domains are modified to include the expanded data coverage:</li>
<ul>
	<li class="li2">Domains expanded:</h3>
<ul>
	<li class="li2">EAST-GOA (East Gulf of Alaska)</li>
	<li class="li2">WEST-GOA (West Gulf of Alaska)</li>
</ul>
</ul>
</li>

<li>Added the following new domains to NAEFS and GEFS-MEAN-SPRD:</li>

<ul>
        <li class="li2">Continental United States (CONUS)</li>
        <li class="li2">Alaska</li>
</ul>


<li>Added the following new products to RTMA:</li>

<ul>
        <li class="li2">Ceiling (ceiling -- not included for Guam)</li>
        <li class="li2">Visibility (vis)</li>
</ul>


</ul>

<h1>MAG 5.0 - March 2024</h1>
<h2>New Models, Products, and Areas:</h2>
<ul>
<li> Added a new model Automated Tropical Cyclone Forecasting (ATCF) under Tropical Guidance</li>
     <ul>
	<li class="li2">Generated when HFSA-Parent model has a storm</li>
</ul>
<li>Added the following new domain to Global Forecast System (GFS):</li>
  <ul>
     	<li class="li2">Pacific (PAC-REGION)</li>
</ul>
<li>Renamed the following products to HREF:</li>
  <ul>
	<li class="li2">pmm_refd_1km → pmm_refd_1km_emsl</li>
	<li class="li2">pmm_refd_max → pmm_refd_max_emsl</li>
</ul>
<li>Added the following products to HREF:</li>
<ul>
	<li class="li2">Ensemble Agreement Scale probability of 0.01” rain in 1 hour (eas_prob_1h_rain_0.01in)</li>
	<li class="li2">Ensemble Agreement Scale probability of 0.25” rain in 1 hour (eas_prob_1h_rain_0.25in)</li>
	<li class="li2">Ensemble Agreement Scale probability of 0.50” rain in 1 hour (eas_prob_1h_rain_0.50in)</li>
	<li class="li2">Ensemble Agreement Scale probability of 0.01” rain in 3 hours (eas_prob_3h_rain_0.01in)</li>
	<li class="li2">Ensemble Agreement Scale probability of 0.25” rain in 3 hours (eas_prob_3h_rain_0.25in)</li>
	<li class="li2">Ensemble Agreement Scale probability of 0.50” rain in 3 hours (eas_prob_3h_rain_0.50in)</li>
	<li class="li2">Ensemble Agreement Scale probability of 0.1” snow in 1 hour (eas_prob_1h_snow_0.1in)</li>
	<li class="li2">Ensemble Agreement Scale probability of 0.3” snow in 1 hour (eas_prob_1h_snow_0.3in)</li>
	<li class="li2">Ensemble Agreement Scale probability of 0.1” snow in 3 hours (eas_prob_3h_snow_0.1in)</li>
	<li class="li2">Ensemble Agreement Scale probability of 0.3” snow in 3 hours (eas_prob_1h_snow_0.1in)</li> 
	<li class="li2">Localized probability matched mean mean precip 1 hour plot (lpmm_mean_precip_p01)</li>
	<li class="li2">Localized probability matched mean mean precip 3 hour plot (lpmm_mean_precip_p03)</li>
	<li class="li2">Localized probability matched mean mean precip total hour plot (lpmm_mean_precip_ptot)</li>
	<li class="li2">prob_lowIFR_IFR</li>
	<li class="li2">pmm_refd_1km</li>
	<li class="li2">pmm_refd_max</li>
</ul>
<li>Added the following products to NAEFS:</li>
<ul>
	<li class="li2">precip_p06 (only for 0z and 12z cycles)</li>
	<li class="li2">precip_p24 (only for 0z and 12z cycles)</li>
	<li class="li2">precip_ptot (only for 0z and 12z cycles)</li>
	<li class="li2">prob_precip_0.25in (only for 0z and 12z cycles)</li>
	<li class="li2">prob_precip_0.5in (only for 0z and 12z cycles)</li>
	<li class="li2">prob_precip_1in (only for 0z and 12z cycles)</li>
	<li class="li2">10th_percentile_10m_wnd</li>
	<li class="li2">50th_percentile_10m_wnd</li>
	<li class="li2">90th_percentile_10m_wnd</li>
	<li class="li2">extreme_index_10m_wnd</li>
	<li class="li2">10th_percentile_2m_temp</li>
	<li class="li2">50th_percentile_2m_temp</li>
	<li class="li2">90th_percentile_2m_temp</li>
	<li class="li2">extreme_index_2m_temp</li>
	<li class="li2">extreme_index_mslp</li>
</ul>
<li>Added Omega for 700_rh_ht for HRRR</li>
</ul>
<h2>Other updates:</h2>
<ul>
	<li>Added units to NAEFS and GEFS-MEAN-SPRD product titles</li>
	<li>Improved temperature/dew point color fill for Fire Weather (FIREWX) and RTMA models</li>
	<li>Improved HAFS NESTED products by removing unnecessary border whitespace</li>
	<li>Improved HAFS products by: unifying wind barb color (to black), increasing surface temperature contour from 17𝇈C to 33𝇈C, increasing 500 RH contour intervals</li>
	<li>Improved grid point display for the 2m_apparent_temp, 2m_dewp_10m_wnd, and 2m_temp_10m_wnd products for the Hawaii and Puerto Rico domains for NBM</li>
	<li>Fixed scale factor for the mean_snow_total product for HREF</li>
	<li>Increased image resolutions from 1024x768 to 1280x1024 pixels (excluding SREF-CLUSTER, STORM-TRACKS, SKEWT, UAIR, GFS and NAM Sounding products)</li>
	<li>Changed display order of HFSA/HFSB on Tropical Guidance web page (so that HFSA is first)</li> 
</ul>

<h1>MAG 4.1.0 - June 2023</h1>
<h2>New Models, Models replaced, New product:</h2>
<ul>
<li>In conjunction with the HAFS upgrade, HWRF/HMON models are replaced by HFSA/HFSB models.</li>
<ul>
<li class="li2">Models replaced:</h3>
<ul>
<li class="li2">HWRF-FULL replaced by HFSA-PARENT</li>
<li class="li2">HWRF-NESTED replaced by HFSA-NESTED</li>
<li class="li2">HMON-FULL replaced by HFSB-PARENT</li>
<li class="li2">HMON-NESTED replaced by HFSB-NESTED</li>
</ul>
</li>
</ul>
<ul>
<li class="li2">New product:</h3>
<ul>
<li class="li2">Added precip_p03 for HFSA/HFSB</li>
</ul>
</li>
</ul>
</ul>

<h1>MAG 4.0.0 - May 2023</h1>

<h2>New Models, Products, and Areas:</h2>
<ul>
<li>Added a new model Global Ensemble Forecast System Wave (GEFS-WAVE) for the following domains and products:
  <ul>
    <li class="li2">Domains:
 class="li2">Domains:<ul>
        <li class="li2">Africa</li>
        <li class="li2">Alaska</li>
        <li class="li2">Arctic</li>
        <li class="li2">ATL-PAC</li>
        <li class="li2">Atlantic</li>
        <li class="li2">EAST-GOA</li>
        <li class="li2">WEST-GOA</li>
        <li class="li2">EAST-PAC</li>
        <li class="li2">Europe</li>
        <li class="li2">GOM</li>
        <li class="li2">Guam</li>
        <li class="li2">Hawaii</li>
        <li class="li2">India</li>
        <li class="li2">MID-ATL</li>
        <li class="li2">NORTH-PAC</li>
        <li class="li2">PAC-REGION</li>
        <li class="li2">Polar</li>
        <li class="li2">Puerto Rico</li>
        <li class="li2">NE-COAST</li>
        <li class="li2">SE-COAST</li>
        <li class="li2">NORTH-CAL</li>
        <li class="li2">SOUTH-CAL</li>
        <li class="li2">US-SAMOA</li>
        <li class="li2">WA-OR</li>
        <li class="li2">WEST-ATL</li>
      </ul>
      </li>
    <li class="li2">Products:
      <ul>
        <li class="li2">peak_dir_per</li>
        <li class="li2">sig_wv_ht</li>
        <li class="li2">wsea_wv_ht</li>
        <li class="li2">wsea_dir_per</li>
        <li class="li2">swell1_wv_ht</li>
        <li class="li2">swell1_dir_per</li>
        <li class="li2">swell2_wv_ht</li>
        <li class="li2">swell2_dir_per</li>
        <li class="li2">swell3_wv_ht</li>
        <li class="li2">swell3_dir_per</li>        
  </ul>
  </li>
</ul>
</ul>
<ul>
<li>Added the following domains to GFS-WAVE:
  <ul>
        <li class="li2">Africa</li>
        <li class="li2">EAST-GOA</li>
        <li class="li2">WEST-GOA</li>
        <li class="li2">Europe</li>
        <li class="li2">Guam</li>
        <li class="li2">India</li>
        <li class="li2">MID-ATL</li>
        <li class="li2">Polar</li>
        <li class="li2">Puerto Rico</li>
        <li class="li2">US-SAMOA</li>
  </ul>
</li>
</ul>
<ul>
<li>Added the following products to GFS-WAVE:
  <ul>
        <li class="li2">swell3_wv_ht</li>
        <li class="li2">swell3_dir_per</li>
  </ul>
</li>
</ul>
<ul>
<li>Added the following domain to NAM-HIRES:
  <ul>
        <li class="li2">Hawaii</li>
  </ul>
</li>
</ul>
<ul>
<li>Added the following domainis to NBM:
  <ul>
        <li class="li2">Hawaii</li>
        <li class="li2">Alaska</li>
        <li class="li2">Puerto Rico</li>
  </ul>
</li>
</ul>
<ul>
<li>Added the new product precip_rate_type to the following models:
  <ul>
        <li class="li2">GFS</li>
        <li class="li2">NAM</li>
        <li class="li2">NAM-HIRES</li>
        <li class="li2">HRRR</li>
  </ul>
</li>
</ul>
<ul>
<li>Added 2m_max and 2m_min temperature products for the 00/06 and 12z valid cycles for NBM</li>
<li>Added pressure lines to the Accumulated Precipitation (precip_ptot) product</li>
</ul>
<h2>Other updates:</h2>
<ul>
<li>Unified color scale between apparent/min/max temperature products for NBM.</li>
<li>Added buttons on the UI to go to previous/next cycles.</li>
<li>Improved the color fill of the precipitable water (precip_pwat) product for the Fire Weather (FIREWX) model.</li>
<li>Updated the Maximum 1-hr 10-m Wind (10m_maxwnd) product’s color fill and wind barbs for FIREWX model.</li> 
<li>Removed the negative color fill for the Ventilation Rate (vent_rate) product for FIREWX model.</li>
<li>Updated color fills for the 850mb Temperature, Wind and Height (850_temp_ht) product for the FIREWX model.</li> 
<li>Improved the 10m_wnd_2m_temp, 850_temp_mslp_precip, 850_temp_ht, 925_temp_ht Polar products to have temperature contours every 5 degrees Celsius, label every other isotherm, and reduced line width.</li>
<li>Improved the 850_temp_mslp_precip product for the Global Forecast System (GFS), North American Mesoscale (NAM), North American Mesoscale - High Resolution (NAM-HIRES), High Resolution Rapid Refresh Analysis & Forecast System (HRRR) models to plot 850 isotherms on top of precipitation.</li>
<li>For the Storm-Tracks probability product, use of contour instead of color fill (default) when a processing exception occurs.</li>
</ul>

<h1>MAG 3.21.0 - January 2023</h1>
<h2>Models:</h2>
<ul>
<li>In conjunction with the ESTOFS model upgrade,  STOFS v1.1.1 model will replace the ESTOFS model.</li>
</ul>

<h1>MAG 3.19.1 - October 2022</h1>
<h2>User Interface:</h2>
<ul>
  <li>Fixed broken links in the header and footer</li>
  <li>Added Google Analytics</li>
</ul>

<h1>MAG 3.19.0 - April 2021</h1>

<h2>New Models, Products, and Areas:</h2>
<ul>
<li>In conjunction with GFS v16-Wave model upgrade, the following new products are added to GFS-WAVE:
  <ul>
  <li class="li2">wsea_wv_ht</li>
  <li class="li2">swell1_wv_ht</li>
  <li class="li2">swell1_dir_per</li>
  <li class="li2">swell2_wv_ht</li>
  <li class="li2">swell2_dir_per</li>
  </ul>
</li>
<li>Added the following domains to GFS-WAVE:
  <ul>
  <li class="li2">ALASKA</li>
  <li class="li2">HAWAII</li>
  <li class="li2">ARCTIC</li>
  <li class="li2">NE-COAST</li>
  <li class="li2">SE-COAST</li>
  <li class="li2">WA-OR</li>
  <li class="li2">GOM (Gulf of Mexico)</li>
  <li class="li2">SOUTH-CAL (southern California)</li>
  <li class="li2">NORTH-CAL (northern California)</li>
  <li class="li2">PAC-REGION (including regions in the far South Pacific)</li>
  </ul>
</li>
<li>Added the following domains to GEFS Storm Tracks:
  <ul>
  <li class="li2">CONUS</li>
  <li class="li2">ATLANTIC</li>
  <li class="li2">ASIA</li>
  <li class="li2">NORTH-PAC (northern Pacific)</li>
  <li class="li2">Europe</li>
  </ul>
</li>
<li>Added Probabilistic Storm Tracks for GEFS for the following domains:
  <ul>
  <li class="li2">CONUS</li>
  <li class="li2">ATLANTIC</li>
  <li class="li2">ASIA</li>
  <li class="li2">NORTH-PAC (northern Pacific)</li>
  <li class="li2">EUROPE</li>
  </ul>
</li>
<li>Added prob_cref_40dbz and prob_max_hlcy_75 to HREF model.</li>
<li>Added Alaska domain to HRRR model.</li>
<li>Added Accumulated Maximum Updraft Helicity (accu_max_updraft_hlcy) to HRRR/NAM-HIRES/HRW-ARW/HRW-ARW2/HRW-FV3/FIREWX models.</li>
<li>Added precip type to HREF pmm_refd_max and pmm_refd_1km.</li>
<li>Added the NAMER domain to RAP model.</li>
<li>Added the model name to titles.</li>
<li>Added 1000-500mb thickness field to precipitation products.</li>
</ul>
<h2>Other updates and additions:</h2>
<ul>
<li>Renamed WW3 to GFS-WAVE.</li>
<li>Unified 2-m temperature and dew point temperature graphics for high-resolution models.  Color fills are taking into account seasonal variations in every 5 degrees with light blue color denoting 30F.</li>
<li>Increased 4-panel sim_radar_1km_HR forecast hours from F48 to F60.</li>
<li>Replaced 4-panel sim_radar RAP with HRRR and extended the forecast hours from F21 to F48.</li>
<li>Upgraded HAniS package to improve Pinch/Zoom capability on mobile devices, and to prevent scrolling on OnMouseEnter events.</li>
<li>Improved precipitation visualization for SREF so that the precip mean is represented by color fills to be consistent with the rest of models.</li>
<li>Improved helicity color fills for all models.</li>
<li>Improved G-ESTOFS color fills for wave products.</li>
<li>Improved domain names for Observation and Analyses data.</li>
<li>Decluttered SREF contour labels for the spread of CAPE and CINS.</li>
<li>Decluttered mean sea level contour lines for the GFS polar region.</li>
<li>Removed below ground thermal and hydrodynamic fields.</li>
<li>Removed positive color fills from CINS.</li>
<li>Removed 50 knots isotach labels at the upper levels.</li>
</ul>


</div>

</div>

<div style="clear:both;"></div>

</div> <!-- Main Container -->

    <script src="js/version_updates_scripts.js"></script>
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

