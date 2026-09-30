/**
 * NOAA-ESRL-GSD-MADIS Author: Gopakumar Padmanabhan (Gopa) Last Modified: Nov
 * 2nd, 2015
 * 
 */

function MadisAirport(fsl_id, name, wmo_id, lat, lon, elevation, description)
{
	this.fsl_id = fsl_id;
	this.name = name;
	this.wmo_id = wmo_id;
	this.lat = lat;
	this.lon = lon;
	this.elevation = elevation;
	this.description = description;
}

function MadisRAOB(wmo_id, name, lat, lon, elevation, description)
{
	this.wmo_id = wmo_id;
	this.name = name;
	this.lat = lat;
	this.lon = lon;
	this.elevation = elevation;
	this.description = description;
}

function MadisProfiler(wmo_id, name, lat, lon, elevation, description)
{
	this.wmo_id = wmo_id;
	this.name = name;
	this.lat = lat;
	this.lon = lon;
	this.elevation = elevation;
	this.description = description;
}

function MadisVOR(name, lat, lon, elevation, description)
{
	this.name = name;
	this.lat = lat;
	this.lon = lon;
	this.elevation = elevation;
	this.description = description;
}

function loadAirports()
{
	var doc = document;
	var color_Airport = new doc.Color([80, 90, 200]);
	browserLogInt(doc.INFO, "Loading Airports ...");
	var startTime = new Date();
	var url = window.location.href.split('?')[0] + "/conf/ds.Aircraft.conf.json";
	doc.dojo.xhrGet(
		{
			url: url,
			handleAs: "json",
			load: function (result)
			{
				var apk = Object.keys(result.airports);
				browserLogInt(doc.INFO, "\t" + apk.length + " airports loaded");

				for (var i = 0; i < apk.length; ++i)
				{
					try
					{
						var fsl_id = result.airports[apk[i]].fsl_id;
						var name = result.airports[apk[i]].name;
						var wmo_id = result.airports[apk[i]].wmo_id;
						var lat = result.airports[apk[i]].lat;
						var lon = result.airports[apk[i]].lon;
						var elevation = result.airports[apk[i]].alt * 3.2808;
						var description = result.airports[apk[i]].desc;
						var ap = new MadisAirport(fsl_id, name, wmo_id,
							lat, lon, elevation, description);
						doc.airports[fsl_id] = ap;
						createAirportSymbol(ap);
					} catch (err)
					{
						doc.browserLogInt(doc.ERROR, "Load Airports exception:"
							+ err.message);
					}
				}
				var endTime = new Date();
				var timeDiff_ms = endTime - startTime;
				browserLogInt(doc.INFO, doc.dojoxObject.keys(doc.airports).length
					+ " airports loaded in " + timeDiff_ms + " ms");

			}
		});
}

function updateAirportsDisplay()
{
	var doc = document;

	if (doc.cfg.overlayAirports)
	{
		var apkeys = doc.dojoxObject.keys(doc.airports);
		if (0 == apkeys.length)
		{
			if (null == doc.airportsLayer)
			{
				doc.airportsLayer = new doc.GraphicsLayer(
					{
						opacity: 0.70
					});
				doc.map.addLayer(doc.airportsLayer);
				doc.airportsLayer.on("mouse-over", OnMapAirportsLayerMouseOver);
				// doc.airportsLayer.on("click", OnMapAirportsLayerMouseOver);
				var url = window.location.href.split('?')[0]
					+ "/images/airport.png";
				doc.airportSymbol = new doc.PictureMarkerSymbol(url,
					doc.cfg.overlayIconSize, doc.cfg.overlayIconSize);
			}
			loadAirports();
		}
		doc.airportsLayer.show();
	} else
	{
		if (null != doc.airportsLayer)
		{
			doc.airportsLayer.hide();
		}
	}
}

