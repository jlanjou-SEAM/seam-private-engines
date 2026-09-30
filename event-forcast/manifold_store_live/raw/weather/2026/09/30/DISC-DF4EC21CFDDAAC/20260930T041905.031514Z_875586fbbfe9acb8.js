/**
 * NOAA-ESRL-GSD-MADIS Author: Gopakumar Padmanabhan (Gopa) Last Modified: Nov
 * 2nd, 2015
 * 
 */

function loadESRIFunctions()
{
	var doc = document;

	doc.createStationSymbol = createStationSymbol;
	// doc.createFlightDataPointSymbol = createFlightDataPointSymbol;
	doc.createFlightPathSymbol = createFlightPathSymbol;
	doc.createFlightPathSymbolSrv = createFlightPathSymbolSrv;
	doc.renderFpLinesForTailId = renderFpLinesForTailId;
	doc.geoDistance = geoDistance;
	doc.fastApproxGeoDistance = fastApproxGeoDistance;
	// doc.addFlightGraphic = addFlightGraphic;
	doc.setGraphicText = setGraphicText;
	doc.setGraphicDefault = setGraphicDefault;
	doc.setGraphicDefaultWithQC = setGraphicDefaultWithQC;
	doc.setGraphicWindbarb = setGraphicWindbarb;
	doc.clearAllStations = clearAllStations;
	doc.addFpLinesLayer = addFpLinesLayer;
	doc.browserAlertInt = browserAlertInt;
	doc.createKMLLayer = createKMLLayer;
	doc.hideKMLLayer = hideKMLLayer;
	doc.showKMLLayer = showKMLLayer;
	doc.addressSearch = addressSearch;
	doc.testWindBarb = testWindBarb;
	doc.getAcarColor = getAcarColor;
	doc.geoDistance = geoDistance;
	doc.browserLogInt(doc.DEBUG, "ESRI support functions loaded ...");
}

function loadEsri()
{
	var doc = document;

	require(["esri/map", "esri/dijit/BasemapGallery",
		"esri/layers/GraphicsLayer", "esri/layers/KMLLayer",
		"esri/tasks/locator", "esri/renderers/SimpleRenderer",
		"esri/symbols/SimpleMarkerSymbol", "esri/symbols/SimpleLineSymbol",
		"esri/symbols/PictureMarkerSymbol",
		"esri/symbols/SimpleFillSymbol", "esri/symbols/TextSymbol",
		"esri/symbols/Font", "esri/graphic", "esri/geometry/Point",
		"esri/geometry/ScreenPoint", "esri/geometry/Circle",
		"esri/geometry/Polygon", "esri/geometry/Polyline",
		"esri/geometry/webMercatorUtils", "esri/geometry/screenUtils",
		"esri/Color", "esri/request", "dojo/io-query",/*
															 * "esri/config",
															 * "esri/tasks/Geoprocessor",
															 * "esri/tasks/FeatureSet",
															 * "esri/layers/ArcGISTiledMapServiceLayer",
															 */"dijit/layout/TabContainer", "dojo/query", "dojo/dom-class", "dojo/domReady!", "dojo/ready"], function (Map, BasemapGallery, GraphicsLayer,
			KMLLayer, Locator, SimpleRenderer, SimpleMarkerSymbol,
			SimpleLineSymbol, PictureMarkerSymbol, SimpleFillSymbol,
			TextSymbol, Font, Graphic, Point, ScreenPoint, Circle, Polygon,
			Polyline, webMercatorUtils, screenUtils, Color, esriRequest,
			ioQuery, TabContainer, dojoQuery, domClass, ready
	/*
	 * esriConfig, geoprocessor, featureSet, tiledMapServiceLayer
	 */)
	{
		doc.Map = Map;
		doc.BasemapGallery = BasemapGallery;
		doc.GraphicsLayer = GraphicsLayer;
		doc.KMLLayer = KMLLayer;
		doc.Locator = Locator;
		doc.SimpleRenderer = SimpleRenderer;
		doc.SimpleMarkerSymbol = SimpleMarkerSymbol;
		doc.SimpleLineSymbol = SimpleLineSymbol;
		doc.PictureMarkerSymbol = PictureMarkerSymbol;
		doc.SimpleFillSymbol = SimpleFillSymbol;
		doc.TextSymbol = TextSymbol;
		doc.Font = Font;
		doc.Graphic = Graphic;
		doc.Point = Point;
		doc.ScreenPoint = ScreenPoint;
		doc.Circle = Circle;
		doc.Polygon = Polygon;
		doc.Polyline = Polyline;
		doc.webMercatorUtils = webMercatorUtils;
		doc.screenUtils = screenUtils;
		doc.Color = Color;
		doc.esriRequest = esriRequest;
		doc.ioQuery = ioQuery;
		doc.TabContainer = TabContainer;
		doc.dojoQuery = dojoQuery;
		doc.domClass = domClass;
		/*
		 * doc.esriConfig = esriConfig; doc.geoprocessor = geoprocessor;
		 * doc.featureSet = featureSet; doc.tiledMapServiceLayer =
		 * tiledMapServiceLayer;
		 */
		doc.stationGraphics = {};
		doc.stationWindbarbs = {};
		doc.KMLLayers = {};

		// fallback to proxy for non-CORS capable browsers
		// doc.esriConfig.defaults.io.corsEnabledServers
		// .push("services.arcgisonline.com");
		// doc.esriConfig.defaults.io.proxyUrl = "/proxy/";

		// doc.defaultBorderColor = new Color([ 45, 62, 200 ]);
		// doc.defaultBorderColor = new Color([ 80, 90, 200 ]);

		doc.upto5000Color = new Color("#A82323");
		doc.upto16000Color = new Color("#E26121");
		doc.upto28000Color = new Color("#E221B5");
		doc.upto39000Color = new Color("#3B44C7");
		doc.upto45000Color = new Color("#389BAF");
		doc.above45000Color = new Color("#2983DE");

		doc.windSpeedUpto10KnotsColor = new Color("#2983DE");
		doc.windSpeedUpto20KnotsColor = new Color("#389BAF");
		doc.windSpeedUpto40KnotsColor = new Color("#3B44C7");
		doc.windSpeedUpto60KnotsColor = new Color("#E221B5");
		doc.windSpeedUpto80KnotsColor = new Color("#E26121");
		doc.windSpeedAbove80KnotsColor = new Color("#A82323");

		doc.cb_ESRILoaded.set(true);
	});
}

