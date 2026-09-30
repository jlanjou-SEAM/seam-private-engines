/**
 * NOAA-ESRL-GSD-MADIS Author: Gopakumar Padmanabhan (Gopa) Last Modified: Nov
 * 2nd, 2015
 * 
 */

var UseWebGL = false;

if (!Date.prototype.toISOString)
{
	(function ()
	{
		function pad(number)
		{
			var r = String(number);
			if (r.length === 1)
			{
				r = '0' + r;
			}
			return r;
		}
		Date.prototype.toISOString = function ()
		{
			return this.getUTCFullYear()
				+ '-'
				+ pad(this.getUTCMonth() + 1)
				+ '-'
				+ pad(this.getUTCDate())
				+ 'T'
				+ pad(this.getUTCHours())
				+ ':'
				+ pad(this.getUTCMinutes())
				+ ':'
				+ pad(this.getUTCSeconds())
				+ '.'
				+ String((this.getUTCMilliseconds() / 1000).toFixed(3))
					.slice(2, 5) + 'Z';
		};
	}());
}

function cuniq()
{
	const now = new Date()
	return Math.round((now.getTime() + getRandomInt(1, 2000)) / 1000);
}

function browserLogInt(loglevel, text)
{
	var doc = document;

	if (undefined == loglevel || undefined == text)
	{
		console.trace();
		return;
	}

	if (loglevel >= doc.LOG_LEVEL_CONSOLE)
	{
		switch (loglevel)
		{
			case doc.DEBUG:
				console.log(text);
				break;
			case doc.INFO:
				console.info(text);
				break;
			case doc.WARN:
				console.warn(text);
				break;
			case doc.ERROR:
				console.error(text);
				break;
		}

	}
	if (loglevel < doc.LOG_LEVEL_LOG)
	{
		return;
	}
	try
	{
		var log = doc.registry.byId("log");
		var txt = log.get("value");
		var lines = txt.split("\n");
		if (lines.length > 100)
		{
			lines.splice(0, 100);
			txt = lines.join("\n");
		}
		log.set("value", text + "\n" + txt);
	} catch (err)
	{
		console.log("Log error:" + err);
	}
}

AppMain();

/*
 * data_source (see MadisAircraftLoader/src/acars4.h) 0=ACARS 1=MDCRS 2=Both
 * 3=AMDAR 4=TAMDAR (research) 5=Canadian 6=E-AMDAR 7=TAM_OPS 8=TAM_both
 * 9-MMMX, 10=PIREP 11=RECCO 12=MODES 13=AFIR
 */

