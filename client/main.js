Meteor.startup(function() {
    GoogleMaps.load();
});

Template.map.onCreated(function() {
    GoogleMaps.ready('map', function(map) {

        //hardcode data
        var data = {
            "data": {
                locations: [{
                    "lat": "11",
                    "lng": "22",
                    "date": "",
                }, {
                    "lat": "10",
                    "lng": "22.2",
                    "date": "",
                }, {
                    "lat": "11.2",
                    "lng": "22.3",
                    "date": "",
                }, {
                    "lat": "11.5",
                    "lng": "22.8",
                    "date": "",
                }, {
                    "lat": "10.1",
                    "lng": "20.2",
                    "date": "",
                }]
            }
        };

        var trace = data.data.locations.map((obj) => new google.maps.LatLng(parseFloat(obj.lat), parseFloat(obj.lng)));

        //console.log(trace);

        var centerlat = 0.0;
        var centerlng = 0.0;
        // trace.forEach( function(element) {
        //     // statements
        //     centerlat +=element.lat();
        //     centerlng +=element.lng();
        // });

        //console.log(centerlat, centerlng);

        trace.map((obj) => {
            centerlat += obj.lat();
            centerlng += obj.lng();
        });
        //console.log(centerlat, centerlng);
        // var path = [
        //     new google.maps.LatLng(28.613939, 77.209021),
        //     new google.maps.LatLng(51.507351, -0.127758),
        //     new google.maps.LatLng(40.712784, -74.005941),
        //     new google.maps.LatLng(28.213545, 94.868713)
        // ];


        var traceUp = new google.maps.Polyline({
            path: trace,
            strokeColor: "#0000FF",
            strokeOpacity: 0.6,
            strokeWeight: 2
        });


        // map.instance.LatLng(centerlat/trace.length,centerlng/trace.length);
        // gMap.setCenter(new google.maps.LatLng(37.4419, -122.1419));
        map.instance.setCenter(new google.maps.LatLng(centerlat/trace.length, centerlng/trace.length));

        traceUp.setMap(map.instance);

        // var markers = {};

        // Markers.find().observe({
        //     added: function(document) {
        //         var marker = new google.maps.Marker({
        //             draggable: true,
        //             animation: google.maps.Animation.DROP,
        //             position: new google.maps.LatLng(document.lat, document.lng),
        //             map: map.instance,
        //             id: document._id
        //         });

        //         google.maps.event.addListener(marker, 'dragend', function(event) {
        //             Markers.update(marker.id, { $set: { lat: event.latLng.lat(), lng: event.latLng.lng() } });
        //         });

        //         markers[document._id] = marker;
        //     },
        //     changed: function(newDocument, oldDocument) {
        //         markers[newDocument._id].setPosition({ lat: newDocument.lat, lng: newDocument.lng });
        //     },
        //     removed: function(oldDocument) {
        //         markers[oldDocument._id].setMap(null);
        //         google.maps.event.clearInstanceListeners(markers[oldDocument._id]);
        //         delete markers[oldDocument._id];
        //     }
        // });
    });
});



Template.map.helpers({
    mapOptions: function() {
        if (GoogleMaps.loaded()) {
            return {
                center: new google.maps.LatLng(51.508742, -0.120850),
                zoom: 6,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

        };
    }
});
