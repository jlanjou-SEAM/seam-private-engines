<!DOCTYPE html>
<html lang="en">

<head>
<meta content="text/html; charset=utf-8" http-equiv="Content-Type">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>MAG Help - MAG Overview</title>
<link href="/css/w3.css" rel="stylesheet"> 
<link href="help.css?MAGv7.0.0" type="text/css" rel="stylesheet">
<link href="index.css?MAGv7.0.0" type="text/css" rel="stylesheet">
<script src="help.js?MAGv7.0.0"></script>
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-G1F0K33KY9"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-G1F0K33KY9');
</script>
</head>

<body onload="highlight_menu('index');">

<div class="mag_help_banner">
   <h1>Model Analyses and Guidance User's Guide</h1>
</div>

<div id="main" class="main">

   <div id="menuSideNav" class="sidenav">
      <h1 class="menu">MAG Users Guide
&nbsp;&nbsp;&nbsp;<a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
</h1>

<div style="padding-left:10px">

<a href="index.php" id="index">MAG Overview</a><br>
<a href="nws_banner.php" id="banner_page">NWS Banners</a><br>
<a href="HomePage.php" id="home_page">MAG Home Page</a><br>
<br>
&nbsp;&nbsp;I. <a href="ModelGuidance.php" id="mod">Model Guidance</a>
  <div class="div_one">
    &#9672; <a href="ModelGuidanceProds.php" id="mod_prods">Model Guidance Products</a>
    <div class="div_two">
    &bull; <a href="ModelGuidanceImage.php"           id="mod_img">Image</a><br>
    &bull; <a href="ModelGuidanceImageAnimation.php"  id="mod_ani">Image Animation</a><br>
    &bull; <a href="ModelGuidanceImage4.php"          id="mod_img4">Four-Panel Image</a><br>
    &bull; <a href="ModelGuidanceImageAnimation4.php" id="mod_ani4">Four-Panel Animation</a><br>
    </div>
  </div>
<br>

&nbsp;II. <a href="ObsAnalysis.php" id="obs">Observations and Analyses</a>
  <div class="div_one">
    &#9672; <a href="ObsAnalysisUair.php"  id="obs_uair">Obs Analysis Upper Air</a><br>
    &#9672; <a href="ObsAnalysisSkewt.php" id="obs_skewt">Obs Analysis Skew-T</a><br>
    &#9672; <a href="ObsAnalysisRtma.php"  id="obs_rtma">Obs Analysis RTMA</a><br>
  </div>
<br>

III. <a href="TropicalGuidance.php" id="trop">Tropical Guidance</a>
  <div class="div_one">
    &#9672; <a href="TropicalGuidanceProds.php"   id="trop_prods">Tropical Guidance Products</a>
    <div class="div_two">
    &bull; <a href="TropicalGuidanceImage.php"     id="trop_img">Image</a><br>
    &bull; <a href="TropicalGuidanceAnimation.php" id="trop_ani">Image Animation</a><br>
    </div>
  </div>
<br>

IV. <a href="Soundings.php" id="snd">Forecast Soundings</a>
  <div class="div_one">
    &#9672; <a href="SoundingsProds.php"   id="snd_prods">Soundings Products</a>
    <div class="div_two">
    &bull; <a href="SoundingsImage.php"     id="snd_img">Image</a><br>
    &bull; <a href="SoundingsAnimation.php" id="snd_ani">Image Animation</a><br>
    </div>
  </div>
<br>

</div>
   </div>

   <div id="body_div">
      <h1>MAG Overview</h1>

<span style="font-size:20px;cursor:pointer" onclick="openNav()">&#9776; </span>
 Menu
<p>
The Model Analysis and Guidance (MAG) website displays Graphical Interchange Format (GIF) images from the output of NCEP’s weather prediction models and observational data. The application runs in two environments:
</p>

<ol>
<li>The Weather and Climate Operational Supercomputer System (WCOSS), which consumes gridded model data and produces images.</li>
<li>A public facing Web Server farm where web navigation code provides an organized interface to the data and a set of bookmark able URLs that customers can use to directly access the latest images.</li>
</ol>

<p>
This user's guide documents the website portion of MAG.  The MAG website is available at <a href="http://mag.ncep.noaa.gov" target="_blank">mag.ncep.noaa.gov</a>.  The website consists of four types of output: 
</p>

<ol>
<li>Model Guidance: NCEP’s weather prediction models; </li>
<li>Observations and Analysis:  observational data in the form of SKEW-T and station plots, and output from the Real Time Data Analysis model (RTMA); </li>
<li>Hurricane model information when storms are active.</li>
<li>Forecast Soundings:  display of model soundings and station stability indices.</li>
</ol>
<br>

<div class="w3-row w3-border">

   <div class="w3-col w3-border s12 m12 l12 main">
      <h3 class="main"><a href="HomePage.php">MAG Home Page</a></h3>
   </div>

   <div class="w3-col w3-border s12 m6 l6 main">
     <h4>&nbsp;&nbsp;&#9654; <a href="ModelGuidance.php">Model Guidance</a></h4>
     <div class="div_one">
       &#9672; <a href="ModelGuidanceProds.php">Model Guidance Products</a>
       <div class="div_two">
       &bull; <a href="ModelGuidanceImage.php">Image</a><br>
       &bull; <a href="ModelGuidanceImageAnimation.php">Image Animation</a><br>
       &bull; <a href="ModelGuidanceImage4.php">Four-Panel Image</a><br>
       &bull; <a href="ModelGuidanceImageAnimation4.php">Four-Panel Animation</a><br>
       </div>
     </div>
   </div>

   <div class="w3-col w3-border s12 m6 l6 main">
     <h4>&nbsp;&nbsp;&#9654; <a href="ObsAnalysis.php">Observations and Analysis</a></h4>
     <div class="div_one">
       &#9672; <a href="ObsAnalysisUair.php">Obs Analysis Upper Air</a><br>
       &#9672; <a href="ObsAnalysisSkewt.php">Obs Analysis Skew-T</a><br>
       &#9672; <a href="ObsAnalysisRtma.php">Obs Analysis RTMA</a><br><br><br>
     </div>
   </div>

</div>
<div class="w3-row w3-border">

   <div class="w3-col w3-border s12 m6 l6 main">
     <h4>&nbsp;&nbsp;&#9654; <a href="TropicalGuidance.php">Tropical Guidance</a></h4>
     <div class="div_one">
       &#9672; <a href="TropicalGuidanceProds.php">Tropical Guidance Products</a>
       <div class="div_two">
       &bull; <a href="TropicalGuidanceImage.php">Image</a><br>
       &bull; <a href="TropicalGuidanceAnimation.php">Image Animation</a><br>
       </div>
     </div>
   </div>

   <div class="w3-col w3-border s12 m6 l6 main">
     <h4>&nbsp;&nbsp;&#9654; <a href="Soundings.php">Forecast Soundings</a></h4>
     <div class="div_one">
       &#9672; <a href="SoundingsProds.php">Soundings Products</a>
       <div class="div_two">
       &bull; <a href="SoundingsImage.php">Image</a><br/>
       &bull; <a href="SoundingsAnimation.php">Image Animation</a><br/>
       </div>
     </div>
   </div>

</div>
<br><br><br><br><br><br><br><br>

   </div>

   <br style="clear: left;" />
</div>

</body>

</html>