function OnMapAirportsLayerMouseOver(evt)
{
	var doc = document;
	doc.browserLogInt(doc.DEBUG, "OnMapAirportsLayerMouseOver()");
	clearTimeout(doc.mouseOverTimer);
	doc.mouseOverType = "Airport";
	doc.mouseOver_pageX = evt.pageX;
	doc.mouseOver_pageY = evt.pageY;
	doc.mouseOverObj = evt.graphic["airport"];
	doc.mouseOverTimer = setTimeout(mouseOverFunc, 500);
}

function createAirportSymbol(airport)
{
	var doc = document;

	try
	{
		var pt = new doc.Point(airport.lon, airport.lat);
		var location = doc.webMercatorUtils.geographicToWebMercator(pt);
		var gr = new doc.Graphic(location, doc.airportSymbol);
		gr["airport"] = airport;
		doc.airportsLayer.add(gr);
	} catch (err)
	{
		browserLogInt(doc.ERROR, "createAirportSymbol(), Exception:"
			+ err.message);
	}
}

function loadRAOBs()
{
	var doc = document;

	browserLogInt(doc.INFO, "Loading RAOBs ...");
	var airportCount = 0;
	var startTime = new Date();
	var url = window.location.href.split('?')[0] + "/data/raob.dat";
	doc.dojo.xhrGet(
		{
			url: url,
			load: function (result)
			{
				var lines = result.split("\n");
				// browserLogInt("Got reply!" + lines.length);
				for (var i = 0; i < lines.length; ++i)
				{
					try
					{
						if (lines[i].length > 20)
						{
							// browserLogInt("Line[" + i + "]:" + lines[i]);
							var toks = lines[i].match(/\S+/g);
							if (toks.length >= 6)
							{
								// browserLogInt("toks:" + toks);
								var wmo_id = toks[0];
								var name = toks[1];
								var lat = Number(toks[2]);
								var lon = Number(toks[3]);
								var elev = Number(toks[4]);
								var desc = toks[5];
								for (var di = 6; di < toks.length; di++)
								{
									desc += "," + toks[di];
								}
								var raob = new MadisRAOB(wmo_id, name, lat, lon,
									elev, desc);
								doc.raobs[wmo_id] = raob;
								createRAOBSymbol(raob);
								airportCount++;
							}
						}
					} catch (err)
					{
						doc.browserLogInt(doc.ERROR, "Load RAOBs exception:"
							+ err.message);
					}
				}
				var endTime = new Date();
				var timeDiff_ms = endTime - startTime;
				browserLogInt(doc.INFO, airportCount + " RAOBs loaded in "
					+ timeDiff_ms + " ms");
			}
		});
}

function updateRAOBsDisplay()
{
	var doc = document;

	if (doc.cfg.overlayRAOBs)
	{
		var apkeys = doc.dojoxObject.keys(doc.raobs);
		if (0 == apkeys.length)
		{
			if (null == doc.raobLayer)
			{
				doc.raobLayer = new doc.GraphicsLayer(
					{
						opacity: 1.0
					});
				doc.map.addLayer(doc.raobLayer);
				doc.raobLayer.on("mouse-over", OnMapRAOBsLayerMouseOver);
				var url = window.location.href.split('?')[0]
					+ "/images/raob.png";
				doc.raobSymbol = new doc.PictureMarkerSymbol(url,
					doc.cfg.overlayIconSize, doc.cfg.overlayIconSize);
			}
			loadRAOBs();
		}
		doc.raobLayer.show();
	} else
	{
		if (null != doc.raobLayer)
		{
			doc.raobLayer.hide();
		}
	}
}

function OnMapRAOBsLayerMouseOver(evt)
{
	var doc = document;
	doc.browserLogInt(doc.DEBUG, "OnMapRAOBsLayerMouseOver()");
	clearTimeout(doc.mouseOverTimer);
	doc.mouseOverType = "RAOB";
	doc.mouseOver_pageX = evt.pageX;
	doc.mouseOver_pageY = evt.pageY;
	doc.mouseOverObj = evt.graphic["raob"];
	doc.mouseOverTimer = setTimeout(mouseOverFunc, 500);
}

