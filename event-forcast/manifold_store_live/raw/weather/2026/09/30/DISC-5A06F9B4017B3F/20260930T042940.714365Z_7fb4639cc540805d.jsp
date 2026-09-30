<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>















	<link rel="stylesheet" type="text/css" href="styles/winMenus.css">
	<link rel="stylesheet" type="text/css" href="styles/winStyle.css">








	<title>CAP System Status</title>
	<META http-equiv="Refresh" content="720">
	<META http-equiv="Expires" content="Mon, 06 Jan 1990 00:00:01 GMT">
	<META name="keywords" content="profiler, wind, cap, status" http-equiv="Keywords">







	<STYLE TYPE="text/css">
		#dek {POSITION:absolute;VISIBILITY:hidden;Z-INDEX:200;}
		.popup{
			font-family : "Courier New", Courier, monospace;
			font-size : 12px;
		}
	</style>
	<script type="text/javascript">
	<!--
	conusMapArySiteName = new Array( "ABTQC", "ARMOK", "ASTOR", "AMDQC", "BMTKS", "BPATX", "BBHAR", "BLTMD", "BO2OR", "BOROR", "BBYCA", "KSCFL", "FCPFL", "MIDFL", "MLNFL", "SCPFL", "RCOFL", "CFDUT", "CHANC", "CCOCA", "CTNNC", "FHHAZ", "CFCCA", "CCRCA", "CD2OR", "CDNOR", "DR2OR", "EGBQC", "CARON", "EPSTX", "191OR", "FKSWA", "FPDUT", "GNQQC", "GLAMN", "GDLWA", "GV2OR", "GRICA", "HRWQC", "HGDUT", "HPLMD", "HSNTX", "IRVCA", "JD2OR", "JZISC", "ARVWI", "LMNOK", "LPTTX", "LWSDE", "197OR", "LVRCA", "200OR", "LNMCO", "LAXCA", "RESTX", "LBKTX", "DALNS", "MRONC", "MSYQC", "MCGQC", "ACVCA", "MDCKS", "MKROK", "MMRCA", "NPSCA", "MCGQU", "MOVCA", "352OR", "PQLMS", "NCKQC", "EWNNC", "RUTNJ", "OTHOR", "OFTNC", "OHKTN", "446OR", "ONTCA", "OVECA", "PNRMD", "PVLCO", "265WA", "PTLCA", "PTMCA", "PTSCA", "PRWWI", "PV2OR", "PVEOR", "RTPNC", "RTPTX", "204OR", "SACCA", "SBACA", "SEAWA", "360OR", "SUACA", "SLDUT", "STWMA", "SNYFL", "DGWUT", "TCYCA", "TDEOR", "PAPAZ", "TCICA", "VISCA", "WWLWA", "WLMQC", "WC2OR", "WCOOR", "WPTWA", "WTNTX", "WHPCA", "WFCQC", "WILDE", "YKMWA", "YUMAZ" );
	conusMapAryLngName = new Array( "ABITIBI, QC", "ARM SGP OK", "ASTORIA OR", "AUMOND, QC", "BEAUMONT KS", "BEAUMONT PORT ARTHUR, TX", "BEE BRANCH, AR", "BELTSVILLE MD", "BOARDMAN (SODAR), OR", "BOARDMAN, OR", "BODEGA BAY CA", "CAPE CANAVERAL (50 MHZ) FL", "CAPE CANAVERAL (FALSECAPE) FL", "CAPE CANAVERAL (MERRITT) FL", "CAPE CANAVERAL (MOSQUITOLAGOON", "CAPE CANAVERAL (SOUTHCAPE) FL", "CAPE CANAVERAL (TI-CO) FL", "CARR, UT", "CHARLOTTE NC", "CHICO CA", "CLAYTON NC", "CMO AZ", "COLFAX CA", "CONCORD, CA", "CONDON (SODAR), OR", "CONDON, OR", "DECKER RANCH AIRSTRIP (SODAR), OR", "EGBERT, QC", "EGBERT ON", "EL PASO TX", "FAIRBANKS, OR", "FORKS WA", "FRIES PARK, UT", "GANANOQUE, QC", "GLACIAL RIDGE MN", "GOLDENDALE, WA (SODAR)", "GRASS VALLEY, OR", "GRIZZLY ISLAND", "HARROW", "HORIZONTAL GRID UT", "HORN POINT LAB", "HOUSTON COASTAL CENTER TX", "IRVINE CA", "JOHN DAY (SODAR), OR", "JOHNS ISLAND, SC", "LAKELAND, WI", "LAMONT OK ARM", "LAPORTE TX", "LEWES, DE", "LEXINGTON. OR", "LIVERMORE CA", "LOCUST GROVE, OR", "LONGMONT CO", "LOS ANGELES, CA", "LUBBOCK, TX (SODAR)", "LUBBOCK TX (REESE CENTER)", "LUNENBURG NS", "MARION,NC", "MARKSTAY", "MCGILL, QC", "MCKINLEYVILLE", "MEDICINE LODGE KS", "MEEKER, OK", "MIRAMAR CA", "MONTEREY CA", "MONTREAL QU", "MORENO VALLEY CA", "MORO, OR", "MOSS POINT MS", "NEGROCREEK, QC", "NEW BERN NC", "NEW BRUNSWICK, NJ", "NORTH BEND, OR", "OLD FORT,NC", "OLD HICKORY TN", "OLEX, OR", "ONTARIO CA", "OROVILLE", "PINEY RUN, MD", "PLATTEVILLE (449)", "PLYMOUTH, WA", "POINT LOMA CA", "POINT MUGU, CA", "POINT SUR CA", "PRENTICE, WI", "PRINEVILLE (SODAR), OR", "PRINEVILLE, OR", "RESEARCH TRIANGLE PARK, NC", "ROUND TOP,TX", "RUFUS, OR", "SACRAMENTO CA", "SANTA BARBARA", "SEATTLE WA", "SHELL ROCK ROAD, OR", "SIMI VALLEY UPPER AIR ATMOSPHERIC PROFILER", "SL-TEST, UT", "STOW MA", "SYDNEY FL", "TOWER GRID UT", "TRACY CA", "TROUTDALE, WA", "TUCSON AZ", "TWITCHELL ISLAND", "VISALIA CA", "WALLA WALLA, WA (SODAR)", "WALSINGHAM", "WASCO (SODAR), OR", "WASCO, OR", "WESTPORT WA", "WHARTON TX", "WHITEMAN AIRPORT PACOIMA CA", "WILBERFORCE, QC", "WILMINGTON DE", "YAKIMA, WA (SODAR)", "YUMA AZ" );
	conusMapAryLon = new Array( "-81.57", "-97.50", "-123.88", "-75.9", "-96.54", "-94.10", "-92.379900", "-76.8785", "-119.811766", "-119.811766", "-123.07", "-80.70", "-80.60", "-80.70", "-80.70", "-80.60", "-80.80", "-112.88778683", "-80.93", "-121.91", "-78.46", "-110.30", "-120.94", "-122.06", "-120.1705", "-120.166450", "-120.659415", "-79.78", "-79.79", "-106.50", "-121.06780", "-124.40", "-112.775993", "-76.247", "-96.26", "-120.8486", "-120.744273", "-121.90", "-82.892", "-113.17", "-76.14", "-95.04", "-117.73", "-120.70", "-80.01", "-89.73", "-97.5", "-95.06", "-75.085278", "-119.49100", "-121.90", "-120.74730", "-105.12", "-118.44", "-102.0496", "-102.00", "-63.60", "-81.9609", "-80.54", "-73.94", "-124.11", "-98.93", "-96.90", "-117.10", "-121.76", "-73.57", "-117.22", "-120.78070", "-88.53", "-80.859", "-77.05", "-74.43", "-124.240000", "-82.161", "-86.56", "-120.15550", "-117.58", "-121.629200", "-79.0121", "-104.73", "-119.40590", "-117.25", "-119.10", "-121.89", "-90.28", "-120.900835", "-120.90", "-78.87", "-96.746", "-120.67987", "-121.42", "-119.85", "-122.26", "-121.32397", "-118.7975", "-113.4505005", "-71.30", "-82.23", "-113.17", "-121.44", "-122.39", "-111.34", "-121.650200", "-119.39", "-118.2617", "-80.572", "-120.67", "-120.67", "-124.11", "-96.15", "-118.41", "-78.21", "-75.52", "-120.5510", "-114.50" );
	conusMapAryLat = new Array( "49.88", "36.60", "46.16", "46.45", "37.63", "30.10", "35.427100", "39.0554", "45.816185", "45.816185", "38.32", "28.63", "28.60", "28.60", "28.70", "28.40", "28.50", "40.1808661667", "35.21", "39.69", "35.59", "31.60", "39.08", "37.99", "45.246239", "45.244780", "45.170202", "44.23", "44.23", "31.77", "45.63102", "47.97", "40.214569167", "44.408", "47.72", "45.8061", "45.372959", "38.10", "42.037", "40.20", "38.59", "29.39", "33.69", "45.72", "32.70", "45.92", "36.6", "29.67", "38.770278", "45.50483", "37.70", "45.57451", "40.16", "33.94", "33.61006", "33.50", "44.60", "35.6547", "46.54", "45.41", "40.97", "37.28", "35.50", "32.90", "36.69", "45.50", "33.87", "45.51586", "30.47", "44.362", "35.08", "40.46", "43.420000", "35.643", "36.25", "45.55357", "34.06", "39.511930", "39.7057", "40.18", "45.93761", "32.70", "34.10", "36.30", "45.54", "44.285791", "44.29", "35.88", "29.963", "45.63742", "38.30", "34.43", "47.69", "45.37397", "34.29111", "40.1350785", "42.50", "27.97", "40.20", "37.68", "45.55", "32.51", "38.096890", "36.31", "46.0949", "42.638", "45.59", "45.59", "46.91", "29.26", "34.26", "45.06", "39.73", "46.5725", "32.80" );
	conusMapAryElev = new Array( "207", "310", "3", "217", "478", "5", "232", "53", "112", "112", "12", "1", "3", "3", "5", "3", "5", "1319.5", "220", "41", "76", "1444", "644", "14", "887", "891", "795", "251", "252", "1160", "166", "92", "1468.9", "120", "349", "503", "697.1", "0", "191", "1299", "4", "5", "122", "67.2", "16", "497", "310", "8", "7", "706", "108", "456", "1517", "47", "1017", "1018", "34", "384", "248", "29", "56", "585", "275", "126", "51", "92", "452", "731", "9", "315", "3", "10", "5", "434", "178", "356", "280", "56", "763", "1503", "116", "23", "2", "10", "481", "959", "969", "164", "137", "432", "6", "4", "11", "827", "279", "1291.4", "91", "27", "1299", "61", "12", "578", "0", "81", "381", "200", "462", "462", "5", "52", "300", "385", "28", "329", "97" );
	conusMapAryType = new Array( "3", "1", "1", "3", "1", "1", "1", "1", "4", "1", "1", "3", "1", "1", "1", "1", "1", "2", "1", "1", "1", "1", "1", "1", "4", "1", "4", "3", "1", "1", "4", "1", "2", "3", "1", "4", "4", "1", "3", "2", "1", "1", "1", "4", "1", "1", "1", "1", "1", "4", "1", "4", "1", "1", "4", "1", "1", "1", "3", "3", "1", "1", "1", "1", "1", "1", "1", "4", "1", "3", "1", "1", "1", "1", "1", "4", "1", "1", "1", "1", "4", "1", "1", "1", "1", "4", "1", "1", "1", "4", "1", "1", "1", "4", "1", "2", "1", "1", "2", "1", "1", "1", "1", "1", "4", "3", "4", "1", "1", "1", "1", "3", "1", "4", "1" );
	conusMapAryState = new Array( "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER" );
	conusMapArySrcOrg = new Array( "OQNET", "ARM", "PSD", "OQNET", "ANL/ARM", "TNRCC", "PSD", "MDE", "ARL", "ARL", "PSD", "KSC-CCAFS", "KSC-CCAFS", "KSC-CCAFS", "KSC-CCAFS", "KSC-CCAFS", "KSC-CCAFS", "DGP", "NCDE-DENR", "PSD", "PSD", "EPG", "PSD", "PSD", "NREL", "PSD", "NREL", "OQNET", "EC-CARE", "TNRCC", "VAISALA", "PSD", "DGP", "OQNET", "UND", "ANL", "PNNL", "CARB", "OQNET", "DPG", "MDE", "MMS", "SCQ", "ND", "PSD", "PSD", "ARM", "TNRCC", "DNREC", "VAISALA", "BAAQMD", "VAISALA", "DETECT", "SCQ", "NCSU", "TTU", "EC", "PSD", "OQNET", "OQNET", "PSL", "ARM", "ARM", "SDAPCD", "NPS-DM", "MCGILL", "SCQ", "VAISALA", "PSD", "OQNET", "PSD", "RU/NJDEP", "PSD", "PSD", "PSD", "VAISALA", "SCQ", "PSD", "MDE", "PSD", "VAISALA", "SDAPCD", "NPS-NAVAIR", "PSD", "PSD", "ARL", "PSD", "EPA", "PSD", "VAISALA", "SMAQMD", "PSD", "UW/NWS", "VAISALA", "VCAPCD", "DGP", "MDOEPAAB", "PSD", "DPG", "SJV-APCD", "PSD", "PSD", "PSD", "SJV-APCD", "ANL", "OQNET", "ARL", "PSD", "PSD", "PSD", "SCQ", "OQNET", "DNREC", "ANL", "YPG" );
	conusMapAryLatestWind = new Array( "2017-Aug-31 00:00", "2006-Apr-27 14:00", "2026-Sep-30 00:00", "2017-Feb-20 08:00", "2006-Apr-27 14:00", "2015-Feb-06 15:00", "2015-Nov-09 20:00", "2026-Sep-30 02:00", "2017-Mar-06 15:30", "2017-Feb-21 23:00", "2026-Sep-30 02:00", "2013-Mar-20 20:00", "2013-Mar-22 06:30", "2013-Mar-22 11:45", "2013-Feb-04 14:30", "2013-Mar-22 11:45", "2013-Mar-22 11:45", "2023-Oct-24 14:00", "2017-Nov-15 15:00", "2018-Jun-05 16:00", "2020-Apr-21 12:00", "2006-Nov-29 20:00", "2015-Jun-24 23:00", "2011-Mar-22 20:00", "2017-Mar-06 15:15", "2017-Feb-21 23:00", "2017-Apr-07 16:30", "2016-Oct-08 15:00", "2014-Jul-18 17:30", "2019-Jul-30 23:00", "2017-Aug-17 22:10", "2026-Sep-30 02:00", "2026-Sep-28 19:00", "2016-Feb-05 02:00", "2015-Mar-03 06:00", "2017-Mar-06 15:15", "2017-Mar-06 15:00", "2005-Dec-31 21:00", "2020-Jul-24 21:00", "2026-Sep-13 14:00", "2026-Sep-30 02:00", "2018-Aug-07 22:30", "2016-Apr-28 19:00", "2017-Jan-27 20:45", "2015-Nov-05 17:00", "2019-Oct-29 17:00", "2011-Feb-24 22:00", "2024-Aug-01 17:00", "2018-May-14 17:00", "2017-Aug-17 16:20", "2011-Mar-11 22:00", "2017-Aug-22 17:00", "2015-Sep-14 22:55", "2020-Jan-02 22:00", "2012-Sep-22 12:30", "2016-Mar-07 15:30", "2015-Nov-15 10:00", "2014-Oct-27 15:00", "2020-Sep-22 01:00", "2014-Aug-23 14:00", "2026-Mar-30 15:00", "2005-Nov-16 18:00", "2007-Jul-14 09:00", "2014-Apr-04 18:00", "2025-Aug-21 13:00", "2010-May-28 19:00", "2014-Oct-28 13:00", "2017-Dec-15 22:20", "2015-Nov-08 13:00", "2017-Feb-21 19:00", "2015-Nov-04 13:00", "2025-May-10 02:00", "2026-Sep-30 02:00", "2014-Oct-29 16:00", "2013-Aug-06 13:00", "2017-Dec-15 22:50", "2014-Jul-25 06:00", "2026-Sep-30 02:00", "2026-Sep-30 02:00", "2024-Oct-23 17:00", "2017-Dec-15 22:20", "2010-Apr-14 19:00", "2018-Oct-04 21:00", "2025-Aug-21 13:00", "2019-Oct-30 14:00", "2017-Mar-06 15:30", "2017-Feb-21 23:00", "2018-Jan-03 06:00", "2013-Oct-23 17:00", "2017-Dec-15 22:40", "2016-Jun-09 17:00", "2026-Sep-30 01:00", "2019-Apr-16 19:00", "2017-Dec-15 22:10", "2023-May-09 11:00", "2020-Jul-23 22:00", "2011-Sep-07 07:00", "2015-Nov-07 12:00", "2026-Sep-29 19:00", "2017-Aug-30 19:00", "2019-Aug-14 18:00", "2011-Jan-31 20:00", "2026-Sep-30 02:00", "2020-Sep-22 00:00", "2017-Mar-06 15:15", "2017-Feb-21 23:00", "2017-Mar-06 15:30", "2017-Feb-21 21:00", "2013-Nov-13 16:00", "2013-Oct-23 12:00", "2013-Feb-12 18:00", "2020-Sep-18 14:00", "2011-Sep-20 12:30", "2017-May-15 04:15", "2003-Nov-19 13:30" );
	conusMapAryLatestRass = new Array( "Unavailable", "2006-May-04 03:05", "2026-Sep-29 23:00", "Unavailable", "2006-May-04 03:05", "Unavailable", "2015-Nov-09 20:00", "2026-Jun-12 21:00", "Unavailable", "2016-Dec-31 00:00", "2026-Sep-29 13:00", "Unavailable", "Unavailable", "Unavailable", "Unavailable", "Unavailable", "Unavailable", "2020-Jul-23 07:40", "2017-Nov-15 16:00", "2018-Jun-05 16:00", "2016-Mar-21 10:00", "Unavailable", "Unavailable", "Unavailable", "Unavailable", "2017-Feb-21 23:00", "Unavailable", "Unavailable", "Unavailable", "Unavailable", "Unavailable", "2026-Sep-30 02:00", "2020-Mar-09 17:50", "Unavailable", "Unavailable", "Unavailable", "Unavailable", "2005-Dec-31 21:00", "Unavailable", "2020-Jun-15 10:35", "2026-Sep-20 15:00", "2018-Aug-07 22:30", "2016-Apr-28 19:00", "Unavailable", "Unavailable", "2019-Oct-29 17:00", "2011-Feb-24 21:05", "Unavailable", "2018-May-14 17:00", "Unavailable", "2011-Mar-22 13:00", "Unavailable", "Unavailable", "2020-Jan-06 03:00", "Unavailable", "2016-Mar-07 15:00", "2015-Nov-15 10:00", "Unavailable", "Unavailable", "Unavailable", "2026-Mar-30 14:00", "2005-Nov-16 16:05", "2007-Jul-14 08:05", "2014-Apr-04 18:00", "2025-Aug-19 18:00", "2010-May-28 19:00", "2014-Oct-28 13:00", "Unavailable", "Unavailable", "Unavailable", "Unavailable", "2025-May-09 17:00", "2026-Sep-29 19:00", "Unavailable", "Unavailable", "Unavailable", "2014-Jul-25 06:00", "2026-Sep-29 16:00", "2026-Jul-27 18:00", "2024-Oct-23 11:00", "Unavailable", "2010-Apr-14 18:55", "2018-Oct-04 20:00", "2025-Aug-21 13:00", "2019-Oct-30 10:00", "Unavailable", "2017-Feb-21 23:00", "2018-Jan-03 06:00", "Unavailable", "Unavailable", "2016-Jun-08 18:00", "2026-Sep-30 00:00", "2019-Apr-16 19:00", "Unavailable", "2023-May-09 09:00", "2020-Jul-18 08:10", "2011-Sep-07 07:00", "2002-May-31 17:00", "2020-Jul-23 03:40", "2017-Sep-11 22:30", "2019-Aug-14 18:00", "Unavailable", "Unavailable", "2009-Nov-05 16:00", "Unavailable", "Unavailable", "Unavailable", "2017-Feb-21 23:00", "2002-Mar-27 17:00", "Unavailable", "2013-Feb-12 16:00", "Unavailable", "2011-Sep-20 14:00", "Unavailable", "2003-Nov-19 13:30" );

	juneauMapArySiteName = new Array( "LMCAK", "DGNAK", "DGSAK" );
	juneauMapAryLngName = new Array( "JUNEAU (LEMON CREEK) AK", "JUNEAU (NORTH DOUGLAS) AK", "JUNEAU (SOUTH DOUGLAS) AK" );
	juneauMapAryLon = new Array( "-134.51", "-134.56", "-134.39" );
	juneauMapAryLat = new Array( "58.36", "58.34", "58.28" );
	juneauMapAryElev = new Array( "5", "45", "4" );
	juneauMapAryType = new Array( "1", "1", "1" );
	juneauMapAryState = new Array( "OPER", "OPER", "OPER" );
	juneauMapArySrcOrg = new Array( "NCAR/FAA", "NCAR/FAA", "NCAR/FAA" );
	juneauMapAryLatestWind = new Array( "2016-Jul-06 19:40", "2016-Jul-06 19:40", "2016-Jul-06 19:40" );
	juneauMapAryLatestRass = new Array( "Unavailable", "Unavailable", "Unavailable" );

	japanMapArySiteName = new Array( "616JP", "755JP", "805JP", "HK1CN", "848JP", "678JP", "800JP", "674JP", "640JP", "893JP", "626JP", "819JP", "795JP", "945JP", "629JP", "585JP", "423JP", "636JP", "909JP", "822JP", "417JP", "815JP", "663JP", "406JP", "587JP", "898JP", "656JP", "612JP", "891JP", "746JP", "836JP", "912JP" );
	japanMapAryLngName = new Array( "FUKUI JP", "HAMADA JP", "HIRADO JP", "HONG KONG CHINA", "ICHIKI (KAGOSHIMA) JP", "ICHIKI JP", "IZUHARA JP", "KATSUURA JP", "KAWAGUCHIKO JP", "KOHCHI JP", "KUMAGAYA JP", "KUMAMOTO JP", "MIHAMA (WAKAYAMA) JP", "MINAMIDAITO JP", "MITO JP", "MIYAKO JP", "MURORAN JP", "NAGOYA JP", "NAZE JP", "NOBEOKA JP", "OBIHIRO JP", "OHITA JP", "OWASE JP", "RUMOI JP", "SAKATA JP", "SHIMIZU JP", "SHIZUOKA JP", "TAKADA JP", "TAKAMATSU JP", "TOTTORI JP", "YAKUSHIMA JP", "YONAGUNI JP" );
	japanMapAryLon = new Array( "136.23", "132.07", "129.55", "114.17", "130.32", "139.78", "129.23", "140.32", "138.76", "133.55", "139.38", "130.71", "135.13", "131.23", "140.47", "141.97", "140.97", "136.97", "129.50", "131.66", "143.22", "131.62", "136.2", "141.64", "139.85", "133.01", "138.41", "138.25", "134.06", "134.20", "130.66", "123.01" );
	japanMapAryLat = new Array( "36.05", "34.89", "33.36", "22.33", "31.71", "33.12", "34.15", "35.15", "35.5", "33.57", "36.15", "32.81", "33.90", "25.83", "36.38", "39.65", "42.32", "35.17", "28.38", "32.58", "42.92", "33.23", "34.07", "43.94", "38.91", "32.72", "34.97", "37.1", "34.31", "35.53", "30.38", "24.46" );
	japanMapAryElev = new Array( "9", "20", "58", "26", "25", "152", "130", "12", "860", "3", "30", "38", "3", "16", "29", "43", "3", "51", "3", "19", "38", "5", "15", "23", "3", "31", "14", "13", "9", "6", "36", "30" );
	japanMapAryType = new Array( "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1" );
	japanMapAryState = new Array( "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER" );
	japanMapArySrcOrg = new Array( "JMA", "JMA", "JMA", "HKOBS", "JMA", "JMA", "JMA", "JMA", "JMA", "JMA", "JMA", "JMA", "JMA", "JMA", "JMA", "JMA", "JMA", "JMA", "JMA", "JMA", "JMA", "JMA", "JMA", "JMA", "JMA", "JMA", "JMA", "JMA", "JMA", "JMA", "JMA", "JMA" );
	japanMapAryLatestWind = new Array( "2016-Aug-23 13:00", "2016-Aug-23 13:00", "2016-Aug-23 13:00", "2016-Aug-23 14:00", "2016-Aug-23 13:00", "2016-Aug-23 13:00", "2016-Aug-23 13:00", "2016-Aug-23 13:00", "2016-Aug-23 13:00", "2016-Aug-23 13:00", "2016-Aug-23 13:00", "2016-Aug-23 13:00", "2016-Aug-23 13:00", "2016-Aug-23 13:00", "2016-Aug-23 13:00", "2016-Aug-23 13:00", "2016-Aug-23 11:00", "2016-Aug-23 13:00", "2016-Aug-23 13:00", "2016-Aug-23 13:00", "2016-Aug-23 13:00", "2016-Aug-23 13:00", "2016-Aug-23 13:00", "2016-Aug-23 13:00", "2016-Aug-23 10:00", "2016-Aug-23 13:00", "2016-Aug-23 13:00", "2016-Aug-23 13:00", "2016-Aug-23 13:00", "2016-Aug-23 13:00", "2016-Aug-23 13:00", "2016-Aug-23 13:00" );
	japanMapAryLatestRass = new Array( "Unavailable", "Unavailable", "Unavailable", "Unavailable", "Unavailable", "Unavailable", "Unavailable", "Unavailable", "Unavailable", "Unavailable", "Unavailable", "Unavailable", "Unavailable", "Unavailable", "Unavailable", "Unavailable", "Unavailable", "Unavailable", "Unavailable", "Unavailable", "Unavailable", "Unavailable", "Unavailable", "Unavailable", "Unavailable", "Unavailable", "Unavailable", "Unavailable", "Unavailable", "Unavailable", "Unavailable", "Unavailable" );

	spacMapArySiteName = new Array( "ABTQC", "ARMOK", "ASTOR", "AMDQC", "BMTKS", "BPATX", "BBHAR", "BLTMD", "BO2OR", "BOROR", "BBYCA", "KSCFL", "FCPFL", "MIDFL", "MLNFL", "SCPFL", "RCOFL", "CFDUT", "CHANC", "CCOCA", "CTNNC", "FHHAZ", "CFCCA", "CCRCA", "CD2OR", "CDNOR", "DR2OR", "EGBQC", "CARON", "EPSTX", "191OR", "FKSWA", "FPDUT", "616JP", "GNQQC", "GLAMN", "GDLWA", "GV2OR", "GRICA", "755JP", "HRWQC", "HRDHI", "805JP", "HK1CN", "HGDUT", "HPLMD", "HSNTX", "848JP", "678JP", "IRVCA", "800JP", "JD2OR", "JZISC", "LMCAK", "DGNAK", "DGSAK", "KHWHI", "KATHI", "674JP", "640JP", "893JP", "626JP", "819JP", "ARVWI", "LMNOK", "LPTTX", "LWSDE", "197OR", "LVRCA", "200OR", "LNMCO", "LAXCA", "RESTX", "LBKTX", "DALNS", "MRONC", "MSYQC", "MCGQC", "ACVCA", "MDCKS", "MKROK", "795JP", "945JP", "MMRCA", "629JP", "585JP", "NPSCA", "MCGQU", "MOVCA", "352OR", "PQLMS", "423JP", "NAAHI", "636JP", "909JP", "NCKQC", "EWNNC", "RUTNJ", "822JP", "OTHOR", "417JP", "815JP", "OFTNC", "OHKTN", "446OR", "ONTCA", "OVECA", "663JP", "PNRMD", "PRAPE", "PVLCO", "265WA", "PTLCA", "PTMCA", "PTSCA", "PRWWI", "PV2OR", "PVEOR", "PUUHI", "RTPNC", "RTPTX", "204OR", "406JP", "SACCA", "587JP", "SBACA", "SEAWA", "360OR", "898JP", "656JP", "SUACA", "SLDUT", "SPTHI", "STWMA", "SNYFL", "612JP", "891JP", "746JP", "DGWUT", "TCYCA", "TDEOR", "PAPAZ", "TBWHI", "TCICA", "VISCA", "WAEHI", "WWLWA", "WLMQC", "WC2OR", "WCOOR", "WPTWA", "WTNTX", "WHPCA", "WFCQC", "WILDE", "YKMWA", "836JP", "912JP", "YUMAZ" );
	spacMapAryLngName = new Array( "ABITIBI, QC", "ARM SGP OK", "ASTORIA OR", "AUMOND, QC", "BEAUMONT KS", "BEAUMONT PORT ARTHUR, TX", "BEE BRANCH, AR", "BELTSVILLE MD", "BOARDMAN (SODAR), OR", "BOARDMAN, OR", "BODEGA BAY CA", "CAPE CANAVERAL (50 MHZ) FL", "CAPE CANAVERAL (FALSECAPE) FL", "CAPE CANAVERAL (MERRITT) FL", "CAPE CANAVERAL (MOSQUITOLAGOON", "CAPE CANAVERAL (SOUTHCAPE) FL", "CAPE CANAVERAL (TI-CO) FL", "CARR, UT", "CHARLOTTE NC", "CHICO CA", "CLAYTON NC", "CMO AZ", "COLFAX CA", "CONCORD, CA", "CONDON (SODAR), OR", "CONDON, OR", "DECKER RANCH AIRSTRIP (SODAR), OR", "EGBERT, QC", "EGBERT ON", "EL PASO TX", "FAIRBANKS, OR", "FORKS WA", "FRIES PARK, UT", "FUKUI JP", "GANANOQUE, QC", "GLACIAL RIDGE MN", "GOLDENDALE, WA (SODAR)", "GRASS VALLEY, OR", "GRIZZLY ISLAND", "HAMADA JP", "HARROW", "HAWI  BIG ISLAND, HI", "HIRADO JP", "HONG KONG CHINA", "HORIZONTAL GRID UT", "HORN POINT LAB", "HOUSTON COASTAL CENTER TX", "ICHIKI (KAGOSHIMA) JP", "ICHIKI JP", "IRVINE CA", "IZUHARA JP", "JOHN DAY (SODAR), OR", "JOHNS ISLAND, SC", "JUNEAU (LEMON CREEK) AK", "JUNEAU (NORTH DOUGLAS) AK", "JUNEAU (SOUTH DOUGLAS) AK", "KAHEAWA (SODAR), HI", "KANEOHE, OAHU, HI", "KATSUURA JP", "KAWAGUCHIKO JP", "KOHCHI JP", "KUMAGAYA JP", "KUMAMOTO JP", "LAKELAND, WI", "LAMONT OK ARM", "LAPORTE TX", "LEWES, DE", "LEXINGTON. OR", "LIVERMORE CA", "LOCUST GROVE, OR", "LONGMONT CO", "LOS ANGELES, CA", "LUBBOCK, TX (SODAR)", "LUBBOCK TX (REESE CENTER)", "LUNENBURG NS", "MARION,NC", "MARKSTAY", "MCGILL, QC", "MCKINLEYVILLE", "MEDICINE LODGE KS", "MEEKER, OK", "MIHAMA (WAKAYAMA) JP", "MINAMIDAITO JP", "MIRAMAR CA", "MITO JP", "MIYAKO JP", "MONTEREY CA", "MONTREAL QU", "MORENO VALLEY CA", "MORO, OR", "MOSS POINT MS", "MURORAN JP", "NAALEHU (SODAR), HI", "NAGOYA JP", "NAZE JP", "NEGROCREEK, QC", "NEW BERN NC", "NEW BRUNSWICK, NJ", "NOBEOKA JP", "NORTH BEND, OR", "OBIHIRO JP", "OHITA JP", "OLD FORT,NC", "OLD HICKORY TN", "OLEX, OR", "ONTARIO CA", "OROVILLE", "OWASE JP", "PINEY RUN, MD", "PIURA (2) PERU", "PLATTEVILLE (449)", "PLYMOUTH, WA", "POINT LOMA CA", "POINT MUGU, CA", "POINT SUR CA", "PRENTICE, WI", "PRINEVILLE (SODAR), OR", "PRINEVILLE, OR", "PUUNENE, HI", "RESEARCH TRIANGLE PARK, NC", "ROUND TOP,TX", "RUFUS, OR", "RUMOI JP", "SACRAMENTO CA", "SAKATA JP", "SANTA BARBARA", "SEATTLE WA", "SHELL ROCK ROAD, OR", "SHIMIZU JP", "SHIZUOKA JP", "SIMI VALLEY UPPER AIR ATMOSPHERIC PROFILER", "SL-TEST, UT", "SOUTH POINT (SODAR), HI", "STOW MA", "SYDNEY FL", "TAKADA JP", "TAKAMATSU JP", "TOTTORI JP", "TOWER GRID UT", "TRACY CA", "TROUTDALE, WA", "TUCSON AZ", "TURTLE BAY, HI", "TWITCHELL ISLAND", "VISALIA CA", "WAENA (SODAR), HI", "WALLA WALLA, WA (SODAR)", "WALSINGHAM", "WASCO (SODAR), OR", "WASCO, OR", "WESTPORT WA", "WHARTON TX", "WHITEMAN AIRPORT PACOIMA CA", "WILBERFORCE, QC", "WILMINGTON DE", "YAKIMA, WA (SODAR)", "YAKUSHIMA JP", "YONAGUNI JP", "YUMA AZ" );
	spacMapAryLon = new Array( "-81.57", "-97.50", "-123.88", "-75.9", "-96.54", "-94.10", "-92.379900", "-76.8785", "-119.811766", "-119.811766", "-123.07", "-80.70", "-80.60", "-80.70", "-80.70", "-80.60", "-80.80", "-112.88778683", "-80.93", "-121.91", "-78.46", "-110.30", "-120.94", "-122.06", "-120.1705", "-120.166450", "-120.659415", "-79.78", "-79.79", "-106.50", "-121.06780", "-124.40", "-112.775993", "136.23", "-76.247", "-96.26", "-120.8486", "-120.744273", "-121.90", "132.07", "-82.892", "-155.847", "129.55", "114.17", "-113.17", "-76.14", "-95.04", "130.32", "139.78", "-117.73", "129.23", "-120.70", "-80.01", "-134.51", "-134.56", "-134.39", "-156.5389", "-157.757353", "140.32", "138.76", "133.55", "139.38", "130.71", "-89.73", "-97.5", "-95.06", "-75.085278", "-119.49100", "-121.90", "-120.74730", "-105.12", "-118.44", "-102.0496", "-102.00", "-63.60", "-81.9609", "-80.54", "-73.94", "-124.11", "-98.93", "-96.90", "135.13", "131.23", "-117.10", "140.47", "141.97", "-121.76", "-73.57", "-117.22", "-120.78070", "-88.53", "140.97", "-155.5852028", "136.97", "129.50", "-80.859", "-77.05", "-74.43", "131.66", "-124.240000", "143.22", "131.62", "-82.161", "-86.56", "-120.15550", "-117.58", "-121.629200", "136.2", "-79.0121", "-80.64", "-104.73", "-119.40590", "-117.25", "-119.10", "-121.89", "-90.28", "-120.900835", "-120.90", "-156.5058333", "-78.87", "-96.746", "-120.67987", "141.64", "-121.42", "139.85", "-119.85", "-122.26", "-121.32397", "133.01", "138.41", "-118.7975", "-113.4505005", "-155.6822111", "-71.30", "-82.23", "138.25", "134.06", "134.20", "-113.17", "-121.44", "-122.39", "-111.34", "-157.988994", "-121.650200", "-119.39", "-156.4136930", "-118.2617", "-80.572", "-120.67", "-120.67", "-124.11", "-96.15", "-118.41", "-78.21", "-75.52", "-120.5510", "130.66", "123.01", "-114.50" );
	spacMapAryLat = new Array( "49.88", "36.60", "46.16", "46.45", "37.63", "30.10", "35.427100", "39.0554", "45.816185", "45.816185", "38.32", "28.63", "28.60", "28.60", "28.70", "28.40", "28.50", "40.1808661667", "35.21", "39.69", "35.59", "31.60", "39.08", "37.99", "45.246239", "45.244780", "45.170202", "44.23", "44.23", "31.77", "45.63102", "47.97", "40.214569167", "36.05", "44.408", "47.72", "45.8061", "45.372959", "38.10", "34.89", "42.037", "20.25692", "33.36", "22.33", "40.20", "38.59", "29.39", "31.71", "33.12", "33.69", "34.15", "45.72", "32.70", "58.36", "58.34", "58.28", "20.8102667", "21.437586", "35.15", "35.5", "33.57", "36.15", "32.81", "45.92", "36.6", "29.67", "38.770278", "45.50483", "37.70", "45.57451", "40.16", "33.94", "33.61006", "33.50", "44.60", "35.6547", "46.54", "45.41", "40.97", "37.28", "35.50", "33.90", "25.83", "32.90", "36.38", "39.65", "36.69", "45.50", "33.87", "45.51586", "30.47", "42.32", "19.03743056", "35.17", "28.38", "44.362", "35.08", "40.46", "32.58", "43.420000", "42.92", "33.23", "35.643", "36.25", "45.55357", "34.06", "39.511930", "34.07", "39.7057", "-5.17", "40.18", "45.93761", "32.70", "34.10", "36.30", "45.54", "44.285791", "44.29", "20.8875", "35.88", "29.963", "45.63742", "43.94", "38.30", "38.91", "34.43", "47.69", "45.37397", "32.72", "34.97", "34.29111", "40.1350785", "18.9147222", "42.50", "27.97", "37.1", "34.31", "35.53", "40.20", "37.68", "45.55", "32.51", "21.6954083", "38.096890", "36.31", "20.848046", "46.0949", "42.638", "45.59", "45.59", "46.91", "29.26", "34.26", "45.06", "39.73", "46.5725", "30.38", "24.46", "32.80" );
	spacMapAryElev = new Array( "207", "310", "3", "217", "478", "5", "232", "53", "112", "112", "12", "1", "3", "3", "5", "3", "5", "1319.5", "220", "41", "76", "1444", "644", "14", "887", "891", "795", "251", "252", "1160", "166", "92", "1468.9", "9", "120", "349", "503", "697.1", "0", "20", "191", "105", "58", "26", "1299", "4", "5", "25", "152", "122", "130", "67.2", "16", "5", "45", "4", "670", "1", "12", "860", "3", "30", "38", "497", "310", "8", "7", "706", "108", "456", "1517", "47", "1017", "1018", "34", "384", "248", "29", "56", "585", "275", "3", "16", "126", "29", "43", "51", "92", "452", "731", "9", "3", "190", "51", "3", "315", "3", "10", "19", "5", "38", "5", "434", "178", "356", "280", "56", "15", "763", "40", "1503", "116", "23", "2", "10", "481", "959", "969", "48.5", "164", "137", "432", "23", "6", "3", "4", "11", "827", "31", "14", "279", "1291.4", "10", "91", "27", "13", "9", "6", "1299", "61", "12", "578", "7.6", "0", "81", "111", "381", "200", "462", "462", "5", "52", "300", "385", "28", "329", "36", "30", "97" );
	spacMapAryType = new Array( "3", "1", "1", "3", "1", "1", "1", "1", "4", "1", "1", "3", "1", "1", "1", "1", "1", "2", "1", "1", "1", "1", "1", "1", "4", "1", "4", "3", "1", "1", "4", "1", "2", "1", "3", "1", "4", "4", "1", "1", "3", "4", "1", "1", "2", "1", "1", "1", "1", "1", "1", "4", "1", "1", "1", "1", "4", "4", "1", "1", "1", "1", "1", "1", "1", "1", "1", "4", "1", "4", "1", "1", "4", "1", "1", "1", "3", "3", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "4", "1", "1", "4", "1", "1", "3", "1", "1", "1", "1", "1", "1", "1", "1", "4", "1", "1", "1", "1", "3", "1", "4", "1", "1", "1", "1", "4", "1", "4", "1", "1", "4", "1", "1", "1", "1", "1", "4", "1", "1", "1", "2", "4", "1", "1", "1", "1", "1", "2", "1", "1", "1", "4", "1", "1", "4", "4", "3", "4", "1", "1", "1", "1", "3", "1", "4", "1", "1", "1" );
	spacMapAryState = new Array( "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER", "OPER" );
	spacMapArySrcOrg = new Array( "OQNET", "ARM", "PSD", "OQNET", "ANL/ARM", "TNRCC", "PSD", "MDE", "ARL", "ARL", "PSD", "KSC-CCAFS", "KSC-CCAFS", "KSC-CCAFS", "KSC-CCAFS", "KSC-CCAFS", "KSC-CCAFS", "DGP", "NCDE-DENR", "PSD", "PSD", "EPG", "PSD", "PSD", "NREL", "PSD", "NREL", "OQNET", "EC-CARE", "TNRCC", "VAISALA", "PSD", "DGP", "JMA", "OQNET", "UND", "ANL", "PNNL", "CARB", "JMA", "OQNET", "HI-AWST", "JMA", "HKOBS", "DPG", "MDE", "MMS", "JMA", "JMA", "SCQ", "JMA", "ND", "PSD", "NCAR/FAA", "NCAR/FAA", "NCAR/FAA", "HI-AWST", "HI-AWST", "JMA", "JMA", "JMA", "JMA", "JMA", "PSD", "ARM", "TNRCC", "DNREC", "VAISALA", "BAAQMD", "VAISALA", "DETECT", "SCQ", "NCSU", "TTU", "EC", "PSD", "OQNET", "OQNET", "PSL", "ARM", "ARM", "JMA", "JMA", "SDAPCD", "JMA", "JMA", "NPS-DM", "MCGILL", "SCQ", "VAISALA", "PSD", "JMA", "HI-AWST", "JMA", "JMA", "OQNET", "PSD", "RU/NJDEP", "JMA", "PSD", "JMA", "JMA", "PSD", "PSD", "VAISALA", "SCQ", "PSD", "JMA", "MDE", "UDEP", "PSD", "VAISALA", "SDAPCD", "NPS-NAVAIR", "PSD", "PSD", "ARL", "PSD", "HI-AWST", "EPA", "PSD", "VAISALA", "JMA", "SMAQMD", "JMA", "PSD", "UW/NWS", "VAISALA", "JMA", "JMA", "VCAPCD", "DGP", "HI-AWST", "MDOEPAAB", "PSD", "JMA", "JMA", "JMA", "DPG", "SJV-APCD", "PSD", "PSD", "HI-AWST", "PSD", "SJV-APCD", "HI-AWST", "ANL", "OQNET", "ARL", "PSD", "PSD", "PSD", "SCQ", "OQNET", "DNREC", "ANL", "JMA", "JMA", "YPG" );
	spacMapAryLatestWind = new Array( "2017-Aug-31 00:00", "2006-Apr-27 14:00", "2026-Sep-30 00:00", "2017-Feb-20 08:00", "2006-Apr-27 14:00", "2015-Feb-06 15:00", "2015-Nov-09 20:00", "2026-Sep-30 02:00", "2017-Mar-06 15:30", "2017-Feb-21 23:00", "2026-Sep-30 02:00", "2013-Mar-20 20:00", "2013-Mar-22 06:30", "2013-Mar-22 11:45", "2013-Feb-04 14:30", "2013-Mar-22 11:45", "2013-Mar-22 11:45", "2023-Oct-24 14:00", "2017-Nov-15 15:00", "2018-Jun-05 16:00", "2020-Apr-21 12:00", "2006-Nov-29 20:00", "2015-Jun-24 23:00", "2011-Mar-22 20:00", "2017-Mar-06 15:15", "2017-Feb-21 23:00", "2017-Apr-07 16:30", "2016-Oct-08 15:00", "2014-Jul-18 17:30", "2019-Jul-30 23:00", "2017-Aug-17 22:10", "2026-Sep-30 02:00", "2026-Sep-28 19:00", "2016-Aug-23 13:00", "2016-Feb-05 02:00", "2015-Mar-03 06:00", "2017-Mar-06 15:15", "2017-Mar-06 15:00", "2005-Dec-31 21:00", "2016-Aug-23 13:00", "2020-Jul-24 21:00", "2020-Jan-01 00:00", "2016-Aug-23 13:00", "2016-Aug-23 14:00", "2026-Sep-13 14:00", "2026-Sep-30 02:00", "2018-Aug-07 22:30", "2016-Aug-23 13:00", "2016-Aug-23 13:00", "2016-Apr-28 19:00", "2016-Aug-23 13:00", "2017-Jan-27 20:45", "2015-Nov-05 17:00", "2016-Jul-06 19:40", "2016-Jul-06 19:40", "2016-Jul-06 19:40", "2016-Mar-24 18:50", "2020-Jan-01 00:00", "2016-Aug-23 13:00", "2016-Aug-23 13:00", "2016-Aug-23 13:00", "2016-Aug-23 13:00", "2016-Aug-23 13:00", "2019-Oct-29 17:00", "2011-Feb-24 22:00", "2024-Aug-01 17:00", "2018-May-14 17:00", "2017-Aug-17 16:20", "2011-Mar-11 22:00", "2017-Aug-22 17:00", "2015-Sep-14 22:55", "2020-Jan-02 22:00", "2012-Sep-22 12:30", "2016-Mar-07 15:30", "2015-Nov-15 10:00", "2014-Oct-27 15:00", "2020-Sep-22 01:00", "2014-Aug-23 14:00", "2026-Mar-30 15:00", "2005-Nov-16 18:00", "2007-Jul-14 09:00", "2016-Aug-23 13:00", "2016-Aug-23 13:00", "2014-Apr-04 18:00", "2016-Aug-23 13:00", "2016-Aug-23 13:00", "2025-Aug-21 13:00", "2010-May-28 19:00", "2014-Oct-28 13:00", "2017-Dec-15 22:20", "2015-Nov-08 13:00", "2016-Aug-23 11:00", "2017-Dec-07 22:30", "2016-Aug-23 13:00", "2016-Aug-23 13:00", "2017-Feb-21 19:00", "2015-Nov-04 13:00", "2025-May-10 02:00", "2016-Aug-23 13:00", "2026-Sep-30 02:00", "2016-Aug-23 13:00", "2016-Aug-23 13:00", "2014-Oct-29 16:00", "2013-Aug-06 13:00", "2017-Dec-15 22:50", "2014-Jul-25 06:00", "2026-Sep-30 02:00", "2016-Aug-23 13:00", "2026-Sep-30 02:00", "2007-Jan-27 08:00", "2024-Oct-23 17:00", "2017-Dec-15 22:20", "2010-Apr-14 19:00", "2018-Oct-04 21:00", "2025-Aug-21 13:00", "2019-Oct-30 14:00", "2017-Mar-06 15:30", "2017-Feb-21 23:00", "2017-Jun-21 18:30", "2018-Jan-03 06:00", "2013-Oct-23 17:00", "2017-Dec-15 22:40", "2016-Aug-23 13:00", "2016-Jun-09 17:00", "2016-Aug-23 10:00", "2026-Sep-30 01:00", "2019-Apr-16 19:00", "2017-Dec-15 22:10", "2016-Aug-23 13:00", "2016-Aug-23 13:00", "2023-May-09 11:00", "2020-Jul-23 22:00", "2019-Dec-31 19:30", "2011-Sep-07 07:00", "2015-Nov-07 12:00", "2016-Aug-23 13:00", "2016-Aug-23 13:00", "2016-Aug-23 13:00", "2026-Sep-29 19:00", "2017-Aug-30 19:00", "2019-Aug-14 18:00", "2011-Jan-31 20:00", "2019-Sep-19 18:30", "2026-Sep-30 02:00", "2020-Sep-22 00:00", "2019-Feb-16 07:00", "2017-Mar-06 15:15", "2017-Feb-21 23:00", "2017-Mar-06 15:30", "2017-Feb-21 21:00", "2013-Nov-13 16:00", "2013-Oct-23 12:00", "2013-Feb-12 18:00", "2020-Sep-18 14:00", "2011-Sep-20 12:30", "2017-May-15 04:15", "2016-Aug-23 13:00", "2016-Aug-23 13:00", "2003-Nov-19 13:30" );
	spacMapAryLatestRass = new Array( "Unavailable", "2006-May-04 03:05", "2026-Sep-29 23:00", "Unavailable", "2006-May-04 03:05", "Unavailable", "2015-Nov-09 20:00", "2026-Jun-12 21:00", "Unavailable", "2016-Dec-31 00:00", "2026-Sep-29 13:00", "Unavailable", "Unavailable", "Unavailable", "Unavailable", "Unavailable", "Unavailable", "2020-Jul-23 07:40", "2017-Nov-15 16:00", "2018-Jun-05 16:00", "2016-Mar-21 10:00", "Unavailable", "Unavailable", "Unavailable", "Unavailable", "2017-Feb-21 23:00", "Unavailable", "Unavailable", "Unavailable", "Unavailable", "Unavailable", "2026-Sep-30 02:00", "2020-Mar-09 17:50", "Unavailable", "Unavailable", "Unavailable", "Unavailable", "Unavailable", "2005-Dec-31 21:00", "Unavailable", "Unavailable", "Unavailable", "Unavailable", "Unavailable", "2020-Jun-15 10:35", "2026-Sep-20 15:00", "2018-Aug-07 22:30", "Unavailable", "Unavailable", "2016-Apr-28 19:00", "Unavailable", "Unavailable", "Unavailable", "Unavailable", "Unavailable", "Unavailable", "Unavailable", "Unavailable", "Unavailable", "Unavailable", "Unavailable", "Unavailable", "Unavailable", "2019-Oct-29 17:00", "2011-Feb-24 21:05", "Unavailable", "2018-May-14 17:00", "Unavailable", "2011-Mar-22 13:00", "Unavailable", "Unavailable", "2020-Jan-06 03:00", "Unavailable", "2016-Mar-07 15:00", "2015-Nov-15 10:00", "Unavailable", "Unavailable", "Unavailable", "2026-Mar-30 14:00", "2005-Nov-16 16:05", "2007-Jul-14 08:05", "Unavailable", "Unavailable", "2014-Apr-04 18:00", "Unavailable", "Unavailable", "2025-Aug-19 18:00", "2010-May-28 19:00", "2014-Oct-28 13:00", "Unavailable", "Unavailable", "Unavailable", "Unavailable", "Unavailable", "Unavailable", "Unavailable", "Unavailable", "2025-May-09 17:00", "Unavailable", "2026-Sep-29 19:00", "Unavailable", "Unavailable", "Unavailable", "Unavailable", "Unavailable", "2014-Jul-25 06:00", "2026-Sep-29 16:00", "Unavailable", "2026-Jul-27 18:00", "Unavailable", "2024-Oct-23 11:00", "Unavailable", "2010-Apr-14 18:55", "2018-Oct-04 20:00", "2025-Aug-21 13:00", "2019-Oct-30 10:00", "Unavailable", "2017-Feb-21 23:00", "Unavailable", "2018-Jan-03 06:00", "Unavailable", "Unavailable", "Unavailable", "2016-Jun-08 18:00", "Unavailable", "2026-Sep-30 00:00", "2019-Apr-16 19:00", "Unavailable", "Unavailable", "Unavailable", "2023-May-09 09:00", "2020-Jul-18 08:10", "Unavailable", "2011-Sep-07 07:00", "2002-May-31 17:00", "Unavailable", "Unavailable", "Unavailable", "2020-Jul-23 03:40", "2017-Sep-11 22:30", "2019-Aug-14 18:00", "Unavailable", "Unavailable", "Unavailable", "2009-Nov-05 16:00", "Unavailable", "Unavailable", "Unavailable", "Unavailable", "2017-Feb-21 23:00", "2002-Mar-27 17:00", "Unavailable", "2013-Feb-12 16:00", "Unavailable", "2011-Sep-20 14:00", "Unavailable", "Unavailable", "Unavailable", "2003-Nov-19 13:30" );

	
	function conusMap_OnMouseOver(site_id)
	{
		//alert("MouseOverEvent");
		popupWidth = 300;
		Xoffset=-300;   // modify these values to ...
		Yoffset=20;    // change the popup position.
		
		var i = site_id; var type = ""; var rassLine = "";
		if (conusMapAryType[i] == "1") type = "BLP";
		 else if (conusMapAryType[i] == "2") type = "UHF";
		 else if (conusMapAryType[i] == "3") type = "VHF";
		 else type = "Unknown";
		if (conusMapAryLatestRass[i] != "Unavailable")
			rassLine = "&nbsp;&nbsp;Latest RASS: "+conusMapAryLatestRass[i]+"<br>\n"
		var msg = 
                                 "Site Location: "+conusMapAryLngName[i]+"<br>\n"+
   "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Site ID: "+conusMapArySiteName[i]+"<br>\n"+
                  "&nbsp;&nbsp;&nbsp;Radar Type: "+type+"<br>\n"+
		                    "&nbsp;Lat/Lon/Elev: "+conusMapAryLat[i]+"/"+conusMapAryLon[i]+"/"+conusMapAryElev[i]+"m<br>\n"+
		                    "&nbsp;Latest Winds: "+conusMapAryLatestWind[i]+"<br>\n"+
		                                          rassLine+
        "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Provider: "+conusMapArySrcOrg[i]+"<br>\n";
		//alert("ImgMap Mouse Over msg="+ msg);
		popup(msg,"white",popupWidth);
	}
	function juneauMap_OnMouseOver(site_id)
	{
		//alert("MouseOverEvent");
		popupWidth = 300;
		Xoffset=-300;   // modify these values to ...
		Yoffset=20;    // change the popup position.
		
		var i = site_id; var type = ""; var rassLine = "";
		if (juneauMapAryType[i] == "1") type = "BLP";
		 else if (juneauMapAryType[i] == "2") type = "UHF";
		 else if (juneauMapAryType[i] == "3") type = "VHF";
		 else type = "Unknown";
		if (juneauMapAryLatestRass[i] != "Unavailable")
			rassLine = "&nbsp;&nbsp;Latest RASS: "+juneauMapAryLatestRass[i]+"<br>\n"
		var msg = 
                                 "Site Location: "+juneauMapAryLngName[i]+"<br>\n"+
   "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Site ID: "+juneauMapArySiteName[i]+"<br>\n"+
                  "&nbsp;&nbsp;&nbsp;Radar Type: "+type+"<br>\n"+
		                    "&nbsp;Lat/Lon/Elev: "+juneauMapAryLat[i]+"/"+juneauMapAryLon[i]+"/"+juneauMapAryElev[i]+"m<br>\n"+
		                    "&nbsp;Latest Winds: "+juneauMapAryLatestWind[i]+"<br>\n"+
		                                          rassLine+
        "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Provider: "+juneauMapArySrcOrg[i]+"<br>\n";
		//alert("ImgMap Mouse Over msg="+ msg);
		popup(msg,"white",popupWidth);
	}
	function japanMap_OnMouseOver(site_id)
	{
		//alert("MouseOverEvent");
		popupWidth = 300;
		Xoffset=-300;   // modify these values to ...
		Yoffset=20;    // change the popup position.
		
		var i = site_id; var type = ""; var rassLine = "";
		if (japanMapAryType[i] == "1") type = "BLP";
		 else if (japanMapAryType[i] == "2") type = "UHF";
		 else if (japanMapAryType[i] == "3") type = "VHF";
		 else type = "Unknown";
		if (japanMapAryLatestRass[i] != "Unavailable")
			rassLine = "&nbsp;&nbsp;Latest RASS: "+japanMapAryLatestRass[i]+"<br>\n"
		var msg = 
                                 "Site Location: "+japanMapAryLngName[i]+"<br>\n"+
   "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Site ID: "+japanMapArySiteName[i]+"<br>\n"+
                  "&nbsp;&nbsp;&nbsp;Radar Type: "+type+"<br>\n"+
		                    "&nbsp;Lat/Lon/Elev: "+japanMapAryLat[i]+"/"+japanMapAryLon[i]+"/"+japanMapAryElev[i]+"m<br>\n"+
		                    "&nbsp;Latest Winds: "+japanMapAryLatestWind[i]+"<br>\n"+
		                                          rassLine+
        "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Provider: "+japanMapArySrcOrg[i]+"<br>\n";
		//alert("ImgMap Mouse Over msg="+ msg);
		popup(msg,"white",popupWidth);
	}
	function spacMap_OnMouseOver(site_id)
	{
//		alert("MouseOverEvent");
		popupWidth = 300;
		Xoffset=-300;   // modify these values to ...
		Yoffset=20;    // change the popup position.
		
		var i = site_id; var type = ""; var rassLine = "";
		if (spacMapAryType[i] == "1") type = "BLP";
		 else if (spacMapAryType[i] == "2") type = "UHF";
		 else if (spacMapAryType[i] == "3") type = "VHF";
		 else type = "Unknown";
		if (spacMapAryLatestRass[i] != "Unavailable")
			rassLine = "&nbsp;&nbsp;Latest RASS: "+spacMapAryLatestRass[i]+"<br>\n"
		var msg = 
                                 "Site Location: "+spacMapAryLngName[i]+"<br>\n"+
   "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Site ID: "+spacMapArySiteName[i]+"<br>\n"+
                  "&nbsp;&nbsp;&nbsp;Radar Type: "+type+"<br>\n"+
		                    "&nbsp;Lat/Lon/Elev: "+spacMapAryLat[i]+"/"+spacMapAryLon[i]+"/"+spacMapAryElev[i]+"m<br>\n"+
		                    "&nbsp;Latest Winds: "+spacMapAryLatestWind[i]+"<br>\n"+
		                                          rassLine+
        "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Provider: "+spacMapArySrcOrg[i]+"<br>\n";
		//alert("ImgMap Mouse Over msg="+ msg);
		popup(msg,"white",popupWidth);
	}
	//-->
	</script>
