Meteor.startup(function() {
    GoogleMaps.load();

});

var centerlat = 0.0;
var centerlng = 0.0;

Template.map.onRendered(function() {

    //initialize();
    //console.log(GoogleMaps);

});

Template.map.helpers({
    mapOptions: function() {
        if (GoogleMaps.loaded()) {
            return {
                center: new google.maps.LatLng(11.22, 11.23),
                zoom: 7,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

        };
    },
    test: function() {
        //console.log(new Date(Session.get('date')));
        var query = TraceMe.find();
        query.observeChanges({
            added: function(id, obj) {
                GoogleMaps.ready('map',function(map){
                buildMap(obj,map);
            })
            },
            changed: function(id, obj) {
                //console.log(obj);
                var map = GoogleMaps.maps.map;
                //polyline.setMap(null);
                buildMap(obj,map);
            },
            removed: function() {
                var map = GoogleMaps.maps.map;
                buildMap({locations: []},map);
            }
        });
        //return query;
    },
    trace: function() {
        GoogleMaps.ready('map', function(map) {

            TraceMe.find().map((result) => {
                //console.log(result);
                function compare(a, b) {
                    if (a.date < b.date) {
                        return -1;
                    }
                    if (a.date > b.date) {
                        return 1;
                    }
                    // a must be equal to b
                    return 0;
                };

                

                var trace = tracefilter.sort(compare).map((obj) => new google.maps.LatLng(parseFloat(obj.lat), parseFloat(obj.lng)));

                //console.log(trace);

                trace.map((obj) => {
                    centerlat += obj.lat();
                    centerlng += obj.lng();
                });

                //set trace polyline
                var traceUp = new google.maps.Polyline({
                    path: trace,
                    strokeColor: "#0000FF",
                    strokeOpacity: 0.6,
                    strokeWeight: 2
                });


                // map.instance.LatLng(centerlat/trace.length,centerlng/trace.length);
                // gMap.setCenter(new google.maps.LatLng(37.4419, -122.1419));
                map.instance.setCenter(new google.maps.LatLng(centerlat / trace.length, centerlng / trace.length));

                centerlat = 0.0;
                centerlng = 0.0;

                traceUp.setMap(map.instance);

                //create and show markers
                var markers = result.locations.map((obj, index, arr) => new google.maps.Marker({
                    draggable: false,
                    animation: google.maps.Animation.DROP,
                    position: new google.maps.LatLng(obj.lat, obj.lng),
                    map: map.instance,
                    id: obj._id,
                    label: (++index).toString(),
                    title: obj.date.toUTCString(),
                }));
            });
        });
    }
});

function buildMap(obj,map) {    
    
    //console.log("in buildMap function");
        //polyline.setMap(null);

    function compare(a, b) {
        if (a.date < b.date) {
            return -1;
        }
        if (a.date > b.date) {
            return 1;
        }
        // a must be equal to b
        return 0;
    };

    var tracefilter = [];
    obj.locations.map((obj)=>{
                    //console.log(obj.date);
                    //console.log(Session.get('startdate'));
                    //console.log(Session.get('enddate'));
                    if (obj.date >= Session.get('startdate') && obj.date <= Session.get('enddate') ) {
                        tracefilter.push(obj);
                    }
                })

                console.log(tracefilter);

    var trace = tracefilter.sort(compare).map((obj) => new google.maps.LatLng(parseFloat(obj.lat), parseFloat(obj.lng)));

    //console.log(trace);

    trace.map((obj) => {
        centerlat += obj.lat();
        centerlng += obj.lng();
    });

    //set trace polyline
    var traceUp = new google.maps.Polyline({
        path: trace,
        strokeColor: "#0000FF",
        strokeOpacity: 0.6,
        strokeWeight: 2
    });

    map.instance.setCenter(new google.maps.LatLng(centerlat / trace.length, centerlng / trace.length));

    centerlat = 0.0;
    centerlng = 0.0;

    traceUp.setMap(map.instance);

    //create and show markers
    var markers = tracefilter.map((obj, index, arr) => new google.maps.Marker({
        draggable: false,
        animation: google.maps.Animation.DROP,
        position: new google.maps.LatLng(obj.lat, obj.lng),
        map: map.instance,
        id: obj._id,
        label: (++index).toString(),
        title: obj.date.toUTCString(),
    }));



}
