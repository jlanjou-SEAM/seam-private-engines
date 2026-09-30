loadESRIFunctions();

function loadESRIFunctions()
{
	var doc = document;

	doc.loadEsri = loadEsri;
	doc.loadMap = loadMap;
	// doc.createMapInt = createMapInt;
	doc.createStationSymbol = createStationSymbol;
	doc.setGraphicText = setGraphicText;
	doc.setGraphicDefault = setGraphicDefault;
	doc.setGraphicDefaultWithQC = setGraphicDefaultWithQC;
	doc.setGraphicWindbarb = setGraphicWindbarb;
	doc.clearAllStations = clearAllStations;
	doc.browserLogInt = browserLogInt;
	doc.browserAlertInt = browserAlertInt;
	doc.GwtLatLng = GwtLatLng;
	doc.GwtLatLngBounds = GwtLatLngBounds;
	doc.createKMLLayer = createKMLLayer;
	doc.hideKMLLayer = hideKMLLayer;
	doc.showKMLLayer = showKMLLayer;
	doc.addressSearch = addressSearch;
	doc.testWindBarb = testWindBarb;
	// alert("Loading ESRI functions ...");

	// ALL STATIONS RENDERING - experimental - Gopa - Dec 2nd 2015
	doc.renderAllStations = renderAllStations;
}

function browserLogInt(text)
{
	console.log(text);
}

function browserAlertInt(text)
{
	alert(text);
}

function loadEsri()
{
	var doc = document;

	doc.esriLoaded = false;

	doc.mapLoaded = false;
	require([ "esri/map", "esri/dijit/BasemapGallery", "esri/layers/KMLLayer",
			"esri/tasks/locator", "dojo/_base/array", "dojo/parser",
			"esri/symbols/SimpleMarkerSymbol", "esri/symbols/SimpleLineSymbol",
			"esri/symbols/SimpleFillSymbol", "esri/symbols/TextSymbol",
			"esri/symbols/Font", "esri/graphic", "esri/geometry/Point",
			"esri/geometry/ScreenPoint", "esri/geometry/Circle",
			"esri/geometry/Polygon", "esri/geometry/Polyline",
			"esri/geometry/webMercatorUtils", "esri/geometry/screenUtils",
			"esri/Color", "dojo/domReady!" ], function(Map, BasemapGallery,
			KMLLayer, Locator, arrayUtils, parser, SimpleMarkerSymbol,
			SimpleLineSymbol, SimpleFillSymbol, TextSymbol, Font, Graphic,
			Point, ScreenPoint, Circle, Polygon, Polyline, webMercatorUtils,
			screenUtils, Color)
	{
		doc.Map = Map;
		doc.BasemapGallery = BasemapGallery;
		doc.KMLLayer = KMLLayer;
		doc.Locator = Locator;
		doc.arrayUtils = arrayUtils;
		doc.parser = parser;
		doc.SimpleMarkerSymbol = SimpleMarkerSymbol;
		doc.SimpleLineSymbol = SimpleLineSymbol;
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
		doc.stationGraphics = {};
		doc.stationWindbarbs = {};
		doc.KMLLayers = {};
		doc.esriLoaded = true;
		doc.defaultBorderColor = new Color([ 200, 200, 200 ]);
		browserLogInt("Esri loaded!");
	});
}

function loadMap(lat, lng, zoom)
{
	var doc = document;

    console.log("H5x");

    var notusbasemaps = [];
    var usbasemaps = [];
    var customBasemap;
    console.log("H5b");
	var map = new doc.Map("mapDiv",
	{
		basemap : "streets",
		center : [ lng, lat ],
		zoom : zoom
	});
	doc.map = map;
	doc.map.on("load", onLoadMap);

	var basemapGallery = new doc.BasemapGallery(
	{
		map : map,
		basemap : "hybrid"
	}, "basemapGallery");
    console.log("H5");
    console.log("H5b?");
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

    //	basemapGallery.startup();

//	doc.parser.parse();

	function onLoadMap()
	{
		browserLogInt("Map loaded!");
		doc.myLocator = new doc.Locator(
				"https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer");
		doc.myLocator.outSpatialReference = doc.map.spatialReference;
		doc.mapLoaded = true;
		// doc.testWindBarb();
	}
}