function loadMap()
{
    var doc = document;

    try
    {
	var parts = window.location.href.split('?');
	if (null != parts && parts.length == 2)
	{
	    var url = window.location.href.split('?')[0];
	    var ss = window.location.href.split('?')[1];
	    var queryObject = doc.ioQuery.queryToObject(ss);
	    
	    console.log("URL queryObject:" + JSON.stringify(queryObject));
	    for (var key in queryObject)
	    {
		if (queryObject.hasOwnProperty(key))
		{
		    if (key == 'selectedDataSources')
		    {
			doc.cfg.selectedDataSources = [];
			var vals = queryObject[key];
			for (var prop in vals)
			{
			    if (vals.hasOwnProperty(prop))
			    {
				doc.cfg.selectedDataSources
				    .push(Number(vals[prop]));
			    }
			}
		    } else
			if (key == 'selectedSensors')
		    {
			doc.cfg.selectedSensors = queryObject[key];
		    } else
			if (queryObject[key] == 'true')
		    {
			doc.cfg[key] = true;
		    } else
			if (queryObject[key] == 'false')
		    {
			doc.cfg[key] = false;
		    } else
			if (isNaN(queryObject[key]))
		    {
			doc.cfg[key] = queryObject[key];
		    } else
		    {
			doc.cfg[key] = Number(queryObject[key]);
		    }
		}
	    }
	    console.log("URL doc.cfg:" + JSON.stringify(doc.cfg));
	}
    } catch (err)
    {
	console.log("URL parse exception:" + err.message);
    }
    console.log("H5x");

    var notusbasemaps = [];
    var usbasemaps = [];
    var customBasemap;
    console.log("H5b");
    var map = new doc.Map("mapDiv",
			  {
			      basemap: "streets",
			      center: [doc.cfg.CenterLON, doc.cfg.CenterLAT],
			      zoom: doc.cfg.Zoom
			  });
    doc.map = map;
    doc.map.on("load", onLoadMap);

    var basemapGallery = new doc.BasemapGallery(
	{
	    map: map,
	    basemap: "hybrid"
	}, "basemapGallery");
    console.log("H5");
    console.log("H5b");
    basemapGallery.on("load", function() {
        console.log("H5c");
        var basemap2, basemaps2 = basemapGallery.basemaps.filter(function(basemap){
            if(basemap.title === "USGS National Map") {
                console.log("BM ",basemap.title,basemap.id);
                customBasemap = basemap;
                usbasemaps.push(basemap);
            }
            else {
                
                if(basemap.title === "USA Topo Maps") {
                    console.log("TOPE ",basemap.title,basemap.id);
                }
                else {
                    notusbasemaps.push(basemap);
                    //                    console.log("T",basemap.title,basemap.id);
                    //                    basemapGallery.remove(basemap.id);
                }
            }
            return basemap.title === "USGS National Map";
        });
        console.log("CT",customBasemap.title);
        if (usbasemaps.length > 0) {
            basemapGallery.select(customBasemap.id);
        }
        console.log("???",usbasemaps.length,notusbasemaps.length);
        notusbasemaps.forEach(function(element) {
            basemapGallery.remove(element.id);
        });
        console.log("DONE1c");
        var basemap3, basemaps3 = basemapGallery.basemaps.filter(function(basemap){
            if(basemap.title === "USGS National Map") {
                console.log("*M ",basemap.title,basemap.id);
            }
            else {
                console.log("*T",basemap.title,basemap.id);
            }
        });
    });
    console.log("DONE2");
    
    console.log("H6");
    basemapGallery.startup();

	// doc.parser.parse();
    console.log("DONEX");
}

function onLoadMap()
{
	var doc = document;

	doc.myLocator = new doc.Locator(
		"https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer");
	doc.myLocator.outSpatialReference = doc.map.spatialReference;
	doc.cb_MAPLoaded.set(true);
	doc.map.enableRubberBandZoom();

	doc.map.on("layer-remove", function (evt)
	{
		console.log('on layer remove:' + evt.layer.id);

	});
	doc.map.on("layer-add", function (evt)
	{
		console.log('on layer add:' + evt.layer.id);
	});

	addStationsLayer();
	addFpLinesLayer();
	addWindBarbsLayer();
}

