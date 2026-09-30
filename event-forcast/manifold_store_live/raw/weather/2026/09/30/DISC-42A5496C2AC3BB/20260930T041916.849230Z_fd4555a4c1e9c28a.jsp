<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>















	<link rel="stylesheet" type="text/css" href="styles/winMenus.css">
	<link rel="stylesheet" type="text/css" href="styles/winStyle.css">








	<title>CAP System Information</title>





	<style type="text/css">
		.orgCSS {
			font-family : Arial, Helvetica, sans-serif;
			text-decoration : underline;
			color : Blue;
		}
</style>
</head>
<body topmargin="0" leftmargin="0" rightmargin="0">



<table border="0" cellpadding="0" cellspacing="0" width="100%" summary="">
<tr>
	<td valign="top"   background="images/madis.png" nowrap height="61" width="108">
		<!--img src="images/madis.png" alt="MADIS Logo" border="0"-->&nbsp;
	</td>
	
	<td valign="top" background="images/capLogo3.gif" nowrap height="61" width="387">
		<!--img src="images/capLogo2.gif" alt="CAP Logo" border="0"-->&nbsp;
	</td>
	<td width="80%" valign="top">
		<table width="100%" border="0" cellpadding="0" cellspacing="0" summary="">
			<tr>
				<td valign="middle" height="28" nowrap align="center">
					<span style="font-family: Verdana, Geneva, Arial, Helvetica, sans-serif; 
						font-weight: bold; font-size: 17px;">
						CAP System Information
					</span>
				</td>
			</tr>
			<tr>
				<td height="33" bgcolor="#28648C">
					<table width="100%" border="0" cellpadding="0" cellspacing="0" align="center" summary="">
						<tr>
							<td align="center">
								<a name="home" id="home" href="/cap/index.jsp" class="mainmenu" 
								title="CAP Home Page">CAP PROFILERS</a>&nbsp;</td>
							<td align="center">
								&nbsp;<a name="status" href="/cap/sysStatus.jsp" 
								class="mainmenu" title="CAP Site Status">STATUS</a>&nbsp;</td>
							<td align="center">
								&nbsp;<a name="data" href="/cap/data.jsp" 
								class="mainmenu" title="CAP Data Displays">DATA</a>&nbsp;</td>
							<!--<td align="center">-->
								<!--&nbsp;<a name="news" href="/cap/news.jsp" -->
								<!--class="mainmenu" title="CAP News">NEWS</a>&nbsp;</td>-->
							<!--<td align="center">-->
								<!--&nbsp;<a name="forums" href="/cap/forums.jsp" -->
								<!--class="mainmenu" title="CAP Operations & Maintenance Forums">FORUMS</a>&nbsp;</td>-->
						</tr>
					</table>
				</td>
			</tr>
		</table>
	</td>
	<td valign="top" background="images/capSlope.gif" height="61" nowrap width="26">
		<!--img src="images/capSlope.gif" alt="CAP Slope" border="0"-->
	</td>
	<td background="images/capFiller2.gif" align="center" valign="top">
		<table border="0" cellpadding="0" cellspacing="0" summary="">
			<tr>
				<td>
					<a href="/cap/sysInfo.jsp?print=0" title="Show Menus">
						<img src="images/screenIcon.gif" alt="Menus On" border="0" vspace="5"></a>
				</td>
				<td>
					<a href="/cap/sysInfo.jsp?print=1" title="Hide Menus">
						<img src="images/paperIcon.gif" alt="Menus Off" border="0"></a>
				</td>
			</tr>		
		</table>
	</td>
</tr>
<tr>
	<td colspan="4" height="5" bgcolor="#28648C"></td>
