(function() {
    
    
    $(document).click(function(event) {
        var target = $(event.target);
        var targetId = $(target).attr("id");
        var isLocSearch = false;
        var isResultsClosed = $("#searchOptions").hasClass("hidden");
        
        //   Handle clicking off of location search component 
        if ( $(target).hasClass("search_option") || $(target).hasClass("autocomplete-suggestion") ){
            isLocSearch = true;
        }
        //dont hide if 1. click was a location 2. the search field 3. already closed
        if ( !isLocSearch && targetId !== "searchInput"  && !isResultsClosed ){
            $("#searchOptions").addClass("hidden");
        }
    });
    
    var categories = [
        'Land Features',
        'Bay','Channel','Cove','Dam','Delta','Gulf','Lagoon','Lake','Ocean','Reef','Reservoir','Sea','Sound','Strait','Waterfall','Wharf', // Water Features
        'Amusement Park', 'Historical Monument', 'Landmark', 'Tourist Attraction', 'Zoo', // POI/Arts and Entertainment
        'College', // POI/Education
        'Beach', 'Campground', 'Golf Course', 'Harbor', 'Nature Reserve', 'Other Parks and Outdoors', 'Park', 'Racetrack',
            'Scenic Overlook', 'Ski Resort', 'Sports Center', 'Sports Field', 'Wildlife Reserve', // POI/Parks and Outdoors
        'Airport', 'Ferry', 'Marina', 'Pier', 'Port', 'Resort', // POI/Travel
        'Postal', 'Populated Place'
    ],
    cats = categories.join(','),
    overrides = {
        '08736, Manasquan, New Jersey, USA': {x: -74.037, y: 40.1128},
        '32899, Orlando, Florida, USA': {x: -80.6774, y: 28.6143},
        '97003, Beaverton, Oregon, USA': {x: -122.8752489, y: 45.5050916},
        '99734, Prudhoe Bay, Alaska, USA': {x:-148.3372, y: 70.2552},

        'Guam, Oceania': {x: 144.74, y: 13.46},
        'Andover, Maine, United States': {x: -70.7525, y: 44.634167},
        'Bear Creek, Pennsylvania, United States': {x: -75.772809, y: 41.204074},
        'Bear Creek Village, Pennsylvania, United States': {x: -75.772809, y: 41.204074},
        'New York City, New York, United States': {x: -74.0059, y: 40.7142},
        'Pinnacles National Monument, San Benito County,California, United States': {x: -121.147278, y: 36.47075},
        'Pinnacles National Park, CA-146, Paicines, California': {x: -121.147278, y: 36.47075},
        'Welcome, Maryland, United States': {x: -77.081212, y: 38.4692469}
    },
    singleSubmit = false;
    
    //check if browser supports geolocation
    if ( navigator.geolocation ){
        $("#useCurrent")
            .removeClass("hidden")
            .on('click', function() {
                console.log("geolocation");
                goToGeolocation();
            });
    }

    //add recent location searches
    var searchHistory = getSearchHistory();

    //show the searchOptions box
    $("#searchResults #searchResultsHistory")
        .find(".search_content").empty().each(function() {
            var $container = $(this);
            if ( searchHistory.length > 0 ){
                appendSearchHistory($container, $.extend(true, [], searchHistory) ); // send a copy of searchHistory so we can reverse
            }
        }).end()
        .removeClass("hidden");
    
    $('#getForecast').submit(function(e){
        e.preventDefault(); //this prevents submit to geolocation page when javascript is enabled
        var ac = $('#searchInput').devbridgeAutocomplete();
        if (ac.suggestions[0]) {
            $(ac.suggestionsContainer.children[0]).click();
        }
        return false;
    });
    $(".search_option").click(function(e){
        var selectedOption = $(this).html();
        $("#searchInput").val(selectedOption);
        closeSearch();
    });
    
    $('#searchInput').focus(function(){
        $("#searchOptions").removeClass("hidden");
    }).on('dblclick', function(e){
        e.preventDefault(); //prevent browser search box from showing
    }).on('keyup', function(e){
    
    }).on('blur', function(e){

    }).devbridgeAutocomplete({
        serviceUrl: '//geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/suggest',
        deferRequestBy: 150,
        paramName: 'text',
        params: {
            f: 'json',
            countryCode: 'USA,PRI,VIR,GUM,ASM',
            category: cats,
            maxSuggestions: 10
        },
        dataType: 'jsonp',
        minChars: 3,
        appendTo: $("#searchResults #searchResultsService .search_content"),
        showNoSuggestionNotice: true,
        noSuggestionNotice: 'No results found.',
        maxHeight: 159,
        transformResult: function (response) {
            return {
                suggestions: $.map(response.suggestions, function (i) {
                    return {
                        value: i.text,
                        data: i.magicKey
                    };
                })
            };
        },
        onSearchStart: function() {
            hideAllSearchBlocks();
        },
        onSearchComplete: function() {
            $("#searchResults #searchResultsService").removeClass("hidden");
        },
        onSelect: function (suggestion) {
            if (overrides[suggestion.value]) {
                doRedirectToGeometry(suggestion.value, overrides[suggestion.value]);
            } else {
                $.ajax({
                    url: '//geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/find',
                    data: {
                        text: suggestion.value,
                        magicKey: suggestion.data,
                        f: 'json'
                    },
                    jsonp: 'callback',
                    dataType: 'jsonp'
                }).done(function (data) {
                    if (data && data.locations && data.locations.length > 0) {
                        doRedirectToGeometry(data.locations[0].name, data.locations[0].feature.geometry);
                    } else {
                        handleError('An unexpected error occurred. Please try again.');
                    }
                });
            }
            closeSearch();
        }
    });

    function hideAllSearchBlocks() {
        $("#searchResults .search_block").addClass("hidden");
    }

    function roundToPlaces(num, decimals) {
        var n = Math.pow(10, decimals);
        return Math.round( (n * num).toFixed(decimals) )  / n;
    };

    function doRedirectToGeometry(name, geom) {
        var strPos = name.indexOf(", United States");
        if (strPos >= 0 ){
            name = name.substring(0, strPos)    
        }

        storeAndGo({
            'name': name, 
            'lat': roundToPlaces(geom.y,4), 
            'lon': roundToPlaces(geom.x,4)
        });
    };
     
    function appendSearchHistory($container, locations){
        locations.reverse(); //reverse so last searched is first in list; is a copy, so original array preserved
        var cnt = 0;
        for (var key in locations) {
            if (cnt <= 4){
                if ( locations.hasOwnProperty(key) ){
                    var location = locations[key];
                    $('<div>', {
                        'class': 'search_option saved_location'
                    }).data('location', { 
                        'lat': location.lat,
                        'lon': location.lon
                    }).html(location.name)
                    .on('click', function() {
                        goToLocation( $(this).data("location") );                         
                    })
                    .appendTo($container);
                    // at some point add ability to remove option
                    /*
                    $(".removeSearch").click(function(){
                        var i = $(this).attr("data-idx");
                        delete searchHistory[i];
                        setSearchHistory(searchHistory);
                    });
                    */                    
                }
                cnt++;
            } else {
                break;
            }
        }
    };

    function goToGeolocation(){
        navigator.geolocation.getCurrentPosition(function(position) {
            storeAndGo({
                name: 'Previous Location at ' + roundToPlaces(position.coords.latitude,2) + ', ' + roundToPlaces(position.coords.longitude,2),
                lat: position.coords.latitude,
                lon: position.coords.longitude
            });
        }, function(error) {
            handleError(error.message);
        });
    };

    function storeAndGo(location){
        addLocationToHistory(location);
        goToLocation(location);
    };

    function goToLocation(location){
        if (singleSubmit == false){
            singleSubmit = true; 
            window.location = nws.baseURL.app + '/point/' + location.lat + ',' + location.lon;
        }
    };

    function addLocationToHistory(location){
        location.history = location.history || 'Location'; // if name not defined
        searchHistory.push(location);
        setSearchHistory(searchHistory);   
    };

    function getSearchHistory() {
        if (store.enabled){
            var search = store.get('search') || {};
            return search.history || [];
        }
        return [];
    };

    function setSearchHistory( searchHistory ) {
        if (store.enabled){
            var search = store.get('search') || {};
            search.history = searchHistory;
            store.set('search', search );
        }
    }
    function closeSearch(){
        setTimeout(function() { 
            $("#searchOptions").slideUp("slow",function(){ 
                $("#btnSearch").attr("value","Loading").addClass("loading");
                $("#searchInput,#btnSearch").attr("readonly","readonly");
            });
        }, 300);
    }
    
    function handleError(error) {
        hideAllSearchBlocks();
        $("#searchResults #searchResultsMessage")
            .find(".search_content")
                .html(error)
            .end()
            .removeClass("hidden");

        //$("#searchResults").removeClass("autocomplete"); //return to orig size
        //$("#searchOptions").addClass("hidden"); //hide the search options
    }
    
    
})();