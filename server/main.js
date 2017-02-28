import casual from 'casual';

Meteor.startup(function() {

    //safe methods
    Meteor.methods({
        traceMe: function(geolocation) {
            //console.log(geolocation);
            if (geolocation) {
                var lat = geolocation.lat;
                var lng = geolocation.lng;
                // var lat = casual.double(from = 45, to = 47);
                // var lng= casual.double(from = 22, to = 24);
                // var date = casual.date('YYYY-MM-DDTHH:MM:SSZ');
                var date = new Date();
                TraceMe.update({ userId: Meteor.userId() }, { $push: { locations: { lat: lat, lng: lng, date: new Date(date) } } }, { upsert: true });
            }
        },
    });
});