function addStationsLayer()
{
	var doc = document;

	if (doc.stationsLayer)
	{
		doc.map.removeLayer(doc.stationsLayer);
	}

	var stationsLayer = new doc.GraphicsLayer(
		{
			id: "stationsLayer",
			opacity: 0.95
		});
	doc.stationsLayer = doc.map.addLayer(stationsLayer);

	doc.stationsLayer.on("click", OnMapGraphicsClick);
	doc.stationsLayer.on("mouse-over", OnMapGraphicsMouseOver);
	doc.stationsLayer.on("mouse-out", OnMapGraphicsMouseOut);
}

function addFpLinesLayer()
{
	var doc = document;

	if (doc.fpLinesLayer)
	{
		doc.map.removeLayer(doc.fpLinesLayer);
	}

	var fpLinesLayer = new doc.GraphicsLayer(
		{
			id: "fpLinesLayer",
			opacity: 0.95
		});
	doc.fpLinesLayer = doc.map.addLayer(fpLinesLayer);

	doc.fpLinesLayer.show();
	doc.fpLinesLayer.on("mouse-over", OnMapFpLinesLayerMouseOver);
	doc.fpLinesLayer.on("mouse-out", OnMapFpLinesLayerMouseOut);
	doc.fpLinesLayer.on("click", OnMapFpLinesLayerClick);
}

function addWindBarbsLayer()
{
	var doc = document;

	if (doc.windBarbsLayer)
	{
		doc.map.removeLayer(doc.windBarbsLayer);
	}

	var windBarbsLayer = new doc.GraphicsLayer(
		{
			id: "windBarbsLayer",
			opacity: 0.95
		});
	doc.windBarbsLayer = doc.map.addLayer(windBarbsLayer);

	doc.windBarbsLayer.show();
	// doc.windBarbsLayer.on("mouse-over", OnMapFpLinesLayerMouseOver);
	// doc.windBarbsLayer.on("mouse-out", OnMapFpLinesLayerMouseOut);
	// doc.windBarbsLayer.on("click", OnMapFpLinesLayerClick);
}

function clearAllStationsOrg()
{
	var doc = document;

	doc.map.graphics.clear();
	if (null != doc.fpLinesLayer)
	{
		doc.fpLinesLayer.clear();
	}
	doc.stationGraphics = {};
}

// works, but stations are displayed at wrong locxation
function clearAllStations()
{
	var doc = document;

	doc.stationsLayerLoaded = false;
	doc.stationGraphics = {};

	addStationsLayer();
	addFpLinesLayer();
	addWindBarbsLayer();
}

function browserAlertInt(text)
{
	alert(text);
}

function createStationSymbol(name, lat, lon)
{
	var doc = document;

	try
	{
		var pt = new doc.Point(lon, lat);
		var location = doc.webMercatorUtils.geographicToWebMercator(pt);
		// browserLogInt(doc.DEBUG, "Station:pt:" + JSON.stringify(pt));
		// browserLogInt(doc.DEBUG, "Station:location:" +
		// JSON.stringify(location));
		var defaultSymbol = new doc.SimpleMarkerSymbol(
			doc.SimpleMarkerSymbol.STYLE_SQUARE, 12,
			new doc.SimpleLineSymbol(doc.SimpleLineSymbol.STYLE_SOLID,
				doc.defaultBorderColor, 1), doc.defaultBorderColor);
		var textSymbol = new doc.TextSymbol(name).setColor(
			doc.defaultBorderColor).setAlign(doc.Font.ALIGN_START).setFont(
				new doc.Font("12pt").setWeight(doc.Font.WEIGHT_BOLD));
		var gr = new doc.Graphic(location, defaultSymbol);
		gr["station_name"] = name;
		gr["defaultSymbol"] = defaultSymbol;
		gr["textSymbol"] = textSymbol;
		doc.map.graphics.add(gr);
		doc.stationGraphics[name] = gr;
	} catch (err)
	{
		browserLogInt(doc.ERROR, "Exception:" + err.message);
	}
}

function createVORSymbol(name, lat, lon, clr)
{
	var doc = document;

	try
	{
		var pt = new doc.Point(lon, lat);
		var location = doc.webMercatorUtils.geographicToWebMercator(pt);
		// browserLogInt(doc.DEBUG, "Station:pt:" + JSON.stringify(pt));
		// browserLogInt(doc.DEBUG, "Station:location:" +
		// JSON.stringify(location));
		var defaultSymbol = new doc.SimpleMarkerSymbol(
			doc.SimpleMarkerSymbol.STYLE_CIRCLE, 8,
			new doc.SimpleLineSymbol(doc.SimpleLineSymbol.STYLE_SOLID, clr,
				1), clr);
		var textSymbol = new doc.TextSymbol(name).setColor(clr).setAlign(
			doc.Font.ALIGN_START).setFont(
				new doc.Font("12pt").setWeight(doc.Font.WEIGHT_BOLD));
		var gr = new doc.Graphic(location, defaultSymbol);
		gr["station_name"] = name;
		gr["defaultSymbol"] = defaultSymbol;
		gr["textSymbol"] = textSymbol;
		doc.map.graphics.add(gr);
		doc.stationGraphics[name] = gr;
	} catch (err)
	{
		browserLogInt(doc.ERROR, "Exception:" + err.message);
	}
}