function createRAOBSymbol(raob)
{
	var doc = document;

	try
	{
		var pt = new doc.Point(raob.lon, raob.lat);
		var location = doc.webMercatorUtils.geographicToWebMercator(pt);
		var gr = new doc.Graphic(location, doc.raobSymbol);
		gr["raob"] = raob;
		doc.raobLayer.add(gr);
	} catch (err)
	{
		browserLogInt(doc.ERROR, "createRAOBSymbol(), Exception:" + err.message);
	}
}

function loadVORs()
{
	var doc = document;

	browserLogInt(doc.INFO, "Loading VORs ...");
	var airportCount = 0;
	var startTime = new Date();
	var url = window.location.href.split('?')[0] + "/data/vor.dat";
	doc.dojo.xhrGet(
		{
			url: url,
			load: function (result)
			{
				var lines = result.split("\n");
				// browserLogInt("Got reply!" + lines.length);
				for (var i = 0; i < lines.length; ++i)
				{
					try
					{
						if (lines[i].length > 20)
						{
							// browserLogInt("Line[" + i + "]:" + lines[i]);
							var toks = lines[i].match(/\S+/g);
							if (toks.length >= 6)
							{
								// browserLogInt("toks:" + toks);
								var name = toks[0];
								var lat = Number(toks[1]);
								var lon = Number(toks[2]);
								var elev = Number(toks[3]);
								var desc = toks[4];
								for (var di = 5; di < toks.length; di++)
								{
									desc += "," + toks[di];
								}
								var vor = new MadisVOR(name, lat, lon, elev, desc);
								doc.vors[name] = vor;
								createVORSymbol(vor);
								airportCount++;
							}
						}
					} catch (err)
					{
						doc.browserLogInt(doc.ERROR, "Load VOR exception:"
							+ err.message);
					}
				}
				var endTime = new Date();
				var timeDiff_ms = endTime - startTime;
				browserLogInt(doc.INFO, airportCount + " VORs loaded in "
					+ timeDiff_ms + " ms");
			}
		});
}

function updateVORsDisplay()
{
	var doc = document;

	if (doc.cfg.overlayUSVORs)
	{
		var apkeys = doc.dojoxObject.keys(doc.vors);
		if (0 == apkeys.length)
		{
			if (null == doc.vorLayer)
			{
				doc.vorLayer = new doc.GraphicsLayer(
					{
						opacity: 0.7
					});
				doc.map.addLayer(doc.vorLayer);
				doc.vorLayer.on("mouse-over", OnMapVORsLayerMouseOver);
				var url = window.location.href.split('?')[0]
					+ "/images/vor.jpg";
				doc.vorSymbol = new doc.PictureMarkerSymbol(url,
					doc.cfg.overlayIconSize, doc.cfg.overlayIconSize);
			}
			loadVORs();
		}
		doc.vorLayer.show();
	} else
	{
		if (null != doc.vorLayer)
		{
			doc.vorLayer.hide();
		}
	}
}

function OnMapVORsLayerMouseOver(evt)
{
	var doc = document;
	doc.browserLogInt(doc.DEBUG, "OnMapVORsLayerMouseOver()");
	clearTimeout(doc.mouseOverTimer);
	doc.mouseOverType = "VOR";
	doc.mouseOver_pageX = evt.pageX;
	doc.mouseOver_pageY = evt.pageY;
	doc.mouseOverObj = evt.graphic["vor"];
	doc.mouseOverTimer = setTimeout(mouseOverFunc, 500);
}