</head>

<body topmargin="0" leftmargin="0" rightmargin="0">
<DIV id="dek">
<SCRIPT TYPE="text/javascript">
<!--
	Xoffset=-100;    // modify these values to ...
	Yoffset= 20;    // change the popup position.
	var old,skn,iex=(document.all),yyy=-1000;
	var ns4=document.layers
	var ns6=document.getElementById&&!document.all
	//var ns6=document.getElementById;
	var ie4=document.all
	if (ns4)
		skn=document.dek
	else if (ns6)
		skn=document.getElementById("dek").style
	else if (ie4)
		skn=document.all.dek.style
	if(ns4)
		document.captureEvents(Event.MOUSEMOVE);
	else
	{
		skn.visibility="visible"
		skn.display="none"
	}
	document.onmousemove=get_mouse;
	function popup(msg,bak,wid){
		var content="<TABLE  WIDTH="+wid+" BORDER=1 BORDERCOLOR=black CELLPADDING=2 CELLSPACING=0 "+
		"BGCOLOR="+bak+"><TD class=popup ALIGN=left>"+msg+"</TD></TABLE>";
		yyy=Yoffset;
		 if(ns4){skn.document.write(content);skn.document.close();skn.visibility="visible"}
		 if(ns6){document.getElementById("dek").innerHTML=content;skn.display=''}
		 if(ie4){document.all("dek").innerHTML=content;skn.display=''}
	}
	function get_mouse(e){
		var x=(ns4||ns6)?e.pageX:event.x+document.body.scrollLeft;
		skn.left=x+Xoffset;
		var y=(ns4||ns6)?e.pageY:event.y+document.body.scrollTop;
		skn.top=y+yyy;
	}
	function kill(){
		yyy=-1000;
		if(ns4){skn.visibility="hidden";}
		else if (ns6||ie4)
		skn.display="none"
	}