function createFlightPathSymbol(tail_id, clr, pdMiles)
{
	var doc = document;
	var path = doc.tail_id_paths[tail_id];
	// doc.browserLogInt(doc.DEBUG, "createFlightPathSymbol(" + tail_id
	// + ") for # acars:" + path.length + " ...");
	doc.acarsRendered += path.length;
	var symbolSize = 8 * (doc.map.getZoom() / 5.0);
	if (symbolSize < 8)
	{
		symbolSize = 8;
	}
	if (symbolSize > 16)
	{
		symbolSize = 16;
	}
	try
	{
		// var defaultSymbol = new doc.SimpleMarkerSymbol(
		// doc.SimpleMarkerSymbol.STYLE_CIRCLE, 3,
		// new doc.SimpleLineSymbol(doc.SimpleLineSymbol.STYLE_SOLID, clr,
		// 1), clr);
		var clr = doc.Color([59, 119, 189]);
		var polylineSymbol = new doc.SimpleLineSymbol(
			doc.SimpleLineSymbol.STYLE_SOLID, clr, 1);

		var shape = new doc.Polyline(
			{
				"wkid": 4326
			});
		if (path.length < 3)
		{
			for (var i = 1; i < path.length; i++)
			{
				var acar = path[i];
				if (acar[3] >= doc.cfg.altMinFilter
					&& acar[3] <= doc.cfg.altMaxFilter)
				{
					var clr = getAcarColor(acar);
					var defaultSymbol = new doc.SimpleMarkerSymbol(
						doc.SimpleMarkerSymbol.STYLE_CIRCLE, symbolSize,
						new doc.SimpleLineSymbol(
							doc.SimpleLineSymbol.STYLE_SOLID, clr, 1),
						clr);
					var pt = new doc.Point(acar[2], acar[1]);
					var location = doc.webMercatorUtils
						.geographicToWebMercator(pt);
					// defaultSymbol.setColor(getAcarColor(path[i][2]));
					var gr = new doc.Graphic(location, defaultSymbol);
					gr["acar"] = acar;
					doc.map.graphics.add(gr);
					++doc.fewAcarsPerTailIdRendred;
				}
				// else
				// {
				// browserLogInt(doc.DEBUG, "alt filtered out, alt:" + acar[3]);
				// }
			}
			return;
		}

		for (var i = 1; i < path.length; i++)
		{
			var acarPrev = null;
			if (i > 0)
			{
				acarPrev = path[i - 1];
			}
			var acar = path[i];
			if (acar[3] >= doc.cfg.altMinFilter
				&& acar[3] <= doc.cfg.altMaxFilter)
			{
				if (/*
					 * path[i][2] >= 8000.0 &&
					 */geoDistance(prevPoint[1], prevPoint[2], acar[1], acar[2]) > pdMiles)
				{
					var gr = null;
					if (doc.windBarbChecked)
					{
						gr = setGraphicWindbarb(path[i]);
					} else
					{
						var clr = getAcarColor(acar);
						var defaultSymbol = new doc.SimpleMarkerSymbol(
							doc.SimpleMarkerSymbol.STYLE_CIRCLE,
							symbolSize, new doc.SimpleLineSymbol(
								doc.SimpleLineSymbol.STYLE_SOLID, clr,
								1), clr);

						var pt = new doc.Point(acar[2], acar[1]);
						var location = doc.webMercatorUtils
							.geographicToWebMercator(pt);
						// defaultSymbol.setColor(getAcarColor(path[i][2]));
						gr = new doc.Graphic(location, defaultSymbol);
						if (i > 1)
						{
							shape.addPath([[acarPrev[2], acarPrev[1]],
							[acar[2], acar[1]]]);
						}
					}
					gr["acar"] = acar;
					doc.map.graphics.add(gr);
					++doc.pdAcarsRendered;
					prevPoint = acar;
				}
			}
			// else
			// {
			// browserLogInt(doc.DEBUG, "alt filtered out, alt:" + acar[3]);
			// }
		}
		var grFlightPath = new doc.Graphic(shape, polylineSymbol);
		doc.map.graphics.add(grFlightPath);
	} catch (err)
	{
		browserLogInt(doc.ERROR, "Exception:" + err.message);
	}
}

function shouldDrawAcarBasedOnSensorSelected(acar)
{
	var doc = document;

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
		return incl;
	} else
	{
		return false;
	}
}

