// This gets inserted into the div with an id of "map".
var queryURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// // Perform a GET request to the query URL/
d3.json(queryURL).then(function(earthquakeData) {
    // Call createMap function
    createMap(earthquakeData);
});

// Create initial map object via GeoJSON URL:

function createMap(earthquakeData) {

    // Create map of earthquake data
    var myMap = L.map("map", {
        center: [-81.09, 31.08],
        zoom: 3,
        // used to switch views
        // layers: [scaleMap, earthquakes]
    });

    // Add tile layer (the background map image) to our map:
    var default_layer = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        maxZoom: 18,
        id: "mapbox/light-v10",
        tileSize: 512,
        opacity: .5,
        accessToken: API_KEY
    }).addTo(myMap);

    // Add earthquake layer calling geoJSON 
    L.geoJSON(earthquakeData, {
        onEachFeature: onEachFeature, //bindpopups
        pointToLayer: createMarkers,
    }, ).addTo(myMap);
}

// add onEachFeature function to create popups
function onEachFeature(feature, layer) {
    layer.bindPopup(`<h3>Location: ${feature.properties.place}<br>Magnitude: ${feature.properties.mag}</h3><hr><p>${new Date(feature.properties.time)}</p>`);
}


function createMarkers(feature, latlng) {

    //  Set markerSize based on magnitude
    function markerSize(magnitude) {
        return magnitude * 4;
    };

    // Set pickcolor by depth
    function pickColor(depth) {
        switch (true) {
            case depth > 90:
                return "#FE3B00";
            case depth > 70:
                return "#FE6300";
            case depth > 50:
                return "#FE8A00";
            case depth > 30:
                return "#FEB200";
            case depth > 10:
                return "#FED900";
            default:
                return "#FEED00";
        }
    }
    return L.circleMarker(latlng, {
        radius: 5,
        fillColor: 'red',
        color: 'green',
        weight: 1,
        opacity: .2,
        fillOpacity: 0.8,
    });
}