/*	function getlegend() {
		setup='toolbar=no,location=no,directories=no,status=no,menubar=no,width=280,height=221'
		setup += 'scrollbars=no,resizable=no'
		pop = window.open ("","pop",setup)
		pop.document.write('<head>');
		pop.document.write('<Title>');
		pop.document.write('Legend');
		pop.document.write('</Title>');
		pop.document.write('</head>');
		pop.document.write('<body bgcolor=#FFFFFF>');
		pop.document.write('<CENTER><img src="/images/net_now_legend.gif">');
		pop.document.write('<FORM><input type="button" value="Close Window" onClick="window.close()"></form>');
		pop.document.write('</CENTER></body>'); 
	}
	function getraoblegend() {
		setup='toolbar=no,location=no,directories=no,status=no,menubar=no,width=280,height=241'
		setup += 'scrollbars=no,resizable=no'
		pop = window.open ("","pop",setup)
		pop.document.write('<head>');
		pop.document.write('<Title>');
		pop.document.write('Legend');
		pop.document.write('</Title>');
		pop.document.write('</head>');
		pop.document.write('<body bgcolor=#FFFFFF>');
		pop.document.write('<CENTER><img src="/images/raobKey.gif">');
		pop.document.write('<FORM><input type="button" value="Close Window" onClick="window.close()"></form>');
		pop.document.write('</CENTER></body>'); 
	 }
*/
//-->
</SCRIPT>
</DIV>



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
						CAP System Status
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
					<a href="/cap/sysStatus.jsp?print=0" title="Show Menus">
						<img src="images/screenIcon.gif" alt="Menus On" border="0" vspace="5"></a>
				</td>
				<td>
					<a href="/cap/sysStatus.jsp?print=1" title="Hide Menus">
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
				<!------------- status Submenu Links ---------------------------------  -->
				<table cellpadding=5 cellspacing=1 summary="" width="170">
					<tr>
						<td valign="top" class="submenu">
							<span class="submenuhead">Status</span><br>
							<a class="submenu" 
								href="/cap/sysStatus.jsp?capStatusView=Status+Table"> 
								Status (Table Format)</a><br>	
							<a class="submenu" 
								href="/cap/sysStatus.jsp?capStatusView=Status+Summary">Status Summary</a><br>
							<a class="submenu" 
								href="/cap/sysStatus.jsp?capStatusView=Status+Map">Status Map</a><hr>
						</td>
					</tr>
				</table>
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

				<table cellpadding="5" summary="" width="100%">
					<tr>
						<td>

							<form get="post">
								<input type="submit" name="capStatusView" value="Status Map" DISABLED>&nbsp;&nbsp;&nbsp;

								<input type="submit" name="capStatusView" value="Status Table" >&nbsp;&nbsp;&nbsp;

								<input type="submit" name="capStatusView" value="Status Summary" >&nbsp;&nbsp;&nbsp;
							</form>


						<div align="center">
							<span style="font-family: Arial, Helvetica, sans-serif; font-size: 20px; font-weight: bold;">
								CAP Status Maps</span><br>
							<span style="font-family: Arial, Helvetica, sans-serif; font-size: 15px; font-weight: bold;">
								Last Refreshed: 30-Sep-2026 04:29 GMT</span>
						</div>
						<table align="center">
                                                  <tr><td><span class="normalText">Continental US</span></td></tr>
						  
                                                        <tr><td align="center"><img src="jsp_include/getCapImage.jsp?mapname=conusMap"
                                                                                border="1" title="Continental US"
                                                                                alt="Continental US" ismap
                                                                                usemap="#conusMap"></td></tr>
                                                        <tr><td><span class="normalText">Juneau, AK</span></td></tr>
                                                        <tr><td align="center"><img src="jsp_include/getCapImage.jsp?mapname=juneauMap"
                                                                                border="1"
                                                                                alt="Map of Juneau, AK"
                                                                                title="Juneau, AK"
                                                                                ismap
                                                                                usemap="#juneauMap"></td></tr>
                                                        <tr><td><span class="normalText">Japan</span></td></tr>
                                                        <tr><td align="center"><img src="jsp_include/getCapImage.jsp?mapname=japanMap"
                                                                                border="1"
                                                                                alt="Map of Japan"
                                                                                title="Japan"
                                                                                ismap
                                                                                usemap="#japanMap"></td></tr>
                                                        <tr><td><span class="normalText">South Pacific</span></td></tr>
                                                        <tr><td align="center"><img src="jsp_include/getCapImage.jsp?mapname=spacMap"
                                                                                border="1"
                                                                                alt="Map of South Pacific"
                                                                                title="South Pacific"
                                                                                ismap
                                                                                usemap="#spacMap"><br></td></tr>
						</table>
								<map name="conusMap">
									<AREA shape="RECT" coords="346,8,350,12" onMouseover="conusMap_OnMouseOver('0')" onMouseout="kill('0')" >
									<AREA shape="RECT" coords="251,137,255,144" onMouseover="conusMap_OnMouseOver('1')" onMouseout="kill('1')" >
									<AREA shape="RECT" coords="92,41,96,45" onMouseover="conusMap_OnMouseOver('2')" onMouseout="kill('2')" >
									<AREA shape="RECT" coords="384,39,388,43" onMouseover="conusMap_OnMouseOver('3')" onMouseout="kill('3')" >
									<AREA shape="RECT" coords="257,122,261,126" onMouseover="conusMap_OnMouseOver('4')" onMouseout="kill('4')" >
									<AREA shape="RECT" coords="274,196,278,200" onMouseover="conusMap_OnMouseOver('5')" onMouseout="kill('5')" >
									<AREA shape="RECT" coords="286,144,290,148" onMouseover="conusMap_OnMouseOver('6')" onMouseout="kill('6')" >
									<AREA shape="RECT" coords="387,108,391,112" onMouseover="conusMap_OnMouseOver('7')" onMouseout="kill('7')" >
									<AREA shape="RECT" coords="116,45,120,49" onMouseover="conusMap_OnMouseOver('8')" onMouseout="kill('8')" >
									<AREA shape="RECT" coords="116,45,120,49" onMouseover="conusMap_OnMouseOver('9')" onMouseout="kill('9')" >
									<AREA shape="RECT" coords="82,116,86,120" onMouseover="conusMap_OnMouseOver('10')" onMouseout="kill('10')" >
									<AREA shape="RECT" coords="370,210,374,214" onMouseover="conusMap_OnMouseOver('11')" onMouseout="kill('11')" >
									<AREA shape="RECT" coords="371,211,375,215" onMouseover="conusMap_OnMouseOver('12')" onMouseout="kill('12')" >
									<AREA shape="RECT" coords="370,211,374,215" onMouseover="conusMap_OnMouseOver('13')" onMouseout="kill('13')" >
									<AREA shape="RECT" coords="370,210,374,214" onMouseover="conusMap_OnMouseOver('14')" onMouseout="kill('14')" >
									<AREA shape="RECT" coords="371,213,375,217" onMouseover="conusMap_OnMouseOver('15')" onMouseout="kill('15')" >
									<AREA shape="RECT" coords="370,212,374,216" onMouseover="conusMap_OnMouseOver('16')" onMouseout="kill('16')" >
									<AREA shape="RECT" coords="152,98,156,102" onMouseover="conusMap_OnMouseOver('17')" onMouseout="kill('17')" >
									<AREA shape="RECT" coords="363,146,367,150" onMouseover="conusMap_OnMouseOver('18')" onMouseout="kill('18')" >
									<AREA shape="RECT" coords="92,102,96,106" onMouseover="conusMap_OnMouseOver('19')" onMouseout="kill('19')" >
									<AREA shape="RECT" coords="380,142,384,146" onMouseover="conusMap_OnMouseOver('20')" onMouseout="kill('20')" >
									<AREA shape="RECT" coords="161,176,165,180" onMouseover="conusMap_OnMouseOver('21')" onMouseout="kill('21')" >
									<AREA shape="RECT" coords="97,108,101,112" onMouseover="conusMap_OnMouseOver('22')" onMouseout="kill('22')" >
									<AREA shape="RECT" coords="88,119,92,123" onMouseover="conusMap_OnMouseOver('23')" onMouseout="kill('23')" >
									<AREA shape="RECT" coords="113,50,117,54" onMouseover="conusMap_OnMouseOver('24')" onMouseout="kill('24')" >
									<AREA shape="RECT" coords="113,50,117,54" onMouseover="conusMap_OnMouseOver('25')" onMouseout="kill('25')" >
									<AREA shape="RECT" coords="110,51,114,55" onMouseover="conusMap_OnMouseOver('26')" onMouseout="kill('26')" >
									<AREA shape="RECT" coords="363,59,367,63" onMouseover="conusMap_OnMouseOver('27')" onMouseout="kill('27')" >
									<AREA shape="RECT" coords="362,59,366,63" onMouseover="conusMap_OnMouseOver('28')" onMouseout="kill('28')" >
									<AREA shape="RECT" coords="187,183,191,183" onMouseover="conusMap_OnMouseOver('29')" onMouseout="kill('29')" >
									<AREA shape="RECT" coords="108,46,112,50" onMouseover="conusMap_OnMouseOver('30')" onMouseout="kill('30')" >
									<AREA shape="RECT" coords="92,25,96,29" onMouseover="conusMap_OnMouseOver('31')" onMouseout="kill('31')" >
									<AREA shape="RECT" coords="152,97,156,101" onMouseover="conusMap_OnMouseOver('32')" onMouseout="kill('32')" >
									<AREA shape="RECT" coords="384,58,388,62" onMouseover="conusMap_OnMouseOver('33')" onMouseout="kill('33')" >
									<AREA shape="RECT" coords="260,27,264,31" onMouseover="conusMap_OnMouseOver('34')" onMouseout="kill('34')" >
									<AREA shape="RECT" coords="110,45,114,49" onMouseover="conusMap_OnMouseOver('35')" onMouseout="kill('35')" >
									<AREA shape="RECT" coords="109,49,113,53" onMouseover="conusMap_OnMouseOver('36')" onMouseout="kill('36')" >
									<AREA shape="RECT" coords="90,118,94,122" onMouseover="conusMap_OnMouseOver('37')" onMouseout="kill('37')" >
									<AREA shape="RECT" coords="345,80,349,84" onMouseover="conusMap_OnMouseOver('38')" onMouseout="kill('38')" >
									<AREA shape="RECT" coords="150,97,154,101" onMouseover="conusMap_OnMouseOver('39')" onMouseout="kill('39')" >
									<AREA shape="RECT" coords="392,113,396,117" onMouseover="conusMap_OnMouseOver('40')" onMouseout="kill('40')" >
									<AREA shape="RECT" coords="267,203,271,207" onMouseover="conusMap_OnMouseOver('41')" onMouseout="kill('41')" >
									<AREA shape="RECT" coords="111,160,115,164" onMouseover="conusMap_OnMouseOver('42')" onMouseout="kill('42')" >
									<AREA shape="RECT" coords="110,46,114,50" onMouseover="conusMap_OnMouseOver('43')" onMouseout="kill('43')" >
									<AREA shape="RECT" coords="372,170,376,174" onMouseover="conusMap_OnMouseOver('44')" onMouseout="kill('44')" >
									<AREA shape="RECT" coords="300,44,304,48" onMouseover="conusMap_OnMouseOver('45')" onMouseout="kill('45')" >
									<AREA shape="RECT" coords="251,132,255,136" onMouseover="conusMap_OnMouseOver('46')" onMouseout="kill('46')" >
									<AREA shape="RECT" coords="267,200,271,204" onMouseover="conusMap_OnMouseOver('47')" onMouseout="kill('47')" >
									<AREA shape="RECT" coords="399,111,403,115" onMouseover="conusMap_OnMouseOver('48')" onMouseout="kill('48')" >
									<AREA shape="RECT" coords="117,48,121,52" onMouseover="conusMap_OnMouseOver('49')" onMouseout="kill('49')" >
									<AREA shape="RECT" coords="89,121,93,125" onMouseover="conusMap_OnMouseOver('50')" onMouseout="kill('50')" >
									<AREA shape="RECT" coords="110,47,114,51" onMouseover="conusMap_OnMouseOver('51')" onMouseout="kill('51')" >
									<AREA shape="RECT" coords="202,98,206,102" onMouseover="conusMap_OnMouseOver('52')" onMouseout="kill('52')" >
									<AREA shape="RECT" coords="107,158,111,162" onMouseover="conusMap_OnMouseOver('53')" onMouseout="kill('53')" >
									<AREA shape="RECT" coords="219,161,223,165" onMouseover="conusMap_OnMouseOver('54')" onMouseout="kill('54')" >
									<AREA shape="RECT" coords="219,162,223,166" onMouseover="conusMap_OnMouseOver('55')" onMouseout="kill('55')" >
									<AREA shape="RECT" coords="462,56,466,60" onMouseover="conusMap_OnMouseOver('56')" onMouseout="kill('56')" >
									<AREA shape="RECT" coords="356,141,360,145" onMouseover="conusMap_OnMouseOver('57')" onMouseout="kill('57')" >
									<AREA shape="RECT" coords="356,38,360,42" onMouseover="conusMap_OnMouseOver('58')" onMouseout="kill('58')" >
									<AREA shape="RECT" coords="397,48,401,52" onMouseover="conusMap_OnMouseOver('59')" onMouseout="kill('59')" >
									<AREA shape="RECT" coords="80,90,84,94" onMouseover="conusMap_OnMouseOver('60')" onMouseout="kill('60')" >
									<AREA shape="RECT" coords="242,126,246,130" onMouseover="conusMap_OnMouseOver('61')" onMouseout="kill('61')" >
									<AREA shape="RECT" coords="255,143,259,147" onMouseover="conusMap_OnMouseOver('62')" onMouseout="kill('62')" >
									<AREA shape="RECT" coords="114,168,118,172" onMouseover="conusMap_OnMouseOver('63')" onMouseout="kill('63')" >
									<AREA shape="RECT" coords="88,131,92,135" onMouseover="conusMap_OnMouseOver('64')" onMouseout="kill('64')" >
									<AREA shape="RECT" coords="399,48,403,52" onMouseover="conusMap_OnMouseOver('65')" onMouseout="kill('65')" >
									<AREA shape="RECT" coords="115,159,119,163" onMouseover="conusMap_OnMouseOver('66')" onMouseout="kill('66')" >
									<AREA shape="RECT" coords="109,47,113,51" onMouseover="conusMap_OnMouseOver('67')" onMouseout="kill('67')" >
									<AREA shape="RECT" coords="313,192,317,196" onMouseover="conusMap_OnMouseOver('68')" onMouseout="kill('68')" >
									<AREA shape="RECT" coords="356,58,360,62" onMouseover="conusMap_OnMouseOver('69')" onMouseout="kill('69')" >
									<AREA shape="RECT" coords="390,147,394,151" onMouseover="conusMap_OnMouseOver('70')" onMouseout="kill('70')" >
									<AREA shape="RECT" coords="401,95,405,99" onMouseover="conusMap_OnMouseOver('71')" onMouseout="kill('71')" >
									<AREA shape="RECT" coords="84,67,88,71" onMouseover="conusMap_OnMouseOver('72')" onMouseout="kill('72')" >
									<AREA shape="RECT" coords="355,141,359,145" onMouseover="conusMap_OnMouseOver('73')" onMouseout="kill('73')" >
									<AREA shape="RECT" coords="325,136,329,140" onMouseover="conusMap_OnMouseOver('74')" onMouseout="kill('74')" >
									<AREA shape="RECT" coords="113,47,117,51" onMouseover="conusMap_OnMouseOver('75')" onMouseout="kill('75')" >
									<AREA shape="RECT" coords="113,157,117,161" onMouseover="conusMap_OnMouseOver('76')" onMouseout="kill('76')" >
									<AREA shape="RECT" coords="94,104,98,108" onMouseover="conusMap_OnMouseOver('77')" onMouseout="kill('77')" >
									<AREA shape="RECT" coords="372,102,376,106" onMouseover="conusMap_OnMouseOver('78')" onMouseout="kill('78')" >
									<AREA shape="RECT" coords="205,98,209,102" onMouseover="conusMap_OnMouseOver('79')" onMouseout="kill('79')" >
									<AREA shape="RECT" coords="119,44,123,48" onMouseover="conusMap_OnMouseOver('80')" onMouseout="kill('80')" >
									<AREA shape="RECT" coords="113,170,117,174" onMouseover="conusMap_OnMouseOver('81')" onMouseout="kill('81')" >
									<AREA shape="RECT" coords="102,156,106,160" onMouseover="conusMap_OnMouseOver('82')" onMouseout="kill('82')" >
									<AREA shape="RECT" coords="87,135,91,139" onMouseover="conusMap_OnMouseOver('83')" onMouseout="kill('83')" >
									<AREA shape="RECT" coords="297,47,301,51" onMouseover="conusMap_OnMouseOver('84')" onMouseout="kill('84')" >
									<AREA shape="RECT" coords="107,59,111,63" onMouseover="conusMap_OnMouseOver('85')" onMouseout="kill('85')" >
									<AREA shape="RECT" coords="107,59,111,63" onMouseover="conusMap_OnMouseOver('86')" onMouseout="kill('86')" >
									<AREA shape="RECT" coords="377,139,381,143" onMouseover="conusMap_OnMouseOver('87')" onMouseout="kill('87')" >
									<AREA shape="RECT" coords="255,197,259,201" onMouseover="conusMap_OnMouseOver('88')" onMouseout="kill('88')" >
									<AREA shape="RECT" coords="110,46,114,50" onMouseover="conusMap_OnMouseOver('89')" onMouseout="kill('89')" >
									<AREA shape="RECT" coords="93,116,97,120" onMouseover="conusMap_OnMouseOver('90')" onMouseout="kill('90')" >
									<AREA shape="RECT" coords="98,153,102,157" onMouseover="conusMap_OnMouseOver('91')" onMouseout="kill('91')" >
									<AREA shape="RECT" coords="104,27,108,31" onMouseover="conusMap_OnMouseOver('92')" onMouseout="kill('92')" >
									<AREA shape="RECT" coords="106,49,110,53" onMouseover="conusMap_OnMouseOver('93')" onMouseout="kill('93')" >
									<AREA shape="RECT" coords="105,155,109,159" onMouseover="conusMap_OnMouseOver('94')" onMouseout="kill('94')" >
									<AREA shape="RECT" coords="148,98,152,102" onMouseover="conusMap_OnMouseOver('95')" onMouseout="kill('95')" >
									<AREA shape="RECT" coords="418,76,422,80" onMouseover="conusMap_OnMouseOver('96')" onMouseout="kill('96')" >
									<AREA shape="RECT" coords="360,217,364,221" onMouseover="conusMap_OnMouseOver('97')" onMouseout="kill('97')" >
									<AREA shape="RECT" coords="150,97,154,101" onMouseover="conusMap_OnMouseOver('98')" onMouseout="kill('98')" >
									<AREA shape="RECT" coords="92,122,96,126" onMouseover="conusMap_OnMouseOver('99')" onMouseout="kill('99')" >
									<AREA shape="RECT" coords="100,47,104,51" onMouseover="conusMap_OnMouseOver('100')" onMouseout="kill('100')" >
									<AREA shape="RECT" coords="154,172,158,176" onMouseover="conusMap_OnMouseOver('101')" onMouseout="kill('101')" >
									<AREA shape="RECT" coords="91,118,95,122" onMouseover="conusMap_OnMouseOver('102')" onMouseout="kill('102')" >
									<AREA shape="RECT" coords="103,135,107,139" onMouseover="conusMap_OnMouseOver('103')" onMouseout="kill('103')" >
									<AREA shape="RECT" coords="126,42,130,46" onMouseover="conusMap_OnMouseOver('104')" onMouseout="kill('104')" >
									<AREA shape="RECT" coords="359,74,363,78" onMouseover="conusMap_OnMouseOver('105')" onMouseout="kill('105')" >
									<AREA shape="RECT" coords="110,47,114,51" onMouseover="conusMap_OnMouseOver('106')" onMouseout="kill('106')" >
									<AREA shape="RECT" coords="110,47,114,51" onMouseover="conusMap_OnMouseOver('107')" onMouseout="kill('107')" >
									<AREA shape="RECT" coords="92,35,96,39" onMouseover="conusMap_OnMouseOver('108')" onMouseout="kill('108')" >
									<AREA shape="RECT" coords="260,204,264,208" onMouseover="conusMap_OnMouseOver('109')" onMouseout="kill('109')" >
									<AREA shape="RECT" coords="107,155,111,159" onMouseover="conusMap_OnMouseOver('110')" onMouseout="kill('110')" >
									<AREA shape="RECT" coords="371,52,375,56" onMouseover="conusMap_OnMouseOver('111')" onMouseout="kill('111')" >
									<AREA shape="RECT" coords="395,102,399,106" onMouseover="conusMap_OnMouseOver('112')" onMouseout="kill('112')" >
									<AREA shape="RECT" coords="113,38,117,42" onMouseover="conusMap_OnMouseOver('113')" onMouseout="kill('113')" >
									<AREA shape="RECT" coords="132,169,136,173" onMouseover="conusMap_OnMouseOver('114')" onMouseout="kill('114')" >
								</MAP>
								<map name="juneauMap">
									<AREA shape="RECT" coords="344,160,348,164" onMouseover="juneauMap_OnMouseOver('0')" onMouseout="kill('0')" >
									<AREA shape="RECT" coords="333,167,337,171" onMouseover="juneauMap_OnMouseOver('1')" onMouseout="kill('1')" >
									<AREA shape="RECT" coords="372,189,376,193" onMouseover="juneauMap_OnMouseOver('2')" onMouseout="kill('2')" >
								</MAP>
								<map name="japanMap">
									<AREA shape="RECT" coords="247,174,251,178" onMouseover="japanMap_OnMouseOver('0')" onMouseout="kill('0')" >
									<AREA shape="RECT" coords="208,187,212,191" onMouseover="japanMap_OnMouseOver('1')" onMouseout="kill('1')" >
									<AREA shape="RECT" coords="184,205,188,209" onMouseover="japanMap_OnMouseOver('2')" onMouseout="kill('2')" >
									<AREA shape="RECT" coords="37,323,41,327" onMouseover="japanMap_OnMouseOver('3')" onMouseout="kill('3')" >
									<AREA shape="RECT" coords="191,223,195,227" onMouseover="japanMap_OnMouseOver('4')" onMouseout="kill('4')" >
									<AREA shape="RECT" coords="281,207,285,211" onMouseover="japanMap_OnMouseOver('5')" onMouseout="kill('5')" >
									<AREA shape="RECT" coords="181,196,185,200" onMouseover="japanMap_OnMouseOver('6')" onMouseout="kill('6')" >
									<AREA shape="RECT" coords="286,184,290,188" onMouseover="japanMap_OnMouseOver('7')" onMouseout="kill('7')" >
									<AREA shape="RECT" coords="272,180,276,184" onMouseover="japanMap_OnMouseOver('8')" onMouseout="kill('8')" >
									<AREA shape="RECT" coords="222,202,226,206" onMouseover="japanMap_OnMouseOver('9')" onMouseout="kill('9')" >
									<AREA shape="RECT" coords="277,172,281,176" onMouseover="japanMap_OnMouseOver('10')" onMouseout="kill('10')" >
									<AREA shape="RECT" coords="195,211,199,215" onMouseover="japanMap_OnMouseOver('11')" onMouseout="kill('11')" >
									<AREA shape="RECT" coords="237,199,241,203" onMouseover="japanMap_OnMouseOver('12')" onMouseout="kill('12')" >
									<AREA shape="RECT" coords="200,287,204,291" onMouseover="japanMap_OnMouseOver('13')" onMouseout="kill('13')" >
									<AREA shape="RECT" coords="288,170,292,174" onMouseover="japanMap_OnMouseOver('14')" onMouseout="kill('14')" >
									<AREA shape="RECT" coords="302,130,306,134" onMouseover="japanMap_OnMouseOver('15')" onMouseout="kill('15')" >
									<AREA shape="RECT" coords="293,97,297,101" onMouseover="japanMap_OnMouseOver('16')" onMouseout="kill('16')" >
									<AREA shape="RECT" coords="255,184,259,188" onMouseover="japanMap_OnMouseOver('17')" onMouseout="kill('17')" >
									<AREA shape="RECT" coords="183,260,187,264" onMouseover="japanMap_OnMouseOver('18')" onMouseout="kill('18')" >
									<AREA shape="RECT" coords="204,214,208,218" onMouseover="japanMap_OnMouseOver('19')" onMouseout="kill('19')" >
									<AREA shape="RECT" coords="314,89,318,93" onMouseover="japanMap_OnMouseOver('20')" onMouseout="kill('20')" >
									<AREA shape="RECT" coords="204,206,208,210" onMouseover="japanMap_OnMouseOver('21')" onMouseout="kill('21')" >
									<AREA shape="RECT" coords="247,197,251,201" onMouseover="japanMap_OnMouseOver('22')" onMouseout="kill('22')" >
									<AREA shape="RECT" coords="299,76,303,80" onMouseover="japanMap_OnMouseOver('23')" onMouseout="kill('23')" >
									<AREA shape="RECT" coords="282,139,286,143" onMouseover="japanMap_OnMouseOver('24')" onMouseout="kill('24')" >
									<AREA shape="RECT" coords="217,212,221,216" onMouseover="japanMap_OnMouseOver('25')" onMouseout="kill('25')" >
									<AREA shape="RECT" coords="268,186,272,190" onMouseover="japanMap_OnMouseOver('26')" onMouseout="kill('26')" >
									<AREA shape="RECT" coords="267,161,271,165" onMouseover="japanMap_OnMouseOver('27')" onMouseout="kill('27')" >
									<AREA shape="RECT" coords="227,194,231,198" onMouseover="japanMap_OnMouseOver('28')" onMouseout="kill('28')" >
									<AREA shape="RECT" coords="228,180,232,184" onMouseover="japanMap_OnMouseOver('29')" onMouseout="kill('29')" >
									<AREA shape="RECT" coords="194,238,198,242" onMouseover="japanMap_OnMouseOver('30')" onMouseout="kill('30')" >
									<AREA shape="RECT" coords="121,301,125,305" onMouseover="japanMap_OnMouseOver('31')" onMouseout="kill('31')" >
								</MAP>
								<map name="spacMap">
									<AREA shape="RECT" coords="451,163,455,167" onMouseover="spacMap_OnMouseOver('0')" onMouseout="kill('0')" >
									<AREA shape="RECT" coords="410,211,414,218" onMouseover="spacMap_OnMouseOver('1')" onMouseout="kill('1')" >
									<AREA shape="RECT" coords="343,177,347,181" onMouseover="spacMap_OnMouseOver('2')" onMouseout="kill('2')" >
									<AREA shape="RECT" coords="465,176,469,180" onMouseover="spacMap_OnMouseOver('3')" onMouseout="kill('3')" >
									<AREA shape="RECT" coords="413,206,417,210" onMouseover="spacMap_OnMouseOver('4')" onMouseout="kill('4')" >
									<AREA shape="RECT" coords="419,229,423,233" onMouseover="spacMap_OnMouseOver('5')" onMouseout="kill('5')" >
									<AREA shape="RECT" coords="423,213,427,217" onMouseover="spacMap_OnMouseOver('6')" onMouseout="kill('6')" >
									<AREA shape="RECT" coords="463,201,467,205" onMouseover="spacMap_OnMouseOver('7')" onMouseout="kill('7')" >
									<AREA shape="RECT" coords="354,178,358,182" onMouseover="spacMap_OnMouseOver('8')" onMouseout="kill('8')" >
									<AREA shape="RECT" coords="354,178,358,182" onMouseover="spacMap_OnMouseOver('9')" onMouseout="kill('9')" >
									<AREA shape="RECT" coords="345,204,349,208" onMouseover="spacMap_OnMouseOver('10')" onMouseout="kill('10')" >
									<AREA shape="RECT" coords="453,233,457,237" onMouseover="spacMap_OnMouseOver('11')" onMouseout="kill('11')" >
									<AREA shape="RECT" coords="453,233,457,237" onMouseover="spacMap_OnMouseOver('12')" onMouseout="kill('12')" >
									<AREA shape="RECT" coords="453,233,457,237" onMouseover="spacMap_OnMouseOver('13')" onMouseout="kill('13')" >
									<AREA shape="RECT" coords="453,233,457,237" onMouseover="spacMap_OnMouseOver('14')" onMouseout="kill('14')" >
									<AREA shape="RECT" coords="453,234,457,238" onMouseover="spacMap_OnMouseOver('15')" onMouseout="kill('15')" >
									<AREA shape="RECT" coords="453,233,457,237" onMouseover="spacMap_OnMouseOver('16')" onMouseout="kill('16')" >
									<AREA shape="RECT" coords="371,198,375,202" onMouseover="spacMap_OnMouseOver('17')" onMouseout="kill('17')" >
									<AREA shape="RECT" coords="453,213,457,217" onMouseover="spacMap_OnMouseOver('18')" onMouseout="kill('18')" >
									<AREA shape="RECT" coords="348,199,352,203" onMouseover="spacMap_OnMouseOver('19')" onMouseout="kill('19')" >
									<AREA shape="RECT" coords="459,212,463,216" onMouseover="spacMap_OnMouseOver('20')" onMouseout="kill('20')" >
									<AREA shape="RECT" coords="378,223,382,227" onMouseover="spacMap_OnMouseOver('21')" onMouseout="kill('21')" >
									<AREA shape="RECT" coords="351,201,355,205" onMouseover="spacMap_OnMouseOver('22')" onMouseout="kill('22')" >
									<AREA shape="RECT" coords="348,205,352,209" onMouseover="spacMap_OnMouseOver('23')" onMouseout="kill('23')" >
									<AREA shape="RECT" coords="353,180,357,184" onMouseover="spacMap_OnMouseOver('24')" onMouseout="kill('24')" >
									<AREA shape="RECT" coords="353,180,357,184" onMouseover="spacMap_OnMouseOver('25')" onMouseout="kill('25')" >
									<AREA shape="RECT" coords="352,180,356,184" onMouseover="spacMap_OnMouseOver('26')" onMouseout="kill('26')" >
									<AREA shape="RECT" coords="455,184,459,188" onMouseover="spacMap_OnMouseOver('27')" onMouseout="kill('27')" >
									<AREA shape="RECT" coords="455,184,459,188" onMouseover="spacMap_OnMouseOver('28')" onMouseout="kill('28')" >
									<AREA shape="RECT" coords="388,228,392,228" onMouseover="spacMap_OnMouseOver('29')" onMouseout="kill('29')" >
									<AREA shape="RECT" coords="351,179,355,183" onMouseover="spacMap_OnMouseOver('30')" onMouseout="kill('30')" >
									<AREA shape="RECT" coords="342,170,346,174" onMouseover="spacMap_OnMouseOver('31')" onMouseout="kill('31')" >
									<AREA shape="RECT" coords="372,197,376,201" onMouseover="spacMap_OnMouseOver('32')" onMouseout="kill('32')" >
									<AREA shape="RECT" coords="90,211,94,215" onMouseover="spacMap_OnMouseOver('33')" onMouseout="kill('33')" >
									<AREA shape="RECT" coords="464,183,468,187" onMouseover="spacMap_OnMouseOver('34')" onMouseout="kill('34')" >
									<AREA shape="RECT" coords="414,171,418,175" onMouseover="spacMap_OnMouseOver('35')" onMouseout="kill('35')" >
									<AREA shape="RECT" coords="351,178,355,182" onMouseover="spacMap_OnMouseOver('36')" onMouseout="kill('36')" >
									<AREA shape="RECT" coords="351,180,355,184" onMouseover="spacMap_OnMouseOver('37')" onMouseout="kill('37')" >
									<AREA shape="RECT" coords="348,204,352,208" onMouseover="spacMap_OnMouseOver('38')" onMouseout="kill('38')" >
									<AREA shape="RECT" coords="79,214,83,218" onMouseover="spacMap_OnMouseOver('39')" onMouseout="kill('39')" >
									<AREA shape="RECT" coords="448,191,452,195" onMouseover="spacMap_OnMouseOver('40')" onMouseout="kill('40')" >
									<AREA shape="RECT" coords="262,256,266,260" onMouseover="spacMap_OnMouseOver('41')" onMouseout="kill('41')" >
									<AREA shape="RECT" coords="73,219,77,223" onMouseover="spacMap_OnMouseOver('42')" onMouseout="kill('42')" >
									<AREA shape="RECT" coords="34,251,38,255" onMouseover="spacMap_OnMouseOver('43')" onMouseout="kill('43')" >
									<AREA shape="RECT" coords="371,197,375,201" onMouseover="spacMap_OnMouseOver('44')" onMouseout="kill('44')" >
									<AREA shape="RECT" coords="465,203,469,207" onMouseover="spacMap_OnMouseOver('45')" onMouseout="kill('45')" >
									<AREA shape="RECT" coords="417,231,421,235" onMouseover="spacMap_OnMouseOver('46')" onMouseout="kill('46')" >
									<AREA shape="RECT" coords="75,224,79,228" onMouseover="spacMap_OnMouseOver('47')" onMouseout="kill('47')" >
									<AREA shape="RECT" coords="99,220,103,224" onMouseover="spacMap_OnMouseOver('48')" onMouseout="kill('48')" >
									<AREA shape="RECT" coords="359,218,363,222" onMouseover="spacMap_OnMouseOver('49')" onMouseout="kill('49')" >
									<AREA shape="RECT" coords="72,217,76,221" onMouseover="spacMap_OnMouseOver('50')" onMouseout="kill('50')" >
									<AREA shape="RECT" coords="351,178,355,182" onMouseover="spacMap_OnMouseOver('51')" onMouseout="kill('51')" >
									<AREA shape="RECT" coords="455,221,459,225" onMouseover="spacMap_OnMouseOver('52')" onMouseout="kill('52')" >
									<AREA shape="RECT" coords="316,126,320,130" onMouseover="spacMap_OnMouseOver('53')" onMouseout="kill('53')" >
									<AREA shape="RECT" coords="316,126,320,130" onMouseover="spacMap_OnMouseOver('54')" onMouseout="kill('54')" >
									<AREA shape="RECT" coords="317,126,321,130" onMouseover="spacMap_OnMouseOver('55')" onMouseout="kill('55')" >
									<AREA shape="RECT" coords="260,255,264,259" onMouseover="spacMap_OnMouseOver('56')" onMouseout="kill('56')" >
									<AREA shape="RECT" coords="257,253,261,257" onMouseover="spacMap_OnMouseOver('57')" onMouseout="kill('57')" >
									<AREA shape="RECT" coords="100,214,104,218" onMouseover="spacMap_OnMouseOver('58')" onMouseout="kill('58')" >
									<AREA shape="RECT" coords="96,213,100,217" onMouseover="spacMap_OnMouseOver('59')" onMouseout="kill('59')" >
									<AREA shape="RECT" coords="83,218,87,222" onMouseover="spacMap_OnMouseOver('60')" onMouseout="kill('60')" >
									<AREA shape="RECT" coords="98,211,102,215" onMouseover="spacMap_OnMouseOver('61')" onMouseout="kill('61')" >
									<AREA shape="RECT" coords="76,221,80,225" onMouseover="spacMap_OnMouseOver('62')" onMouseout="kill('62')" >
									<AREA shape="RECT" coords="430,178,434,182" onMouseover="spacMap_OnMouseOver('63')" onMouseout="kill('63')" >
									<AREA shape="RECT" coords="410,209,414,213" onMouseover="spacMap_OnMouseOver('64')" onMouseout="kill('64')" >
									<AREA shape="RECT" coords="417,230,421,234" onMouseover="spacMap_OnMouseOver('65')" onMouseout="kill('65')" >
									<AREA shape="RECT" coords="467,202,471,206" onMouseover="spacMap_OnMouseOver('66')" onMouseout="kill('66')" >
									<AREA shape="RECT" coords="355,179,359,183" onMouseover="spacMap_OnMouseOver('67')" onMouseout="kill('67')" >
									<AREA shape="RECT" coords="348,206,352,210" onMouseover="spacMap_OnMouseOver('68')" onMouseout="kill('68')" >
									<AREA shape="RECT" coords="351,179,355,183" onMouseover="spacMap_OnMouseOver('69')" onMouseout="kill('69')" >
									<AREA shape="RECT" coords="391,198,395,202" onMouseover="spacMap_OnMouseOver('70')" onMouseout="kill('70')" >
									<AREA shape="RECT" coords="357,217,361,221" onMouseover="spacMap_OnMouseOver('71')" onMouseout="kill('71')" >
									<AREA shape="RECT" coords="399,218,403,222" onMouseover="spacMap_OnMouseOver('72')" onMouseout="kill('72')" >
									<AREA shape="RECT" coords="399,219,403,223" onMouseover="spacMap_OnMouseOver('73')" onMouseout="kill('73')" >
									<AREA shape="RECT" coords="497,182,501,186" onMouseover="spacMap_OnMouseOver('74')" onMouseout="kill('74')" >
									<AREA shape="RECT" coords="450,212,454,216" onMouseover="spacMap_OnMouseOver('75')" onMouseout="kill('75')" >
									<AREA shape="RECT" coords="454,175,458,179" onMouseover="spacMap_OnMouseOver('76')" onMouseout="kill('76')" >
									<AREA shape="RECT" coords="470,179,474,183" onMouseover="spacMap_OnMouseOver('77')" onMouseout="kill('77')" >
									<AREA shape="RECT" coords="343,195,347,199" onMouseover="spacMap_OnMouseOver('78')" onMouseout="kill('78')" >
									<AREA shape="RECT" coords="407,207,411,211" onMouseover="spacMap_OnMouseOver('79')" onMouseout="kill('79')" >
									<AREA shape="RECT" coords="412,213,416,217" onMouseover="spacMap_OnMouseOver('80')" onMouseout="kill('80')" >
									<AREA shape="RECT" coords="87,217,91,221" onMouseover="spacMap_OnMouseOver('81')" onMouseout="kill('81')" >
									<AREA shape="RECT" coords="77,241,81,245" onMouseover="spacMap_OnMouseOver('82')" onMouseout="kill('82')" >
									<AREA shape="RECT" coords="361,221,365,225" onMouseover="spacMap_OnMouseOver('83')" onMouseout="kill('83')" >
									<AREA shape="RECT" coords="100,210,104,214" onMouseover="spacMap_OnMouseOver('84')" onMouseout="kill('84')" >
									<AREA shape="RECT" coords="104,199,108,203" onMouseover="spacMap_OnMouseOver('85')" onMouseout="kill('85')" >
									<AREA shape="RECT" coords="349,209,353,213" onMouseover="spacMap_OnMouseOver('86')" onMouseout="kill('86')" >
									<AREA shape="RECT" coords="471,179,475,183" onMouseover="spacMap_OnMouseOver('87')" onMouseout="kill('87')" >
									<AREA shape="RECT" coords="360,218,364,222" onMouseover="spacMap_OnMouseOver('88')" onMouseout="kill('88')" >
									<AREA shape="RECT" coords="351,179,355,183" onMouseover="spacMap_OnMouseOver('89')" onMouseout="kill('89')" >
									<AREA shape="RECT" coords="433,228,437,232" onMouseover="spacMap_OnMouseOver('90')" onMouseout="kill('90')" >
									<AREA shape="RECT" coords="102,190,106,194" onMouseover="spacMap_OnMouseOver('91')" onMouseout="kill('91')" >
									<AREA shape="RECT" coords="263,260,267,264" onMouseover="spacMap_OnMouseOver('92')" onMouseout="kill('92')" >
									<AREA shape="RECT" coords="91,214,95,218" onMouseover="spacMap_OnMouseOver('93')" onMouseout="kill('93')" >
									<AREA shape="RECT" coords="72,234,76,238" onMouseover="spacMap_OnMouseOver('94')" onMouseout="kill('94')" >
									<AREA shape="RECT" coords="453,183,457,187" onMouseover="spacMap_OnMouseOver('95')" onMouseout="kill('95')" >
									<AREA shape="RECT" coords="462,214,466,218" onMouseover="spacMap_OnMouseOver('96')" onMouseout="kill('96')" >
									<AREA shape="RECT" coords="469,197,473,201" onMouseover="spacMap_OnMouseOver('97')" onMouseout="kill('97')" >
									<AREA shape="RECT" coords="78,221,82,225" onMouseover="spacMap_OnMouseOver('98')" onMouseout="kill('98')" >
									<AREA shape="RECT" coords="342,187,346,191" onMouseover="spacMap_OnMouseOver('99')" onMouseout="kill('99')" >
									<AREA shape="RECT" coords="107,188,111,192" onMouseover="spacMap_OnMouseOver('100')" onMouseout="kill('100')" >
									<AREA shape="RECT" coords="78,220,82,224" onMouseover="spacMap_OnMouseOver('101')" onMouseout="kill('101')" >
									<AREA shape="RECT" coords="449,212,453,216" onMouseover="spacMap_OnMouseOver('102')" onMouseout="kill('102')" >
									<AREA shape="RECT" coords="438,210,442,214" onMouseover="spacMap_OnMouseOver('103')" onMouseout="kill('103')" >
									<AREA shape="RECT" coords="353,179,357,183" onMouseover="spacMap_OnMouseOver('104')" onMouseout="kill('104')" >
									<AREA shape="RECT" coords="359,217,363,221" onMouseover="spacMap_OnMouseOver('105')" onMouseout="kill('105')" >
									<AREA shape="RECT" coords="349,200,353,204" onMouseover="spacMap_OnMouseOver('106')" onMouseout="kill('106')" >
									<AREA shape="RECT" coords="89,217,93,221" onMouseover="spacMap_OnMouseOver('107')" onMouseout="kill('107')" >
									<AREA shape="RECT" coords="457,199,461,203" onMouseover="spacMap_OnMouseOver('108')" onMouseout="kill('108')" >
									<AREA shape="RECT" coords="453,323,457,327" onMouseover="spacMap_OnMouseOver('109')" onMouseout="kill('109')" >
									<AREA shape="RECT" coords="392,198,396,202" onMouseover="spacMap_OnMouseOver('110')" onMouseout="kill('110')" >
									<AREA shape="RECT" coords="355,178,359,182" onMouseover="spacMap_OnMouseOver('111')" onMouseout="kill('111')" >
									<AREA shape="RECT" coords="360,221,364,225" onMouseover="spacMap_OnMouseOver('112')" onMouseout="kill('112')" >
									<AREA shape="RECT" coords="356,217,360,221" onMouseover="spacMap_OnMouseOver('113')" onMouseout="kill('113')" >
									<AREA shape="RECT" coords="348,210,352,214" onMouseover="spacMap_OnMouseOver('114')" onMouseout="kill('114')" >
									<AREA shape="RECT" coords="429,179,433,183" onMouseover="spacMap_OnMouseOver('115')" onMouseout="kill('115')" >
									<AREA shape="RECT" coords="351,184,355,188" onMouseover="spacMap_OnMouseOver('116')" onMouseout="kill('116')" >
									<AREA shape="RECT" coords="351,183,355,187" onMouseover="spacMap_OnMouseOver('117')" onMouseout="kill('117')" >
									<AREA shape="RECT" coords="260,255,264,259" onMouseover="spacMap_OnMouseOver('118')" onMouseout="kill('118')" >
									<AREA shape="RECT" coords="458,211,462,215" onMouseover="spacMap_OnMouseOver('119')" onMouseout="kill('119')" >
									<AREA shape="RECT" coords="412,229,416,233" onMouseover="spacMap_OnMouseOver('120')" onMouseout="kill('120')" >
									<AREA shape="RECT" coords="352,179,356,183" onMouseover="spacMap_OnMouseOver('121')" onMouseout="kill('121')" >
									<AREA shape="RECT" coords="103,185,107,189" onMouseover="spacMap_OnMouseOver('122')" onMouseout="kill('122')" >
									<AREA shape="RECT" coords="350,204,354,208" onMouseover="spacMap_OnMouseOver('123')" onMouseout="kill('123')" >
									<AREA shape="RECT" coords="99,202,103,206" onMouseover="spacMap_OnMouseOver('124')" onMouseout="kill('124')" >
									<AREA shape="RECT" coords="354,216,358,220" onMouseover="spacMap_OnMouseOver('125')" onMouseout="kill('125')" >
									<AREA shape="RECT" coords="348,171,352,175" onMouseover="spacMap_OnMouseOver('126')" onMouseout="kill('126')" >
									<AREA shape="RECT" coords="350,180,354,184" onMouseover="spacMap_OnMouseOver('127')" onMouseout="kill('127')" >
									<AREA shape="RECT" coords="81,221,85,225" onMouseover="spacMap_OnMouseOver('128')" onMouseout="kill('128')" >
									<AREA shape="RECT" coords="95,214,99,218" onMouseover="spacMap_OnMouseOver('129')" onMouseout="kill('129')" >
									<AREA shape="RECT" coords="356,216,360,220" onMouseover="spacMap_OnMouseOver('130')" onMouseout="kill('130')" >
									<AREA shape="RECT" coords="370,198,374,202" onMouseover="spacMap_OnMouseOver('131')" onMouseout="kill('131')" >
									<AREA shape="RECT" coords="263,260,267,264" onMouseover="spacMap_OnMouseOver('132')" onMouseout="kill('132')" >
									<AREA shape="RECT" coords="477,190,481,194" onMouseover="spacMap_OnMouseOver('133')" onMouseout="kill('133')" >
									<AREA shape="RECT" coords="449,235,453,239" onMouseover="spacMap_OnMouseOver('134')" onMouseout="kill('134')" >
									<AREA shape="RECT" coords="95,208,99,212" onMouseover="spacMap_OnMouseOver('135')" onMouseout="kill('135')" >
									<AREA shape="RECT" coords="84,216,88,220" onMouseover="spacMap_OnMouseOver('136')" onMouseout="kill('136')" >
									<AREA shape="RECT" coords="84,212,88,216" onMouseover="spacMap_OnMouseOver('137')" onMouseout="kill('137')" >
									<AREA shape="RECT" coords="371,197,375,201" onMouseover="spacMap_OnMouseOver('138')" onMouseout="kill('138')" >
									<AREA shape="RECT" coords="350,206,354,210" onMouseover="spacMap_OnMouseOver('139')" onMouseout="kill('139')" >
									<AREA shape="RECT" coords="347,179,351,183" onMouseover="spacMap_OnMouseOver('140')" onMouseout="kill('140')" >
									<AREA shape="RECT" coords="375,222,379,226" onMouseover="spacMap_OnMouseOver('141')" onMouseout="kill('141')" >
									<AREA shape="RECT" coords="257,252,261,256" onMouseover="spacMap_OnMouseOver('142')" onMouseout="kill('142')" >
									<AREA shape="RECT" coords="349,204,353,208" onMouseover="spacMap_OnMouseOver('143')" onMouseout="kill('143')" >
									<AREA shape="RECT" coords="355,210,359,214" onMouseover="spacMap_OnMouseOver('144')" onMouseout="kill('144')" >
									<AREA shape="RECT" coords="261,255,265,259" onMouseover="spacMap_OnMouseOver('145')" onMouseout="kill('145')" >
									<AREA shape="RECT" coords="358,177,362,181" onMouseover="spacMap_OnMouseOver('146')" onMouseout="kill('146')" >
									<AREA shape="RECT" coords="453,189,457,193" onMouseover="spacMap_OnMouseOver('147')" onMouseout="kill('147')" >
									<AREA shape="RECT" coords="352,179,356,183" onMouseover="spacMap_OnMouseOver('148')" onMouseout="kill('148')" >
									<AREA shape="RECT" coords="352,179,356,183" onMouseover="spacMap_OnMouseOver('149')" onMouseout="kill('149')" >
									<AREA shape="RECT" coords="343,174,347,178" onMouseover="spacMap_OnMouseOver('150')" onMouseout="kill('150')" >
									<AREA shape="RECT" coords="414,231,418,235" onMouseover="spacMap_OnMouseOver('151')" onMouseout="kill('151')" >
									<AREA shape="RECT" coords="357,216,361,220" onMouseover="spacMap_OnMouseOver('152')" onMouseout="kill('152')" >
									<AREA shape="RECT" coords="459,181,463,185" onMouseover="spacMap_OnMouseOver('153')" onMouseout="kill('153')" >
									<AREA shape="RECT" coords="466,199,470,203" onMouseover="spacMap_OnMouseOver('154')" onMouseout="kill('154')" >
									<AREA shape="RECT" coords="352,175,356,179" onMouseover="spacMap_OnMouseOver('155')" onMouseout="kill('155')" >
									<AREA shape="RECT" coords="75,228,79,232" onMouseover="spacMap_OnMouseOver('156')" onMouseout="kill('156')" >
									<AREA shape="RECT" coords="56,245,60,249" onMouseover="spacMap_OnMouseOver('157')" onMouseout="kill('157')" >
									<AREA shape="RECT" coords="367,221,371,225" onMouseover="spacMap_OnMouseOver('158')" onMouseout="kill('158')" >
								</MAP>




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