function createFlightPathSymbolSrv(tail_id, clr, fplines, alwaysDrawFpLines)
{
	var doc = document;
	var path = doc.tail_id_paths[tail_id];

	/*
	if (doc.logAll)
	{
		doc.browserLogInt(doc.DEBUG, "createFlightPathSymbolSrv() tail_id:" + tail_id + ",fplines:" +
			fplines + ",# acars:" + path.length + ",altMinFilter:" + doc.cfg.altMinFilter + ",altMaxFilter:" + doc.cfg.altMaxFilter);
		doc.browserLogInt(doc.DEBUG, JSON.stringify(path, null, 2));
	}
	*/

	var sensorAll = doc.cfg.selectedSensors.includes("All");

	// browserLogInt(doc.INFO, "createFlightPathSymbolSrv(" + tail_id + "),acars:" + path.length);

	try
	{
		var sp_lastRendered = null;
		for (var i = 0; i < path.length; i++)
		{
			var acar = path[i];

			if (true == acar.rendered)
			{
				continue;
			}

			if (sensorAll || shouldDrawAcarBasedOnSensorSelected(acar))
			{
				/*
				if (doc.logAll)
				{
					doc.browserLogInt(doc.DEBUG, "\t" + i + "\ttail_id:" + tail_id + "\tacar:" + JSON.stringify(acar));
				}
				*/

				if (alwaysDrawFpLines || (acar.elev >= doc.cfg.altMinFilter
					&& acar.elev <= doc.cfg.altMaxFilter))
				{
					var acarPrev = null;
					if (i > 0)
					{
						acarPrev = path[i - 1];
					}
					var gr = null;
					var pt = new doc.Point(acar.lon, acar.lat);
					var sp = doc.map.toScreen(pt);
					if (doc.curZoom >= 10
						|| null == sp_lastRendered
						|| Math.abs(sp.x - sp_lastRendered.x) > doc.minSymbolSpacingPx
						|| Math.abs(sp.y - sp_lastRendered.y) > doc.minSymbolSpacingPx)
					{
						var clr = getAcarColor(acar);
						var location = doc.webMercatorUtils
							.geographicToWebMercator(pt);
						doc.defaultSymbol.setColor(clr);
						gr = new doc.Graphic(location, doc.defaultSymbol);
						gr["acar"] = acar;
						//doc.map.graphics.add(gr);
						doc.stationsLayer.add(gr);
						sp_lastRendered = sp;

						if (doc.cfg.windBarbChecked)
						{
							grwb = setGraphicWindbarb(acar);
							grwb["acar"] = acar;
							doc.windBarbsLayer.add(grwb);

							if (true === doc.onlyCARSWithSounding && !acar.kvmap.s)
							{
								grwb.hide();
							}
						}
						// var sp = doc.map.toScreen(pt);
						// var myCircle = new paper.Path.Circle(new
						// paper.Point(sp.x, sp.y), 4);
						// myCircle.fillColor = 'red';

						if (true === doc.onlyCARSWithSounding && !acar.kvmap.s)
						{
							gr.hide();
						}
						else
						{
							++doc.acarsRendered;
						}
					}

					if (fplines)
					{
						if (i > 0)
						{
							var dist = geoDistance(acarPrev.lat, acarPrev.lon,
								acar.lat, acar.lon);
							browserLogInt(doc.INFO, 'dist:' + dist + ",fpLinesMaxDist:" + doc.fpLinesMaxDist);
							if (dist > 1
								&& (alwaysDrawFpLines || (dist < doc.fpLinesMaxDist || dist < 20)))
							{
								var shape = new doc.Polyline(
									{
										"wkid": 4326
									});
								shape.addPath([[acarPrev.lon, acarPrev.lat],
								[acar.lon, acar.lat]]);
								doc.polylineSymbol.setColor(clr);
								var grFlightPath = new doc.Graphic(shape,
									doc.polylineSymbol);
								doc.fpLinesLayer.add(grFlightPath);
								grFlightPath["tail_id"] = tail_id;
							}
						}
					}
				}
			}
		}
	} catch (err)
	{
		browserLogInt(doc.ERROR, "Exception:" + err.message);
	}
}

function renderFpLinesForTailId(tail_id)
{
	var doc = document;
	var path = doc.tail_id_paths[tail_id];
	var sensorAll = doc.cfg.selectedSensors.includes("All");

	// browserLogInt(doc.INFO, "renderFpLinesForTailId(" + tail_id + "),acars:" + path.length);

	try
	{
		var sp_lastRendered = null;
		var fpsegs = 0;
		for (var i = 0; i < path.length; i++)
		{
			var acar = path[i];

			if (sensorAll || shouldDrawAcarBasedOnSensorSelected(acar))
			{
				if (acar.elev >= doc.cfg.altMinFilter && acar.elev <= doc.cfg.altMaxFilter)
				{
					var acarPrev = null;
					if (i > 0)
					{
						acarPrev = path[i - 1];
						var dist = geoDistance(acarPrev.lat, acarPrev.lon, acar.lat, acar.lon);
						// browserLogInt(doc.INFO, 'dist:' + dist + ",fpLinesMaxDist:" + doc.fpLinesMaxDist);
						if (dist > 1)
						{
							var clr = getAcarColor(acar);
							var shape = new doc.Polyline(
								{
									"wkid": 4326
								});
							shape.addPath([[acarPrev.lon, acarPrev.lat],
							[acar.lon, acar.lat]]);
							var polylineSymbol = new doc.SimpleLineSymbol(
								doc.SimpleLineSymbol.STYLE_DOT, clr, 2);
							var grFlightPath = new doc.Graphic(shape,
								polylineSymbol);
							doc.fpLinesLayer.add(grFlightPath);
							grFlightPath["tail_id"] = tail_id;
							++fpsegs;
						}
					}
				}
			}
			// browserLogInt(doc.INFO, "\tfpsegs:" + fpsegs);
		}
	} catch (err)
	{
		browserLogInt(doc.ERROR, "Exception:" + err.message);
	}
}