function updateARTCCboundariesDisplay()
{
	var doc = document;
	doc.browserLogInt(doc.DEBUG, "updateARTCCboundariesDisplay()");

	if (doc.cfg.overlayARTCCboundaries)
	{
		if (null == doc.ARTCCboundariesLayer)
		{
			var kmlUrl = doc.appSettings.appsettings['overlay.artcc.kml'];
			browserLogInt(doc.INFO, " Opening overlay:" + kmlUrl);
			// var kmlUrl =
			// "http://137.75.133.19/madisPublic1/data/kml0/artcc.kml";
			doc.ARTCCboundariesLayer = new doc.KMLLayer(kmlUrl,
				{
					opacity: 0.5
				});

			if (null != doc.airportsLayer)
			{
				doc.map.removeLayer(doc.airportsLayer);
				doc.airports = {};
			}
			if (null != doc.raobLayer)
			{
				doc.map.removeLayer(doc.raobLayer);
				doc.raobs = {};
			}
			if (null != doc.vorLayer)
			{
				doc.map.removeLayer(doc.vorLayer);
				doc.vors = {};
			}
			doc.map.addLayer(doc.ARTCCboundariesLayer);

			doc.ARTCCboundariesLayer.on("load", function ()
			{
				doc.domStyle.set("loading", "display", "none");
			});
			browserLogInt(doc.INFO, "ARTCCboundariesLayer loaded.");
			doc.layerRedrawTimer = new doc.timing.Timer(1000);
			doc.layerRedrawTimer.onTick = function ()
			{
				doc.layerRedrawTimer.stop();
				browserLogInt(doc.INFO, "Redrawing layers ...");
				if (null != doc.airportsLayer)
				{
					doc.airportsLayer = null;
					updateAirportsDisplay();
				}
				if (null != doc.raobLayer)
				{
					doc.raobLayer = null;
					updateRAOBsDisplay();
				}
				if (null != doc.vorLayer)
				{
					doc.vorLayer = null;
					updateVORsDisplay();
				}
			}
			doc.layerRedrawTimer.start();
		}
		doc.ARTCCboundariesLayer.show();
	} else
	{
		if (null != doc.ARTCCboundariesLayer)
		{
			doc.ARTCCboundariesLayer.hide();
		}
	}
}

function updateFIRHighDisplay()
{
	var doc = document;
	doc.browserLogInt(doc.DEBUG, "updateFIRHighDisplay():" + doc.cfg.overlayFIRHigh);

	if (doc.cfg.overlayFIRHigh)
	{
		if (null == doc.FIRHighLayer)
		{
			var kmlUrl = doc.appSettings.appsettings['overlay.FIRHigh.kml'];
			browserLogInt(doc.INFO, " Opening overlay:" + kmlUrl);
			// var kmlUrl =
			// "http://137.75.133.19/madisPublic1/data/kml0/artcc.kml";
			doc.FIRHighLayer = new doc.KMLLayer(kmlUrl,
				{
					opacity: 0.5
				});

			if (null != doc.airportsLayer)
			{
				doc.map.removeLayer(doc.airportsLayer);
				doc.airports = {};
			}
			if (null != doc.raobLayer)
			{
				doc.map.removeLayer(doc.raobLayer);
				doc.raobs = {};
			}
			if (null != doc.vorLayer)
			{
				doc.map.removeLayer(doc.vorLayer);
				doc.vors = {};
			}
			doc.map.addLayer(doc.FIRHighLayer);

			doc.FIRHighLayer.on("load", function ()
			{
				doc.domStyle.set("loading", "display", "none");
			});
			browserLogInt(doc.INFO, "FIRHighLayer loaded.");
			doc.layerRedrawTimer = new doc.timing.Timer(1000);
			doc.layerRedrawTimer.onTick = function ()
			{
				doc.layerRedrawTimer.stop();
				browserLogInt(doc.INFO, "Redrawing layers ...");
				if (null != doc.airportsLayer)
				{
					doc.airportsLayer = null;
					updateAirportsDisplay();
				}
				if (null != doc.raobLayer)
				{
					doc.raobLayer = null;
					updateRAOBsDisplay();
				}
				if (null != doc.vorLayer)
				{
					doc.vorLayer = null;
					updateVORsDisplay();
				}
			}
			doc.layerRedrawTimer.start();
		}
		doc.FIRHighLayer.show();
	} else
	{
		if (null != doc.FIRHighLayer)
		{
			doc.FIRHighLayer.hide();
		}
	}
}