</tr>
</table>

	<table summary="" cellpadding="0" cellspacing="0" border="0">
		<tr>

			<td NOWRAP valign="top" class="submenu">
				<!--%@ include file="jsp_include/submenu_profiler.jsp"%-->
								<!------------- Links Submenu Links ---------------------------------  -->
				<table cellpadding=5 cellspacing=1 summary="" width="170">
					<tr>
						<td valign="top" class="submenu">
							<span class="submenuhead">NOAA / DOC Links:</span><br>
							<a class="submenu" 
								href="/cap/index.jsp" 
								title="CAP Home" 
								target="_self">CAP Home</a><br>		
							<a class="submenu" 
								href="http://madis.noaa.gov/" 
								title="MADIS HOME" 
								target="_self">MADIS HOME</a><br>		
							<br>
							<br>		
							<a class="submenu" href="http://esrl.noaa.gov/gsd/" 
								title="ESRL Global Systems Division" 
								target="_self">GSD Web Site</a><br>
							<a class="submenu" href="http://esrl.noaa.gov/" 
								title="Earth System Research Laboratory" 
								target="_self">ESRL Web Site</a><br><br>
							<a class="submenu" 
								href="http://nws.noaa.gov/"
								title="National Weather Service" 
								target="_self">NWS Web Site</a><br>
							<a class="submenu" 
								href="http://spc.noaa.gov/" 
								target="_blank">Storm Prediction Center</a><br>
							<a class="submenu" 
								href="http://www.oar.noaa.gov/" 
								title="Office of Atmospheric Research Web Site" 
								target="_self">OAR's Web Site</a><br>		
							<a class="submenu" 
								href="http://www.noaa.gov/" 
								title="National Oceanic & Atmospheric Administration Web Site" 
								target="_self">NOAA's Web Site</a><br>		
							<a class="submenu" 
								href="http://www.commerce.gov/" 
								title="Department of Commerce Web Site" 
								target="_self">DOC's Web Site</a><br>		
							<hr>
						</td>
					</tr>
				</table>

			</td>

			<td valign="top" width="100%">

				<table cellpadding="5" summary="">
					<tr>
						<td>

							<form get="post">
								<input type="submit" name="capInfoView" value="Location" >&nbsp;&nbsp;&nbsp;

								<input type="submit" name="capInfoView" value="Beam/Mode Info" DISABLED>&nbsp;&nbsp;&nbsp;
							</form>


							<table width="100%" border="0"><tr>
								<td width="70%"><h2><a name="operStn">Operational CONUS CAP Station Beam/Mode Values</a></h2></td>
								<td align="right"><a href="#decomStn">Decommissioned CAP Stations</a></td>
							</tr></table>
							
							<table border="0">
								<tr>
									<th  id="head1" class="tblHead">Site ID</th>
									<th  id="head2" class="tblHead">Site Location</th>
									<th  id="head3" class="tblHead">Antenna<br>Beam<br>Azimuths<br>(degrees)</th>
									<th  id="head4" class="tblHead">Wind<br>Gate<br>Spacing<br>(ns)</th>
									<th  id="head5" class="tblHead">Wind<br>Pulse<br>Width<br>(ns)</th>
									<th  id="head6" class="tblHead">RASS<br>Gate<br>Spacing<br>(ns)</th>
									<th  id="head7" class="tblHead">RASS<br>Pulse<br>Width<br>(ns)</th>
									<th  id="head8" class="tblHead">Data<br>Resolution<br>(Minutes)</th>
								</tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=191OR">191OR</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">FAIRBANKS, OR</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">0,90,90</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">80</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">80</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">10</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=197OR">197OR</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">LEXINGTON. OR</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">0,90,90</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">80</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">80</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">10</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=200OR">200OR</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">LOCUST GROVE, OR</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">0,90,90</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">80</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">80</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">10</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=204OR">204OR</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">RUFUS, OR</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">0,90,90</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">80</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">80</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">10</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=265WA">265WA</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">PLYMOUTH, WA</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">0,90,90</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">80</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">80</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">10</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=352OR">352OR</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">MORO, OR</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">0,90,90</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">80</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">80</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">10</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=360OR">360OR</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">SHELL ROCK ROAD, OR</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">0,90,90</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">80</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">80</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">10</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=446OR">446OR</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">OLEX, OR</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">0,90,90</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">80</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">80</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">10</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=ABTQC">ABTQC</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">ABITIBI, QC</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">0,90,90</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">1330,3330,3330</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">2000,3330,6660</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">--1</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=ACVCA">ACVCA</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">MCKINLEYVILLE</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">152,242,90</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">700,1400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">3800,2800</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">700</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">700</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=AMDQC">AMDQC</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">AUMOND, QC</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">0,90,90</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">1330,3330,3330</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">2000,3330,6660</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=AN2OR">AN2OR</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">ARLINGTON, OR</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">700</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">700</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">700</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">10</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=ARMOK">ARMOK</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">ARM SGP OK</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">0,90,0</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">1000,4000</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">2000,6700</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">1000</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">2000</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=ARVWI">ARVWI</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">LAKELAND, WI</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">335,265,175</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">708,415</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">708,415</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">415</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">415</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=ASTOR">ASTOR</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">ASTORIA OR</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">355.00,80.00,0.00</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">700,400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">700,400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=ATACA">ATACA</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">ALTA CA (3GHZ)</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">-1,-1,90</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">417</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">417</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">15</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=BBHAR">BBHAR</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">BEE BRANCH, AR</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">138,45,0</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">700,400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">700,400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=BBYCA">BBYCA</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">BODEGA BAY CA</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">35.00,305.00,0.00</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">680,386</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">700,400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">700</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">700</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=BLTMD">BLTMD</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">BELTSVILLE MD</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">17,197,0,107,287</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">275</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">667</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">6,15</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=BMTKS">BMTKS</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">BEAUMONT KS</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">8.00,98.00,0.00,188.00,278.00</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">400,1400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">400,2800</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">700</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">700</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=BO2OR">BO2OR</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">BOARDMAN (SODAR), OR</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">0,90,0</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">70</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">70</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">15</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=BOROR">BOROR</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">BOARDMAN, OR</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">332,62,242</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">700,400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">700,400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=BPATX">BPATX</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">BEAUMONT PORT ARTHUR, TX</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">85,175,355,265</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">416</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">416</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">30</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=CARON">CARON</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">EGBERT ON</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">317.00,47.00,0.00,137.00,227.00</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">646,1286</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">700,2800</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">30</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=CCOCA">CCOCA</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">CHICO CA</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">178.00,91.00,0.00</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">700,400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">700,400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">700</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">700</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=CCRCA">CCRCA</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">CONCORD, CA</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">28,299,0</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">700,400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">700,400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=CD2OR">CD2OR</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">CONDON (SODAR), OR</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">0,0,90</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">70</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">70</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">15</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=CDNOR">CDNOR</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">CONDON, OR</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">351,81,0</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">700,400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">700,400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=CFCCA">CFCCA</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">COLFAX CA</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">176.00,266.00,86.00</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">700,400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">700,400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=CFDUT">CFDUT</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">CARR, UT</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">82, 172, 262, 352</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">10</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=CFFCA">CFFCA</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">COLFAX CA (FMCW) (3GHZ)</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">-1,-1,90</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">334</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">334</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">15</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=CHANC">CHANC</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">CHARLOTTE NC</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">180.00,90.00,90.00</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">400,700</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">400,2800</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=CTNNC">CTNNC</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">CLAYTON NC</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">147,237,237</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">700,400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">700,400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">15</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=CZCCA">CZCCA</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">CAZADERO CA (3GHZ)</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">-1,-1,90</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">417</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">417</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">15</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=DALNS">DALNS</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">LUNENBURG NS</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">348.00,258.00,348.00,180.00</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">700,2800</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">700,2800</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=DGNAK">DGNAK</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">JUNEAU (NORTH DOUGLAS) AK</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">0.00,90.00,0.00</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">1000</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">1000</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">10</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=DGSAK">DGSAK</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">JUNEAU (SOUTH DOUGLAS) AK</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">0.00,90.00,0.00</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">1000</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">1000</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">10</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=DGWUT">DGWUT</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">TOWER GRID UT</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">202.00,112.00,292.00</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">10</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=DR2OR">DR2OR</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">DECKER RANCH AIRSTRIP (SODAR), OR</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">0,0,90</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">70</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">70</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">15</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=EGBQC">EGBQC</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">EGBERT, QC</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">0,90,90</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">1330,3330,3330</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">2000,3330,6660</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=EPSTX">EPSTX</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">EL PASO TX</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">210.0,210.0,120.0</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">400,700</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">400,700</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">30</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=EWNNC">EWNNC</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">NEW BERN NC</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">155,245,65</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">708,1333</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">708,2833</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=FCPFL">FCPFL</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">CAPE CANAVERAL (FALSECAPE) FL</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">2.00,272.00,0.00</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">700</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">1400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">15</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=FHHAZ">FHHAZ</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">CMO AZ</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">148.00,58.00,58.00</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">700,1400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">700,1400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=FKSWA">FKSWA</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">FORKS WA</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">3,93,93</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">700,1400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">700,2800</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">700</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">700</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=FPDUT">FPDUT</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">FRIES PARK, UT</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">87, 177, 267, 357</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">10</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=GDLWA">GDLWA</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">GOLDENDALE, WA (SODAR)</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">0,90,90</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">70</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">70</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">15</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=GLAMN">GLAMN</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">GLACIAL RIDGE MN</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">181,181,91</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">600,2800</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">600,2800</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=GNQQC">GNQQC</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">GANANOQUE, QC</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">0,90,90</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">1330,3330,3330</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">2000,3330,6660</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=GRICA">GRICA</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">GRIZZLY ISLAND</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">338,68,338</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">400,1400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">400,2800</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=GV2OR">GV2OR</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">GRASS VALLEY, OR</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">0,90,90</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">40</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">40</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">15</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=HGDUT">HGDUT</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">HORIZONTAL GRID UT</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">202.00,112.00,292.00</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">6</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=HPLMD">HPLMD</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">HORN POINT LAB</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">355.8,85.8,175.8,265.8</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">182</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">1292</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">182</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">1292</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">6</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=HRWQC">HRWQC</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">HARROW</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">0,90,90</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">1330,3330,3330</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">2000,3330,6660</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=HSNTX">HSNTX</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">HOUSTON COASTAL CENTER TX</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">352,262,352</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">400,1400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">700,2800</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">30</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=IRVCA">IRVCA</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">IRVINE CA</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">0,90,90,180,270</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">708,417</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">708,417</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">417</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">417</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=JD2OR">JD2OR</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">JOHN DAY (SODAR), OR</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">0,0,90</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">70</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">70</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">15</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=JZISC">JZISC</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">JOHNS ISLAND, SC</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">334,242,0</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">700,400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">700,400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=KSCFL">KSCFL</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">CAPE CANAVERAL (50 MHZ) FL</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">45.00,135.00,135.00</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">700</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">700</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=LAXCA">LAXCA</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">LOS ANGELES, CA</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">217.00,307.00,0.00</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">700,400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">700,400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=LBKTX">LBKTX</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">LUBBOCK TX (REESE CENTER)</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">354.00,84.00,174.00</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">30,20</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=LMCAK">LMCAK</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">JUNEAU (LEMON CREEK) AK</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">0.00,90.00,0.00</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">1000</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">1000</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">10</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=LMNOK">LMNOK</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">LAMONT OK ARM</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">0,90,180,180,270</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">400,1400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">400,2800</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=LNMCO">LNMCO</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">LONGMONT CO</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">0,90,0,180,270</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">130,140</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">244,593</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">5</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=LPTTX">LPTTX</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">LAPORTE TX</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">282,12,192,102</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">416</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">416</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">30</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=LVRCA">LVRCA</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">LIVERMORE CA</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">153,243,243</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">700,400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">700,400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=LWSDE">LWSDE</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">LEWES, DE</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">45,135,135</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">708,417</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">708,417</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">417</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">417</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">30</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=MCGQC">MCGQC</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">MCGILL, QC</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">0,90,90</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">1330,3330,3330</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">2000,3330,6660</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=MCGQU">MCGQU</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">MONTREAL QU</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">0.00,90.00,0.00,180.00</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">666</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">700</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">700</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=MDCKS">MDCKS</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">MEDICINE LODGE KS</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">1,91,181,181,271</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">400,1400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">400,2800</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">700</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">700</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=MIDFL">MIDFL</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">CAPE CANAVERAL (MERRITT) FL</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">17.00,287.00,0.00</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">700</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">700</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">15</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=MKROK">MKROK</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">MEEKER, OK</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">4,94,184,274</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">400,1400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">400,2800</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">700</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">700</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=MLNFL">MLNFL</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">CAPE CANAVERAL (MOSQUITOLAGOON</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">34.00,304.00,0.00</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">700</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">1400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">15</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=MMRCA">MMRCA</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">MIRAMAR CA</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">334.00,64.00,0.00</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">700,400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">700,400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">700</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">700</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=MOVCA">MOVCA</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">MORENO VALLEY CA</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">93.0,183.0,273.0</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">708,416</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">708,416</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">416</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">416</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=MRONC">MRONC</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">MARION,NC</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">140,230,230</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">708,417</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">708,417</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=MSYQC">MSYQC</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">MARKSTAY</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">0,90,90</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">1330,3330,3330</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">2000,3330,6660</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=NCKQC">NCKQC</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">NEGROCREEK, QC</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">0,90,90</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">1330,3330,3330</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">2000,3330,6660</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=NPSCA">NPSCA</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">MONTEREY CA</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">345.00,75.00,0.00</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">1400,400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">2800,400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">700</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">700</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">30</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=OFTNC">OFTNC</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">OLD FORT,NC</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">20,290,20</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">708,417</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">708,417</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=OHKTN">OHKTN</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">OLD HICKORY TN</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">5,95,95</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">708,417</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">708,417</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=ONTCA">ONTCA</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">ONTARIO CA</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">147.00,57.00,0.00</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">700,400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">700,400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=OTHOR">OTHOR</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">NORTH BEND, OR</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">324,234,324</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">700,1400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">700,2800</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">700</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">700</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=OVECA">OVECA</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">OROVILLE</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">178,260,90</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">700,400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">700,400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=PAPAZ">PAPAZ</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">TUCSON AZ</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">152,62,242</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">708,1333</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">708,2833</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=PNRMD">PNRMD</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">PINEY RUN, MD</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">294.0,114.0,0.0,24.0,204.0</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">274.53</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">666.67</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">274.53</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">666.67</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">6,15</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=PQLMS">PQLMS</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">MOSS POINT MS</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">218,315,0</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">700,400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">700,400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=PRWWI">PRWWI</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">PRENTICE, WI</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">335,265,175</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">708,415</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">708,415</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">417</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">417</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=PTLCA">PTLCA</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">POINT LOMA CA</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">213.00,303.00,0.00</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">700,400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">700,400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=PTMCA">PTMCA</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">POINT MUGU, CA</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">337,247,157,157,67</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">700</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">2800</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">30</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=PTSCA">PTSCA</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">POINT SUR CA</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">59,148,0</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">700,400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">700,400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=PV2OR">PV2OR</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">PRINEVILLE (SODAR), OR</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">0,90,0</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">70</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">70</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">15</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=PVEOR">PVEOR</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">PRINEVILLE, OR</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">208,302,0</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">700,400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">700,400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=PVLCO">PVLCO</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">PLATTEVILLE (449)</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">335,265,175</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">1333,708</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">1333,708</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">708</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">708</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=RCOFL">RCOFL</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">CAPE CANAVERAL (TI-CO) FL</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">36.00,306.00,0.00</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">700</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">700</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">15</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=RESTX">RESTX</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">LUBBOCK, TX (SODAR)</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">0,90,0</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">71,71</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">71,71</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">10</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=RTPNC">RTPNC</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">RESEARCH TRIANGLE PARK, NC</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">144,54,144,324,234</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">30</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=RTPTX">RTPTX</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">ROUND TOP,TX</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">147,228,0</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">700,400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">700,400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=RUTNJ">RUTNJ</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">NEW BRUNSWICK, NJ</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">0.00,270.00,0.00</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">400,700</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">400,700</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">700</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">700</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=RVDWA">RVDWA</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">RAVENSDALE WA</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">-1,-1,90</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">15</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=SACCA">SACCA</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">SACRAMENTO CA</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">346.00,256.00,346.00</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">708,417</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">708,417</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">417</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">417</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=SBACA">SBACA</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">SANTA BARBARA</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">11,281,101</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">700,2800</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">700,2800</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">700</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">700</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=SCPFL">SCPFL</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">CAPE CANAVERAL (SOUTHCAPE) FL</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">1.00,91.00,0.00</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">700</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">1400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">15</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=SEAWA">SEAWA</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">SEATTLE WA</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">216.00,306.00,216.00</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">417,708</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">417,708</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">1600</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">30</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=SLDUT">SLDUT</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">SL-TEST, UT</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">76,166,256,346</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">10</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=SNYFL">SNYFL</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">SYDNEY FL</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">213,125,0</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">700,400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">700,400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=STDCA">STDCA</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">SHASTA DAM, CA</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">-1,-1,90</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">267</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">267</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">15</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=STWMA">STWMA</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">STOW MA</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">208.00,298.00,298.00</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">400,2800</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">400,2800</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">30</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=SUACA">SUACA</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">SIMI VALLEY UPPER AIR ATMOSPHERIC PROFILER</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">350,80,0,170,260</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">274.53</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">666.67</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">274.53</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">666.67</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">15</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=TCICA">TCICA</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">TWITCHELL ISLAND</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">136,226,226</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">708,417</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">708,417</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=TCYCA">TCYCA</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">TRACY CA</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">214.00,304.00,0.00</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">700</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">700</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">30</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=TDEOR">TDEOR</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">TROUTDALE, WA</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">178,85,0</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">700,400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">700,400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=VISCA">VISCA</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">VISALIA CA</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">340.00,70.00,0.00</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">700,400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">700,400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=WC2OR">WC2OR</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">WASCO (SODAR), OR</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">0,90,0</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">70</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">70</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">15</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=WCOOR">WCOOR</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">WASCO, OR</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">208,298,298</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">708,417</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">708,417</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">417</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">417</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=WFCQC">WFCQC</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">WILBERFORCE, QC</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">0,90,90</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">1330,3330,3330</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">2000,3330,6660</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=WHPCA">WHPCA</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">WHITEMAN AIRPORT PACOIMA CA</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">350,80,170</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">708,417</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">708,417</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">417</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">417</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=WILDE">WILDE</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">WILMINGTON DE</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">30,120,30,210,300</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">708,417</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">708,417</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">417</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">417</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">30</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=WLMQC">WLMQC</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">WALSINGHAM</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">0,90,90</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">1330,3330,3330</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">2000,3330,6660</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=WPCWA">WPCWA</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">WESTPORT (3GHZ)</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">-1,-1,90</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">417</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">417</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">15</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=WPTWA">WPTWA</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">WESTPORT WA</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">224.00,134.00,44.00</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">708,417</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">708,417</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=WTNTX">WTNTX</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">WHARTON TX</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">21,109,0</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">700,400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">700,400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=WW2WA">WW2WA</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">WALLA WALLA, WA</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">338,248,248</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">708,417</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">708,417</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=WWLWA">WWLWA</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">WALLA WALLA, WA (SODAR)</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">0,90,90</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">70</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">70</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">15</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=YK2WA">YK2WA</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">YAKIMA, WA</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">190,280,10</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">700,400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">700,400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=YKMWA">YKMWA</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">YAKIMA, WA (SODAR)</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">0,90,90</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">70</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">70</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">15</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=YUMAZ">YUMAZ</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">YUMA AZ</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">204.00,114.00,114.00</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">700,2800</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">700,2800</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">700</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">700</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">30</td>
								<tr>

							</table>
							<span style="font-family: Arial, Helvetica, sans-serif; font-weight: bold;">CONUS Operational Site Count: 127</span>
							<br><br><hr>


							<table width="100%" border="0"><tr>
								<td width="70%"><h2><a name="operStn">Operational International CAP Station Beam/Mode Values</a></h2></td>
								<td align="right"><a href="#decomStn">Decommissioned CAP Stations</a></td>
							</tr></table>
							
							<table border="0">
								<tr>
									<th  id="head1" class="tblHead">Site ID</th>
									<th  id="head2" class="tblHead">Site Location</th>
									<th  id="head3" class="tblHead">Antenna<br>Beam<br>Azimuths<br>(degrees)</th>
									<th  id="head4" class="tblHead">Wind<br>Gate<br>Spacing<br>(ns)</th>
									<th  id="head5" class="tblHead">Wind<br>Pulse<br>Width<br>(ns)</th>
									<th  id="head6" class="tblHead">RASS<br>Gate<br>Spacing<br>(ns)</th>
									<th  id="head7" class="tblHead">RASS<br>Pulse<br>Width<br>(ns)</th>
									<th  id="head8" class="tblHead">Data<br>Resolution<br>(Minutes)</th>
								</tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=406JP">406JP</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">RUMOI JP</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">V</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">300</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">300</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">10</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=417JP">417JP</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">OBIHIRO JP</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">V</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">300</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">300</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">10</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=423JP">423JP</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">MURORAN JP</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">V</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">300</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">300</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">10</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=585JP">585JP</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">MIYAKO JP</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">V</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">300</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">300</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">10</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=587JP">587JP</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">SAKATA JP</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">V</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">300</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">300</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">10</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=612JP">612JP</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">TAKADA JP</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">V</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">300</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">300</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">10</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=616JP">616JP</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">FUKUI JP</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">V</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">300</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">300</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">10</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=626JP">626JP</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">KUMAGAYA JP</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">V</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">300</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">300</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">10</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=629JP">629JP</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">MITO JP</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">V</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">300</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">300</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">10</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=636JP">636JP</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">NAGOYA JP</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">V</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">300</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">300</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">10</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=640JP">640JP</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">KAWAGUCHIKO JP</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">V</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">300</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">300</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">10</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=656JP">656JP</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">SHIZUOKA JP</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">V</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">300</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">300</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">10</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=663JP">663JP</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">OWASE JP</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">V</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">300</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">300</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">10</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=674JP">674JP</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">KATSUURA JP</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">V</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">300</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">300</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">10</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=678JP">678JP</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">ICHIKI JP</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">V</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">300</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">300</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">10</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=746JP">746JP</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">TOTTORI JP</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">V</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">300</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">300</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">10</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=755JP">755JP</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">HAMADA JP</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">V</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">300</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">300</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">10</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=795JP">795JP</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">MIHAMA (WAKAYAMA) JP</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">V</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">300</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">300</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">10</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=800JP">800JP</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">IZUHARA JP</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">V</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">300</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">300</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">10</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=805JP">805JP</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">HIRADO JP</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">V</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">300</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">300</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">10</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=815JP">815JP</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">OHITA JP</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">V</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">300</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">300</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">10</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=819JP">819JP</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">KUMAMOTO JP</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">V</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">300</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">300</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">10</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=822JP">822JP</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">NOBEOKA JP</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">V</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">300</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">300</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">10</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=836JP">836JP</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">YAKUSHIMA JP</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">V</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">300</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">300</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">10</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=848JP">848JP</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">ICHIKI (KAGOSHIMA) JP</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">V</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">300</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">300</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">10</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=891JP">891JP</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">TAKAMATSU JP</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">V</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">300</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">300</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">10</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=893JP">893JP</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">KOHCHI JP</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">V</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">300</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">300</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">10</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=898JP">898JP</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">SHIMIZU JP</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">V</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">300</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">300</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">10</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=909JP">909JP</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">NAZE JP</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">V</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">300</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">300</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">10</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=912JP">912JP</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">YONAGUNI JP</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">V</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">300</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">300</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">10</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=945JP">945JP</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">MINAMIDAITO JP</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">V</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">300</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">300</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">10</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=ERKQC">ERKQC</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">EUREKA, QC</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">0,90,90</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">1330,3330,3330</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">2000,3330,6660</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=HK1CN">HK1CN</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">HONG KONG CHINA</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">0</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">1347</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">1347</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">10</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=HRDHI">HRDHI</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">HAWI  BIG ISLAND, HI</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">90,90</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">71</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">71</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">10</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=KATHI">KATHI</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">KANEOHE, OAHU, HI</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">90,90</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">71</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">71</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">10</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=KHWHI">KHWHI</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">KAHEAWA (SODAR), HI</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">90,90</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">71</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">71</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">10</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=NAAHI">NAAHI</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">NAALEHU (SODAR), HI</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">90,90</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">71</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">71</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">10</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=PRAPE">PRAPE</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">PIURA (2) PERU</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">0.00,90.00,0.00</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">330,330,330</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">330,330,330</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=PUUHI">PUUHI</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">PUUNENE, HI</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">90,90</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">71</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">71</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">10</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=SPTHI">SPTHI</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">SOUTH POINT (SODAR), HI</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">90,90</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">71</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">71</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">10</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=TBWHI">TBWHI</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">TURTLE BAY, HI</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">90,90</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">71</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">71</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">10</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=WAEHI">WAEHI</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">WAENA (SODAR), HI</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">90,90</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">71</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">71</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">10</td>
								<tr>

							</table>
							<span style="font-family: Arial, Helvetica, sans-serif; font-weight: bold;">International Operational Site Count: 42</span>
							<br><br><hr>



							<table width="100%" border="0"><tr>
								<td width="70%"><h2><a name="decomStn">Decommissioned CAP Station Beam/Mode Values</a></h2></td>
								<td align="right"><a href="#operStn">Operational CAP Stations</a></td>
							</tr></table>
							
							<table border="0">
								<tr>
									<th  id="head1" class="tblHead">Site ID</th>
									<th  id="head2" class="tblHead">Site Location</th>
									<th  id="head3" class="tblHead">Antenna<br>Beam<br>Azimuths<br>(degrees)</th>
									<th  id="head4" class="tblHead">Wind<br>Gate<br>Spacing<br>(ns)</th>
									<th  id="head5" class="tblHead">Wind<br>Pulse<br>Width<br>(ns)</th>
									<th  id="head6" class="tblHead">RASS<br>Gate<br>Spacing<br>(ns)</th>
									<th  id="head7" class="tblHead">RASS<br>Pulse<br>Width<br>(ns)</th>
									<th  id="head8" class="tblHead">Data<br>Resolution<br>(Minutes)</th>
								</tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=264WA">264WA</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">PLYMOUTH, WA</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">0,90,90</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">80</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">80</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">10</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=343OR">343OR</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">FAIRBANKS, OR</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">0,90,90</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">80</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">80</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">10</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=400OR">400OR</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">ODELL, OR</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">0,90,90</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">80</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">80</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">10</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=400WA">400WA</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">PLYMOUTH</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">0,90,90</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">80</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">80</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">10</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=ANLFN">ANLFN</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">PLACE HOLDER FOR ANL DATA</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">0,90,90</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">70</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">70</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">10</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=BACCO">BACCO</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">ERIE (3 GHZ)</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">-1,-1,90</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">159</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">292</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">15</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=BBBCA">BBBCA</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">BODEGA BAY, CA (449MHZ 1/4 SCALE)</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">0,0,270</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">708,1417</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">708,2833</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=BDYTX">BDYTX</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">BRADY, TX</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">90,180,0</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">700,400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">700,400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=BF2SD">BF2SD</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">BF2SD, SD(SODAR)</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">0,90,90</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">73</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">73</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">10</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=BFLSD">BFLSD</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">BUFFALO, SD</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">272,182,2</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">708,708</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">708,708</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">708</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">708</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=BHBME">BHBME</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">BAR HARBOR ME</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">55,147,0</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">400,700</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">400,700</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=BHMTX">BHMTX</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">BRENHAM, TX</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">180,268,0</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">700,400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">700,400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=BJYNV">BJYNV</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">BUSTER JANGLE YANKEE NV</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">25.00,115.00,0.00</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">653,366</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">653,2561</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">394</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">694</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">30</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=BKFCA">BKFCA</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">BAKERSFIELD CA</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">180.00,85.00,0.00</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">700,400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">700,400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">700</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">700</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=BRZ19">BRZ19</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">BRAZOS A19 (GULF OF MEXICO)</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">341,71,341</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">416,708</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">416,708</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">416</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">416</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=BVLTX">BVLTX</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">BEEVILLE, TX</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">0,0, 17.0, 113.0</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">400,700</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">400,700</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=CBENS">CBENS</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">CHEBOGUE NS</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">320,45,0</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">400,700</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">400,700</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=CC2TX">CC2TX</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">COLORADO CITY (SODAR)</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">0,90,90</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">71</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">71</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">10</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=CCDLA">CCDLA</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">COCODRIE LA (LUMCON)</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">38,128,308,218,308</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">400,1400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">700,2800</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=CCDNH">CCDNH</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">CONCORD NH</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">22.00,116.00,0.00</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">700,400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">700,400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=CCLCA">CCLCA</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">CHOWCHILLA CA</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">186.00,278.00,0.00</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">700,400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">700,400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=CJKFL">CJKFL</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">CUDJOE KEY, FL (TARS 449)</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">15,105,285,195,285</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">708</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">708</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=CLETX">CLETX</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">CLEBURNE TX</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">343.00,73.00,73.00</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">416</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">416</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">30</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=CLSTX">CLSTX</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">COLLEGE STATION,TX</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">20,290,20</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">708,417</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">708,417</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=COCTX">COCTX</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">COLORADO CITY, TX</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">31,121,301</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">708,417</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">708,417</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">417</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">417</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=CPTTX">CPTTX</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">CLEBURNE, TX (SODAR)</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">0,90,90</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">71</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">71</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">10</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=CXECA">CXECA</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">CALEXICO, CA</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">193,283,193</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">400,1400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">400,2800</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">30</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=CXXKR">CXXKR</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">CHRISTMAS ISLAND KIRIBATI</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">0.00,90.00,0.00</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">330,2200,3300</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">330,2200,3300</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=DEMNM">DEMNM</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">DEMMING, NM (TARS 449MHZ)</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">198,108,18,288</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">708</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">708</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=DHSNM">DHSNM</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">DEADHORSE, NM</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">357,177,87</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">708</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">708</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">15</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=DS2SD">DS2SD</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">DE SMET, SD (SODAR)</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">0,90,90</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">73</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">73</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">10</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=DSTSD">DSTSD</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">DE SMET, SD</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">300,206,0</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">700,400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">700,400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=EFDTX">EFDTX</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">HOUSTON (ELLINGTON FIELD) TX</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">135.0,225.0,135.0,45.0,315.0</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">30</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=EGPTX">EGPTX</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">EAGLE PASS, TX (TARS 449MHZ)</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">10,100,10,190,280</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">708</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">798</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=EPKCO">EPKCO</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">ESTES PARK CO</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">32,312,0</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">700,400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">700,400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=ERECO">ERECO</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">ERIE, CO</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">352,82,262,262,172</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">667,417</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">667,417</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=ERKCA">ERKCA</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">EUREKA CA</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">218.00,120.00,0.00</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">700,400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">700,400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=ETOMX">ETOMX</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">ESTACION OBISPO MEXICO (915MHZ)</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">89,175,0</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">400,700</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">400,700</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=EWCNC">EWCNC</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">NEW BERN (3GHZ), NC</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">0,0,90</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">417</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">417</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">15</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=FHAAZ">FHAAZ</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">FT. HUACHUCA, AZ (TARS 449MHZ)</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">165,75,165,345,255</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">708</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">708</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=FHCAZ">FHCAZ</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">FT HUACHUCA AZ</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">327.00,57.00,147.00,237.00,327.00</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">700</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">700</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">5</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=FMEMD">FMEMD</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">FT. MEADE MD</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">164.00,254.00,74.00</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">400,1400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">400,2800</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=FTHAZ">FTHAZ</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">FT HUACHUCA AZ</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">327.00,57.00,147.00,237.00,327.00</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">700</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">700</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">30</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=GDNCO">GDNCO</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">GOLDEN CO</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">187,275,0</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">700,400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">700,400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=GLACA">GLACA</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">GOLETA CA</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">183.00,277.00,0.00</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">680,386</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">700,400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">700</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">700</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=GLBCA">GLBCA</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">GOLETA, CA (449 MHZ 1/4 SCALE)</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">92,2,272,182</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">708,1417</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">708,2833</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">708</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">708</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=GMNCA">GMNCA</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">GORMAN, CA</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">359,282,0</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">700,400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">700,400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=GPCGA">GPCGA</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">ATLANTA GA</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">2.00,272.00,182.00</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">700</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">2800</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=GVYCA">GVYCA</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">GRASS VALLEY CA</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">348.00,78.00,0.00</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">700,400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">700,400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">700</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">700</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=GYXME">GYXME</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">GRAY ME</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">332.00,62.00,0.00,152.00,242.00</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">708,416</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">708,416</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">416</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">416</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=HDRHI">HDRHI</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">HAWI  BIG ISLAND, HI</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">90,90</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">71</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">71</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">10</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=HSCNV">HSCNV</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">HAZMAT SPILL CENTER NV</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">28.00,298.00,0.00</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">653,366</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">653,2561</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">394</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">694</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">30</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=HVETX">HVETX</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">HUNTSVILLE TX</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">0,89,184</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">400,700</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">400,700</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=JTNTX">JTNTX</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">JAYTON, TX (SODAR)</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">0,90,90</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">71</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">71</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">10</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=JY2MN">JY2MN</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">SAINT JAMES, MN (SODAR)</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">0,90,0</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">73</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">73</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">10</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=JYGMN">JYGMN</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">SAINT JAMES, MN</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">1,91,271</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">708,417</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">708,417</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">417</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">417</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=LD2ND">LD2ND</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">LEEDS, ND (SODAR)</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">0,90,0</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">73</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">73</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">10</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=LDSND">LDSND</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">LEEDS, ND</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">5,275,0</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">700,400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">700,400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=LHSCA">LHSCA</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">LOST HILLS CA</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">9.00,101.00,0.00</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">700,400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">700,400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">700</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">700</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=LIVCA">LIVCA</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">LIVERMORE(2) CA</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">332,62,332</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">700,400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">700,400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=LJSPR">LJSPR</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">PUERTO RICO (TARS 449MHZ)</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">10,100,10,190,280</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">708</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">798</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=LVWTX">LVWTX</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">LONGVIEW TX</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">160,0,245</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">400,700</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">400,700</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=MBAOR">MBAOR</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">MCKENZIE BRIDGE OR</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">203.00,113.00,0.00</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">700,400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">700,400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=MBGSD">MBGSD</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">MOBRIDGE, SD</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">300,206,0</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">700,400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">700,400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=MDWNM">MDWNM</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">MIDWAY SITE NM</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">350.00,80.00,80.00</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">30</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=MDYTX">MDYTX</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">MOODY, TX</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">333,243,333,63,153</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">417</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">417</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">208</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">417</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=MFATX">MFATX</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">MARFA, TX (TARS 449MHZ)</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">146,56,326,236</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">708</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">708</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=MIPPP">MIPPP</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">MANUS ISLAND, PNG</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">0.00,90.00,0.00</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">560,1950</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">560,1950</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=MPICA">MPICA</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">MARIPOSA, CA</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">-1,-1,90</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">417</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">417</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">15</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=NBFTX">NBFTX</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">NEW BRAUNFELS, TX</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">244,334</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">400,700</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">400,700</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=NPTOR">NPTOR</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">NEWPORT OR</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">158.00,65.00,0.00</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">673,386</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">700,400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=NRELW">NRELW</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">WFIP TEST FOR NREL</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">0,90,90</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">40</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">40</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">10</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=NRMOK">NRMOK</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">NORMAN OK</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">20.00,110.00,290.00,200.00,290.00</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">1400,400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">1400,400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">30</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=NRUNR">NRUNR</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">NAURU NR</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">0.00,90.00,0.00</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">600,2600</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">600,2600</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=NWTNM">NWTNM</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">NW30 NM</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">28.00,208.00,28.00</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">30</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=OFCNC">OFCNC</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">OLD FORT,NC</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">-1,-1,90</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">417</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">417</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">15</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=OHTCA">OHTCA</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">OAKHURST, CA</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">337,71,0</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">700,400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">700,400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=OREMA">OREMA</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">ORANGE MA</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">333.00,240.00,0.00</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">700,400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">700,400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=OXFKS">OXFKS</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">OXFORD KS</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">0.00,90.00,0.00,180.00,270.00</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">400,1400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">400,2800</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">700</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">700</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=OZATX">OZATX</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">OZONA, TX (SODAR)</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">90,90</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">71</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">71</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">10</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=PITPA">PITPA</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">PITTSBURGH PA</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">170.00,260.00,260.00</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">416,708</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">416,708</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">416</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">416</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=PNNHI">PNNHI</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">PUUNENE, HI</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">90,90</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">71</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">71</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">10</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=PPBCA">PPBCA</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">PT. PIEDRAS BLANCAS CA</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">165.00,255.00,0.00</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">700,400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">700,400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=PRPPE">PRPPE</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">PIURA (NORTHERN) PERU</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">0.00,90.00,0.00</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">3000,3100,6600</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">3000,3100,6600</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=PSENH">PSENH</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">PEASE NH</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">2.00,92.00,92.00,182.00,272.00</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">30</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=PSPNY">PSPNY</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">PINNACLE NY</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">1.00,95.00,0.00</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">700,400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">700,400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=PTCCA">PTCCA</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">POINT SUR CA (3GHZ)</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">-1,-1,90</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">417</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">417</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">15</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=PYMMA">PYMMA</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">PLYMOUTH MA</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">17.00,108.00,0.00</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">700,400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">700,400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=RALNC">RALNC</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">RALEIGH NC</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">147.00,57.00,327.00</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">700,400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">2800,400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">30</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=RCHVA">RCHVA</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">RICHMOND VA</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">3.00,273.00,183.00</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">700,400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">700,400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">30</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=RGCTX">RGCTX</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">RIO GRAND CITY, TX (TARS 449)</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">355,85,85,175,265</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">708</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">708</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=RGNTX">RGNTX</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">BIG LAKE, TX (SODAR)</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">90,90</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">71</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">71</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">10</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=RKNFL">RKNFL</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">RUSKIN FL</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">209.00,118.00,0.00</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">700,400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">700,400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=RMACO">RMACO</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">ROCKY MOUNTAIN ARSENAL</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">157,337,247</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">708,416</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">708,416</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">416</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">416</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=RMDCA">RMDCA</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">RICHMOND CA</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">340.00,67.00,0.00</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">700,400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">700,400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">700</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">700</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=SCGEC">SCGEC</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">SAN CRISTOBAL, GALAPAGOS EC</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">0.00,90.00,0.00</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">420,650,1950</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">420,650,1950</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=SCHNY">SCHNY</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">SCHENECTADY NY</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">1.00,95.00,0.00</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">700,400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">700,400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=SFNCA">SFNCA</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">SAN FERNANDO</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">318,48,228</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">700,400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">700,400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=SHSCA">SHSCA</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">SLOUGHHOUSE CA</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">184,274,184</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">708,417</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">708,417</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=SIMCA">SIMCA</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">SIMI VALLEY CA</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">349.00,79.00,0.00</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">700,400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">700,400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=SMILA">SMILA</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">SOUTH MARSH ISLAND LA</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">0,90,0,-1</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">0,210,96,105</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">0,210,96,105</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">60</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">60</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=SNICA">SNICA</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">SAN NICOLAS CA</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">218,308,308</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">708,1417</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">708,1417</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">708</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">708</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=SNRTX">SNRTX</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">SONORA, TX</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">0,43,134</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">400,700</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">400,700</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=SNSCA">SNSCA</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">SAN NICOLAS ISLAND, CA</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">218,308,308</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">708,1417</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">708,1417</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">708</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">708</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=SPBFL">SPBFL</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">ST. PETERSBURG FL</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">350.00,82.00,0.00</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">700,400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">700,400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=SPDCA">SPDCA</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">SUGAR PINE CA (3GHZ)</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">-1,-1,90</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">417</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">417</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">15</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=STCCA">STCCA</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">SATICOY, CA</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">43,316,0</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">700,400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">700,400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=STSCT">STSCT</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">STORRS CT</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">50,140,50</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">375,791</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">416,791</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=SUXIA">SUXIA</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">SIOUX CITY, IA</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">150,240,240</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">417,1333</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">417,2833</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">417</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">417</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=SWYWA">SWYWA</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">SPANAWAY</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">318,50,0</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">700,400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">700,400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=TBMCO">TBMCO</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">TABLE MOUNTAIN CO</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">197,288,0</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">700,400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">700,400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=TLGNM">TLGNM</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">TULAG NM</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">140.00,230.00,230.00</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">30</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=TRKCA">TRKCA</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">TRUCKEE CA</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">37,127,127</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">708,417</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">708,708</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">417</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">417</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=TRWKR">TRWKR</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">TARAWA KIRIBATI</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">0.00,90.00,0.00</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">600,2600</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">600,2600</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=VLCND">VLCND</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">VALLEY CITY, ND</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">315,45,45</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">708,667</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">708,1417</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">708</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">708</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=VRMLA">VRMLA</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">VERMILLON LA</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">0,90,0,-1</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">0,210,105</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">0,210,105</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">60</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">60</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=WFCND">WFCND</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">WATFORD CITY, ND</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">181,99,0</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">700,400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">700,400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=WFDCA">WFDCA</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">WATERFORD CA</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">187.00,96.00,0.00</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">700,400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">700,400</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">700</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">700</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#E0E0E0" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=WHWKS">WHWKS</a></td>									<td class="tblData" bgcolor="#E0E0E0" headers="head2">WHITEWATER KS</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head3">0.00,90.00,0.00,180.00,270.00</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head4">400,1400</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head5">400,2800</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head6">700</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head7">700</td>									<td class="tblData" bgcolor="#E0E0E0" headers="head8">60</td>
								<tr>
								<tr>
									<td class="tblData" bgcolor="#FFFFFF" headers="head1"><a class="alink" href="/cap/sysInfo.jsp?station=YMAAZ">YMAAZ</a></td>									<td class="tblData" bgcolor="#FFFFFF" headers="head2">YUMA, AZ (TARS 449MHZ)</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head3">335,245,155,65</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head4">708</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head5">708</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head6">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head7">&nbsp;</td>									<td class="tblData" bgcolor="#FFFFFF" headers="head8">60</td>
								<tr>

							</table>
							<span style="font-family: Arial, Helvetica, sans-serif; font-weight: bold;">Decommissioned Site Count: 120</span>
							


						</td>
					</tr>
				</table>
			</td>
		</tr>
	</table>
		
	<!-- Standard Footer -->
	<TABLE cellSpacing="0" border="0" width="100%" cellpadding="2">
		<TBODY>
	  		<TR align="center">
	    		<TD class="stdFooterTopLine">
				<A href="disclaim.jsp" class="stdFooterTopLine">Disclaimer</A> 
	      		&nbsp;&nbsp;|&nbsp;&nbsp; 
				<A href="http://www.noaa.gov/privacy.html" target="_blank" class="stdFooterTopLine">
					NOAA Privacy Policy</A> 
	      		&nbsp;&nbsp;|&nbsp;&nbsp; 
				<A href="http://www.noaa.gov/disclaimer.html" target="_blank" class="stdFooterTopLine">
					NOAA Disclaimer For External Links</A>
	      		&nbsp;&nbsp;|&nbsp;&nbsp; 
				<A href="http://esrl.noaa.gov/gsd/search.html" target="_blank" class="stdFooterTopLine">
					Search GSD</A>
				</TD>
			</tr>
			<tr>
				<td class="stdFooterBottomLine">
					<div class="footerText" align="center">
						<!--em>Please send comments or suggestions to:&nbsp; </em--!>
						<!--a href="mailto:webmaster-dd.fsl@noaa.gov" class="alink"--!>
						<!--em>webmaster-dd.fsl@noaa.gov</em></a--!>
						<em>Please send comments or suggestions to:&nbsp; </em>
						<a href="mailto:madis-support@noaa.gov" class="alink">
						<em>MADIS support</em></a>
					</div>
					
					<!-- Mod Date and Page Hit Counter -->
					<div class="footerText" align="center">
						<em>
								Page Last Modified: <b>Undetermined</b>
						</em>
						<br>
				
						
				
						
					</div>
				</td>
			</TR>
		</TBODY>
	</TABLE>
		

</body>
</html>