function createSelectedFpLinesSymbol(tail_id)
{
	var doc = document;
	var path = doc.tail_id_paths[tail_id];

	try
	{
		var shape = new doc.Polyline(
			{
				"wkid": 4326
			});
		for (var i = 0; i < path.length; i++)
		{
			var acar = path[i];
			if (acar[3] >= doc.cfg.altMinFilter
				&& acar[3] <= doc.cfg.altMaxFilter)
			{
				var acarPrev = null;
				if (i > 0)
				{
					acarPrev = path[i - 1];
					shape.addPath([[acarPrev[2], acarPrev[1]],
					[acar[2], acar[1]]]);
				}
			}
		}
		var grFlightPath = new doc.Graphic(shape, doc.fpSelectedPolylineSymbol);
		doc.fpLinesLayer.add(grFlightPath);
		grFlightPath["tail_id"] = tail_id;
		doc.selectedFpGraphic = grFlightPath;
	} catch (err)
	{
		browserLogInt(doc.ERROR, "Exception:" + err.message);
	}
}

function geoDistance(lat1, lon1, lat2, lon2)
{
	var radlat1 = Math.PI * lat1 / 180.0;
	var radlat2 = Math.PI * lat2 / 180.0;
	var theta = lon1 - lon2;
	var radtheta = Math.PI * theta / 180.0;
	var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1)
		* Math.cos(radlat2) * Math.cos(radtheta);
	dist = Math.acos(dist);
	dist = dist * 180 / Math.PI;
	dist = dist * 60 * 1.1515;
	return dist;
}

function fastApproxGeoDistance(lat, lng, lat0, lng0)
{
	var deglen = 110.25;
	var x = lat - lat0;
	var y = (lng - lng0) * cos(lat0);
	return deglen * sqrt(x * x + y * y);
}

function setGraphicText(name, clr, txt)
{
	var doc = document;

	var wb = doc.stationWindbarbs[name];
	if (null != wb)
	{
		doc.map.graphics.remove(wb);
	}
	var cl = doc.Color.fromHex(clr);
	var gr = doc.stationGraphics[name];
	var symbol = gr["textSymbol"];
	symbol.setColor(cl);
	symbol.setText(txt);
	gr.setSymbol(symbol);
	gr.draw();
}

function setGraphicDefault(name, clr, sz)
{
	var doc = document;

	var wb = doc.stationWindbarbs[name];
	if (null != wb)
	{
		doc.map.graphics.remove(wb);
	}
	var cl = doc.Color.fromHex(clr);
	var gr = doc.stationGraphics[name];
	if (undefined != gr)
	{
		var symbol = gr["defaultSymbol"];
		symbol.setColor(cl);
		symbol.setSize(sz);
		symbol.outline.setColor(doc.defaultBorderColor);
		gr.setSymbol(symbol);
		gr.draw();
	}
}

function setGraphicDefaultWithQC(name, clr, sz, borderClr, borderSz)
{
	var doc = document;

	var wb = doc.stationWindbarbs[name];
	if (null != wb)
	{
		doc.map.graphics.remove(wb);
	}
	var cl = doc.Color.fromHex(clr);
	var brcl = doc.Color.fromHex(borderClr);
	var gr = doc.stationGraphics[name];
	var symbol = gr["defaultSymbol"];
	symbol.setColor(cl);
	symbol.setSize(sz);
	symbol.outline.setWidth(borderSz).setColor(brcl);
	gr.setSymbol(symbol);
	gr.draw();
}