function updateFIRLowDisplay()
{
	var doc = document;
	doc.browserLogInt(doc.DEBUG, "updateFIRLowDisplay():" + doc.cfg.overlayFIRLow);

	if (doc.cfg.overlayFIRLow)
	{
		if (null == doc.overlayFIRLow)
		{
			var kmlUrl = doc.appSettings.appsettings['overlay.FIRLow.kml'];
			browserLogInt(doc.INFO, " Opening overlay:" + kmlUrl);
			// var kmlUrl =
			// "http://137.75.133.19/madisPublic1/data/kml0/artcc.kml";
			doc.FIRLowLayer = new doc.KMLLayer(kmlUrl,
				{
					opacity: 0.5
				});

			if (null != doc.airportsLayer)
			{
				doc.map.removeLayer(doc.airportsLayer);
				doc.airports = {};
			}
			if (null != doc.raobLayer)
			{
				doc.map.removeLayer(doc.raobLayer);
				doc.raobs = {};
			}
			if (null != doc.vorLayer)
			{
				doc.map.removeLayer(doc.vorLayer);
				doc.vors = {};
			}
			doc.map.addLayer(doc.FIRLowLayer);

			doc.FIRLowLayer.on("load", function ()
			{
				doc.domStyle.set("loading", "display", "none");
			});
			browserLogInt(doc.INFO, "FIRLowLayer loaded.");
			doc.layerRedrawTimer = new doc.timing.Timer(1000);
			doc.layerRedrawTimer.onTick = function ()
			{
				doc.layerRedrawTimer.stop();
				browserLogInt(doc.INFO, "Redrawing layers ...");
				if (null != doc.airportsLayer)
				{
					doc.airportsLayer = null;
					updateAirportsDisplay();
				}
				if (null != doc.raobLayer)
				{
					doc.raobLayer = null;
					updateRAOBsDisplay();
				}
				if (null != doc.vorLayer)
				{
					doc.vorLayer = null;
					updateVORsDisplay();
				}
			}
			doc.layerRedrawTimer.start();
		}
		doc.FIRLowLayer.show();
	} else
	{
		if (null != doc.FIRLowLayer)
		{
			doc.FIRLowLayer.hide();
		}
	}
}

function updateWorldFIRboundariesDisplay()
{
	var doc = document;
	doc.browserLogInt(doc.DEBUG, "updateWorldFIRboundariesDisplay():" + doc.cfg.overlayWorldFIRboundaries);

	if (doc.cfg.overlayWorldFIRboundaries)
	{
		if (null == doc.WorldFIRboundariesLayer)
		{
			var kmlUrl = doc.appSettings.appsettings['overlay.World_FIR_Boundaries.kml'];
			browserLogInt(doc.INFO, " Opening overlay:" + kmlUrl);
			// var kmlUrl =
			// "http://137.75.133.19/madisPublic1/data/kml0/artcc.kml";
			doc.WorldFIRboundariesLayer = new doc.KMLLayer(kmlUrl,
				{
					opacity: 0.5
				});

			if (null != doc.airportsLayer)
			{
				doc.map.removeLayer(doc.airportsLayer);
				doc.airports = {};
			}
			if (null != doc.raobLayer)
			{
				doc.map.removeLayer(doc.raobLayer);
				doc.raobs = {};
			}
			if (null != doc.vorLayer)
			{
				doc.map.removeLayer(doc.vorLayer);
				doc.vors = {};
			}
			doc.map.addLayer(doc.WorldFIRboundariesLayer);

			doc.WorldFIRboundariesLayer.on("load", function ()
			{
				doc.domStyle.set("loading", "display", "none");
			});
			browserLogInt(doc.INFO, "WorldFIRboundariesLayer loaded.");
			doc.layerRedrawTimer = new doc.timing.Timer(1000);
			doc.layerRedrawTimer.onTick = function ()
			{
				doc.layerRedrawTimer.stop();
				browserLogInt(doc.INFO, "Redrawing layers ...");
				if (null != doc.airportsLayer)
				{
					doc.airportsLayer = null;
					updateAirportsDisplay();
				}
				if (null != doc.raobLayer)
				{
					doc.raobLayer = null;
					updateRAOBsDisplay();
				}
				if (null != doc.vorLayer)
				{
					doc.vorLayer = null;
					updateVORsDisplay();
				}
			}
			doc.layerRedrawTimer.start();
		}
		doc.WorldFIRboundariesLayer.show();
	} else
	{
		if (null != doc.WorldFIRboundariesLayer)
		{
			doc.WorldFIRboundariesLayer.hide();
		}
	}
}