function GwtLatLng(lat, lng)
{
	this.lat = lat;
	this.lng = lng;
}

function GwtLatLngBounds(geographicExtent)
{
	this.geographicExtent = geographicExtent;
	this.ne = new GwtLatLng(geographicExtent.ymax, geographicExtent.xmax);
	this.sw = new GwtLatLng(geographicExtent.ymin, geographicExtent.xmin);
}

function createStationSymbol(name, lat, lon)
{
	var doc = document;

	try
	{
		var pt = new doc.Point(lon, lat);
		var location = doc.webMercatorUtils.geographicToWebMercator(pt);
		// browserLogInt("Station:pt:" + JSON.stringify(pt));
		// browserLogInt("Station:location:" + JSON.stringify(location));
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
		browserLogInt("Exception:" + err.message);
	}
}

function clearAllStations()
{
	var doc = document;

	doc.map.graphics.clear();
	doc.stationGraphics = {};
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

function setGraphicWindbarb(name, clr, stationSizeLon, stationSizeLat,
		skyCovFillAngle, valKnots, deg)
{
	var doc = document;

	var wb = doc.stationWindbarbs[name];
	if (null != wb)
	{
		doc.map.graphics.remove(wb);
	}
	// var cl = doc.Color.fromHex(clr);
	var cl = doc.Color([ 206, 218, 213 ]);
	var bordersz = 0.1;
	if (skyCovFillAngle >= 0)
	{
		cl = doc.Color([ 23, 23, 23 ]);
		if (skyCovFillAngle > 0.1)
		{
			bordersz = skyCovFillAngle;
		}
	}
	var gr = doc.stationGraphics[name];
	var symbol = new doc.SimpleMarkerSymbol(
			doc.SimpleMarkerSymbol.STYLE_CIRCLE, 8, new doc.SimpleLineSymbol(
					doc.SimpleLineSymbol.STYLE_SOLID, cl, bordersz), cl);
	symbol.setColor(cl);
	symbol.setSize(10);
	// symbol.outline.setColor(cl);
	// symbol.outline.setSize(bordersz);
	gr.setSymbol(symbol);
	gr.draw();

	try
	{
		var polylineSymbol = new doc.SimpleLineSymbol(
				doc.SimpleLineSymbol.STYLE_SOLID,
				new doc.Color([ 102, 0, 51 ]), 2);

		var shape = new doc.Polyline(
		{
			"wkid" : 4326
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
		var sz = stationSizeLon;
		var p1x = gr.geometry.getLongitude() + sz * sinT;
		var p1y = gr.geometry.getLatitude() + sz * cosT;
		shape.addPath([
				[ gr.geometry.getLongitude(), gr.geometry.getLatitude() ],
				[ p1x, p1y ] ]);
		// browserLogInt("Barb, name:" + name + "deg:" + deg + ",lon:"
		// + gr.geometry.getLongitude() + ",lat:"
		// + gr.geometry.getLatitude() + ", sinT:" + sinT + ",cosT:"
		// + cosT + ",p1x:" + p1x + ",p1y:" + p1y);

		var barbsz = sz * 0.6;
		for (var i = 0; i < barbs; i++)
		{
			var barbdist = sz - (i * (sz / 8.0));

			var barb_org_x = gr.geometry.getLongitude() + (barbdist * sinT);
			var barb_org_y = gr.geometry.getLatitude() + (barbdist * cosT);
			var barb_end_x = barb_org_x + (barbsz * cosT);
			var barb_end_y = barb_org_y - (barbsz * sinT);
			shape.addPath([ [ barb_org_x, barb_org_y ],
					[ barb_end_x, barb_end_y ] ]);
		}
		if (halfbarb)
		{
			var barbdist = sz - (barbs * (sz / 8.0));

			var barb_org_x = gr.geometry.getLongitude() + (barbdist * sinT);
			var barb_org_y = gr.geometry.getLatitude() + (barbdist * cosT);
			var barb_end_x = barb_org_x + ((barbsz / 2.0) * cosT);
			var barb_end_y = barb_org_y - ((barbsz / 2.0) * sinT);
			shape.addPath([ [ barb_org_x, barb_org_y ],
					[ barb_end_x, barb_end_y ] ]);
		}
		var grwb = new doc.Graphic(shape, polylineSymbol);
		doc.stationWindbarbs[name] = grwb;
		doc.map.graphics.add(grwb);
	} catch (err)
	{
		browserLogInt("Exception:" + err.message);
	}
}

function testWindBarb()
{
	var doc = document;

	try
	{
		var polylineSymbol = new doc.SimpleLineSymbol(
				doc.SimpleLineSymbol.STYLE_SOLID,
				new doc.Color([ 102, 0, 51 ]), 4);

		var shape = new doc.Polyline(
		{
			"wkid" : 4326
		});
		shape.addPath([ [ -98.434, 39.509 ], [ -110, 39.509 ] ]);
		shape.addPath([ [ -98.434, 39.509 ], [ -98.434, 45.509 ] ]);
		var grwb = new doc.Graphic(shape, polylineSymbol);
		doc.map.graphics.add(grwb);
	} catch (err)
	{
		browserLogInt("Exception:" + err.message);
	}
}

function createKMLLayer(name, kmlUrl)
{
	var doc = document;

	browserLogInt("Loading KML:" + name + " from:" + kmlUrl);

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
		kml.on("load", function()
		{
			browserLogInt("KML loaded!");
			// arrayUtils
		});
	} catch (err)
	{
		browserLogInt("Exception:" + err.message);
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

	browserLogInt("addressSearch(" + addr + ")");
	doc.addressSearchResult = null;
	try
	{
		doc.myLocator.on("address-to-locations-complete", function(evt)
		{
			browserLogInt("Address search complete!");
			browserLogInt(JSON.stringify(evt));
			if (evt.addresses.length > 0)
			{
				doc.addressSearchResult = evt.addresses[0].location;
			}
		});
		doc.myLocator.on("error", function(evt)
		{
			browserLogInt("Address Search Error!");
		});
		var addrobj =
		{
			"SingleLine" : addr
		};
		var options =
		{
			address : addrobj,
			outFields : [ "Loc_name" ]
		};
		doc.myLocator.addressToLocations(options);
	} catch (err)
	{
		browserLogInt("Exception:" + err.message);
	}
}

// ALL STATIONS RENDERING - experimental - Gopa - Dec 2nd 2015
function renderAllStations(result, stationSize)
{
	browserLogInt("renderAllStations(" + result.length + "," + stationSize + ")");
	var startTime = new Date();
	
	var doc = document;
	var sz = stationSize / 4.0;
	if (sz == undefined || sz < 1)
	{
		sz = 1;
	}
	var index = 0;
	clearAllStations();
	try
	{
		var stations = JSON.parse(result);
		var key;
		var clr = new doc.Color([ 0, 0, 255 ]);
		var symbol = new doc.SimpleMarkerSymbol(
				doc.SimpleMarkerSymbol.STYLE_CIRCLE, stationSize,
				new doc.SimpleLineSymbol(doc.SimpleLineSymbol.STYLE_SOLID, clr,
						1), clr);
		for (key in stations)
		{
			try
			{
				var pt = new doc.Point(stations[index].values[1],
						stations[index].values[0]);
				var location = doc.webMercatorUtils.geographicToWebMercator(pt);
				var gr = new doc.Graphic(location, symbol);
				doc.map.graphics.add(gr);
				index++;
			} catch (err)
			{
				browserLogInt("Exception:" + err.message);
			}
		}
		var endTime = new Date();
		var timeDiff = endTime - startTime;
		browserLogInt("Stations rendered:" + index + " in " + timeDiff + " ms");
		// browserLogInt(JSON.stringify(stations[0]));
		// browserLogInt(JSON.stringify(stations[1]));
	} catch (err)
	{
		browserLogInt("Exception:" + err.message);
	}
	return index;
}