function setGraphicWindbarb(acar)
{
	var doc = document;

	browserLogInt(doc.DEBUG, "setGraphicWindbarb(), acar:\n" + JSON.stringify(acar, null, 2));

	var grwb = null;

	var lat = acar.lat;
	var lon = acar.lon;
	var deg = acar.kvmap.DD;
	var valKnots = acar.kvmap.FF * 1.94384;

	// var cl = doc.Color([ 206, 218, 213 ]);
	var cl = getAcarColor(acar);
	var bordersz = 0.1;

	try
	{
		// var polylineSymbol = new doc.SimpleLineSymbol(
		// doc.SimpleLineSymbol.STYLE_SOLID, cl, 1);

		var shape = new doc.Polyline(
			{
				"wkid": 4326
			});

		var cosT = Math.cos(deg * (Math.PI / 180.0));
		var sinT = Math.sin(deg * (Math.PI / 180.0));
		var pendants = (valKnots / 50) | 0; // convert to int, the javascript
		var barbs = ((valKnots - (pendants * 50)) / 10) | 0; // convert to
		// int, the
		// javascript
		// way
		var halfbarb = false;
		if ((valKnots - ((pendants * 50) + (barbs * 10))) >= 4.99)
		{
			halfbarb = true;
		}

		var sz = doc.windBarbSz;
		var p1x = lon + sz * sinT;
		var p1y = lat + sz * cosT;
		shape.addPath([[lon, lat], [p1x, p1y]]);
		// browserLogInt(doc.DEBUG, "\taddPath(" + lat + "," + lon + "," + p1x
		// + "," + p1y + ")");

		var barbsz = sz * 0.6;
		var pendantspace = sz / 5.0;
		var barbspace = sz / 10.0;

		for (var i = 0; i < pendants; i++)
		{
			var dist_start = sz - (i * pendantspace);
			var dist_mid = dist_start - (pendantspace / 2.0);
			var dist_end_0 = dist_start - (pendantspace * 0.25);
			var dist_end_1 = dist_start - (pendantspace * 0.5);
			var dist_end_2 = dist_start - (pendantspace * 0.75);
			var dist_end_3 = dist_start - pendantspace;

			var start_x = lon + (dist_start * sinT);
			var start_y = lat + (dist_start * cosT);
			var tip_x = start_x + (barbsz * cosT);
			var tip_y = start_y - (barbsz * sinT);
			/*
			 * var mid_x_atline = lon + (dist_mid * sinT); var mid_y_atline =
			 * lat + (dist_mid * cosT); var mid_x = mid_x_atline + (barbsz *
			 * cosT); var mid_y = mid_y_atline - (barbsz * sinT);
			 */
			var end_x_0 = lon + (dist_end_0 * sinT);
			var end_y_0 = lat + (dist_end_0 * cosT);
			var end_x_1 = lon + (dist_end_1 * sinT);
			var end_y_1 = lat + (dist_end_1 * cosT);
			var end_x_2 = lon + (dist_end_2 * sinT);
			var end_y_2 = lat + (dist_end_2 * cosT);
			var end_x_3 = lon + (dist_end_3 * sinT);
			var end_y_3 = lat + (dist_end_3 * cosT);

			shape.addPath([[start_x, start_y], [tip_x, tip_y],
			[end_x_0, end_y_0], [end_x_1, end_y_1],
			[tip_x, tip_y], [end_x_2, end_y_2],
			[end_x_3, end_y_3], [tip_x, tip_y]]);
		}

		var offset = 0.0;
		if (pendants > 0)
		{
			offset = (pendantspace * pendants) + barbspace;
		}
		for (var i = 0; i < barbs; i++)
		{
			var barbdist = sz - offset - (i * (sz / 8.0));

			var barb_org_x = lon + (barbdist * sinT);
			var barb_org_y = lat + (barbdist * cosT);
			var barb_end_x = barb_org_x + (barbsz * cosT);
			var barb_end_y = barb_org_y - (barbsz * sinT);
			shape.addPath([[barb_org_x, barb_org_y],
			[barb_end_x, barb_end_y]]);
		}
		if (halfbarb)
		{
			var barbdist = sz - (barbs * (sz / 8.0));

			var barb_org_x = lon + (barbdist * sinT);
			var barb_org_y = lat + (barbdist * cosT);
			var barb_end_x = barb_org_x + ((barbsz / 2.0) * cosT);
			var barb_end_y = barb_org_y - ((barbsz / 2.0) * sinT);
			shape.addPath([[barb_org_x, barb_org_y],
			[barb_end_x, barb_end_y]]);
		}
		doc.polylineSymbol_wb.setColor(cl);
		grwb = new doc.Graphic(shape, doc.polylineSymbol_wb);
	} catch (err)
	{
		browserLogInt(doc.ERROR, "Exception:" + err.message);
	}
	return grwb;
}

function setGraphicWindbarb_old(acar)
{
	var doc = document;
	var grwb = null;

	var lat = acar[1];
	var lon = acar[2];
	var deg = acar[5];
	var valKnots = acar[6];

	// browserLogInt(doc.DEBUG, "setGraphicWindbarb:" + ",lat:" + lat + ",lon:"
	// + lon + ",deg:" + deg + ",valKnots:" + valKnots);

	// var cl = doc.Color([ 206, 218, 213 ]);
	var cl = getAcarColor(acar);
	var bordersz = 0.1;

	try
	{
		// var polylineSymbol = new doc.SimpleLineSymbol(
		// doc.SimpleLineSymbol.STYLE_SOLID, cl, 1);

		var shape = new doc.Polyline(
			{
				"wkid": 4326
			});

		var cosT = Math.cos(deg * (Math.PI / 180.0));
		var sinT = Math.sin(deg * (Math.PI / 180.0));
		var barbs = (valKnots / 10) | 0; // convert to int, the javascript
		// way
		var halfbarb = false;
		if ((valKnots - (barbs * 10)) >= 4.99)
		{
			halfbarb = true;
		}

		var sz = doc.windBarbSz;
		var p1x = lon + sz * sinT;
		var p1y = lat + sz * cosT;
		shape.addPath([[lon, lat], [p1x, p1y]]);
		// browserLogInt(doc.DEBUG, "\taddPath(" + lat + "," + lon + "," + p1x
		// + "," + p1y + ")");

		var barbsz = sz * 0.6;
		for (var i = 0; i < barbs; i++)
		{
			var barbdist = sz - (i * (sz / 8.0));

			var barb_org_x = lon + (barbdist * sinT);
			var barb_org_y = lat + (barbdist * cosT);
			var barb_end_x = barb_org_x + (barbsz * cosT);
			var barb_end_y = barb_org_y - (barbsz * sinT);
			shape.addPath([[barb_org_x, barb_org_y],
			[barb_end_x, barb_end_y]]);
		}
		if (halfbarb)
		{
			var barbdist = sz - (barbs * (sz / 8.0));

			var barb_org_x = lon + (barbdist * sinT);
			var barb_org_y = lat + (barbdist * cosT);
			var barb_end_x = barb_org_x + ((barbsz / 2.0) * cosT);
			var barb_end_y = barb_org_y - ((barbsz / 2.0) * sinT);
			shape.addPath([[barb_org_x, barb_org_y],
			[barb_end_x, barb_end_y]]);
		}
		doc.polylineSymbol_wb.setColor(cl);
		grwb = new doc.Graphic(shape, doc.polylineSymbol_wb);
	} catch (err)
	{
		browserLogInt(doc.ERROR, "Exception:" + err.message);
	}
	return grwb;
}