function updateFIRboundariesDisplay()
{
	var doc = document;
	doc.browserLogInt(doc.DEBUG, "updateFIRboundariesDisplay():" + doc.cfg.overlayFIRboundaries);

	if (doc.cfg.overlayFIRboundaries)
	{
		if (null == doc.FIRboundariesLayer)
		{
			var kmlUrl = doc.appSettings.appsettings['overlay.FIR.kml'];
			browserLogInt(doc.INFO, " Opening overlay:" + kmlUrl);
			// var kmlUrl =
			// "http://137.75.133.19/madisPublic1/data/kml0/artcc.kml";
			doc.FIRboundariesLayer = new doc.KMLLayer(kmlUrl,
				{
					opacity: 0.5
				});

			if (null != doc.airportsLayer)
			{
				doc.map.removeLayer(doc.airportsLayer);
				doc.airports = {};
			}
			if (null != doc.raobLayer)
			{
				doc.map.removeLayer(doc.raobLayer);
				doc.raobs = {};
			}
			if (null != doc.vorLayer)
			{
				doc.map.removeLayer(doc.vorLayer);
				doc.vors = {};
			}
			doc.map.addLayer(doc.FIRboundariesLayer);

			doc.FIRboundariesLayer.on("load", function ()
			{
				doc.domStyle.set("loading", "display", "none");
			});
			browserLogInt(doc.INFO, "FIRboundariesLayer loaded.");
			doc.layerRedrawTimer = new doc.timing.Timer(1000);
			doc.layerRedrawTimer.onTick = function ()
			{
				doc.layerRedrawTimer.stop();
				browserLogInt(doc.INFO, "Redrawing layers ...");
				if (null != doc.airportsLayer)
				{
					doc.airportsLayer = null;
					updateAirportsDisplay();
				}
				if (null != doc.raobLayer)
				{
					doc.raobLayer = null;
					updateRAOBsDisplay();
				}
				if (null != doc.vorLayer)
				{
					doc.vorLayer = null;
					updateVORsDisplay();
				}
			}
			doc.layerRedrawTimer.start();
		}
		doc.FIRboundariesLayer.show();
	} else
	{
		if (null != doc.FIRboundariesLayer)
		{
			doc.FIRboundariesLayer.hide();
		}
	}
}

function createVORSymbol(vor)
{
	var doc = document;

	try
	{
		var pt = new doc.Point(vor.lon, vor.lat);
		var location = doc.webMercatorUtils.geographicToWebMercator(pt);
		var gr = new doc.Graphic(location, doc.vorSymbol);
		gr["vor"] = vor;
		doc.vorLayer.add(gr);
	} catch (err)
	{
		browserLogInt(doc.ERROR, "createVORSymbol(), Exception:" + err.message);
	}
}
