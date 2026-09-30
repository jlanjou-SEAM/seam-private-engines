/**
 * NOAA-ESRL-GSD-MADIS Author: Donovan Allen Created: Jul 19th, 2017
 * 
 */

var MapRenderGL = {
    dataContainers: {},  // Maps color to data point container
    pathContainers: {},  // Maps color to flight path container
    cachedTextures: {},  // Maps colors to cached rendered textures of those
							// colors
    dataPoints: [],      // Tracks datapoints when map is moving
    dataPaths: [],       // Tracks paths when the map is moving
    colors: [],          // Array of passed colors
    indexes: {           // Used to remap points to new locations by mapping
							// color
        point: {},       // to the current remap index on that layer
        path: {}         //
    },                   //
    app: undefined,      // Pixi application handle
    map: undefined,      // ESRI map object handle
    mapDiv: undefined,   // ESRI map div
    rendered: {},        // Tracks which datapoints have already been
							// rendered in a current call
    moving: false,       // Tracks if the map is moving in any way
    hoverHandlers: [],   // Tracks if the map is moving in any way
    clickHandlers: [],   // Tracks if the map is moving in any way
    /**
	 * initGL - setup the canvas for pixi to render on
	 * 
	 * @param {String}
	 *            divId - the id of the div to place the canvas above
	 * @parms {Object} map - the esri map object
	 * @param {Array}
	 *            colors - array of values for colors
	 */
    init: function(divId, map, colors){

        this.colors = colors;

        this.map = map;
        this.mapDiv = document.getElementById(divId);
        var viewDiv = this.mapDiv;
        this.app = new PIXI.Application(viewDiv.clientWidth, viewDiv.clientHeight, { 
            transparent: true
        });
        var app = this.app;
        app.view.style.position = "absolute";
        app.view.style.right = "0px";
        app.view.style.top = "0px";
        app.view.style.pointerEvents = "none";

        viewDiv.appendChild(app.view);

        this._setupContainerLayers();

        map.on("mouse-drag-start", this.onDragStart);
        map.on("mouse-drag", this.onDrag);
        map.on("mouse-drag-end", this.onDragEnd);

        map.on("zoom-start", this.onZoomStart);
        // map.on("zoom", this.onZoom);
        map.on("zoom-end", this.onZoomEnd);

        app.stage.interactive = true;
        app.stage.on('pointermove', this.onHoverEvent);
        app.stage.on('pointerdown', this.onClickEvent);
        app.stage.on('mousedown', this.onClickEvent);
        app.stage.hitArea = new PIXI.Rectangle(0, 0, viewDiv.clientWidth, viewDiv.clientHeight);

        this.cleanIndexes(true);
    },
    /**
	 * _setupContainerLayers - regenerate all particle containers
	 * 
	 */
    _setupContainerLayers: function() {
        this.dataContainers = [];
        this.pathContainers = [];
        for(var i = 0; i < this.colors.length; i++){
            if(typeof(this.colors[i]) !== 'number' && this.colors[i] > 0xffffff){
                console.error("Color at index", i, "is not given as a number!");
                continue;
            }
            var dpc = new PIXI.particles.ParticleContainer(100000);
            this.dataContainers[this.colors[i]] = dpc;
            this.app.stage.addChild(dpc);
            this.totalContainers++;

            var ppc = new PIXI.particles.ParticleContainer(100000, {
                scale: true,
                rotation: true
            });
            this.pathContainers[this.colors[i]] = ppc;
            this.app.stage.addChild(ppc);
            this.totalContainers++;
        }
    },
    /**
	 * registerHoverEvent - add a callback when data is hovered over.
	 * 
	 * @param {Function:
	 *            (Pixi.Sprite)} handler - the callback to be executed, callback
	 *            should take one Pixi.Sprite as an argument. The sprite is
	 *            augmented with additional data for lat, lon, id, size, and
	 *            extra data provided at creation
	 * 
	 */
    registerHoverEvent: function(handler){
        this.hoverHandlers.push(handler);
    },
    /**
	 * registerClickEvent - add a callback when data is clicked on.
	 * 
	 * @param {Function:
	 *            (Pixi.Sprite)} handler - the callback to be executed, callback
	 *            should take one Pixi.Sprite as an argument. The sprite is
	 *            augmented with additional data for lat, lon, id, size, and
	 *            extra data provided at creation
	 * 
	 */
    registerClickEvent: function(handler){
        this.clickHandlers.push(handler);
    },
    /**
	 * generateDataGraphic - gets the rendered texture to place on the sprite.
	 * 
	 * @param {int}
	 *            color - The color value to scale against the color gradient
	 * @param {int}
	 *            size - the size, in pixels, of the radius of the object
	 * @param {String}
	 *            shape - [Optional, default = "circle"] either "circle" or
	 *            "square", changes the shape of the texture
	 * 
	 * @return {Object} - returns the texture to render on the dot
	 */
    generateDataGraphic: function(color, size, shape){
        if(this.cachedTextures[color+'-'+size] !== undefined &&
            this.cachedTextures[color+'-'+size].dataPoint !== undefined){
            return this.cachedTextures[color+'-'+size].dataPoint;
        }
        var graphics = new PIXI.Graphics();
        graphics.lineStyle(0);
        graphics.beginFill(color, 1);
        if(shape === "circle"){
            graphics.drawCircle(0, 0, size);
        }else if(shape === "square"){
            graphics.moveTo(-size,-size);
            graphics.lineTo(size, -size);
            graphics.lineTo(size, size);
            graphics.lineTo(-size, size);
        }
        graphics.endFill();

        var rtn = this.app.renderer.generateTexture(graphics, 1, 1);

        if(this.cachedTextures[color+'-'+size] === undefined){
            this.cachedTextures[color+'-'+size] = {
                dataPoint: rtn
            };
        }else{
            this.cachedTextures[color+'-'+size].dataPoint = rtn;
        }

        return rtn;
    },
    /**
	 * generatePathGraphic - gets the rendered texture to place on the sprite.
	 * 
	 * @param {int}
	 *            color - The color value to scale against the color gradient
	 * @param {int}
	 *            size - the width of the path graphic
	 * 
	 * @return {PIXI.Texture} - returns the texture to render on the dot
	 */
    generatePathGraphic: function(color, size){
        if(this.cachedTextures[color+'-'+size] !== undefined &&
            this.cachedTextures[color+'-'+size].path !== undefined){
            return this.cachedTextures[color+'-'+size].path;
        }
        var graphics = new PIXI.Graphics();
        graphics.lineStyle(0);
        graphics.beginFill(color, 1);

        graphics.moveTo(-size, 0);
        graphics.lineTo(-size, 100);
        graphics.lineTo(size, 100);
        graphics.lineTo(size, 0);

        graphics.endFill();

        var rtn = this.app.renderer.generateTexture(graphics, 1, 1);

        if(this.cachedTextures[color+'-'+size] === undefined){
            this.cachedTextures[color+'-'+size] = {
                path: rtn
            };
        }else{
            this.cachedTextures[color+'-'+size].path = rtn;
        }

        return rtn;
    },
    /**
	 * onHoverEvent - Called when the mouse moves over the canvas, searches for
	 * the id of the point mouse is currently over
	 * 
	 * @param {
	 *            PIXI.interaction.InteractionEvent } e - Event object
	 *            representing this mouse move
	 */
    onHoverEvent: function(e) {
        if(MapRenderGL.moving){
            return;
        }
        var pt = e.data.global.clone();
        var start = new Date().getTime();
        for(var color in MapRenderGL.dataContainers){
            var container = MapRenderGL.dataContainers[color];
            for(var j = 0; j < container.children.length; j++){
                var child = container.children[j];
                if(child.hitArea.x < pt.x && pt.x < child.hitArea.x+child.hitArea.width &&
                   child.hitArea.y < pt.y && pt.y < child.hitArea.y+child.hitArea.height){
                    for(var i = 0; i < MapRenderGL.hoverHandlers.length; i++){
                        MapRenderGL.hoverHandlers[i](child);
                    }
                    var endTime = new Date().getTime();
                    // console.log("Lookup took",endTime-start,"ms");
                    return;
                }
            }
        }
    },
    
    /**
	 * onClickEvent - Called when the mouse clicks over the canvas, searches for
	 * the id of the point mouse is currently over
	 * 
	 * @param {
	 *            PIXI.interaction.InteractionEvent } e - Event object
	 *            representing this mouse move
	 */
    onMapClick: function(x,y) {
    	console.log("webGL:onMapClick()");
        if(MapRenderGL.moving){
            return;
        }
        var start = new Date().getTime();
        for(var color in MapRenderGL.dataContainers){
            var container = MapRenderGL.dataContainers[color];
            for(var j = 0; j < container.children.length; j++){
                var child = container.children[j];
                if(child.hitArea.x < x && x < child.hitArea.x+child.hitArea.width &&
                   child.hitArea.y < y && y < child.hitArea.y+child.hitArea.height){
                    for(var i = 0; i < MapRenderGL.clickHandlers.length; i++){
                        MapRenderGL.clickHandlers[i](child);
                    }
                    var endTime = new Date().getTime();
                    // console.log("Lookup took",endTime-start,"ms");
                    return;
                }
            }
        }
    },
    /**
	 * onDragStart - Event handler for when the user starts to drag, populates
	 * dataPoints so it can be refrenced during and after drag
	 * 
	 * @param {
	 *            MouseEvent } e - Event object representing this drag event
	 */
    onDragStart: function(e) {
        try {
            MapRenderGL.moving = true;
            if(!e.shiftKey){
                for(var i = 0; i < MapRenderGL.colors.length; i++){
                    var color = MapRenderGL.colors[i];

                    var container = MapRenderGL.dataContainers[color];
                    for(var j = 0; j < container.children.length; j++){
                        var dot = container.children[j];
                        MapRenderGL.dataPoints.push({ 
                            data: dot,
                            x: dot.x,
                            y: dot.y
                        });
                    }

                    container = MapRenderGL.pathContainers[color];
                    for(var j = 0; j < container.children.length; j++){
                        var path = container.children[j];
                        MapRenderGL.dataPaths.push({ 
                            data: path,
                            x: path.x,
                            y: path.y
                        });
                    }
                }
            }
        } catch(err){
            console.error("Error on start of drag")
        }
    },
    /**
	 * onDrag - Event handler when the user drags so that datapoints can
	 * remained lined up correctly
	 * 
	 * @param {
	 *            MouseEvent } e - Event object representing this drag event
	 */
    onDrag: function(e) {
        for(var i = 0; i < MapRenderGL.dataPoints.length; i++){
            var dot = MapRenderGL.dataPoints[i].data;
            dot.x = dot.x + e.movementX;
            dot.y = dot.y + e.movementY;
        }
        for(var i = 0; i < MapRenderGL.dataPaths.length; i++){
            var path = MapRenderGL.dataPaths[i].data;
            path.x = path.x + e.movementX;
            path.y = path.y + e.movementY;
        }
    },
    /**
	 * onDragEnd - Event handler when the user stops dragging
	 * 
	 * @param {
	 *            MouseEvent } e - Event object representing this drag event
	 */
    onDragEnd: function(e) {
        setTimeout(function() { 
            if(!e.shiftKey){
                try {
                    for(var i = 0; i < MapRenderGL.dataPoints.length; i++){
                        var point = MapRenderGL.dataPoints[i];
                        var dot = point.data;
                        var screenPt = MapRenderGL.map.toScreen(
                            new document.Point(dot.lon, dot.lat)
                        );
                        MapRenderGL._placePoint(dot, screenPt.x, screenPt.y, dot.rSize);
                    }
                } catch(err) {}
                MapRenderGL.dataPoints=[];

                // Now that all points have been re-calculated we can fit the
				// paths

                for(var i = 0; i < MapRenderGL.dataPaths.length; i++){
                    var point = MapRenderGL.dataPaths[i];
                    var path = point.data;
                    MapRenderGL._placePath(path, path.point1, path.point2, path.rSize);
                }
            }
            MapRenderGL.dataPaths=[];
            MapRenderGL.moving = false;
        }, 10);
    },
    /**
	 * onZoomStart - Event handler for when the user starts to zoom, populates
	 * dataPoints so it can be refrenced during and after zoom
	 * 
	 * @param {
	 *            Object } e - Event object representing this zoom event
	 */
    onZoomStart: function(e) {
        if(!MapRenderGL.moving){
            MapRenderGL.moving = true;
            var anchorPt = e.anchor;
            for(var i = 0; i < MapRenderGL.colors.length; i++){
                try {
                    var color = MapRenderGL.colors[i];
                    var container = MapRenderGL.dataContainers[color];
                    for(var j = 0; j < container.children.length; j++){
                        var dot = container.children[j];
                        MapRenderGL.dataPoints.push({ 
                            data: dot,
                            x: dot.x,
                            y: dot.y,
                            anPtVec: [dot.x - anchorPt.x, dot.y - anchorPt.y] 
                        });
                    }
                }catch(err){}
                container.visible = false;

                try {
                    container = MapRenderGL.pathContainers[color];
                    for(var j = 0; j < container.children.length; j++){
                        var path = container.children[j];
                        MapRenderGL.dataPaths.push({ 
                            data: path,
                            x: path.x,
                            y: path.y,
                            anPtVec: [path.x - anchorPt.x, path.y - anchorPt.y] 
                        });
                    }
                }catch(err){}    
                container.visible = false;
            }
        }
    },
    /**
	 * onZoom - Event handler for when the user zooms, relocates all the points
	 * based on their init x and y and a vector to the anchor
	 * 
	 * Right now the data provided to this function is not correct and creates a
	 * strange over zoom effect on the datapoints when applied. Use at your own
	 * risk.
	 * 
	 * @param {
	 *            Object } e - Event object representing this zoom event
	 */
    onZoom: function(e) {
        var anchorPt = e.anchor;
        for(var i = 0; i < MapRenderGL.dataPoints.length; i++){
            var point = MapRenderGL.dataPoints[i];
            var dot = point.data;
            dot.x = anchorPt.x + point.anPtVec[0]*e.zoomFactor;
            dot.y = anchorPt.y + point.anPtVec[1]*e.zoomFactor;
        }
    },
    /**
	 * onZoomEnd - Event handler for when the user stops zooming, moves all the
	 * hit boxes and extra data keys
	 * 
	 * @param {
	 *            Object } e - Event object representing this zoom event
	 */
    onZoomEnd: function(e) {
        try {
            for(var i = 0; i < MapRenderGL.dataPoints.length; i++){
                var point = MapRenderGL.dataPoints[i];
                var dot = point.data;
                var screenPt = MapRenderGL.map.toScreen(
                    new document.Point(dot.lon, dot.lat)
                );
                if(dot){
                    MapRenderGL._placePoint(dot, screenPt.x, screenPt.y, dot.rSize);
                }
            }
        } catch(err) {
            console.error(err, "Could not remap points on zoom end")
        }
        MapRenderGL.dataPoints=[];

        // Now that all points have been re-calculated we can fit the paths

        try {
            for(var i = 0; i < MapRenderGL.dataPaths.length; i++){
                var point = MapRenderGL.dataPaths[i];
                var path = point.data;
                if(path){
                    MapRenderGL._placePath(path, path.point1, path.point2, path.rSize);
                }
            }
        } catch(err) {
            console.error(err, "Could not remap paths on zoom end")
        }
        MapRenderGL.dataPaths=[];


        for(var i = 0; i < MapRenderGL.colors.length; i++){
            try {
                MapRenderGL.dataContainers[MapRenderGL.colors[i]].visible = true;
                MapRenderGL.pathContainers[MapRenderGL.colors[i]].visible = true;
            } catch(err) {
                console.error("Container not found for", MapRenderGL.colors[i])
            }
        }


        MapRenderGL.moving = false;
    },
    /**
	 * getTotalPoints - counts the total number of sprites being displayed
	 * 
	 * @return {int} - the total number of dots
	 */
    getTotalPoints: function(){
        var t = 0;
        for(var color in MapRenderGL.dataContainers){
            t += MapRenderGL.dataContainers[color].children.length;
        }
        return t;
    },
    /**
	 * createPoint - creates a point at x,y with the given value, id, size, and
	 * shape. The point will be placed regardless of other existing points
	 * 
	 * @param {double}
	 *            x - x to render the object at
	 * @param {double}
	 *            y - y to render the object at
	 * @param {int}
	 *            color - the color value for the data point
	 * @param {int}
	 *            id - the id of the flight
	 * @param {int}
	 *            size - the size, in pixels, of the radius of the object
	 * @param {Object}
	 *            location - Object containing the lat and lon for the point
	 * @param {Object}
	 *            extraData - additional data to be stored with the object (any
	 *            additional data you would like to retrive on hover can be
	 *            placed here)
	 * @param {String}
	 *            shape - the shape
	 * 
	 * @return {Pixi.Sprite} - the dot created
	 */
    createPoint: function(x, y, color, id, size, location, extraData, shape){
        if(this.dataContainers[color] === undefined){
            console.error("Invalid color code supplied!");
            return;
        }
        var texture = this.generateDataGraphic(color, size, shape);
        var dot = new PIXI.Sprite(texture);
        this._placePoint(dot, x, y, size);
        dot.lat = location.lat;
        dot.lon = location.lon;
        dot.m_id = id;
        dot.rSize = size;
        dot.extraData = extraData;
        this.dataContainers[color].addChild(dot);

        /*
		 * dot.interactive = true; dot.hitArea = new PIXI.Rectangle(x, y, 20,
		 * 20); dot.mouseover = function(mouseData){ console.log("MOUSE OVER!"); }
		 * 
		 * dot.mouseout = function(mouseData){ console.log("MOUSE OUT!"); }
		 * 
		 * dot.mousedown = function(mouseData){ console.log("MOUSE DOWN!"); }
		 * 
		 * dot.mouseup = function(mouseData){ console.log("MOUSE UP!"); }
		 * 
		 * dot.click = function(mouseData){ console.log("CLICK!"); }
		 */
        return dot;
    },
    /**
	 * destroyPoint - remove all refrences to the given point
	 * 
	 * @param {Object}
	 *            point - Object containing 'dot', a PIXI.Sprite to destroy and
	 *            'color', an int explaining what layer the dot is located on.
	 */
    destroyPoint: function(point){
        this.dataContainers[point.color].removeChild(point.dot);
        point.dot.destroy({texture: false});
    },
    /**
	 * cleanIndexes - reset the indexes array to zeros and remove all excess
	 * data points from each layer
	 * 
	 * @param {boolean}
	 *            paths - include the path indexes
	 */
    cleanIndexes: function(paths){

        for(var i = 0; i < this.colors.length; i++){
            var color = this.colors[i];
            var container = {
                data: this.dataContainers[color],
                path: this.pathContainers[color]
            };
            var toDestroy = {
                data: [],
                path: []
            };
            // Double iteration keeps array from cuncurrent modification
            for(var j = this.indexes.point[color]; j < container.data.children.length; j++){
                toDestroy.data.push({ color: color, dot: container.data.children[j] });
            }
            if(paths){
                for(var j = this.indexes.path[color]; j < container.path.children.length; j++){
                    toDestroy.path.push({ color: color, path: container.path.children[j] });
                }
            }
            for(var j = 0; j < toDestroy.data.length; j++){
                this.destroyPoint(toDestroy.data[j]);
            }
            if(paths){
                for(var j = 0; j < toDestroy.path.length; j++){
                    this.destroyPath(toDestroy.path[j]);
                }
            }
        }
        for(var i = 0; i < this.colors.length; i++){
            this.indexes.point[this.colors[i]] = 0;
            this.indexes.path[this.colors[i]] = 0;
        }
        this.rendered = {};
    },
    /**
	 * relocatePoint - renders a point at the given location by relocating a pre
	 * existing point from the layer to x and y.
	 * 
	 * @param {double}
	 *            xNew - x to render the object at
	 * @param {double}
	 *            yNew - y to render the object at
	 * @param {double}
	 *            newColor - the color value for the data point
	 * @param {int}
	 *            idNew - the id of the flight
	 * @param {int}
	 *            sizeNew - the size, in pixels, of the radius of the object
	 * @param {Object}
	 *            location - Object containing the lat and lon for the point
	 * @param {Object}
	 *            extraData - additional data to be stored with the object
	 * @param {String}
	 *            shapeNew - the shape
	 * 
	 * @return {Pixi.Sprite} - the relocated data point
	 */
    relocatePoint: function(xNew, yNew, newColor, idNew, sizeNew, location, extraData, shapeNew){
        var dot = this.dataContainers[newColor].children[this.indexes.point[newColor]];
        if(dot === undefined || this.rendered[dot.x+"-"+dot.y] === true){
            dot = this.createPoint(xNew, yNew, newColor, idNew, sizeNew, 
                location, extraData, shapeNew);
            this.rendered[dot.x+"-"+dot.y] = true;
        }else{
            var texture = this.generateDataGraphic(newColor, sizeNew, shapeNew);
            dot.texture = texture;
            this._placePoint(dot, xNew, yNew, sizeNew);
            dot.lat = location.lat;
            dot.lon = location.lon;
            dot.m_id = idNew;
            dot.rSize = sizeNew;
            dot.extraData = extraData;
        }
        this.indexes.point[newColor]++;
        return dot;
    },
    /**
	 * _placePoint - positions the point and creates the hit area
	 * 
	 * @param {Pixi.Sprite}
	 *            dot - the dot to be modified
	 * @param {int}
	 *            x - the x coord
	 * @param {int}
	 *            y - the y coord
	 * @param {int}
	 *            size - the width of hitbox (but not the texture)
	 */
    _placePoint: function(dot, x, y, size){
        dot.x = x-size;
        dot.y = y-size;
        dot.hitArea = new PIXI.Rectangle(dot.x, dot.y, size*2, size*2);
    },
    /**
	 * createPath - generate a path between the given points
	 * 
	 * @param {Pixi.Sprite}
	 *            point1 - Object containing an x and y representing the bottom
	 *            center of the path that will be created
	 * 
	 * @param {Pixi.Sprite}
	 *            point2 - Object containing an x and y representing the top
	 *            center of the path that will be created
	 * 
	 * @param {int}
	 *            color - color for the path to be rendered
	 * @param {int}
	 *            size - the width of the path
	 * 
	 * @return {Pixi.Sprite} - the path sprite created
	 */
    createPath: function(point1, point2, color, size){
        var texture = this.generatePathGraphic(color, size);
        var path = new PIXI.Sprite(texture);

        this._placePath(path, point1, point2, size);
        this.pathContainers[color].addChild(path);

        path.point1 = point1;
        path.point2 = point2;
        path.rSize = size;

        return path;
    },
    /**
	 * destroyPoint - remove all refrences to the given point
	 * 
	 * @param {Object}
	 *            point - Object containing 'path', a PIXI.Sprite to destroy and
	 *            'color', an int explaining what layer the path is located on.
	 */
    destroyPath: function(path){
        this.pathContainers[path.color].removeChild(path.path);
        path.path.destroy({texture: false});
    },
    /**
	 * relocatePoint - renders a point at the given location by relocating a pre
	 * existing point from the layer to x and y.
	 * 
	 * @param {Pixi.Sprite}
	 *            point1 - the first point for the path
	 * @param {Pixi.Sprite}
	 *            point2 - the second point for the path
	 * @param {double}
	 *            newColor - the color value for the data point
	 * @param {int}
	 *            sizeNew - the size, in pixels, of the radius of the object
	 * 
	 * @return {Pixi.Sprite} - the relocated path object
	 */
    relocatePath: function(point1, point2, newColor, sizeNew){
        var path = this.pathContainers[newColor].children[this.indexes.path[newColor]];
        if(path === undefined || this.rendered[path.x+"-"+path.y] === true){
            path = this.createPath(point1, point2, newColor, sizeNew);
            this.rendered[path.x+"-"+path.y] = true;
        }else{
            
            path.texture = this.generatePathGraphic(newColor, sizeNew);
            this._placePath(path, point1, point2, sizeNew);

            path.point1 = point1;
            path.point2 = point2;
            path.rSize = sizeNew;
        }
        this.indexes.path[newColor]++;
        return path;
    },
    /**
	 * _placePath - rotates, scales, and positions the given path object to fit
	 * between each point with the given size. The object is modified in place.
	 * 
	 * @param {Pixi.Sprite}
	 *            path - the path to be modified
	 * @param {Pixi.Sprite}
	 *            point1 - first point for the path
	 * @param {Pixi.Sprite}
	 *            point2 - second point for the path
	 * @param {int}
	 *            size - the width of the path
	 */
    _placePath: function(path, point1, point2, size){
        var pVec = {
            x: (point2.x - point1.x),
            y: (point2.y - point1.y)
        };
        var dist = Math.sqrt(pVec.x**2 + pVec.y**2);
        path.x = point1.x + size*2;
        path.y = point1.y + size*2;
        path.scale = new PIXI.Point(1, dist/100);

        path.rotation = Math.acos(pVec.y/dist);

        if(pVec.x > 0){
            path.rotation = Math.PI*2 - path.rotation;
        }

        path.y -= Math.sin(path.rotation)*size;
        path.x -= Math.cos(path.rotation)*size;
    },
    /**
	 * renderAcars - Render the given 3d array data over the application frame
	 * scaled acording to the lat lon min max cords provided. Renders by
	 * indexing currently rendered points and remapping as many as possible to
	 * new locations without creating or deleting sprites.
	 * 
	 * IMPORTANT: this function will remove all existsing data and rerender
	 * whatever it is passed.
	 * 
	 * @param {int}
	 *            pointSize - the pixel size for the data points to render
	 * @param {Array
	 *            <Array<Array<Int>>>} data - Array of the data to render. The
	 *            format of the array must be [ [ [acar, color, id] ] ]
	 * @param {boolean}
	 *            paths - optionally render paths between each data point
	 * 
	 * @return {int} - The time it took to render the data in ms
	 */
    renderAcars: function(pointSize, data, paths) {
        var start = new Date().getTime();
        var shape = "circle";
        for (var j = 0; j < data.length; j++) {
            // var lastPt = undefined;
            for (var i = 0; i < data[j].length; i++) {
            	var acar = data[j][i][0];
            	// browserLogInt(document.INFO, "renderAcars, acar:" + JSON.stringify(acar));
                var ptLocation = { lon: acar.lon, lat: acar.lat };
                var screenPt = this.map.toScreen(
                    new document.Point(ptLocation.lon, ptLocation.lat)
                );
                var color = data[j][i][1];
                var id = data[j][i][2];
                if(0 === id)
                {
                	var lastPt = undefined;
                }
                var pt = this.relocatePoint(screenPt.x, screenPt.y, 
                    color, id, pointSize, 
                    ptLocation,
                    { raw: data[j][i][0] },
                    shape
                );
                if(lastPt !== undefined && paths){
                    this.relocatePath(pt, lastPt, color, pointSize/2);
                }
                lastPt = pt;
            }
        }
        this.cleanIndexes(true);
        var end = new Date().getTime();
        return end-start;
    },
    /**
	 * debugData - create random data points over the US to show render speeds
	 * 
	 * @param {int}
	 *            num - the number of random data points to render
	 * 
	 * @return {int} - The time in MS required for the render
	 */
    debugData: function(num){
        var data = [];
        for(var i = 0; i < num; i++){
            var x = (125-75)*Math.random()+75;
            var y = (50-25)*Math.random()+25;
            var color = this.colors[Math.floor(this.colors.length*Math.random())];
            var id = Math.floor(10000*Math.random());
            data.push([-x, y, color, id]);
        }
        return this.renderAcars(4, [ data ], false);
    },
    /**
	 * debugPath - create random data paths over the US to show render speeds
	 * 
	 * @param {int}
	 *            num - the number of random data points to render
	 * 
	 * @return {int} - The time in MS required for the render
	 */
    debugPath: function(num){
        var data = [ [] ];
        var j = 0;
        for(var i = 0; i < num; i++){
            var x = (125-75)*Math.random()+75;
            var y = (50-25)*Math.random()+25;
            var color = this.colors[Math.floor(this.colors.length*Math.random())];
            var id = Math.floor(10000*Math.random());
            data[j].push([-x, y, color, id]);
            if(Math.random()<0.5){
                j++;
                data.push([]);
            }
        }
        return this.renderAcars(4, data, true);
    }
};