function getRandomInt(min, max)
{
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function AppMain()
{
	var doc = document;

	doc.clid = cuniq();
	doc.cfg = {};
	doc.cfg.CenterLAT = 40.00;
	doc.cfg.CenterLON = -98.0;
	doc.cfg.Zoom = 5.0;
	doc.cfg.altMinFilter = 0;
	doc.cfg.altMaxFilter = 45000;
	doc.cfg.stationsToDisplayPC = 20.0;
	doc.cfg.windBarbChecked = false;
	doc.cfg.windSpeedChecked = false;
	doc.cfg.FpLines = false;
	doc.cfg.autoFpLines = true
	doc.cfg.fpAutoThreshold = 30;
	doc.cfg.loadWindowHours = 3;
	doc.cfg.loadLatest = true;
	doc.cfg.overlayIconSize = 20;
	doc.cfg.computeGroundElev = false;
	doc.cfg.overlayAirports = false;
	doc.cfg.overlayRAOBs = false;
	doc.cfg.overlayUSVORs = false;
	doc.cfg.overlayARTCCboundaries = false;

	doc.epochAtStart = Math.round((new Date()).getTime() / 1000);
	doc.cfg.loadStartEpochSecs = (doc.epochAtStart - (doc.cfg.loadWindowHours * 3600));

	doc.IsLoaded = IsLoaded;
	doc.callback_UILoaded = callback_UILoaded;
	doc.callback_ESRILoaded = callback_ESRILoaded;
	doc.callback_AppSettingsLoaded = callback_AppSettingsLoaded;
	doc.callback_InitialConfigLoaded = callback_InitialConfigLoaded;
	doc.callback_MAPLoaded = callback_MAPLoaded;
	doc.loadUI = loadUI;
	doc.loadEsri = loadEsri;
	doc.loadMap = loadMap;
	// alert("Loading functions ...");
	doc.cb_UILoaded = new doc.IsLoaded(doc.callback_UILoaded);
	doc.cb_ESRILoaded = new doc.IsLoaded(doc.callback_ESRILoaded);
	doc.cb_AppSettingsLoaded = new doc.IsLoaded(doc.callback_AppSettingsLoaded);
	doc.cb_InitialConfigLoaded = new doc.IsLoaded(
		doc.callback_InitialConfigLoaded);
	doc.cb_MAPLoaded = new doc.IsLoaded(doc.callback_MAPLoaded);
	doc.cfg.altMinFilter = -1000.0;
	doc.cfg.altMaxFilter = 45000.0;
	doc.DEBUG = 0;
	doc.INFO = 1;
	doc.WARN = 2;
	doc.ERROR = 3;
	doc.LOG_LEVEL_CONSOLE = doc.DEBUG;
	doc.LOG_LEVEL_LOG = doc.INFO;
	doc.browserLogInt = browserLogInt;
	doc.acarSize = 5;

	console.log("clid:" + doc.clid);

	doc.DataSourceType =
	{
		ACAR:
		{
			val: 0
		},
		MDCRS:
		{
			val: 1
		},
		ACAR_MDCRS:
		{
			val: 2
		},
		AMDAR:
		{
			val: 3
		},
		TAMDAR_rsch:
		{
			val: 4
		},
		Canadian:
		{
			val: 5
		},
		E_AMDAR:
		{
			val: 6
		},
		TAMDAR_OPS:
		{
			val: 7
		},
		TAM_Both:
		{
			val: 8
		},
	        MMMX:
		{
		    val: 9
		},
		    
	        MODES:
		{
			val: 12
		},
	        AFIR:
		{
			val: 13	    
		}
	};
	// used for calculating between pressure <-> altitude
	// constants taken from 1976 US Standard Atmosphere
	doc.g = 9.80665; // (m s^-2) accl. of gravity
	// 1976 Std Atmosphere height limits (geopotential meters)
	doc.std_h_low = [0.0, 11000.0, 20000.0, 32000.0, 47000.0, 51000.0, 71000.0];
	// lapse rates starting at 0,11,20,32 Km (Km/m)
	doc.gam = [-0.0065, 0.0, 0.001, 0.0028, 0.0, -0.0028, -0.002];
	// temperature of 1976 Std Atmos at 0,11,20,32 geopotential Km (Kelvin)
	doc.T_low = [288.15, 216.65, 216.65, 228.65, 270.65, 270.65, 214.65];
	// pressure of 1976 Std Atmos at 0,11,20,32 geopotential Km (mb)
	doc.p_low = [1013.25, 226.32, 54.748, 8.6801, 1.109063, 0.66, 0.04];
	// gas const. for dry air (MKS) ( = 8314.32/28.9644, 1976 Std Atmos)
	doc.r = 287.05307;
	// radius of earth (meters)
	doc.r_earth = 6356766.0;

	doc.dsSelectAll = true;
	doc.airports = {};
	doc.raobs = {};
	doc.vors = {};
	doc.getAcarsIdx = [0, 0];

	loadUI();
}

function IsLoaded(callback)
{
	var value;
	this.set = function (v)
	{
		value = v;
		if (value == true)
		{
			callback(this);
		}
	}
	this.get = function ()
	{
		return value;
	}
}

function callback_UILoaded(il)
{
	var doc = document;

	var appbaseurl = window.location.href.split('?')[0];
	var apptoks = appbaseurl.split('/');
	doc.appname = apptoks[apptoks.length - 2];
	browserLogInt(doc.DEBUG, "UI loaded!, app name:" + doc.appname);

	// browserLogInt(doc.INFO, "Browser:" + JSON.stringify(navigator.userAgent)
	// + ",has(ie):" + doc.has('ie'));
	browserLogInt(doc.INFO, "Browser:" + JSON.stringify(navigator.userAgent));
	if (document.documentMode || /Edge/.test(navigator.userAgent))
	{
		browserLogInt(doc.DEBUG, 'Running on IE or Edge!');
		doc.isIE = true;
	} else
	{
		doc.isIE = false;
	}
	if (navigator.userAgent.search("Safari") >= 0
		&& navigator.userAgent.search("Chrome") < 0)
	{
		doc.isSafari = true;
		browserLogInt(doc.DEBUG, 'Running on Safari!');
	} else
	{
		doc.isSafari = false;
	}
	loadEsri();
}

function callback_ESRILoaded(il)
{
	var doc = document;

	browserLogInt(doc.DEBUG, "ESRI loaded!");
	// loadMap(40.00, -98.0, 5.0);
	loadAppSettings();
}

function callback_AppSettingsLoaded(il)
{
	var doc = document;

	browserLogInt(doc.DEBUG, "AppSettings loaded!");
	loadInitialConfig();
}

function loadAppSettings()
{
	var doc = document;

	var arg0 =
	{
		m: "getAppSetting",
		appSettings: [
			'overlay.artcc.kml',
			'overlay.World_FIR_Boundaries.kml',
			'overlay.FIR.kml',
			'overlay.FIRHigh.kml',
			'overlay.FIRLow.kml',
			'client.enableLookAheadQueries',
			'client.lookAheadQueriesFanOutCount',
			'client.lookAheadQueriesDelay_ms',
			'client.enableSoundingLookAheadQueries'
		],
		isdebug: doc.isdebug
	};
	var url = window.location.href.split('?')[0] + "/MadisAircraft";
	browserLogInt(doc.DEBUG, url + ",getAppSetting(" + JSON.stringify(arg0, null, 2)
		+ ")");
	var xhrArgs =
	{
		url: url,
		content: arg0,
		handleAs: "text",
		load: function (data)
		{
			doc.appSettings = JSON.parse(data);
			doc.browserLogInt(doc.INFO, "appSettings:\n" + JSON.stringify(doc.appSettings, null, 2));
			// doc.browserLogInt(doc.INFO, "overlay.artcc.kml:"
			// + doc.appSettings.appsettings['overlay.artcc.kml']);
			doc.cb_AppSettingsLoaded.set(true);
		},
		error: function (args)
		{
			if (args.dojoType != 'cancel')
			{
				doc.browserLogInt(doc.ERROR, "getAppSetting load failed!");
			}
		}
	};
	doc.deferred_xhr_AcarForId = doc.dojo.xhrPost(xhrArgs);
	doc.dom.byId('serverWaiting').style.visibility = 'visible';
}

function loadInitialConfig()
{
	var doc = document;
	var startTime = new Date();
	var url = window.location.href.split('?')[0] + "/data/doc_cfg_init.json";
	browserLogInt(doc.DEBUG, "Loading Initial Config from:" + url);
	doc.dojo
		.xhrGet(
			{
				url: url,
				load: function (result)
				{
					doc.cfg = JSON.parse(result);
					var epochNow = Math.round((new Date()).getTime() / 1000);
					doc.cfg.loadStartEpochSecs = (epochNow - (doc.cfg.loadWindowHours * 3600));
					browserLogInt(doc.DEBUG, "doc.cfg:"
						+ JSON.stringify(doc.cfg));
					doc.cb_InitialConfigLoaded.set(true);
				},
				error: function (args)
				{
					if (args.dojoType != 'cancel')
					{
						doc.browserLogInt(doc.ERROR,
							"loadInitialConfig failed!");
					}
				}
			});
}

function callback_InitialConfigLoaded(il)
{
	var doc = document;

	browserLogInt(doc.DEBUG, "InitialConfig loaded!");
	loadMap();
}

function pad(num, size)
{
	var s = num + "";
	while (s.length < size)
		s = "0" + s;
	return s;
}

function callback_MAPLoaded(il)
{
	var doc = document;

	browserLogInt(doc.INFO, "callback_MAPLoaded()");

	// try
	// {
	// doc.elevationLayer = new doc.tiledMapServiceLayer(
	// "http://server.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer");
	// doc.map.addLayer(elevationLayer);
	// } catch (err)
	// {
	// doc.browserLogInt(doc.ERROR, "Exception in loading Elevation Layer:"
	// + err.message);
	// }

	doc.deferred_xhr_objects = [null, null];
	setTimeout(() => 
	{
		setupEventHandlers();
	}, 100);
	
	waitOnfpAuto(il);
}

function waitOnfpAuto(il)
{
	var doc = document;
	browserLogInt(doc.INFO, "waitOnfpAuto()");

	function checkFpAuth()
	{
		if (document.registry.byId("autoFpLines") === undefined)
		{
			setTimeout(checkFpAuth, 5);
		} else
		{
			console.log("autoFpLines loaded!");
			document.registry.byId("autoFpLines").on("change",
				OnChangeAutoFpLinesChkBox);
			callback_fpAutoLoaded(il);
		}
	}
	setTimeout(checkFpAuth, 5);
}

function callback_fpAutoLoaded(il)
{
	var doc = document;
	setInitialValues();

	browserLogInt(doc.INFO, "callback_fpAutoLoaded()");

	var rangeSlider = new doc.HorizontalRangeSlider(
		{
			name: "rangeSlider",
			value: [doc.cfg.altMinFilter / 1000, doc.cfg.altMaxFilter / 1000],
			minimum: -1,
			maximum: 45,
			intermediateChanges: true,
			style: "width:300px;",
			onChange: alRangeOnChange
		}, "rangeSlider");
	updateAltRangeLabel();

	doc.stationsToDisplaySlider = new doc.HorizontalSlider(
		{
			name: "stationsToDisplaySlider",
			value: doc.cfg.stationsToDisplayPC,
			minimum: 10,
			maximum: 100,
			intermediateChanges: true,
			showButtons: false,
			// discreteValues : 10,
			style: "width:220px;",
			onChange: stdsOnChange
		}, "stationsToDisplaySlider");
	createUI();
	loadESRIFunctions();
	// loadAirports();
	// loadRAOBs();
	// loadVORs();

	doc.tempPopupDialog = new doc.TooltipDialog(
		{
			id: "tempPopupDialog",
			style: "position: absolute; width: 250px; font: normal normal normal 10pt Helvetica;z-index:100;background:#AAD2E1",
		});
	doc.tempPopupDialog.startup();
	doc.domStyle.set(doc.tempPopupDialog.domNode, "opacity", 0.85);

	doc.toolTipDialog = new doc.TooltipDialog(
		{
			id: "tooltipDialog",
			style: "position: absolute; width: 250px; font: normal normal normal 10pt Helvetica;z-index:100;background:#AAD2E1",
			onClose: function ()
			{
				browserLogInt(doc.INFO, "tooltip onClose");
				doc.popupOpen = false;
				doc.mouseInpopup = false;
			},
			onMouseEnter: function ()
			{
				browserLogInt(doc.INFO, "tooltip onMouseEnter");
				doc.mouseInpopup = true;
			},
			onMouseLeave: function ()
			{
				browserLogInt(doc.INFO, "tooltip onMouseLeave");
				doc.mouseInpopup = false;
			},
			onMouseUp: function (evt)
			{
				var boundingRect = evt.target.getBoundingClientRect();
				browserLogInt(doc.INFO, "tooltip onMouseUp,mouseOver_pageX:" + doc.mouseOver_pageX + ",mouseOver_pageY:" + doc.mouseOver_pageY +
					",x:" + evt.pageX + ",y:" + evt.pageY + "," + JSON.stringify(boundingRect));
				if (Math.abs(evt.pageX - doc.mouseOver_pageX) < 12 && Math.abs(evt.pageY - doc.mouseOver_pageY) < 12)
				{
					OnTooltipClick();
				}
			}
		});
	doc.toolTipDialog.startup();
	doc.domStyle.set(doc.toolTipDialog.domNode, "opacity", 0.85);

	doc.soundingDataDialog = new doc.TooltipDialog(
		{
			id: "soundingDataDialog",
			style: "position: absolute; width: 500px; font: normal normal normal 14pt Helvetica;z-index:100;background:#AAD2E1"
		});
	doc.soundingDataDialog.startup();
	doc.domStyle.set(doc.soundingDataDialog.domNode, "opacity", 0.95);

	// doc.arrayUtils.forEach(doc.registry.toArray(), function(item, i)
	// {
	// doc.browserLogInt(doc.DEBUG, "item:" + item + ",i:" + i);
	// });
	try
	{
		doc.datasetsPane = doc.registry.byId("datasetsPane");
		doc.datasetsPaneVisible = false;
		doc.dijitPopup.moveOffScreen(doc.datasetsPane);
		doc.datasetsPane.startup();

		doc.dataLoadPane = doc.registry.byId("dataLoadPane");
		doc.dataLoadPaneVisible = false;
		doc.dijitPopup.moveOffScreen(doc.dataLoadPane);
		doc.dataLoadPane.startup();

		doc.settingsPane = doc.registry.byId("settingsPane");
		doc.settingsPaneVisible = false;
		doc.dijitPopup.moveOffScreen(doc.settingsPane);
		doc.settingsPane.startup();

		doc.logPane = doc.registry.byId("logPane");
		doc.logPaneVisible = false;
		doc.dijitPopup.moveOffScreen(doc.logPane);
		doc.logPane.startup();
	} catch (err)
	{
		doc.browserLogInt(doc.ERROR, "Exception:" + err.message);
	}

	doc.oneSecTimer = new doc.timing.Timer(1000);
	doc.oneSecTimer.onTick = function ()
	{
		var date1 = new Date();
		doc.dom.byId('utcVal').value = doc.datestamp.toISOString(date1,
			{
				zulu: true
			});
	}
	doc.oneSecTimer.start();
	// doc.map.graphics.setOpacity(0.8);

	// http://tesla:9080/MadisAircraft/?debug=true&soundingtest=true
	var isdebug = getUrlVars()["debug"];
	if (undefined != isdebug && isdebug == 'true')
	{
		doc.isdebug = true;
		doc.browserLogInt(doc.INFO, "************* isdebug set to true");
	} else
	{
		doc.isdebug = false;
	}
	var issoundingtest = getUrlVars()["soundingtest"];
	if (undefined != issoundingtest && issoundingtest == 'true')
	{
		doc.issoundingtest = true;
		doc.browserLogInt(doc.INFO, "************* issoundingtest set to true");
	} else
	{
		doc.issoundingtest = false;
	}

	doc.standby = new doc.Standby(
		{
			target: "busyDiv",
			duration: 100,
			color: '#3A4166'
		});
	doc.body.appendChild(doc.standby.domNode);
	doc.standby.startup();

	browserLogInt(doc.INFO, "callback_MAPLoaded() - 2");

	try
	{
		doc.setFromCfg = true;
		doc.registry.byId("windBarbChkBox").set("value",
			doc.cfg.windBarbChecked);
		doc.registry.byId("windSpeedChkBox").set("value",
			doc.cfg.windSpeedChecked);
		doc.registry.byId("fpLinesChkBox").set("value", doc.cfg.FpLines);
		doc.registry.byId("autoFpLines").set("value", doc.cfg.autoFpLines);
		doc.registry.byId("fpAutoThreshold").set("value",
			doc.cfg.fpAutoThreshold);

		browserLogInt(doc.INFO, "doc.upto5000Color:"
			+ doc.upto5000Color.toHex());
		// #a82323 , int: 11019043
		var colors = [];
		colors.push(parseInt(doc.upto5000Color.toHex().substring(1), 16));
		colors.push(parseInt(doc.upto16000Color.toHex().substring(1), 16));
		colors.push(parseInt(doc.upto28000Color.toHex().substring(1), 16));
		colors.push(parseInt(doc.upto39000Color.toHex().substring(1), 16));
		colors.push(parseInt(doc.upto45000Color.toHex().substring(1), 16));
		colors.push(parseInt(doc.above45000Color.toHex().substring(1), 16));

		browserLogInt(doc.INFO, "\tColors:" + JSON.stringify(colors));
		MapRenderGL.init("mapDiv", doc.map, colors);
		MapRenderGL.registerHoverEvent(onWebGlHover);
		MapRenderGL.registerClickEvent(onWebGlClick);
	} catch (err)
	{
		doc.browserLogInt(doc.ERROR, "Exception:" + err.message);
	}

	browserLogInt(doc.INFO, "Done: callback_MAPLoaded()");

	updateDataRangeLabel();
	refreshDisplay();
}

function stackTrace()
{
	var err = new Error();
	return err.stack;
}

function refreshDisplay()
{
	var doc = document;

	browserLogInt(doc.INFO, "refreshDisplay(),deferred_xhr_objects:" + doc.deferred_xhr_objects.length);
	// browserLogInt(doc.INFO, "stackTrace:" + stackTrace());


	if (doc.deferred_xhr_objects[0])
	{
		browserLogInt(doc.INFO, "doc.deferred_xhr_objects[0] is not null!");
	}
	if (doc.deferred_xhr_objects[1])
	{
		browserLogInt(doc.INFO, "doc.deferred_xhr_objects[1] is not null!");
	}

	if (doc.deferred_xhr_objects[0] || doc.deferred_xhr_objects[1])
	{
		browserLogInt(doc.INFO, "\tquery in progress, ignoring refresh ...");
		doc.getAcarsIdx = [null, null];
		return;
	}

	showHideStandby(true);
	doc.refreshStartTime = new Date();
	doc.clearAllStations();
	browserLogInt(doc.INFO, "clearAllStations in " + (new Date() - doc.refreshStartTime) + " ms");

	/*
	try
	{
		updateLoadWindSettings();
	} catch (err)
	{
		doc.browserLogInt(doc.ERROR, "Exception:" + err.message);
	}
	*/

	doc.getAcarsIdx = [0, 0];
	doc.totalAcars = 0;
	doc.lookAheadIdxs = {};
	doc.lookAheadIntervalIds = {};

	setTimeout(function ()
	{
		var exts = doc.map.geographicExtent.normalize();
		browserLogInt(doc.INFO, "exts, length:" + exts.length + "\n" + JSON.stringify(exts));

		if (1 === exts.length)
		{
			loadACARS(0, exts[0].ymin, exts[0].xmin, exts[0].ymax, exts[0].xmax);
		} else if (2 === exts.length)
		{
			loadACARS(0, exts[0].ymin, exts[0].xmin, exts[0].ymax, exts[0].xmax);
			loadACARS(1, exts[1].ymin, exts[1].xmin, exts[1].ymax, exts[1].xmax);
		}
	}, 200);

}

function showHideStandby(vis)
{
	var doc = document;

	doc.browserLogInt(doc.INFO, "showHideStandby(" + vis + ")");

	if (true === vis)
	{
		doc.standby.show();
	}
	else
	{
		doc.standby.hide();
	}
}

function loadACARS(deferred_xhr_object_idx, i_lat_min, i_lon_min, i_lat_max,
	i_lon_max)
{
	var doc = document;

	doc.browserLogInt(doc.INFO, "loadACARS(" + i_lat_min.toFixed(2) + ","
		+ i_lon_min.toFixed(2) + "," + i_lat_max.toFixed(2) + ","
		+ i_lon_max.toFixed(2) + ")");

	if (null == doc.cfg.selectedSensors || 0 == doc.cfg.selectedSensors.length)
	{
		doc.browserLogInt(doc.WARN, "No sensors selected!");
		doc.clearAllStations();
		doc.dom.byId('serverWaiting').style.visibility = 'hidden';
		showHideStandby(false);
		return;
	}

	if (null != doc.deferred_xhr_objects
		&& doc.deferred_xhr_objects.length > deferred_xhr_object_idx
		&& null != doc.deferred_xhr_objects[deferred_xhr_object_idx])
	{
		doc.browserLogInt(doc.WARN, "\tserver request waiting, load cancelled, deferred_xhr_object_idx:" +
			deferred_xhr_object_idx + ",deferred_xhr_objects.length:" + doc.deferred_xhr_objects.length);
		doc.deferred_xhr_objects[deferred_xhr_object_idx].cancel("not_needed");
		doc.deferred_xhr_objects[deferred_xhr_object_idx] = null;
	}
	else
	{
		doAcarsLoad(deferred_xhr_object_idx, i_lat_min, i_lon_min, i_lat_max, i_lon_max);
	}
}


function doAcarsLoad(deferred_xhr_object_idx, i_lat_min, i_lon_min, i_lat_max,
	i_lon_max)
{
	var doc = document;

	doc.browserLogInt(doc.INFO, "doAcarsLoad(" + i_lat_min.toFixed(2) + ","
		+ i_lon_min.toFixed(2) + "," + i_lat_max.toFixed(2) + ","
		+ i_lon_max.toFixed(2) + ")");

	if (null == doc.cfg.selectedSensors || 0 == doc.cfg.selectedSensors.length)
	{
		doc.browserLogInt(doc.WARN, "No sensors selected!");
		doc.clearAllStations();
		doc.dom.byId('serverWaiting').style.visibility = 'hidden';
		showHideStandby(false);
		return;
	}

	if (null === doc.getAcarsIdx[deferred_xhr_object_idx])
	{
		doc.browserLogInt(doc.INFO, "\tfinished full load.");
		doc.dom.byId('serverWaiting').style.visibility = 'hidden';
		showHideStandby(false);
		return;
	}

	var color_ACAR = new doc.Color([111, 81, 193]);
	var color_FlightDataPoint = new doc.Color([255, 0, 0]);
	var ACAR_count = 0;
	var flightCount = 0;
	var foundFlights = 0;
	doc.loadStartTime = new Date();
	var arg0 =
	{
		m: "getACARS",
		clid: doc.clid,
		getAcarsIdx: doc.getAcarsIdx[deferred_xhr_object_idx],
		deferred_xhr_object_idx: deferred_xhr_object_idx,
		loadLatest: doc.cfg.loadLatest,
		loadStartEpochSecs: doc.cfg.loadStartEpochSecs,
		loadWindowHours: doc.cfg.loadWindowHours,
		lat_min: i_lat_min,
		lat_max: i_lat_max,
		lon_min: i_lon_min,
		lon_max: i_lon_max,
		curZoom: doc.map.getZoom(),
		altMinFilter: doc.cfg.altMinFilter,
		altMaxFilter: doc.cfg.altMaxFilter,
		stationsToDisplayPC: doc.cfg.stationsToDisplayPC,
		dsSelectAll: (doc.cfg.selectedDataSources.length == 11),
		selectedDataSources: doc.cfg.selectedDataSources,
		selectedSensors: doc.cfg.selectedSensors
	};

	doc.getAcarsIdx[deferred_xhr_object_idx] = doc.getAcarsIdx[deferred_xhr_object_idx] + 1;

	var url = window.location.href.split('?')[0] + "/MadisAircraft";
	browserLogInt(doc.DEBUG, url + ", loadACARS(" + deferred_xhr_object_idx
		+ "\n" + JSON.stringify(arg0, null, 2) + ")");
	var xhrArgs =
	{
		url: url,
		content: arg0,
		handleAs: "text",
		load: function (data)
		{
			doc.deferred_xhr_objects[deferred_xhr_object_idx] = null;
			browserLogInt(doc.INFO, "getACARS.load(" + arg0.getAcarsIdx + ")");
			let filesRemaining = onACARSLoad(data, arg0.deferred_xhr_object_idx, arg0.getAcarsIdx, i_lat_min, i_lon_min, i_lat_max, i_lon_max);
			browserLogInt(doc.INFO, "\t onACARSLoad() returns filesRemaining:" + filesRemaining);
			//if (0 === tailids.length)
			if (0 === filesRemaining)
			{
				doc.getAcarsIdx[deferred_xhr_object_idx] = null;
				browserLogInt(doc.INFO, "\tno more data to load.");
				doc.dom.byId('serverWaiting').style.visibility = 'hidden';
				showHideStandby(false);
			}
			else
			{
				if (null === filesRemaining)
				{
					if (arg0.getAcarsIdx < 6)
					{
						doc.getAcarsIdx[deferred_xhr_object_idx] = arg0.getAcarsIdx + 1;
						browserLogInt(doc.INFO, "previous load failed_0, loading next getAcarsIdx:" + doc.getAcarsIdx[deferred_xhr_object_idx]);
						doAcarsLoad(deferred_xhr_object_idx, i_lat_min, i_lon_min, i_lat_max, i_lon_max);
					}
				}
				else
				{
					// lets limit max hours that we can load 
					if (arg0.getAcarsIdx < 8)
					{
						doc.getAcarsIdx[deferred_xhr_object_idx] = arg0.getAcarsIdx + 1;
						browserLogInt(doc.INFO, "\tloading next getAcarsIdx:" + doc.getAcarsIdx[deferred_xhr_object_idx]);
						doAcarsLoad(deferred_xhr_object_idx, i_lat_min, i_lon_min, i_lat_max, i_lon_max);
					}
				}
			}
		},
		error: function (args)
		{
			if (args.dojoType != 'cancel')
			{
				browserLogInt(doc.INFO, "getACARS.error(" + arg0.getAcarsIdx + "):" + JSON.stringify(args));
			}
			/*
			doc.deferred_xhr_objects[deferred_xhr_object_idx] = null;
			doc.dom.byId('serverWaiting').style.visibility = 'hidden';
			showHideStandby(false);
			doc.getAcarsIdx = [null, null];
			*/

			if (arg0.getAcarsIdx < 3)
			{
				doc.getAcarsIdx[deferred_xhr_object_idx] = arg0.getAcarsIdx + 1;
				browserLogInt(doc.INFO, "previous load failed_1, loading next getAcarsIdx:" + doc.getAcarsIdx[deferred_xhr_object_idx]);
				doAcarsLoad(deferred_xhr_object_idx, i_lat_min, i_lon_min, i_lat_max, i_lon_max);
			}
			else
			{
				doc.deferred_xhr_objects[deferred_xhr_object_idx] = null;
				doc.dom.byId('serverWaiting').style.visibility = 'hidden';
				showHideStandby(false);
				doc.getAcarsIdx = [null, null];
			}
		}
	};
	doc.deferred_xhr_objects[deferred_xhr_object_idx] = doc.dojo
		.xhrPost(xhrArgs);

	/*
	// Un-comment to test server cache active
	setTimeout(() =>
	{
		doTestRepeatPost(arg0, url);
	}, 30);
	*/

	var enableLookAheadQueries = doc.appSettings.appsettings["client.enableLookAheadQueries"];
	browserLogInt(doc.INFO, 'enableLookAheadQueries:' + enableLookAheadQueries);
	if ("true" === enableLookAheadQueries)
	{
		doc.lookAheadQueriesFanOutCount = doc.appSettings.appsettings['client.lookAheadQueriesFanOutCount'];
		browserLogInt(doc.INFO, 'lookAheadQueriesFanOutCount:' + doc.lookAheadQueriesFanOutCount);
		doc.lookAheadIdxs[arg0.getAcarsIdx] = 0;
		doc.lookAheadIntervalIds[arg0.getAcarsIdx] = setInterval(function ()
		{
			doLookAheadPost(arg0, url);
		}, 100);
	}

	doc.dom.byId('serverWaiting').style.visibility = 'visible';
}

function doLookAheadPost(args, url)
{
	var doc = document;
	var arg_la = JSON.parse(JSON.stringify(args));
	arg_la['lookAhead'] = true;
	arg_la['lookAheadIdx'] = doc.lookAheadIdxs[args.getAcarsIdx];
	var xhrArgs_la =
	{
		url: url,
		content: arg_la,
		handleAs: "text",
		load: function (data)
		{
			browserLogInt(doc.INFO, "onLookAhead Load:" + data);
		},
		error: function (data)
		{
			browserLogInt(doc.INFO, "onLookAhead Error:" + data);
		}
	};

	browserLogInt(doc.INFO, "Sending look ahead post,args.getAcarsIdx:" + args.getAcarsIdx +
		",lookAheadIdx:" + doc.lookAheadIdxs[args.getAcarsIdx] + " ...");
	doc.dojo.xhrPost(xhrArgs_la);
	doc.lookAheadIdxs[args.getAcarsIdx] = doc.lookAheadIdxs[args.getAcarsIdx] + 1;
	if (++doc.lookAheadIdxs[args.getAcarsIdx] >= doc.lookAheadQueriesFanOutCount)
	{
		clearInterval(doc.lookAheadIntervalIds[args.getAcarsIdx]);
	}
}

function doTestRepeatPost(args, url)
{
	var doc = document;
	var arg0 = JSON.parse(JSON.stringify(args));
	var xhrArgs =
	{
		url: url,
		content: arg0,
		handleAs: "text",
		load: function (data)
		{
			browserLogInt(doc.INFO, "doTestRepeatPost Load:" + data);
		},
		error: function (data)
		{
			browserLogInt(doc.INFO, "doTestRepeatPost Error:" + data);
		}
	};
	browserLogInt(doc.INFO, "Sending test repeat post ...");
	doc.dojo.xhrPost(xhrArgs);
}

function onACARSLoad(result, deferred_xhr_object_idx, getAcarsIdx, i_lat_min, i_lon_min, i_lat_max, i_lon_max)
{
	var doc = document;

	doc.browserLogInt(doc.DEBUG, "onACARSLoad(" + getAcarsIdx + "),deferred_xhr_object_idx:" + deferred_xhr_object_idx);
	var startTime = new Date();

	var dr = null;

	try
	{
		dr = JSON.parse(result);
		// doc.browserLogInt(doc.DEBUG, "Acar data return:" + JSON.stringify(dr, null, 2));
		doc.browserLogInt(doc.DEBUG, "Acar data return, filesRemaining:" + dr.filesRemaining);
		doc.browserLogInt(doc.DEBUG, "ds_total_dp_counts:" + JSON.stringify(dr.ds_total_dp_counts));

		doc.totalAcars += dr.ds_total_dp_counts.Aircraft[0];
	}
	catch (err)
	{
		doc.getAcarsIdx[deferred_xhr_object_idx] = null;
		browserLogInt(doc.INFO, "\tdata return parse error, result:" + result + ",err:" + JSON.stringify(err));
		doc.dom.byId('serverWaiting').style.visibility = 'hidden';
		showHideStandby(false);
		return null;
	}

	let tailids = Object.keys(dr.acarsMap);
	// doc.browserLogInt(doc.DEBUG, "tailids:" + JSON.stringify(tailids, null, 2));
	browserLogInt(doc.INFO, "Fetched " + tailids.length + " tail ids in " + (new Date() - doc.loadStartTime) + " ms");

	convertToLegacyUnits(dr);

	browserLogInt(doc.INFO, "convertToLegacyUnits() in " + (new Date() - doc.loadStartTime) + " ms");

	if (0 === deferred_xhr_object_idx && 0 == getAcarsIdx)
	{
		browserLogInt(doc.INFO, "\tinitializing data structures ....");
		doc.tail_id_paths = {};
		doc.tail_id_datasources = {};
		doc.tail_id_datadescriptors = {};
		doc.tailIdCount = 0;
		doc.ACAR_count = 0;
		doc.acarsRendered = 0;
	}

	if (!doc.tail_id_paths)
	{
		browserLogInt(doc.INFO, "\tinitializing data structures 2....");
		doc.tail_id_paths = {};
		doc.tail_id_datasources = {};
		doc.tail_id_datadescriptors = {};
		doc.tailIdCount = 0;
		doc.ACAR_count = 0;
		doc.acarsRendered = 0;
	}

	var path = [];
	var clr_alt = new doc.Color([100, 100, 200]);

	doc.fpLinesMaxDist = dr.alm.pdMiles + 1;

	for (var i = 0; i < tailids.length; ++i)
	{
		var tail_id = tailids[i];
		var acars_in_tailid = dr.acarsMap[tail_id];

		if (acars_in_tailid.length > 0)
		{
			var first_acar = acars_in_tailid[0];
			if ((i % 1000) == 0)
			{
				// doc.browserLogInt(doc.INFO, "ACAR:" + i + "\n" + JSON.stringify(first_acar, null, 2));
			}

			if (!doc.tail_id_paths[tail_id])
			{
				doc.tail_id_paths[tail_id] = [];
			}

			for (var ai = 0; ai < acars_in_tailid.length; ai++)
			{
				var acar = acars_in_tailid[ai];
				acar["rendered"] = false;
				// path.push([acar.ids[0], acar.lat, acar.lon, acar.elev, acar.kvmap.dataSource, acar.kvmap.dataDescriptor, acar.kvmap.DD, acar.kvmap.FF]);
				doc.tail_id_paths[tail_id].push(acar);
				doc.ACAR_count++;
			}
			doc.tail_id_datasources[tail_id] = first_acar.kvmap.dataSource;
			doc.tail_id_datadescriptors[tail_id] = first_acar.kvmap.dataDescriptor;
			// doc.browserLogInt(doc.DEBUG, "tail_id:" + tail_id + ",ds:" + first_acar.kvmap.dataSource + ",dd:" + first_acar.kvmap.dataDescriptor);
			++doc.tailIdCount;
		}
	}

	var endTime = new Date();
	var timeDiff_ms = endTime - startTime;
	browserLogInt(doc.INFO, doc.tailIdCount + " TailIDs, " + doc.ACAR_count
		+ " ACARS parsed in " + timeDiff_ms + " ms" + ",filesRemaining:" + dr.filesRemaining);
	redrawAcars();

	if (0 === dr.filesRemaining)
	{
		redrawFpLines();
	}

	return dr.filesRemaining;
}

function convertToLegacyUnits(dr)
{
	var doc = document;

	let tailids = Object.keys(dr.acarsMap);

	for (var i = 0; i < tailids.length; ++i)
	{
		var tail_id = tailids[i];
		var acars_in_tailid = dr.acarsMap[tail_id];

		for (var ai = 0; ai < acars_in_tailid.length; ai++)
		{
			var acar = acars_in_tailid[ai];
			if (!acar.kvmap.nu)
			{
				acar.kvmap["nu"] = true;
				acar.kvmap.T = (acar.kvmap.T - 273.15);		// K -> C
				acar.elev = acar.elev * 3.2808;				// m -> ft
				acar.kvmap.elev = acar.kvmap.elev * 3.2808	// m -> ft
			}
		}
	}
}

function renderWebGL(tail_id_paths, fplines)
{
	var doc = document;
	browserLogInt(doc.INFO, "fplines:" + fplines);

	var data = [];
	doc.tailIdsRendered = doc.tail_id_paths.length;
	for (var tail_id in doc.tail_id_paths)
	{
		var path = doc.tail_id_paths[tail_id];
		var pathdata = [];
		for (var i = 0; i < path.length; i++)
		{
			var acar = path[i];
			var alt = acar[3] + 1000.0;
			var clr = doc.getAcarColor(acar);
			var clrNumber = parseInt(clr.toHex().substring(1), 16);
			// browserLogInt(doc.INFO, "clrNumber:" + clrNumber);
			pathdata[pathdata.length] = [acar, clrNumber, i];
		}
		data[data.length] = pathdata;
		doc.acarsRendered += pathdata.length;
	}

	var ms = MapRenderGL.renderAcars(doc.symbolSize / 2, data, fplines);
	browserLogInt(doc.INFO, "rendered " + MapRenderGL.getTotalPoints()
		+ " data points in " + ms + " milliseconds");
	/*
	 * for (var i = 0; i < data.length; i++) { var acar = path[i];
	 * browserLogInt(doc.INFO, "\t " + JSON.stringify(data[i])); }
	 */
}

function onWebGlClick(dot)
{
	var doc = document;
	doc.browserLogInt(doc.DEBUG, "onWebGlClick()");

	var acar = dot.extraData.raw;
	var pt = new doc.Point(acar[2], acar[1]);
	var sp = doc.map.toScreen(pt);

	doc.browserLogInt(doc.DEBUG, "User clicked on " + acar[0]);
	if (doc.issoundingtest)
	{
		doc
			.browserLogInt(
				doc.INFO,
				"issoundingtest is true, loading soundings, results will be logged to browser console ...");
		loadSoundingsForId(acar[0]);
	} else
	{
		doc.SoundingAcarId = acar[0];
		var arg0 =
		{
			m: "getSoundingsForId",
			limit: 64,
			acarid: doc.SoundingAcarId
		};
		var url = window.location.href.split('?')[0] + "/MadisAircraft";
		browserLogInt(doc.DEBUG, url + ",getSoundingsForId("
			+ JSON.stringify(arg0) + ")");
		var xhrArgs =
		{
			url: url,
			content: arg0,
			handleAs: "text",
			load: function (data)
			{
				onGetSoundingsForIdLoad(data);
			},
			error: function (args)
			{
				if (args.dojoType != 'cancel')
				{
					doc.browserLogInt(doc.ERROR,
						"getSoundingsForId load failed!");
				}
			}
		};
		doc.deferred_xhr_AcarForId = doc.dojo.xhrPost(xhrArgs);
		doc.dom.byId('serverWaiting').style.visibility = 'visible';
	}
}

function onWebGlHover(dot)
{
	var doc = document;
	doc.browserLogInt(doc.DEBUG, "onWebGlHover(), dot:" + JSON.stringify(dot.extraData.raw));

	if (doc.popupOpen)
	{
		return;
	}

	var acar = dot.extraData.raw;

	var pt = new doc.Point(acar.lon, acar.lat);
	var sp = doc.map.toScreen(pt);
	/*
	 * doc.mouseOverAcar = acar[0]; browserLogInt(doc.INFO, "onWebGlHover(" +
	 * dot.x + "," + dot.y + ")"); browserLogInt(doc.INFO, "onWebGlHover(" +
	 * JSON.stringify(dot.extraData) + ")"); popupAcarDetails(acar[0], sp.x,sp.y);
	 */

	if (null != doc.rbZoomStart)
	{
		return;
	}
	if (!acar)
	{
		return;
	}

	if (null != doc.deferred_xhr_AcarForId)
	{
		doc.deferred_xhr_AcarForId.cancel();
	}
	clearTimeout(doc.mouseOverTimer);
	doc.mouseOverType = "acar";
	doc.mouseOver_pageX = sp.x
	doc.mouseOver_pageY = sp.y;
	doc.mouseOverAcar = acar;
	doc.mouseOverTimer = setTimeout(mouseOverFunc, 500);
}

function resetRenderedFlag()
{
	var doc = document;

	for (var tail_id in doc.tail_id_paths)
	{
		var path = doc.tail_id_paths[tail_id];
		for (var i = 0; i < path.length; i++)
		{
			var acar = path[i];
			acar.rendered = false;
		}
	}

	var len = doc.stationsLayer.graphics.length;

	for (var i = 0; i < len; i++)
	{
		var gr = doc.stationsLayer.graphics[i];
		if (null != gr)
		{
			gr.hide();
		}
	}
}

function redrawAcars()
{
	var doc = document;

	browserLogInt(doc.INFO, "redrawAcars(), tail_id_paths:" + Object.keys(doc.tail_id_paths).length);

	// showHideStandby(true);
	// $("body").css("cursor", "progress");

	// doc.clearAllStations();
	var startTime = new Date();
	var clr_alt = new doc.Color([100, 100, 200]);
	var curZoom = doc.map.getZoom();
	var pdMiles = 400.0;
	var filterCount = getAltFilterCount();

	doc.tailIdsRendered = 0;
	doc.fewAcarsPerTailIdRendred = 0;
	doc.lowAltAcarsRendered = 0;
	doc.pdAcarsRendered = 0;

	var spA = new doc.ScreenPoint(100, 100);
	var spB = new doc.ScreenPoint(120, 120);
	var mpA = doc.map.toMap(spA);
	var mpB = doc.map.toMap(spB);
	doc.windBarbSz = Math.abs(mpA.getLongitude() - mpB.getLongitude());

	// if (curZoom > 10 || (filterCount > 0 && filterCount < 5000))
	// {
	// pdMiles = 0.0
	// } else
	// {
	// if (curZoom < 1)
	// {
	// pdMiles = 400.0
	// } else
	// {
	// pdMiles = 400.0 / curZoom;
	// if (filterCount > 0)
	// {
	// pdMiles = pdMiles * (filterCount / 60000.0);
	// }
	// }
	// }
	// doc.browserLogInt(doc.INFO, "curZoom:" + curZoom + ",filterCount:"
	// + filterCount + ",pdMiles:" + pdMiles.toFixed(1));

	doc.symbolSize = doc.acarSize * (doc.map.getZoom() / 5.0);
	if (doc.symbolSize < 5)
	{
		doc.symbolSize = 5;
	}
	if (doc.symbolSize > 20)
	{
		doc.symbolSize = 20;
	}
	browserLogInt(doc.INFO, "\tzoom:" + doc.map.getZoom() + ",ACAR size:" + doc.symbolSize);
	doc.defaultSymbol = new doc.SimpleMarkerSymbol(
		doc.SimpleMarkerSymbol.STYLE_CIRCLE, doc.symbolSize, null, null);

	doc.polylineSymbol_clr = doc.Color([59, 119, 189]);
	doc.polylineSymbol = new doc.SimpleLineSymbol(
		doc.SimpleLineSymbol.STYLE_SOLID, doc.polylineSymbol_clr, 2);
	doc.polylineSymbol_wb = new doc.SimpleLineSymbol(
		doc.SimpleLineSymbol.STYLE_SOLID, doc.polylineSymbol_clr, 1);
	doc.fpSelectedPolylineSymbol_clr = doc.Color([0, 94, 255]);
	doc.fpSelectedPolylineSymbol = new doc.SimpleLineSymbol(
		doc.SimpleLineSymbol.STYLE_SOLID, doc.fpSelectedPolylineSymbol_clr,
		6);
	if (doc.cfg.windBarbChecked)
	{
		doc.minSymbolSpacingPx = 40;
	} else
	{
		doc.minSymbolSpacingPx = 16;
	}

	doc.rendered = false;

	if (UseWebGL === true)
	{
		renderWebGL(doc.tail_id_paths, fplines);
	}

	for (var tail_id in doc.tail_id_paths)
	{
		// doc.createFlightPathSymbolSrv(tail_id, clr_alt);
		// ++doc.tailIdsRendered;

		if (false === UseWebGL)
		{
			if (isDataSourceSelected(doc.tail_id_datasources[tail_id]))
			{
				doc.createFlightPathSymbolSrv(tail_id, clr_alt, false);
				++doc.tailIdsRendered;
			}
			else
			{
				browserLogInt(doc.INFO, "Tail id ds not selected:" + doc.tail_id_datasources[tail_id]);
			}
		}
	}

	// paper.view.draw();
	var endTime = new Date();
	var timeDiff_ms = endTime - startTime;
	browserLogInt(doc.INFO, doc.acarsRendered + " ACARS rendered in "
		+ timeDiff_ms + " ms [tail_ids rendred:" + doc.tailIdsRendered
		+ ",fewAcarsPerTailIdRendred:" + doc.fewAcarsPerTailIdRendred
		+ ",lowAltAcarsRendered:" + doc.lowAltAcarsRendered
		+ ",pdAcarsRendered:" + doc.pdAcarsRendered + "]");
	var rc = doc.fewAcarsPerTailIdRendred + doc.lowAltAcarsRendered
		+ doc.pdAcarsRendered;
	doc.dom.byId('pcDisplayedValue').value = doc.acarsRendered + " / "
		+ doc.totalAcars + " ("
		+ ((doc.acarsRendered / doc.totalAcars) * 100).toFixed(1) + "%)";

	updateAirportsDisplay();
	updateRAOBsDisplay();
	updateVORsDisplay();
	// showHideStandby(false);
	// $("body").css("cursor", "default");
}

function redrawFpLines()
{
	var doc = document;

	doc.addFpLinesLayer();

	var fplines = false;
	browserLogInt(doc.INFO, "fpLines:" + doc.cfg.FpLines + ",autoFpLines:" + doc.cfg.autoFpLines
		+ ",fpAutoThreshold:" + doc.cfg.fpAutoThreshold + ",tailIdCount:" + doc.tailIdCount);
	if (true === doc.cfg.FpLines
		|| (true === doc.cfg.autoFpLines && (doc.tailIdCount < doc.cfg.fpAutoThreshold)))
	{
		fplines = true;
	}
	if (!fplines)
	{
		return;
	}

	showHideStandby(true);
	var startTime = new Date();

	for (var tail_id in doc.tail_id_paths)
	{
		if (false === UseWebGL)
		{
			if (isDataSourceSelected(doc.tail_id_datasources[tail_id]))
			{
				doc.renderFpLinesForTailId(tail_id);
			}
			else
			{
				browserLogInt(doc.INFO, "Tail id ds not selected:" + doc.tail_id_datasources[tail_id]);
			}
		}
	}
	var endTime = new Date();
	var timeDiff_ms = endTime - startTime;
	browserLogInt(doc.INFO, "fpLines rendered in " + timeDiff_ms + " ms");
	showHideStandby(false);
}

function isDataSourceSelected(ds)
{
	var doc = document;

	// doc.browserLogInt(doc.DEBUG, "isDataSourceSelected(" + ds + ")");

	if (doc.registry.byId("dsACARS").get("checked")
		&& (ds == doc.DataSourceType.ACAR.val)
		|| (ds == doc.DataSourceType.ACAR_MDCRS.val))
	{
		return true;
	}
	if (doc.registry.byId("dsMDCRS").get("checked")
		&& (ds == doc.DataSourceType.MDCRS.val)
		|| (ds == doc.DataSourceType.ACAR_MDCRS.val))
	{
		return true;
	}
	if (doc.registry.byId("dsAMDAR").get("checked")
		&& (ds == doc.DataSourceType.AMDAR.val))
	{
		return true;
	}
	if (doc.registry.byId("dsTAMDAR_rsch").get("checked")
		&& (ds == doc.DataSourceType.TAMDAR_rsch.val)
		|| (ds == doc.DataSourceType.TAM_Both.val))
	{
		return true;
	}
	if (doc.registry.byId("dsCanadian").get("checked")
		&& (ds == doc.DataSourceType.Canadian.val))
	{
		return true;
	}
	if (doc.registry.byId("dsE_AMDAR").get("checked")
		&& (ds == doc.DataSourceType.E_AMDAR.val))
	{
		return true;
	}
	if (doc.registry.byId("dsTAM_ops").get("checked")
		&& (ds == doc.DataSourceType.TAMDAR_OPS.val)
		|| (ds == doc.DataSourceType.TAM_Both.val))
	{
		return true;
	}
	if (doc.registry.byId("dsMMMX").get("checked")
		&& (ds == doc.DataSourceType.MMMX.val))
	{
		return true;
	}
	if (doc.registry.byId("dsMODES").get("checked")
		&& (ds == doc.DataSourceType.MODES.val))
	{
		return true;
	}
	if (doc.registry.byId("dsAFIR").get("checked")
		&& (ds == doc.DataSourceType.AFIR.val))
	{
		return true;
	}
	doc.browserLogInt(doc.DEBUG, "-------------- returns FALSE!");
	return false;
}

function popupAcarDetails(acar, ix, iy)
{
	var doc = document;

	doc.browserLogInt(doc.DEBUG, "popupAcarDetails(), ix:" + ix + ",iy:" + iy + "\nacar:" + JSON.stringify(acar));

	var path = doc.tail_id_paths[acar.stationid];

	doc.dijitPopup.close();
	doc.popupOpen = false;

	try
	{
		var content = '<table border="1" style="border-collapse: collapse; table-layout: fixed; height: auto; width: auto; font-size: 10pt; font-family: Arial,Helvetica,sans-serif; color: blue; font-weight: bold; background-color: #e6f0f7;">'
			+ '<colgroup><col></col><col></col></colgroup><tbody><tr><th title="Variable">Variable</th><th title="Value">Val</th></tr>';

		var keys = Object.keys(acar.kvmap);
		keys.sort();

		doc.browserLogInt(doc.DEBUG, "keys:" + JSON.stringify(keys));

		var kvmap_keys = ["stationid", "obstime", "lat", "lon", "elev", "T", "FF", "DD", "dataSource"];

		for (var i = 0; i < keys.length; i++)
		{
			var rv = getDisplayStringForObsValue(keys[i], acar.kvmap[keys[i]]);
			if (undefined != rv)
			{
				content += rv;
			}
		}

		// doc.browserLogInt(doc.INFO, JSON.stringify(acar));
		if (acar.kvmap.s === true)
		{
			doc.SoundingAcarId = acar;
			content += "<tr><td>skew-T plot</td><td><button id='btnSkewTPlot' type='button' class='toolBarBtn' onclick='onClickBtnSkewTPlot()'>Click Here!</button></td></tr>";
		}
		content += "<tr><td>Text flight data</td><td>[loading ...]</td></tr>";
		if (true === doc.cfg.computeGroundElev)
		{
			content += "<tr><td>Alt (Off-Ground, Std-Atmos conv.)</td><td>[GroundElev]</td></tr>";
		}
		content += '</tbody></table>';

		doc.toolTipDialogContent = content;
		doc.toolTipDialog.setContent(doc.toolTipDialogContent);
		// doc.toolTipDialog.setContent(content);
		doc.dijitPopup.open(
			{
				popup: doc.toolTipDialog,
				x: ix,
				y: iy,
				onClose: function ()
				{
					doc.popupOpen = false;
				}
			});
		doc.popupOpen = true;
		doc.dom.byId('serverWaiting').style.visibility = 'hidden';
		if (true === doc.cfg.computeGroundElev)
		{
			loadGroundElev(doc.mouseOverAcar);
		}
		loadFlightDataForId(doc.mouseOverAcar);

	} catch (err)
	{
		doc.browserLogInt(doc.ERROR, "Exception:" + err.message);
		doc.dom.byId('serverWaiting').style.visibility = 'hidden';
		// alert("ACAR detail not found, please try again after a <Refresh>");
		tempAlert("ACAR detail not found, please try again after a Refresh", 2000, doc.acarpx, doc.acarpy);
	}
}

function loadGroundElev(iacarid)
{
	var doc = document;

	var arg0 =
	{
		m: "computeGroundElev",
		tailid: iacarid.stationid,
		obstime: iacarid.obstime,
		lat: iacarid.lat,
		lon: iacarid.lon,
		elev: iacarid.elev,
		dl: iacarid.ids[2],
		isdebug: doc.isdebug
	};
	var url = window.location.href.split('?')[0] + "/MadisAircraft";
	browserLogInt(doc.DEBUG, url + ",computeGroundElev("
		+ JSON.stringify(arg0) + ")");
	var xhrArgs =
	{
		url: url,
		content: arg0,
		handleAs: "text",
		load: function (data)
		{
			onLoadGroundElev(data);
		},
		error: function (args)
		{
			if (args.dojoType != 'cancel')
			{
				doc.browserLogInt(doc.ERROR, "loadGroundElev load failed!");
			}
		}
	};
	doc.deferred_xhr_AcarForId = doc.dojo.xhrPost(xhrArgs);
}

function onLoadGroundElev(result)
{
	var doc = document;

	browserLogInt(doc.DEBUG, "onLoadGroundElev()\n" + result + "\n");
	// Alt (Off-Ground, Std-Atmos conv.)
	var toks = result.split(",");
	//doc.soundingDataContent = result;

	if (toks.length >= 4)
	{
		if (parseFloat(toks[3]) == 0)
		{
			var strcc = doc.toolTipDialogContent
				.replace("[GroundElev]", "N/A");
		}
		else
		{
			var strcc = doc.toolTipDialogContent
				.replace("[GroundElev]", toks[3]);
		}
		doc.toolTipDialog.setContent(strcc);
		doc.toolTipDialogContent = strcc;
	}
}

function loadFlightDataForId(iacarid)
{
	var doc = document;

	doc.AcarForIdLoadStartTime = new Date();
	var arg0 =
	{
		m: "getFlightDataForId",
		limit: 128,
		tailid: iacarid.stationid,
		obstime: iacarid.obstime,
		computeGroundElev: doc.cfg.computeGroundElev,
		dl: iacarid.ids[2],
		isdebug: doc.isdebug,
		format: "table"
	};
	var url = window.location.href.split('?')[0] + "/MadisAircraft";
	browserLogInt(doc.DEBUG, url + ",loadSoundingsForId("
		+ JSON.stringify(arg0) + ")");
	var xhrArgs =
	{
		url: url,
		content: arg0,
		handleAs: "text",
		load: function (data)
		{
			onFlightDataForIdLoad(data);
		},
		error: function (args)
		{
			if (args.dojoType != 'cancel')
			{
				doc.browserLogInt(doc.ERROR, "SoundingsForIdLoad load failed!");
			}
		}
	};
	doc.deferred_xhr_AcarForId = doc.dojo.xhrPost(xhrArgs);
}

function loadSoundingsForId(iacarid)
{
	var doc = document;

	doc.AcarForIdLoadStartTime = new Date();
	var arg0 =
	{
		m: "getSoundingsForId",
		limit: 64,
		tailid: iacarid.stationid,
		obstime: iacarid.obstime,
		computeGroundElev: doc.cfg.computeGroundElev,
		dl: iacarid.ids[2],
		isdebug: doc.isdebug,
		format: "table"
	};
	var url = window.location.href.split('?')[0] + "/MadisAircraft";
	browserLogInt(doc.DEBUG, url + ",loadSoundingsForId("
		+ JSON.stringify(arg0) + ")");
	var xhrArgs =
	{
		url: url,
		content: arg0,
		handleAs: "text",
		load: function (data)
		{
			onSoundingsForIdLoad(data);
		},
		error: function (args)
		{
			if (args.dojoType != 'cancel')
			{
				doc.browserLogInt(doc.ERROR, "SoundingsForIdLoad load failed!");
			}
		}
	};
	doc.deferred_xhr_AcarForId = doc.dojo.xhrPost(xhrArgs);
}

function onFlightDataForIdLoad(result)
{
	var doc = document;

	browserLogInt(doc.DEBUG, "onFlightDataForIdLoad()\n" + result + "\n");
	// browserLogInt(doc.DEBUG, "onSoundingsForIdLoad()\n");
	var lines = result.split("\n");
	doc.soundingDataContent = result;

	if (lines.length > 3)
	{
		var strcc = doc.toolTipDialogContent
			.replace(
				"[loading ...]",
				"<button id='btnSoundingData' type='button' class='toolBarBtn' onclick='onClickBtnSoundingData()'>Click Here!</button>");
		doc.toolTipDialog.setContent(strcc);
		doc.toolTipDialogContent = strcc;
	} else
	{
		var strcc = doc.toolTipDialogContent.replace("[loading ...]",
			"[Not available]");
		doc.toolTipDialog.setContent(strcc);
	}
}

function onClickBtnSoundingData()
{
	var doc = document;

	doc.dijitPopup.close(doc.soundingDataDialog);
	doc.soundingDataDialog.setContent(doc.soundingDataContent);

	if (true === doc.hideACARMouseOver)
	{
		doc.dijitPopup.open(
			{
				popup: doc.soundingDataDialog,
				x: 0,
				y: 0,
				onClose: function ()
				{
					doc.popupOpen = false;
				}
			});
	}
	else
	{
		doc.dijitPopup.open(
			{
				popup: doc.soundingDataDialog,
				x: doc.mouseOver_pageX,
				y: doc.mouseOver_pageY,
				onClose: function ()
				{
					doc.popupOpen = false;
				}
			});
	}
	doc.popupOpen = true;
}

function myIOcallback(data)
{
	var doc = document;

	doc.browserLogInt(doc.INFO, "myIOcallback:" + data);
}

function getDisplayStringForObsValue(obs, servervalStr)
{
	var doc = document;
	doc.browserLogInt(doc.INFO, "getDisplayStringForObsValue(" + obs + "," + servervalStr + ")");

	var val = servervalStr;
	var obsrv = undefined;
	switch (obs)
	{
		case 'tail_id':
		case 'stationid':
			obsrv = 'Tail ID';
			break;
		case 'lat':
			obsrv = 'Latitude';
			break;
		case 'lon':
			obsrv = 'Longitude';
			break;
		case 'obstime':
		case 'obs_time':
			var obs_time = new Date(parseInt(servervalStr) * 1000);
			var val = doc.datestamp.toISOString(obs_time,
				{
					zulu: true
				});
			val = val.substring(0, val.length - 4);
			obsrv = 'Time (UTC)';
			var datePart = val.split('T')[0];
			var timePart = val.split('T')[1];
			return '<tr><td>Date (UTC)</td><td>' + datePart
				+ '</td></tr><tr><td>Time (UTC)</td><td>' + timePart
				+ '</td></tr>';
			break;
		case 'alt':
		case 'elev':
			val = Number(servervalStr).toFixed(0) + ' ft';
			obsrv = 'Altitude';
			break;
		case 'alt_std':
			val = Number(servervalStr).toFixed(0) + ' ft';
			obsrv = 'Alt (Off-Ground, Std-Atmos conv.)';
			break;
		case 'temp':
		case 'T':
			val = (Number(servervalStr)).toFixed(2) + ' °C';
			obsrv = 'Temperature';
			break;
		case 'dp':
			val = (Number(servervalStr)).toFixed(2) + ' °C';
			obsrv = 'Dewpoint';
			break;
		case 'RHfromWVMR':
			val = (Number(servervalStr) / 100.0).toFixed(2) + ' %';
			obsrv = 'RHfromWVMR';
			break;
		case 'wd':
		case 'DD':
			val = (Number(servervalStr)).toFixed(2) + ' °';
			obsrv = 'Wind Direction';
			break;
		case 'ws':
		case 'FF':
			val = (Number(servervalStr)).toFixed(2) + ' knots';
			obsrv = 'Wind Speed';
			break;
		case 'va':
			val = (Number(servervalStr)).toFixed(2) + ' m-s^-2';
			obsrv = 'VertAccel';
			break;
		case 'vg':
			val = (Number(servervalStr)).toFixed(2) + ' m/s';
			obsrv = 'VertGust';
			break;
		case 'edr1':
			val = (Number(servervalStr) / 100.0).toFixed(2) + ' m ** 2/3 / sec';
			obsrv = 'medTurbulence';
			break;
		case 'edr2':
			val = (Number(servervalStr) / 100.0).toFixed(2) + ' m ** 2/3 / sec';
			obsrv = 'maxTurbulence';
			break;
		case 'orig_airport':
		case 'origAirport':
			obsrv = 'orig_airport';
			val = servervalStr;
			break;
		case 'destAirport':
		case 'dest_airport':
			obsrv = 'dest_airport';
			val = servervalStr;
			break;
		case 'stdPressure':
			val = Number(servervalStr).toFixed(0) + ' mb';
			obsrv = 'StdPressure';
			break;
		case 'dataSource':
			val = getdataSourceDesc(servervalStr);
			obsrv = 'dataSource';
			break;
		/*
		 * case 'tas': val = (Number(servervalStr) * 5.0).toFixed(2) + ' knots';
		 * obsrv = 'TrueAirSpeed'; break;
		 * 
		 */
		default:
			if (doc.isdebug)
			{
				obsrv = obs;
			}
			break;
	}
	if (undefined != obsrv)
	{
		return '<tr><td>' + obsrv + '</td><td>' + val + '</td></tr>';
	}
	return undefined;
}

function getdataSourceDesc(servervalStr)
{
	var rv = servervalStr;
	try
	{
		var ds = Number(servervalStr);
		switch (ds)
		{
			case 0:
				rv = "ACARS";
				break;
			case 1:
				rv = "MDCRS";
				break;
			case 2:
				rv = "ACARS/MDCRS";
				break;
			case 3:
				rv = "AMDAR";
				break;
			case 4:
				rv = "TAMDAR_rsch";
				break;
			case 5:
				rv = "Canadian";
				break;
			case 6:
				rv = "E-AMDAR";
				break;
			case 7:
				rv = "TAMDAR_ops";
				break;
			case 9:
				rv = "MMMX";
				break;
			case 12:
				rv = "MODES";
				break;
			case 13:
				rv = "AFIR";
				break;
		}
	} catch (err)
	{
		doc.browserLogInt(doc.ERROR, "Exception:" + err.message);
	}
	return rv;
}

function OnRefreshBtnClick(evt)
{
	var doc = document;
	doc.browserLogInt(doc.INFO, "OnRefreshBtnClick()");

	var urlvars = getUrlVars();
	doc.browserLogInt(doc.INFO, "URL Vars:" + JSON.stringify(urlvars));

	refreshDisplay();
}

function OnResetDisplayBtnClick()
{
	var doc = document;

	doc.browserLogInt(doc.DEBUG, "OnResetDisplayBtnClick()");

	var url = window.location.href.split('?')[0];
	window.location.replace(url);
	doc.browserLogInt(doc.DEBUG, "URL:" + url);
}

function OnDatasetsBtnClick(evt)
{
	var doc = document;

	if (true === doc.popupOpen)
	{
		if (true === doc.datasetsPaneVisible)
		{
			doc.dijitPopup.close();
			return;
		}
		doc.dijitPopup.close();
	}

	var bcr = doc.dojo.position('datasetsBtn', true);
	if (null == doc.datasetsPaneVisible || false == doc.datasetsPaneVisible)
	{
		doc.dijitPopup.open(
			{
				popup: doc.datasetsPane,
				x: bcr.x,
				y: bcr.y - 3,
				onClose: function ()
				{
					doc.popupOpen = false;
					doc.browserLogInt(doc.DEBUG, "Data Sets, onClose()");
					doc.datasetsPaneVisible = false;
				}
			});
		doc.popupOpen = true;
		doc.datasetsPaneVisible = true;
		DocToDataSetsDialog();
	} else
	{
		doc.dijitPopup.close(doc.datasetsPane);
		doc.datasetsPaneVisible = false;
		DataSetsDialogToDoc();
	}
}

function DocToDataSetsDialog()
{
	var doc = document;

	doc.registry.byId("dsACARS").set(
		"checked",
		doc.arrayUtils.indexOf(doc.cfg.selectedDataSources,
			doc.DataSourceType.ACAR.val) >= 0);
	doc.registry.byId("dsMDCRS").set(
		"checked",
		doc.arrayUtils.indexOf(doc.cfg.selectedDataSources,
			doc.DataSourceType.MDCRS.val) >= 0
		|| doc.arrayUtils.indexOf(doc.cfg.selectedDataSources,
			doc.DataSourceType.ACAR_MDCRS.val) >= 0);
	doc.registry.byId("dsAMDAR").set(
		"checked",
		doc.arrayUtils.indexOf(doc.cfg.selectedDataSources,
			doc.DataSourceType.AMDAR.val) >= 0);
	doc.registry.byId("dsMMMX").set(
		"checked",
		doc.arrayUtils.indexOf(doc.cfg.selectedDataSources,
			doc.DataSourceType.MMMX.val) >= 0);
	doc.registry.byId("dsMODES").set(
		"checked",
		doc.arrayUtils.indexOf(doc.cfg.selectedDataSources,
			doc.DataSourceType.MODES.val) >= 0);
	doc.registry.byId("dsAFIR").set(
		"checked",
		doc.arrayUtils.indexOf(doc.cfg.selectedDataSources,
			doc.DataSourceType.AFIR.val) >= 0);
        doc.registry.byId("dsTAMDAR_rsch").set(
		"checked",
		doc.arrayUtils.indexOf(doc.cfg.selectedDataSources,
			doc.DataSourceType.TAMDAR_rsch.val) >= 0
		|| doc.arrayUtils.indexOf(doc.cfg.selectedDataSources,
			doc.DataSourceType.TAM_Both.val) >= 0);
	doc.registry.byId("dsCanadian").set(
		"checked",
		doc.arrayUtils.indexOf(doc.cfg.selectedDataSources,
			doc.DataSourceType.Canadian.val) >= 0);
	doc.registry.byId("dsE_AMDAR").set(
		"checked",
		doc.arrayUtils.indexOf(doc.cfg.selectedDataSources,
			doc.DataSourceType.E_AMDAR.val) >= 0);
	doc.registry.byId("dsTAM_ops").set(
		"checked",
		doc.arrayUtils.indexOf(doc.cfg.selectedDataSources,
			doc.DataSourceType.TAMDAR_OPS.val) >= 0
		|| doc.arrayUtils.indexOf(doc.cfg.selectedDataSources,
			doc.DataSourceType.TAM_Both.val) >= 0);
}

function DataSetsDialogToDoc()
{
	var doc = document;

	doc.cfg.selectedDataSources = [];
	if (doc.registry.byId("dsACARS").get("checked"))
	{
		doc.cfg.selectedDataSources.push(doc.DataSourceType.ACAR.val);
		doc.cfg.selectedDataSources.push(doc.DataSourceType.ACAR_MDCRS.val);
	}
	if (doc.registry.byId("dsMDCRS").get("checked"))
	{
		doc.cfg.selectedDataSources.push(doc.DataSourceType.MDCRS.val);
		doc.cfg.selectedDataSources.push(doc.DataSourceType.ACAR_MDCRS.val);
	}
	if (doc.registry.byId("dsAMDAR").get("checked"))
	{
		doc.cfg.selectedDataSources.push(doc.DataSourceType.AMDAR.val);
	}
	if (doc.registry.byId("dsMMMX").get("checked"))
	{
		doc.cfg.selectedDataSources.push(doc.DataSourceType.MMMX.val);
	}
	if (doc.registry.byId("dsMODES").get("checked"))
	{
		doc.cfg.selectedDataSources.push(doc.DataSourceType.MODES.val);
	}
	if (doc.registry.byId("dsAFIR").get("checked"))
	{
		doc.cfg.selectedDataSources.push(doc.DataSourceType.AFIR.val);
	}
	if (doc.registry.byId("dsTAMDAR_rsch").get("checked"))
	{
		doc.cfg.selectedDataSources.push(doc.DataSourceType.TAMDAR_rsch.val);
		doc.cfg.selectedDataSources.push(doc.DataSourceType.TAM_Both.val);
	}
	if (doc.registry.byId("dsCanadian").get("checked"))
	{
		doc.cfg.selectedDataSources.push(doc.DataSourceType.Canadian.val);
	}
	if (doc.registry.byId("dsE_AMDAR").get("checked"))
	{
		doc.cfg.selectedDataSources.push(doc.DataSourceType.E_AMDAR.val);
	}
	if (doc.registry.byId("dsTAM_ops").get("checked"))
	{
		doc.cfg.selectedDataSources.push(doc.DataSourceType.TAMDAR_OPS.val);
		doc.cfg.selectedDataSources.push(doc.DataSourceType.TAM_Both.val);
	}
}

function OnDataLoadDialogEvent(evt)
{
	var doc = document;

	doc.browserLogInt(doc.DEBUG, "OnDataLoadDialogEvent(" + evt.target.id + ")");

	if (true === doc.popupOpen)
	{
		if (true === doc.dataLoadPaneVisible)
		{
			doc.dijitPopup.close();
			if (evt.target.id === "dataLoadReloadBtn")
			{
				DataLoadDialogToDoc();
				refreshDisplay();
			}
			return;
		}
		doc.dijitPopup.close();
	}

	switch (evt.target.id)
	{
		case 'dataLoadCloseBtn':
		case 'dataLoadBtn':
			if (null == doc.dataLoadPaneVisible || false == doc.dataLoadPaneVisible)
			{
				doc.browserLogInt(doc.DEBUG, "Opening Data load dialog ...");
				var bcr = doc.dojo.position('dataLoadBtn', true);
				doc.dijitPopup.open(
					{
						popup: doc.dataLoadPane,
						x: bcr.x,
						y: bcr.y - 3,
						onClose: function ()
						{
							doc.browserLogInt(doc.DEBUG, "Data Load, onClose()");
							doc.popupOpen = false;
							doc.dataLoadPaneVisible = false;
						}
					});
				doc.popupOpen = true;
				doc.dataLoadPaneVisible = true;
				DocToDataLoadDialog();
				if (doc.isIE || doc.isSafari)
				{
				    console.log("On doc.isIE");
					try
					{
						doc.query(".orLatest").on('click', OnDataLoadDialogEvent);
					} catch (err)
					{
						console.log("Exception:" + err.message);
					}
				} else
				{
				    console.log("On doc.isIE other");
					doc.dojoOn(doc.dom.byId("orLatest"), "click",
						OnDataLoadDialogEvent);
				}
/**
 *				doc.registry.byId('startDate').set("disabled", doc.cfg.loadLatest);
 *				doc.registry.byId('startTime').set("disabled", doc.cfg.loadLatest);
 * 
 */
			} else
			{
				doc.browserLogInt(doc.DEBUG, "Closing Data load dialog ...");
				doc.dijitPopup.close(doc.dataLoadPane);
				doc.dataLoadPaneVisible = false;
				DataLoadDialogToDoc();
			}
			break;
		case "dataLoadReloadBtn":
			DataLoadDialogToDoc();
			refreshDisplay();
			break;
		case 'startTime':
			break;
		case 'orLatest':
	                console.log("case orLatest");
			doc.cfg.loadLatest = doc.registry.byId("orLatest").get("checked");
			doc.browserLogInt(doc.DEBUG, "loadLatest = " + doc.cfg.loadLatest);
			DocToDataLoadDialog();
			break;
		default:
			break;
	}
}

function DocToDataLoadDialog()
{
	var doc = document;

/**
 *                               doc.registry.byId('startDate').set("disabled", doc.cfg.loadLatest);
 *	                        doc.registry.byId('startTime').set("disabled", doc.cfg.loadLatest);
 * 
 */

/**
 *	doc.registry.byId("orLatest").set("checked", doc.cfg.loadLatest);
 *	doc.registry.byId('hoursToLoad').set('value', doc.cfg.loadWindowHours);
 * 
 */

	// doc.registry.byId("sensorAll").set(
	// "checked",
	// (doc.arrayUtils.indexOf(doc.cfg.selectedSensors, 'All') >= 0)
	// || doc.cfg.selectedSensors == 'All');
	doc.registry.byId("sensorTurbulence")
		.set(
			"checked",
			(doc.arrayUtils.indexOf(doc.cfg.selectedSensors,
				'Turbulence') >= 0)
			|| doc.cfg.selectedSensors == 'Turbulence');
	doc.registry.byId("sensorVapor").set(
		"checked",
		(doc.arrayUtils.indexOf(doc.cfg.selectedSensors, 'Vapor') >= 0)
		|| doc.cfg.selectedSensors == 'Vapor');
	doc.registry.byId("sensorIcing").set(
		"checked",
		(doc.arrayUtils.indexOf(doc.cfg.selectedSensors, 'Icing') >= 0)
		|| doc.cfg.selectedSensors == 'Icing');

	if (doc.cfg.loadLatest)
	{
		var dateNow = new Date();
		var dateNowISOStr = doc.datestamp.toISOString(dateNow,
			{
				zulu: true
			});
		var load_start_epoch_ms = dateNow.getTime()
			- (doc.cfg.loadWindowHours * 60 * 60 * 1000);
		doc.cfg.loadStartEpochSecs = Math.round(load_start_epoch_ms / 1000);
		var startDate = new Date(load_start_epoch_ms);
		var startDateISOStr = doc.datestamp.toISOString(startDate,
			{
				zulu: true
			});

		doc.registry.byId('startDate').set('value', startDate);
		var timestr = startDateISOStr.substring(startDateISOStr.indexOf('T'),
			startDateISOStr.indexOf('T') + 9);
		doc.registry.byId('startTime').set('value', timestr);
		doc
			.browserLogInt(doc.DEBUG, "dateNowISOStr:" + dateNowISOStr
				+ ",dateNow.getTime():" + dateNow.getTime()
				+ ",load_start_epoch_ms:" + load_start_epoch_ms
				+ ",startDateISOStr:" + startDateISOStr + ",timestr:"
				+ timestr);
	} else
	{
		var startDateUTC = new Date(doc.cfg.loadStartEpochSecs * 1000);
		var dateStr = doc.datestamp.toISOString(startDateUTC,
			{
				zulu: true
			});
		var startDateFull = new Date(dateStr);
		doc.registry.byId('startDate').set(
			'value',
			new Date(doc.cfg.loadStartEpochSecs * 1000
				+ startDateFull.getTimezoneOffset() * 60 * 1000));
		var timestr = dateStr.substring(dateStr.indexOf('T'), dateStr
			.indexOf('T') + 9);
		doc.browserLogInt(doc.DEBUG, "Start time:" + startDateFull
			+ ",dateStr:" + dateStr + ",timeStr:" + timestr);
		doc.registry.byId('startTime').set('value', timestr);
	}
}

function toUTCDate(value)
{
	return new Date(Date.UTC(value.getFullYear(), value.getMonth(), value
		.getDate()));
}

function DataLoadDialogToDoc()
{
	var doc = document;

	doc.cfg.loadWindowHours = doc.registry.byId('hoursToLoad').get('value');
	doc.cfg.loadLatest = doc.registry.byId("orLatest").get("checked");
	console.log("DataLoadDialogToDoc orLatest");

	doc.cfg.selectedSensors = [];
	// if (doc.registry.byId("sensorAll").get("checked"))
	// {
	// doc.cfg.selectedSensors.push('All');
	// }
	if (doc.registry.byId("sensorTurbulence").get("checked") && doc.registry.byId("sensorVapor").get("checked") && doc.registry.byId("sensorIcing").get("checked"))
	{
		doc.cfg.selectedSensors.push('All');
	}
	if (doc.registry.byId("sensorTurbulence").get("checked"))
	{
		doc.cfg.selectedSensors.push('Turbulence');
	}
	if (doc.registry.byId("sensorVapor").get("checked"))
	{
		doc.cfg.selectedSensors.push('Vapor');
	}
	if (doc.registry.byId("sensorIcing").get("checked"))
	{
		doc.cfg.selectedSensors.push('Icing');
	}

	if (doc.cfg.loadLatest)
	{
		var epochNow = Math.round((new Date()).getTime() / 1000);
		doc.cfg.loadStartEpochSecs = (epochNow - (doc.cfg.loadWindowHours * 3600));
	} else
	{
		var dateVal = doc.registry.byId('startDate').get('value');
		var utcDate = toUTCDate(dateVal);
		var timeVal = doc.registry.byId('startTime').get('value');
		var dateEpoch = utcDate.getTime();
		var timeEpoch = (timeVal.getHours() * 3600 + timeVal.getMinutes() * 60) * 1000;
		doc.cfg.loadStartEpochSecs = Math.round((dateEpoch + timeEpoch) / 1000);
		doc.browserLogInt(doc.DEBUG, "loadStartEpochSecs:"
			+ doc.cfg.loadStartEpochSecs + ",dateEpoch:" + dateEpoch
			+ ",timeEpoch:" + timeEpoch + ",timeVal:" + timeVal);
	}
	doc.browserLogInt(doc.INFO, "loadWindowHours:" + doc.cfg.loadWindowHours
		+ ",loadLatest:" + doc.cfg.loadLatest);
	updateDataRangeLabel();
}

function updateDataRangeLabel()
{
	var doc = document;

	var startDate = new Date(doc.cfg.loadStartEpochSecs * 1000);

	doc.browserLogInt(doc.DEBUG, "updateDataRangeLabel(), start:" + startDate);

	var loadEndEpochSecs = doc.cfg.loadStartEpochSecs
		+ (doc.cfg.loadWindowHours * 3600);
	var endDate = new Date(loadEndEpochSecs * 1000);
	var startStr = doc.datestamp.toISOString(startDate,
		{
			zulu: true
		});
	var endStr = doc.datestamp.toISOString(endDate,
		{
			zulu: true
		});
	doc.dom.byId('dataRange').value = startStr
		.substring(0, startStr.length - 4)
		+ " -> " + endStr.substring(0, endStr.length - 4);
}

function OnSettingsBtnBtnClick(evt)
{
	var doc = document;

	doc.browserLogInt(doc.DEBUG, "OnSettingsBtnBtnClick()");

	if (true === doc.popupOpen)
	{
		if (true === doc.settingsPaneVisible)
		{
			doc.dijitPopup.close();
			return;
		}
		doc.dijitPopup.close();
	}

	var settingsPane_TabContainer = doc.registry.byId("settingsPane_TabContainer");
	var settingsPane_General_Pane = doc.registry.byId("settingsPane_General_Pane");
	var settingsPane_General_OverlaysDiv = doc.registry.byId("OverlaysDiv");
	settingsPane_TabContainer.selectChild(settingsPane_General_OverlaysDiv);
	settingsPane_TabContainer.selectChild(settingsPane_General_Pane);

	var bcr = doc.dojo.position('settingsBtn', true);
	if (null == doc.settingsPaneVisible || false == doc.settingsPaneVisible)
	{
		doc.dijitPopup.open(
			{
				popup: doc.settingsPane,
				x: bcr.x,
				y: bcr.y - 3,
				onClose: function ()
				{
					doc.popupOpen = false;
					doc.settingsPaneVisible = false;
					doc.browserLogInt(doc.DEBUG, "Settings, onClose()");
				}
			});
		doc.popupOpen = true;
		doc.settingsPaneVisible = true;
		var someNode = doc.dojoQuery("#settingsPane_General_Form");
		doc.domClass.add(someNode, 'newDivStyle');
		try
		{
			doc.registry.byId("overlayAirportsChkBox").set("value",
				doc.cfg.overlayAirports);
			doc.registry.byId("overlayRAOBsChkBox").set("value",
				doc.cfg.overlayRAOBs);
			doc.registry.byId("overlayUSVORsChkBox").set("value",
				doc.cfg.overlayUSVORs);
			doc.registry.byId("overlayARTCCboundariesChkBox").set("value",
				doc.cfg.overlayARTCCboundaries);
			doc.registry.byId("computeGroundElev").set("value",
				doc.cfg.computeGroundElev);
		} catch (err)
		{
			doc.browserLogInt(doc.ERROR, "Exception:" + err.message);
		}

	} else
	{
		doc.dijitPopup.close(doc.settingsPane);
		doc.settingsPaneVisible = false;
		doc.cfg.computeGroundElev = doc.registry.byId("computeGroundElev").get(
			"checked");
	}
}

function OnLogBtnBtnClick(evt)
{
	var doc = document;

	doc.browserLogInt(doc.DEBUG, "OnLogBtnBtnClick()");

	if (true === doc.popupOpen)
	{
		if (true === doc.logPaneVisible)
		{
			doc.dijitPopup.close();
			return;
		}
		doc.dijitPopup.close();
	}

	var bcr = doc.dojo.position('settingsBtn', true);
	if (null == doc.logPaneVisible || false == doc.logPaneVisible)
	{
		doc.dijitPopup.open(
			{
				popup: doc.logPane,
				x: bcr.x,
				y: bcr.y - 3,
				onClose: function ()
				{
					doc.popupOpen = false;
					doc.logPaneVisible = false;
				}
			});
		doc.popupOpen = true;
		doc.logPaneVisible = true;
	} else
	{
		doc.dijitPopup.close(doc.logPane);
		doc.logPaneVisible = false;
	}
}

function OnSaveDisplayBtnClick(evt)
{
	var doc = document;

	doc.browserLogInt(doc.DEBUG, "OnSaveDisplayBtnClick()");

	var geographicExtent = doc.map.geographicExtent;
	// var zoom = doc.map.getZoom();
	// var url = window.location.href.split('?')[0];
	// url += "?CenterLAT=" + Number(geographicExtent.getCenter().y).toFixed(2)
	// + "&CenterLON=" + Number(geographicExtent.getCenter().x).toFixed(2)
	// + "&Zoom=" + Number(zoom).toFixed(2);
	// window.location.replace(url);
	// doc.browserLogInt(doc.DEBUG, "URL:" + url);

	doc.cfg.CenterLAT = geographicExtent.getCenter().y;
	doc.cfg.CenterLON = geographicExtent.getCenter().x;
	doc.cfg.Zoom = doc.map.getZoom();
	doc.cfg.computeGroundElev = doc.registry.byId("computeGroundElev").get("checked");

	var queryStr = doc.ioQuery.objectToQuery(doc.cfg);
	var url = window.location.href.split('?')[0];
	url += "?" + queryStr;
	window.location.replace(url);
	doc.browserLogInt(doc.DEBUG, "URL:" + url);
}

function OnDocBtnClick(evt)
{
	var doc = document;

	// var doclink = window.location + "/MadisAircraftDoc.html";
	var url = window.location.href.split('?')[0];
	var doclink = url + "/MadisAircraftDoc.html";
	doc.browserLogInt(doc.DEBUG, "Opening doc at:" + doclink)
	window.open(doclink);
}

function OnChangeWindSpeedChkBox(val)
{
	var doc = document;
	doc.browserLogInt(doc.INFO, "OnChangeWindSpeedChkBox(" + val + ")");

	doc.cfg.windSpeedChecked = doc.registry.byId("windSpeedChkBox").get(
		"checked");

	refreshDisplay();
}

function OnChangeWindBarbChkBox(val)
{
	var doc = document;

	doc.browserLogInt(doc.INFO, "OnChangeWindBarbChkBox(" + val + ")");

	doc.cfg.windBarbChecked = doc.registry.byId("windBarbChkBox")
		.get("checked");

	refreshDisplay();
}


function OnChangeFpLinesChkBox(val)
{
	var doc = document;

	doc.cfg.FpLines = doc.registry.byId("fpLinesChkBox").get("checked");

	doc.browserLogInt(doc.INFO, "OnChangeFpLinesChkBox(" + val + "), doc.cfg.FpLines:" + doc.cfg.FpLines + ",doc.setFromCfg:" + doc.setFromCfg);
	// browserLogInt(doc.INFO, "stackTrace:" + stackTrace());

	if (doc.cfg.FpLines)
	{
		if (null == doc.fpLinesLayer)
		{
			doc.fpLinesLayer = new doc.GraphicsLayer(
				{
					opacity: 0.95
				});
			doc.map.addLayer(doc.fpLinesLayer);
			doc.fpLinesLayer.show();
			doc.fpLinesLayer.on("mouse-over", OnMapFpLinesLayerMouseOver);
			doc.fpLinesLayer.on("mouse-out", OnMapFpLinesLayerMouseOut);
			doc.fpLinesLayer.on("click", OnMapFpLinesLayerClick);
		}
	}
	var epochNow = Math.round((new Date()).getTime() / 1000);
	doc.browserLogInt(doc.INFO, "epochAStStart:" + doc.epochAtStart + ",epochNow:" + epochNow);
	if (!doc.setFromCfg || ((epochNow - doc.epochAtStart) > 3))
	{
		refreshDisplay();
	}
	doc.setFromCfg = false;
}

function OnChangeAutoFpLinesChkBox(val)
{
	var doc = document;

	doc.browserLogInt(doc.INFO, "OnChangeAutoFpLinesChkBox(" + val + ")");

	doc.cfg.autoFpLines = val;

	if (doc.tail_id_paths && Object.keys(doc.tail_id_paths).length > 0)
	{
		redrawAcars();
	}
}

function OnChangeDatasetsCheckboxes()
{
	var doc = document;

	doc.browserLogInt(doc.INFO, "OnChangeDatasetsCheckboxes()");

	if (doc.registry.byId("dsACARS").get("value")
		&& doc.registry.byId("dsMDCRS").get("value")
		&& doc.registry.byId("dsAMDAR").get("value")
		&& doc.registry.byId("dsMMMX").get("value")
		&& doc.registry.byId("dsMODES").get("value")
		&& doc.registry.byId("dsAFIR").get("value")
		&& doc.registry.byId("dsTAMDAR_rsch").get("value")
		&& doc.registry.byId("dsCanadian").get("value")
		&& doc.registry.byId("dsE_AMDAR").get("value")
		&& doc.registry.byId("dsTAM_ops").get("value"))
	{
		doc.dsSelectAll = true;
		doc.dom.byId("dsSelectAllBtn").innerHTML = "Deselect All";
	} else
	{
		doc.dsSelectAll = false;
	}
	if (!doc.suppressRefresh)
	{
		doc.browserLogInt(doc.DEBUG, "OnChangedatasetsCheckboxes()");
		DataSetsDialogToDoc();
		refreshDisplay();
	}
}

function OnDatasetsSelectAllBtnClick()
{
	var doc = document;

	doc.browserLogInt(doc.DEBUG, "OnDatasetsSelectAllBtnClick()");

	// doc.OnChangeDatasetsCheckboxes_Handle.remove();
	if (doc.dsSelectAll)
	{
		doc.registry.byId("dsACARS").set("value", false);
		doc.registry.byId("dsMDCRS").set("value", false);
		doc.registry.byId("dsAMDAR").set("value", false);
		doc.registry.byId("dsMMMX").set("value", false);
		doc.registry.byId("dsMODES").set("value", false);
		doc.registry.byId("dsAFIR").set("value", false);
		doc.registry.byId("dsTAMDAR_rsch").set("value", false);
		doc.registry.byId("dsCanadian").set("value", false);
		doc.registry.byId("dsE_AMDAR").set("value", false);
		doc.registry.byId("dsTAM_ops").set("value", false);

		doc.dsSelectAll = false;
		doc.dom.byId("dsSelectAllBtn").innerHTML = "Select All";
	} else
	{
		doc.registry.byId("dsACARS").set("value", true);
		doc.registry.byId("dsMDCRS").set("value", true);
		doc.registry.byId("dsAMDAR").set("value", true);
		doc.registry.byId("dsMMMX").set("value", true);
		doc.registry.byId("dsMODES").set("value", true);
		doc.registry.byId("dsAFIR").set("value", true);
		doc.registry.byId("dsTAMDAR_rsch").set("value", true);
		doc.registry.byId("dsCanadian").set("value", true);
		doc.registry.byId("dsE_AMDAR").set("value", true);
		doc.registry.byId("dsTAM_ops").set("value", true);

		doc.dsSelectAll = true;
		doc.dom.byId("dsSelectAllBtn").innerHTML = "Deselect All";
	}
	DataSetsDialogToDoc();
	refreshDisplay();
}

function setupEventHandlers()
{
	var doc = document;

	doc.browserLogInt(doc.DEBUG, "setupEventHandlers()");

	doc.map.on("key-down", onMapKeyDown);
	doc.map.on("key-up", onMapKeyUp);

	doc.map.on("mouse-move", onMapMouseMove);
	doc.map.on("zoom-end", function (on)
	{
		refreshDisplay();
	});
	doc.map.on("pan-start", function (on)
	{
	});
	doc.map.on("pan-end", function (on)
	{
		setTimeout(() => 
		{
			refreshDisplay();
		}, 100);
	});
	doc.map.on("click", OnMapClick);

	/*
	doc.map.graphics.on("click", OnMapGraphicsClick);
	doc.map.graphics.on("mouse-over", OnMapGraphicsMouseOver);
	doc.map.graphics.on("mouse-out", OnMapGraphicsMouseOut);
	*/

	doc.keyIsDown = false;
	// doc.rightMouseButton = false;
	doc.dojoOn(doc, "keydown", function (on)
	{
		doc.keyIsDown = true;
	});
	doc.dojoOn(doc, "keyup", function (on)
	{
		doc.keyIsDown = false;
	});
	// doc.dojoOn(doc, "click", function(evt)
	// {
	// if (doc.dojoMouse.isLeft(evt))
	// {
	// browserLogInt(doc.DEBUG, "Left mouse button!");
	// doc.rightMouseButton = false;
	// } else
	// if (doc.dojoMouse.isRight(evt))
	// {
	// browserLogInt(doc.DEBUG, "Right mouse button!");
	// doc.rightMouseButton = true;
	// }
	// });
	doc.dojoOn(doc.dom.byId("datasetsBtn"), "click", OnDatasetsBtnClick);
	// doc.dojoOn(doc.dom.byId("dsCloseBtn"), "click", OnDatasetsBtnClick);
	doc.dojoOn(doc.dom.byId("dsCloseBtn"), "click", function ()
	{
		if (true === doc.popupOpen)
		{
			doc.dijitPopup.close();
		}
	});
	doc.dojoOn(doc.dom.byId("dataLoadBtn"), "click", OnDataLoadDialogEvent);
	// doc.dojoOn(doc.dom.byId("dataLoadCloseBtn"), "click", OnDataLoadDialogEvent);
	doc.dojoOn(doc.dom.byId("dataLoadCloseBtn"), "click", function ()
	{
		if (true === doc.popupOpen)
		{
			doc.dijitPopup.close();
		}
	});
	doc.dojoOn(doc.dom.byId("settingsBtn"), "click", OnSettingsBtnBtnClick);
	// doc.dojoOn(doc.dom.byId("settingsCloseBtn"), "click", OnSettingsBtnBtnClick);
	doc.dojoOn(doc.dom.byId("settingsCloseBtn"), "click", function ()
	{
		if (true === doc.popupOpen)
		{
			doc.dijitPopup.close();
		}
	});
	doc.dojoOn(doc.dom.byId("logBtn"), "click", OnLogBtnBtnClick);
	// doc.dojoOn(doc.dom.byId("logCloseBtn"), "click", OnLogBtnBtnClick);
	doc.dojoOn(doc.dom.byId("logCloseBtn"), "click", function ()
	{
		if (true === doc.popupOpen)
		{
			doc.dijitPopup.close();
		}
	});
	doc.dojoOn(doc.dom.byId("refreshBtn"), "click", OnRefreshBtnClick);
	doc
		.dojoOn(doc.dom.byId("resetDisplayBtn"), "click",
			OnResetDisplayBtnClick);
	doc.dojoOn(doc.dom.byId("saveDisplayBtn"), "click", OnSaveDisplayBtnClick);
	doc.dojoOn(doc.dom.byId("docBtn"), "click", OnDocBtnClick);
	doc.dojoOn(doc.dom.byId("dsSelectAllBtn"), "click",
		OnDatasetsSelectAllBtnClick);

	// ============================ Data Load Dialog =========================
	doc.dojoOn(doc.dom.byId("dataLoadReloadBtn"), "click",
		OnDataLoadDialogEvent);
	// ============================ Settings ==================================
	doc.dojoOn(doc.dom.byId("advDataCacheClearBtn"), "click",
		OnClick_AdvDataCacheClearBtn);
	doc.dojoOn(doc.dom.byId("advRunServerTestsBtn"), "click",
		OnClick_AdvRunServerTests);
	doc.dojoOn(doc.dom.byId("tailIdLocateBtn"), "click",
		OnClick_TailIdLocateBtn);
	doc.dojoOn(doc.dom.byId("tailIdClearBtn"), "click", OnClick_TailIdClearBtn);

	doc.dojoOn(doc.dom.byId("acarSizeApply"), "click", function ()
	{
		resetRenderedFlag();
		redrawAcars();
	});

	// IE - pain starts here!
	if (doc.isIE || doc.isSafari)
	{
		try
		{
			doc.query(".overlayCheckBox").on(
				'click',
				function (evt)
				{
					browserLogInt(doc.DEBUG, "Clicked on:" + JSON.stringify(evt.target.id));
					switch (evt.target.id)
					{
						case 'overlayAirportsChkBox':
							OnChange_overlayAirportsChkBox();
							break;
						case 'overlayRAOBsChkBox':
							OnChange_overlayRAOBsChkBox();
							break;
						case 'overlayUSVORsChkBox':
							OnChange_overlayUSVORsChkBox();
							break;
						case 'overlayARTCCboundariesChkBox':
							OnChange_overlayARTCCboundariesChkBox();
							break;
						case 'overlayWorldFIRboundariesChkBox':
							OnChange_overlayWorldFIRboundariesChkBox();
							break;
						case 'overlayFIRboundariesChkBox':
							OnChange_overlayFIRboundariesChkBox();
							break;
						case 'overlayFIRHighChkBox':
							OnChange_overlayFIRboundariesChkBox();
							break;
						case 'overlayFIRLowChkBox':
							OnChange_overlayFIRLowChkBox();
							break;
						default:
							break;
					}
				});
			doc.query(".dsCheckBox").on(
				'click',
				function (evt)
				{
					console.log(doc.DEBUG, "Clicked on:"
						+ JSON.stringify(evt.target.id));
					OnChangeDatasetsCheckboxes();
				});
			doc.query("#fpLinesChkBox").on(
				'click',
				function (evt)
				{
					console.log(doc.DEBUG, "Clicked on:"
						+ JSON.stringify(evt.target.id));
					OnChangeFpLinesChkBox();
				});
			doc.query("#windSpeedChkBox").on(
				'click',
				function (evt)
				{
					console.log(doc.DEBUG, "Clicked on:"
						+ JSON.stringify(evt.target.id));
					OnChangeWindSpeedChkBox();
				});
			doc.query("#windBarbChkBox").on(
				'click',
				function (evt)
				{
					console.log(doc.DEBUG, "Clicked on:"
						+ JSON.stringify(evt.target.id));
					OnChangeWindBarbChkBox();
				});
			doc.query("#autoFpLines").on('click', function (evt)
			{
				OnChangeAutoFpLinesChkBox();
			});
			doc.query("#onlyCARSWithSounding").on('click', function (evt)
			{
				OnChangeOnlyCARSWithSounding();
			});
			doc.query("#hideACARMouseOver").on('click', function (evt)
			{
				OnChangeHideACARMouseOver();
			});
			doc.query("#computeGroundElev").on('click', function (evt)
			{
				OnChangeComputeGroundElev();
			});
			doc.query("#sensorTurbulence").on('click', function (evt)
			{
				OnChangeSensor();
			});
			doc.query("#sensorVapor").on('click', function (evt)
			{
				OnChangeSensor();
			});
			doc.query("#sensorIcing").on('click', function (evt)
			{
				OnChangeSensor();
			});
			doc.query("#acarSize").on('click', function (evt)
			{
				OnChangeAcarSize();
			});
		} catch (err)
		{
			console.log("Exception:" + err.message);
		}
	} else
	{
		doc.registry.byId("overlayAirportsChkBox").on("change",
			OnChange_overlayAirportsChkBox);
		doc.registry.byId("overlayRAOBsChkBox").on("change",
			OnChange_overlayRAOBsChkBox);
		doc.registry.byId("overlayUSVORsChkBox").on("change",
			OnChange_overlayUSVORsChkBox);
		doc.registry.byId("overlayARTCCboundariesChkBox").on("change",
			OnChange_overlayARTCCboundariesChkBox);
		doc.registry.byId("overlayWorldFIRboundariesChkBox").on("change",
			OnChange_overlayWorldFIRboundariesChkBox);
		doc.registry.byId("overlayFIRboundariesChkBox").on("change",
			OnChange_overlayFIRboundariesChkBox);
		doc.registry.byId("overlayFIRHighChkBox").on("change",
			OnChange_overlayFIRHighChkBox);
		doc.registry.byId("overlayFIRLowChkBox").on("change",
			OnChange_overlayFIRLowChkBox);
		doc.OnChangeDatasetsCheckboxes_Handle = doc.dojoOn(doc.registry
			.byId("datasetsPane"), ".dsCheckBox:change",
			OnChangeDatasetsCheckboxes);
		doc.registry.byId('fpLinesChkBox').on('change', OnChangeFpLinesChkBox);
		doc.registry.byId("windSpeedChkBox").on("change",
			OnChangeWindSpeedChkBox);
		doc.registry.byId("windBarbChkBox")
			.on("change", OnChangeWindBarbChkBox);
		document.registry.byId("onlyCARSWithSounding").on("change",
			OnChangeOnlyCARSWithSounding);
		document.registry.byId("hideACARMouseOver").on("change",
			OnChangeHideACARMouseOver);
		document.registry.byId("computeGroundElev").on("change",
			OnChangeComputeGroundElev);
		document.registry.byId("sensorTurbulence").on("change",
			OnChangeSensor);
		document.registry.byId("sensorVapor").on("change",
			OnChangeSensor);
		document.registry.byId("sensorIcing").on("change",
			OnChangeSensor);
		document.registry.byId("acarSize").on("change",
			OnChangeAcarSize);

	}
}

function setInitialValues()
{
	var doc = document;

}

function OnClick_TailIdLocateBtn()
{
	var doc = document;

	if (null == doc.fpLinesLayer)
	{
		doc.fpLinesLayer = new doc.GraphicsLayer(
			{
				opacity: 0.95
			});
		doc.map.addLayer(doc.fpLinesLayer);
		doc.fpLinesLayer.show();
	}
	var tail_id_to_locate = doc.dom.byId('tailIdForSearch').value;
	browserLogInt(doc.DEBUG, "Locating tail_id:" + tail_id_to_locate);
	for (var tail_id in doc.tail_id_paths)
	{
		if (tail_id_to_locate == tail_id)
		{
			browserLogInt(doc.DEBUG, "Found tail_id:" + tail_id_to_locate);

			if (null == doc.fpLinesLayer)
			{
				doc.fpLinesLayer = new doc.GraphicsLayer(
					{
						opacity: 0.95
					});
				doc.map.addLayer(doc.fpLinesLayer);
				doc.fpLinesLayer.show();
				doc.fpLinesLayer.on("mouse-over", OnMapFpLinesLayerMouseOver);
				doc.fpLinesLayer.on("mouse-out", OnMapFpLinesLayerMouseOut);
				doc.fpLinesLayer.on("click", OnMapFpLinesLayerClick);
			}

			var clr_alt = new doc.Color([100, 100, 200]);
			doc.cfg.FpLines = true;
			// doc.createFlightPathSymbolSrv( tail_id, clr_alt );
			doc.logAll = true;
			var path = doc.tail_id_paths[tail_id];
			for (var i = 0; i < path.length; i++)
			{
				path[i].rendered = false;
			}
			doc.createFlightPathSymbolSrv(tail_id, clr_alt, true, true);
			doc.logAll = false;
			doc.cfg.FpLines = false;
			return;
		}
	}
	browserLogInt(doc.DEBUG, "Unable to locate tail_id:" + tail_id_to_locate);
}

function OnClick_TailIdClearBtn()
{
	var doc = document;

	if (null == doc.fpLinesLayer)
	{
		doc.fpLinesLayer = new doc.GraphicsLayer(
			{
				opacity: 0.95
			});
		doc.map.addLayer(doc.fpLinesLayer);
		doc.fpLinesLayer.show();
	}
	doc.fpLinesLayer.clear();
}

function OnChangeAcarSize(val)
{
	var doc = document;

	browserLogInt(doc.DEBUG, "OnChangeAcarSize(), val:" + val);
	doc.acarSize = val;
	//resetRenderedFlag();
	//redrawAcars();
}

function OnChangeOnlyCARSWithSounding(val)
{
	var doc = document;

	browserLogInt(doc.DEBUG, "OnChangeOnlyCARSWithSounding(), val:" + val);
	doc.onlyCARSWithSounding = val;
	redrawForOnlyCARSWithSounding();
}

function OnChangeHideACARMouseOver(val)
{
	var doc = document;

	browserLogInt(doc.DEBUG, "OnChangeHideACARMouseOver(), val:" + val);
	doc.hideACARMouseOver = val;
}

function OnChangeComputeGroundElev(val)
{
	var doc = document;

	browserLogInt(doc.DEBUG, "OnClick_ComputeGroundElev(), val:" + val);
	doc.cfg.computeGroundElev = val;
}

function OnChangeSensor(val)
{
	var doc = document;

	var selectedSensors = [];
	if (doc.registry.byId("sensorTurbulence").get("checked") && doc.registry.byId("sensorVapor").get("checked") && doc.registry.byId("sensorIcing").get("checked"))
	{
		selectedSensors.push('All');
	}
	if (doc.registry.byId("sensorTurbulence").get("checked"))
	{
		selectedSensors.push('Turbulence');
	}
	if (doc.registry.byId("sensorVapor").get("checked"))
	{
		selectedSensors.push('Vapor');
	}
	if (doc.registry.byId("sensorIcing").get("checked"))
	{
		selectedSensors.push('Icing');
	}

	browserLogInt(doc.DEBUG, "OnClick_OnChangeSensor(), selectedSensors:" + JSON.stringify(selectedSensors));
	if (JSON.stringify(selectedSensors) !== JSON.stringify(doc.cfg.selectedSensors))
	{
		doc.cfg.selectedSensors = selectedSensors;
		browserLogInt(doc.DEBUG, "\tSensors changed, redrawing acars ...");
		redrawForSensorFilter();
	}
}

function OnClick_AdvRunServerTests()
{
	var doc = document;

	var url = window.location.href.split('?')[0] + "/MadisAircraft";

	browserLogInt(doc.INFO, "OnClick_AdvRunServerTests(), url:" + url);

	var arg0 =
	{
		m: "runServerTests"
	};
	var xhrArgs =
	{
		url: url,
		content: arg0,
		handleAs: "text",
		load: function (data)
		{
			browserLogInt(doc.INFO, data);
		},
		error: function (args)
		{
			if (args.dojoType != 'cancel')
			{
				doc.browserLogInt(doc.ERROR, "runServerTests failed!");
			}
		}
	};
	doc.dojo.xhrPost(xhrArgs);
}

function OnClick_AdvDataCacheClearBtn()
{
	var doc = document;

	//if (confirm("The server cache will be cleared and re-loaded, this may take a few seconds to a couple of minutes, click OK to proceed ..."))
	{
		showHideStandby(true);
		doc.dom.byId('serverWaiting').style.visibility = 'visible';
		var url = window.location.href.split('?')[0] + "/MadisAircraft";
		browserLogInt(doc.DEBUG, url + ",clearAllCache(" + JSON.stringify(arg0)
			+ ")");

		var arg0 =
		{
			m: "clearAllCache"
		};
		var xhrArgs =
		{
			url: url,
			content: arg0,
			handleAs: "text",
			load: function (data)
			{
				onDoneClearAllCache(data);
			},
			error: function (args)
			{
				if (args.dojoType != 'cancel')
				{
					doc.browserLogInt(doc.ERROR, "clearAllCache failed!");
				}
			}
		};
		doc.deferred_xhr_clearAllCache = doc.dojo.xhrPost(xhrArgs);
		doc.browserLogInt(doc.INFO, "Clearing server cache ...");
		doc.refreshStartTime = new Date();
		// doc.clearAllStations();
		browserLogInt(doc.INFO, "\tserver cache cleared in " + (new Date() - doc.refreshStartTime) + " ms");
	}
}

function onDoneClearAllCache(data)
{
	var doc = document;

	showHideStandby(false);
	doc.dom.byId('serverWaiting').style.visibility = 'hidden';
}

function OnChange_overlayAirportsChkBox()
{
	var doc = document;

	doc.cfg.overlayAirports = doc.registry.byId("overlayAirportsChkBox").get(
		"checked");
	updateAirportsDisplay();
}

function OnChange_overlayRAOBsChkBox()
{
	var doc = document;

	doc.cfg.overlayRAOBs = doc.registry.byId("overlayRAOBsChkBox").get(
		"checked");
	updateRAOBsDisplay();
}

function OnChange_overlayUSVORsChkBox()
{
	var doc = document;

	doc.cfg.overlayUSVORs = doc.registry.byId("overlayUSVORsChkBox").get(
		"checked");
	updateVORsDisplay();
}

function OnChange_overlayARTCCboundariesChkBox()
{
	var doc = document;

	doc.cfg.overlayARTCCboundaries = doc.registry.byId(
		"overlayARTCCboundariesChkBox").get("checked");
	updateARTCCboundariesDisplay();
}

function OnChange_overlayWorldFIRboundariesChkBox()
{
	var doc = document;

	browserLogInt(doc.DEBUG, "OnChange_overlayWorldFIRboundariesChkBox()");

	doc.cfg.overlayWorldFIRboundaries = doc.registry.byId(
		"overlayWorldFIRboundariesChkBox").get("checked");
	browserLogInt(doc.DEBUG, "OnChange_overlayWorldFIRboundariesChkBox() : " + doc.cfg.overlayWorldFIRboundaries);
	updateWorldFIRboundariesDisplay();
}

function OnChange_overlayFIRboundariesChkBox()
{
	var doc = document;

	doc.cfg.overlayFIRboundaries = doc.registry.byId(
		"overlayFIRboundariesChkBox").get("checked");
	browserLogInt(doc.DEBUG, "OnChange_overlayFIRboundariesChkBox() : " + doc.cfg.overlayFIRboundaries);
	updateFIRboundariesDisplay();
}

function OnChange_overlayFIRHighChkBox()
{
	var doc = document;

	doc.cfg.overlayFIRHigh = doc.registry.byId(
		"overlayFIRHighChkBox").get("checked");
	browserLogInt(doc.DEBUG, "OnChange_overlayFIRHighChkBox() : " + doc.cfg.overlayFIRHigh);
	updateFIRHighDisplay();
}

function OnChange_overlayFIRLowChkBox()
{
	var doc = document;

	doc.cfg.overlayFIRLow = doc.registry.byId(
		"overlayFIRLowChkBox").get("checked");
	browserLogInt(doc.DEBUG, "OnChange_overlayFIRLowChkBox() : " + doc.cfg.overlayFIRLow);
	updateFIRLowDisplay();
}

function OnMapClick(evt)
{
	var doc = document;
	browserLogInt(doc.DEBUG, "OnMapClick()" + JSON.stringify(evt.mapPoint));
	var sp = doc.map.toScreen(evt.mapPoint);
	browserLogInt(doc.DEBUG, "OnMapClick(" + JSON.stringify(sp));
	doc.dijitPopup.close(doc.soundingDataDialog);
	doc.dijitPopup.close(doc.toolTipDialog);
	// MapRenderGL.onMapClick(sp.x, sp.y);
}

function onClickBtnSkewTPlot()
{
	var doc = document;

	doc.browserLogInt(doc.INFO, "onClickBtnSkewTPlot(), acar:\n" + JSON.stringify(doc.SoundingAcarId, null, 2));

	//var clearCacheBeforeSoundingLoad = doc.registry.byId("clearCacheBeforeSoundingLoad").get("checked");

	//if (false === clearCacheBeforeSoundingLoad)
	{
		onClickBtnSkewTPlotInt();
	}
	/*
	else
	{
		doc.browserLogInt(doc.INFO, "\tclearing server cache before sounding load ...");
		OnClick_AdvDataCacheClearBtn();
		setTimeout(function ()
		{
			onClickBtnSkewTPlotInt();
		}, 500);
	}
	*/
}

function onClickBtnSkewTPlotInt()
{
	var doc = document;

	doc.browserLogInt(doc.INFO, "onClickBtnSkewTPlotInt(), acar:\n" + JSON.stringify(doc.SoundingAcarId, null, 2));

	var baseurl = window.location.href.split('?')[0];
	doc.browserLogInt(doc.INFO, "baseurl:" + baseurl);

	// un-comment line below for org SoundingDisplay
	// baseurl = baseurl.replace(doc.appname, "MadisSoundingDisplay");

	// un-comment line below for new SoundingDisplay
	baseurl += "MadisSoundingDisplay.html";

	doc.browserLogInt(doc.INFO, "replaced baseurl:" + baseurl);

	// var url = baseurl + "?debug=true&aircraftURL=" + doc.appname + "&acarid="
	//	+ doc.SoundingAcarId;

	var url = baseurl + "?obstime=" + doc.SoundingAcarId.obstime + "&tailid=" +
		doc.SoundingAcarId.stationid + "&dl=" + doc.SoundingAcarId.ids[2];

	var enableSoundingLookAheadQueries = doc.appSettings.appsettings["client.enableSoundingLookAheadQueries"];
	browserLogInt(doc.INFO, 'enableSoundingLookAheadQueries:' + enableSoundingLookAheadQueries);
	if ("true" === enableSoundingLookAheadQueries)
	{
		doc.lookAheadQueriesFanOutCount = doc.appSettings.appsettings['client.lookAheadQueriesFanOutCount'];
		browserLogInt(doc.INFO, 'lookAheadQueriesFanOutCount:' + doc.lookAheadQueriesFanOutCount);
		url += "&lafoc=" + doc.lookAheadQueriesFanOutCount;
	}

	doc.browserLogInt(doc.INFO, "Opening Sounding display at:" + url);
	window.open(url);

}

function OnTooltipClick(evt)
{
	var doc = document;
	doc.browserLogInt(doc.DEBUG, "OnTooltipClick!");

	if (!doc.mouseOverAcar || !doc.mouseOverAcar.kvmap.s)
	{
		doc.browserLogInt(doc.INFO, "no soundind!");
		tempPopup("No sounding available", 2000, doc.mouseOver_pageX, doc.mouseOver_pageY);
		return;
	}

	doc.SoundingAcarId = doc.mouseOverAcar;
	var arg0 =
	{
		m: "getSoundingsForId",
		limit: 64,
		tailid: doc.SoundingAcarId.stationid,
		obstime: doc.SoundingAcarId.obstime,
		dl: doc.SoundingAcarId.ids[2]
	};
	var url = window.location.href.split('?')[0] + "/MadisAircraft";
	browserLogInt(doc.DEBUG, url + ",getSoundingsForId("
		+ JSON.stringify(arg0) + ")");
	var xhrArgs =
	{
		url: url,
		content: arg0,
		handleAs: "text",
		load: function (data)
		{
			onGetSoundingsForIdLoad(data);
		},
		error: function (args)
		{
			if (args.dojoType != 'cancel')
			{
				doc.browserLogInt(doc.ERROR,
					"getSoundingsForId load failed!");
			}
		}
	};
	doc.deferred_xhr_AcarForId = doc.dojo.xhrPost(xhrArgs);
	doc.dom.byId('serverWaiting').style.visibility = 'visible';
}

function tempPopup(msg, duration, x, y)
{
	var doc = document;
	doc.tempPopupDialogContent = '<table border="1" style="border-collapse: collapse; table-layout: fixed; height: auto; width: auto; font-size: 10pt; font-family: Arial,Helvetica,sans-serif; color: blue; font-weight: bold; background-color: #e6f0f7;">'
		+ '<tr><td>' + msg + '</td></tr></table>';
	doc.tempPopupDialog.setContent(doc.tempPopupDialogContent);
	doc.dijitPopup.open(
		{
			popup: doc.tempPopupDialog,
			x: x,
			y: y
		});
	setTimeout(function ()
	{
		doc.dijitPopup.close(doc.tempPopupDialog);
	}, duration);
}

function tempAlert(msg, duration, x, y)
{
	var doc = document;
	doc.toolTipDialogContent = '<table border="1" style="border-collapse: collapse; table-layout: fixed; height: auto; width: auto; font-size: 10pt; font-family: Arial,Helvetica,sans-serif; color: blue; font-weight: bold; background-color: #e6f0f7;">'
		+ '<tr><td>' + msg + '</td></tr></table>';
	doc.toolTipDialog.setContent(doc.toolTipDialogContent);
	doc.dijitPopup.open(
		{
			popup: doc.toolTipDialog,
			x: x,
			y: y,
			onClose: function ()
			{
				doc.popupOpen = false;
			}
		});
	doc.popupOpen = true;
	setTimeout(function ()
	{
		doc.dijitPopup.close(doc.toolTipDialog);
	}, duration);
}

function OnMapGraphicsClick(evt)
{
	var doc = document;
	doc.browserLogInt(doc.DEBUG, "OnMapGraphicsClick, user clicked on " + JSON.stringify(evt.graphic["acar"]));

	if (!evt.graphic["acar"] || !evt.graphic["acar"].kvmap.s)
	{
		doc.browserLogInt(doc.INFO, "no soundind!");
		tempPopup("No sounding available", 2000, doc.mouseOver_pageX, doc.mouseOver_pageY);
		return;
	}

	doc.SoundingAcarId = evt.graphic["acar"];
	var arg0 =
	{
		m: "getSoundingsForId",
		limit: 64,
		tailid: doc.SoundingAcarId.stationid,
		obstime: doc.SoundingAcarId.obstime,
		dl: doc.SoundingAcarId.ids[2]
	};
	var url = window.location.href.split('?')[0] + "/MadisAircraft";
	browserLogInt(doc.DEBUG, url + ",getSoundingsForId("
		+ JSON.stringify(arg0) + ")");
	var xhrArgs =
	{
		url: url,
		content: arg0,
		handleAs: "text",
		load: function (data)
		{
			onGetSoundingsForIdLoad(data);
		},
		error: function (args)
		{
			if (args.dojoType != 'cancel')
			{
				doc.browserLogInt(doc.ERROR,
					"getSoundingsForId load failed!");
			}
		}
	};
	doc.deferred_xhr_AcarForId = doc.dojo.xhrPost(xhrArgs);
	doc.dom.byId('serverWaiting').style.visibility = 'visible';
}

function onGetSoundingsForIdLoad(result)
{
	var doc = document;

	doc.dom.byId('serverWaiting').style.visibility = 'hidden';
	browserLogInt(doc.DEBUG, "onGetSoundingsForIdLoad()\n" + result.length
		+ "\n");
	var lines = result.split("\n");

	if (lines.length > 3)
	{
		var baseurl = window.location.href.split('?')[0];
		doc.browserLogInt(doc.INFO, "baseurl:" + baseurl);

		// un-comment line below for org SoundingDisplay
		// baseurl = baseurl.replace(doc.appname, "MadisSoundingDisplay");

		// un-comment line below for new SoundingDisplay
		baseurl += "MadisSoundingDisplay.html";

		doc.browserLogInt(doc.INFO, "replaced baseurl:" + baseurl);
		// var url = baseurl + "?debug=true&aircraftURL=" + doc.appname
		//	+ "&acarid=" + doc.SoundingAcarId;

		var url = baseurl + "?obstime=" + doc.SoundingAcarId.obstime + "&tailid=" + doc.SoundingAcarId.stationid + "&dl=" + doc.SoundingAcarId.ids[2];

		doc.browserLogInt(doc.INFO, "Opening Sounding display at:" + url);
		window.open(url);
	} else
	{
		tempPopup("No sounding available", 2000, doc.mouseOver_pageX, doc.mouseOver_pageY);
	}
}


function mouseOverFunc()
{
	var doc = document;

	doc.browserLogInt(doc.DEBUG, "mouseOverFunc(), doc.mouseOverType:" + doc.mouseOverType);

	if (doc.mouseOverType == "acar")
	{
		if (doc.hideACARMouseOver)
		{
			popupAcarDetails(doc.mouseOverAcar, 0, 0);
		}
		else
		{
			popupAcarDetails(doc.mouseOverAcar, doc.mouseOver_pageX, doc.mouseOver_pageY);
		}
		return;
	}
	var apkeys = doc.dojoxObject.keys(doc.mouseOverObj);
	var titleStr = doc.mouseOverType + ":" + doc.mouseOverObj["name"];
	var content = '<table border="1" style="border-collapse: collapse; table-layout: fixed; height: auto; width: auto; font-size: 10pt; font-family: Arial,Helvetica,sans-serif; color: blue; font-weight: bold; background-color: #e6f0f7;">'
		+ '<tbody><tr><td colspan="2"><label>'
		+ titleStr
		+ '</label></td></tr>';
	for (var i = 0; i < apkeys.length; i++)
	{
		if (doc.mouseOverType === "Airport")
		{
			if (apkeys[i] !== "name")
			{
				var key = apkeys[i];
				if (key === "description")
				{
					key = "name";
				}
				content += '<tr><td>' + key + '</td><td>'
					+ doc.mouseOverObj[apkeys[i]] + '</td></tr>';
			}
		}
		else
		{
			content += '<tr><td>' + apkeys[i] + '</td><td>'
				+ doc.mouseOverObj[apkeys[i]] + '</td></tr>';
		}
	}
	content += '</tbody></table>';

	doc.dijitPopup.close(doc.soundingDataDialog);
	doc.toolTipDialog.setContent(content);
	doc.dijitPopup.open(
		{
			popup: doc.toolTipDialog,
			x: doc.mouseOver_pageX,
			y: doc.mouseOver_pageY,
			onClose: function ()
			{
				doc.popupOpen = false;
			}
		});
	doc.popupOpen = true;
}

function onMapKeyDown(evt)
{
	var doc = document;
	try
	{
		if (((doc.isSafari && evt.keyCode == 83) || (evt.key == 's' || evt.key == 'S'))
			&& null == doc.rbZoomStart)
		{
			doc.rbZoomStart = doc.mouseNow;
			browserLogInt(doc.DEBUG, "Starting sounding rb box at lat:"
				+ doc.rbZoomStart.getLatitude().toFixed(2) + ",lon:"
				+ doc.rbZoomStart.getLongitude().toFixed(2));
		}
	} catch (err)
	{
		doc.browserLogInt(doc.DEBUG, "onMapKeyDown, exception:" + err.message);
	}
}

function onMapKeyUp(evt)
{
	var doc = document;

	try
	{
		if (((doc.isSafari && evt.keyCode == 83) || (evt.key == 's' || evt.key == 'S'))
			&& null != doc.rbZoomStart && null != doc.rbPolygonGraphic)
		{
			var ext = doc.rbPolygonGraphic.geometry.getExtent();
			var points = [doc.rbZoomStart.getLatitude().toFixed(2),
			doc.rbZoomStart.getLongitude().toFixed(2),
			doc.mouseNow.getLatitude().toFixed(2),
			doc.mouseNow.getLongitude().toFixed(2)];

			if (Math.abs(points[0] - points[2]) < 0.001 || Math.abs(points[1] - points[3]) < 0.001)
			{
				doc.browserLogInt(doc.INFO, "Null region for s click!");
				return;
			}

			// doc.map.setExtent(ext);
			var baseurl = window.location.href.split('?')[0];
			doc.browserLogInt(doc.INFO, "baseurl:" + baseurl);


			// un-comment line below for org SoundingDisplay
			// baseurl = baseurl.replace(doc.appname, "MadisSoundingDisplay");

			// un-comment line below for new SoundingDisplay
			baseurl += "MadisSoundingDisplay.html";

			// var url = baseurl + "?debug=true&soundingsExt="
			// + JSON.stringify(points);
			var docCfgCopy = JSON.parse(JSON.stringify(doc.cfg));
			docCfgCopy.debug = true;
			docCfgCopy.soundingsExt = points;
			var cfgQueryStr = doc.ioQuery.objectToQuery(docCfgCopy);

			// var url = baseurl + "?aircraftURL=" + doc.appname + "&"
			//	+ cfgQueryStr;

			var url = baseurl + "?" + cfgQueryStr;

			var enableSoundingLookAheadQueries = doc.appSettings.appsettings["client.enableSoundingLookAheadQueries"];
			browserLogInt(doc.INFO, 'enableSoundingLookAheadQueries:' + enableSoundingLookAheadQueries);
			if ("true" === enableSoundingLookAheadQueries)
			{
				doc.lookAheadQueriesFanOutCount = doc.appSettings.appsettings['client.lookAheadQueriesFanOutCount'];
				browserLogInt(doc.INFO, 'lookAheadQueriesFanOutCount:' + doc.lookAheadQueriesFanOutCount);
				url += "&lafoc=" + doc.lookAheadQueriesFanOutCount;
			}

			doc.browserLogInt(doc.DEBUG, "URL:" + url);

			doc.browserLogInt(doc.INFO, "Opening Sounding display at:" + url);

			window.open(url);
			// getSoundingsForExtTest(cfgQueryStr);

			doc.map.graphics.remove(doc.rbPolygonGraphic);
			doc.rbPolygonGraphic = null;
			doc.rbZoomStart = null;
		}
	} catch (err)
	{
		doc.browserLogInt(doc.DEBUG, "onMapKeyUp, exception:" + err.message);
	}
}

function getSoundingsForExtTest(queryStr)
{
	var doc = document;

	var url = window.location.href.split('?')[0] + "/MadisAircraft";
	var xhrArgs =
	{
		url: url + "?m=getSoundingsForExt&limit=64&" + queryStr,
		handleAs: "text",
		load: function (data)
		{
			onGetSoundingsForExtTest(data);
		},
		error: function (args)
		{
			if (args.dojoType != 'cancel')
			{
				doc.browserLogInt(doc.ERROR, "getSoundingsForExt load failed!");
			}
		}
	};
	doc.deferred_xhr_AcarForId = doc.dojo.xhrPost(xhrArgs);
	doc.dom.byId('serverWaiting').style.visibility = 'visible';
}

function onGetSoundingsForExtTest(data)
{
	var doc = document;

	doc.browserLogInt(doc.ERROR, "onGetSoundingsForExtTest(), data:\n" + JSON.stringify(data));
}

function onMapMouseMove(evt)
{
	var doc = document;
	try
	{
		doc.mouseNow = evt.mapPoint;
		if (Math.abs(doc.mouseOver_pageX - evt.pageX) > 10
			|| Math.abs(doc.mouseOver_pageY - evt.pageY) > 10)
		{
			// doc.dijitPopup.close( doc.toolTipDialog );
			clearTimeout(doc.mouseOverTimer);
		}
		if (null != doc.rbZoomStart)
		{
			var points = [
				new doc.Point(doc.rbZoomStart.getLongitude(),
					doc.rbZoomStart.getLatitude()),
				new doc.Point(evt.mapPoint.getLongitude(), doc.rbZoomStart
					.getLatitude()),
				new doc.Point(evt.mapPoint.getLongitude(), evt.mapPoint
					.getLatitude()),
				new doc.Point(doc.rbZoomStart.getLongitude(), evt.mapPoint
					.getLatitude()),
				new doc.Point(doc.rbZoomStart.getLongitude(),
					doc.rbZoomStart.getLatitude())];
			if (null == doc.rbPolygonGraphic)
			{
				var polygon = new doc.Polygon();
				polygon.addRing(points);
				// polygon.spatialReference = $doc.map.spatialReference;
				var symbol = new doc.SimpleFillSymbol()
					.setStyle(doc.SimpleFillSymbol.STYLE_SOLID);
				var polygonGraphic = new doc.Graphic(polygon, symbol,
					{
						keeper: true
					});
				doc.map.graphics.add(polygonGraphic);
				doc.rbPolygonGraphic = polygonGraphic;
			} else
			{
				doc.rbPolygonGraphic.geometry.removeRing(0);
				doc.rbPolygonGraphic.geometry.addRing(points);
				doc.rbPolygonGraphic.draw();
			}
		}
	} catch (err)
	{
	}
	doc.dom.byId('latVal').value = evt.mapPoint.getLatitude().toFixed(2);
	doc.dom.byId('lonVal').value = evt.mapPoint.getLongitude().toFixed(2);
}

function OnMapGraphicsMouseOver(evt)
{
	var doc = document;

	if (doc.mouseInpopup /*|| doc.hideACARMouseOver*/)
	{
		return;
	}
	doc.browserLogInt(doc.DEBUG, "OnMapGraphicsMouseOver()");
	if (null != doc.rbZoomStart)
	{
		return;
	}
	if (null == null == evt.graphic || null == evt.graphic["acar"])
	{
		return;
	}

	if (null != doc.deferred_xhr_AcarForId)
	{
		doc.deferred_xhr_AcarForId.cancel();
	}
	clearTimeout(doc.mouseOverTimer);
	doc.mouseOverType = "acar";
	doc.mouseOver_pageX = evt.pageX;
	doc.mouseOver_pageY = evt.pageY;
	doc.mouseOverAcar = evt.graphic["acar"];
	doc.mouseOverTimer = setTimeout(mouseOverFunc, 500);
}

function OnMapFpLinesLayerMouseOver(evt)
{
	var doc = document;

	if (null == evt.graphic || null == evt.graphic["tail_id"])
	{
		return;
	}
	doc.browserLogInt(doc.DEBUG, "OnMapFpLinesLayerMouseOver("
		+ evt.graphic["tail_id"] + ")");
	if (null != doc.selectedFpGraphic)
	{
		doc.fpLinesLayer.remove(doc.selectedFpGraphic);
	}
	// createSelectedFpLinesSymbol(evt.graphic["tail_id"]);
}

function OnMapFpLinesLayerMouseOut(evt)
{
	var doc = document;

	// doc.browserLogInt(doc.DEBUG, "OnMapFpLinesLayerMouseOut()");
}

function OnMapFpLinesLayerClick(evt)
{
	var doc = document;

	if (null == evt.graphic || null == evt.graphic["tail_id"])
	{
		return;
	}
	doc.browserLogInt(doc.DEBUG, "OnMapFpLinesLayerClick("
		+ evt.graphic["tail_id"] + ")");
}

function OnMapGraphicsMouseOut(evt)
{
	var doc = document;
	// doc.browserLogInt(doc.DEBUG, "MouseOut:" + evt.graphic["id"]);
	// doc.dijitPopup.close(doc.toolTipDialog);
}

function getAltFilterCount()
{
	var doc = document;
	var rv = 0;

	for (var tail_id in doc.tail_id_paths)
	{
		var path = doc.tail_id_paths[tail_id];
		for (var i = 0; i < path.length; i++)
		{
			if (path[i][3] >= doc.cfg.altMinFilter
				&& path[i][3] <= doc.cfg.altMaxFilter)
			{
				++rv;
			}
		}
	}
	return rv;
}

function redrawForSensorFilter()
{
	var doc = document;
	var startTime = new Date();
	var filterCount = 0;
	var len = doc.stationsLayer.graphics.length;

	browserLogInt(doc.INFO, "redrawForSensorFilter(),acars:" + len +
		",selectedSensors:" + JSON.stringify(doc.cfg.selectedSensors));

	var all = doc.cfg.selectedSensors.includes("All");
	for (var i = 0; i < len; i++)
	{
		var gr = doc.stationsLayer.graphics[i];
		if (null != gr && null != gr.acar)
		{
			var acar = gr.acar;

			if (true === all)
			{
				gr.show();
				++filterCount;
			}
			else
			{
				if (acar.kvmap)
				{
					var incl = false;
					if (doc.cfg.selectedSensors.includes("Turbulence") && (acar.kvmap.medTurbulence || acar.kvmap.maxTurbulence))
					{
						incl = true;
					}
					if (doc.cfg.selectedSensors.includes("Vapor") && acar.kvmap.RHfromWVMR)
					{
						incl = true;
					}
					if (doc.cfg.selectedSensors.includes("Icing") && acar.kvmap.icingCondition)
					{
						incl = true;
					}
					if (true === incl)
					{
						gr.show();
						++filterCount;
					}
					else
					{
						gr.hide();
					}
				} else
				{
					gr.hide();
				}
			}
		}
	}
	redrawFpLines();

	var endTime = new Date();
	var timeDiff_ms = endTime - startTime;
	browserLogInt(doc.INFO, "ACARS redraw, total:" + len + ",rendered:" + filterCount + " in " + timeDiff_ms + " ms");
}

function redrawForACARSizeChange()
{
	var doc = document;

	browserLogInt(doc.INFO, "redrawForACARSizeChange(),acarSize:" + doc.acarSize);
}

function redrawForOnlyCARSWithSounding()
{
	var doc = document;
	var startTime = new Date();
	var i, len = doc.stationsLayer.graphics.length;

	browserLogInt(doc.INFO, "OnlyCARSWithSounding(),acars:" + len + ",onlyCARSWithSounding:" + doc.onlyCARSWithSounding);

	for (var i = 0; i < len; i++)
	{
		var gr = doc.stationsLayer.graphics[i];
		if (null != gr && null != gr.acar)
		{
			var acar = gr.acar;
			if (true === doc.onlyCARSWithSounding)
			{
				if (acar.kvmap.s)
				{
					gr.show();
				} else
				{
					gr.hide();
				}
			}
			else
			{
				gr.show();
			}
		}
	}
	redrawFpLines();

	var endTime = new Date();
	var timeDiff_ms = endTime - startTime;
	browserLogInt(doc.INFO, "ACARS redraw in " + timeDiff_ms + " ms");
}

function redrawForAltFilter()
{
	var doc = document;
	var startTime = new Date();
	var i, len = doc.stationsLayer.graphics.length;

	browserLogInt(doc.INFO, "redrawForAltFilter(),acars:" + len +
		",altMinFilter:" + doc.cfg.altMinFilter + ",altMaxFilter:" + doc.cfg.altMaxFilter);

	for (var i = 0; i < len; i++)
	{
		var gr = doc.stationsLayer.graphics[i];
		if (null != gr && null != gr.acar)
		{
			var acar = gr.acar;
			if (acar.elev >= doc.cfg.altMinFilter
				&& acar.elev <= doc.cfg.altMaxFilter)
			{
				if (true === doc.onlyCARSWithSounding && !acar.kvmap.s)
				{
					gr.hide();
				}
				else
				{
					gr.show();
				}
			} else
			{
				gr.hide();
			}
		}
		/*
		if((i % 1000) == 0)
		{
			browserLogInt(doc.INFO, "\tacar.elev:" + acar.elev);
		}
		*/
	}
	redrawFpLines();

	var endTime = new Date();
	var timeDiff_ms = endTime - startTime;
	browserLogInt(doc.INFO, "ACARS redraw in " + timeDiff_ms + " ms");
}

function stdsOnChange(value)
{
	var doc = document;
	doc.cfg.stationsToDisplayPC = value;
	doc.dom.byId("pdSlidervaluePC").innerHTML = doc.number.format(
		doc.cfg.stationsToDisplayPC,
		{
			places: 0
		})
		+ " %";
	// browserLogInt(doc.INFO, "stationsToDisplay:" + value);
}
function updateAltRangeLabel()
{
	var doc = document;

	doc.dom.byId('altitudeRangeLabel').value = "Altitude: "
		+ doc.number.format(doc.cfg.altMinFilter,
			{
				places: 0
			}) + " ft to " + doc.number.format(doc.cfg.altMaxFilter,
				{
					places: 0
				}) + " ft";
}

function alRangeOnChange()
{
	var doc = document;

	doc.browserLogInt(doc.INFO, "alRangeOnChange(" + arguments[0][0] + ","
		+ arguments[0][1] + ")");
	doc.cfg.altMinFilter = arguments[0][0] * 1000.0;
	doc.cfg.altMaxFilter = arguments[0][1] * 1000.0;
	updateAltRangeLabel();
	// doc.map.graphics.clear();
	// redrawAcars();
	redrawForAltFilter();
}

function startsWith2(str, prefix)
{
	if (str.length < prefix.length)
		return false;
	for (var i = prefix.length - 1; (i >= 0) && (str[i] === prefix[i]); --i)
		continue;
	return i < 0;
}

function getUrlVars()
{
	var doc = document;
	var vars = {};
	try
	{
		var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,
			function (m, key, value)
			{
				vars[key] = value;
			});
	} catch (err)
	{
		doc
			.browserLogInt(doc.ERROR, "Exception in getUrlVars():"
				+ err.message);
	}
	return vars;

}