function testWindBarb()
{
	var doc = document;

	try
	{
		var polylineSymbol = new doc.SimpleLineSymbol(
			doc.SimpleLineSymbol.STYLE_SOLID,
			new doc.Color([102, 0, 51]), 4);

		var shape = new doc.Polyline(
			{
				"wkid": 4326
			});
		shape.addPath([[-98.434, 39.509], [-110, 39.509]]);
		shape.addPath([[-98.434, 39.509], [-98.434, 45.509]]);
		var grwb = new doc.Graphic(shape, polylineSymbol);
		doc.map.graphics.add(grwb);
	} catch (err)
	{
		browserLogInt(doc.ERROR, "Exception:" + err.message);
	}
}

function createKMLLayer(name, kmlUrl)
{
	var doc = document;

	browserLogInt(doc.INFO, "Loading KML:" + name + " from:" + kmlUrl);

	try
	{
		var kml = new doc.KMLLayer(kmlUrl);
		// var kml = new doc.KMLLayer(kmlUrl,
		// {
		// outSR : new esri.SpatialReference(
		// {
		// wkid : 26912
		// })
		// });
		doc.map.addLayer(kml);
		doc.KMLLayers[name] = kml;
		kml.on("load", function ()
		{
			browserLogInt(doc.INFO, "KML loaded!");
			arrayUtils
		});
	} catch (err)
	{
		browserLogInt(doc.ERROR, "Exception:" + err.message);
	}
}

function hideKMLLayer(name)
{
	var doc = document;
	doc.KMLLayers[name].hide();
}

function showKMLLayer(name)
{
	var doc = document;
	doc.KMLLayers[name].show();
}

function addressSearch(addr)
{
	var doc = document;

	browserLogInt(doc.INFO, "addressSearch(" + addr + ")");
	doc.addressSearchResult = null;
	try
	{
		doc.myLocator.on("address-to-locations-complete", function (evt)
		{
			browserLogInt(doc.INFO, "Address search complete!");
			browserLogInt(doc.DEBUG, JSON.stringify(evt));
			if (evt.addresses.length > 0)
			{
				doc.addressSearchResult = evt.addresses[0].location;
			}
		});
		doc.myLocator.on("error", function (evt)
		{
			browserLogInt(doc.ERROR, "Address Search Error!");
		});
		var addrobj =
		{
			"SingleLine": addr
		};
		var options =
		{
			address: addrobj,
			outFields: ["Loc_name"]
		};
		doc.myLocator.addressToLocations(options);
	} catch (err)
	{
		browserLogInt(doc.ERROR, "Exception:" + err.message);
	}
}

function geoDistance(lat1, lon1, lat2, lon2, unit)
{
	var radlat1 = Math.PI * lat1 / 180
	var radlat2 = Math.PI * lat2 / 180
	var radlon1 = Math.PI * lon1 / 180
	var radlon2 = Math.PI * lon2 / 180
	var theta = lon1 - lon2
	var radtheta = Math.PI * theta / 180
	var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1)
		* Math.cos(radlat2) * Math.cos(radtheta);
	dist = Math.acos(dist)
	dist = dist * 180 / Math.PI
	dist = dist * 60 * 1.1515
	if (unit == "K")
	{
		dist = dist * 1.609344
	}
	if (unit == "N")
	{
		dist = dist * 0.8684
	}
	return dist
}

function getAcarColor(acar)
{
	var doc = document;

	// browserLogInt(doc.DEBUG, "getAcarColor:" + JSON.stringify(acar));
	if (true == doc.cfg.windSpeedChecked)
	{
		var windSpeed = acar.kvmap.FF;
		if (null == windSpeed || windSpeed < 10.0)
		{
			return doc.windSpeedUpto10KnotsColor;
		}
		if (windSpeed < 20.0)
		{
			return doc.windSpeedUpto20KnotsColor;
		}
		if (windSpeed < 40.0)
		{
			return doc.windSpeedUpto40KnotsColor;
		}
		if (windSpeed < 60.0)
		{
			return doc.windSpeedUpto60KnotsColor;
		}
		if (windSpeed < 80.0)
		{
			return doc.windSpeedUpto80KnotsColor;
		}
		return doc.windSpeedAbove80KnotsColor;
	} else
	{
		var alt = acar.elev;
		if (alt < 5000.0)
		{
			return doc.upto5000Color;
		}
		if (alt < 16000.0)
		{
			return doc.upto16000Color;
		}
		if (alt < 28000.0)
		{
			return doc.upto28000Color;
		}
		if (alt < 39000.0)
		{
			return doc.upto39000Color;
		}
		if (alt < 45000.0)
		{
			return doc.upto45000Color;
		}
		return doc.above45000Color;
	}
}
