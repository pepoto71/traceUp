Session.set('traceMe', true);
Session.set('incognito', false);
Session.set('startdate', null);
Session.set('enddate', null);

var traceUp = null;

Template.controls.helpers({
    'showMap': () => {
        return Session.get('showMap');
    },
    'dateinput': ()=>{
                return (Session.get('startdate') && Session.get('enddate'));        
    },
    'traceMe': () => {
        return Session.get('traceMe');
    },
    'incognito': () => {
        return Session.get('incognito');
    },
    'path': function() {
        var path = TraceMe.find();
        //console.log(path);
        return path;
    },
});

Template.controls.events({
    'click .showMap': (event) => {
        event.preventDefault();
        Session.set('showMap', Session.get('showMap') ^ 1);
        //console.log(Session.get('showMap'));
    },
    'click .traceMe': (event) => {
        event.preventDefault();
        Session.set('traceMe', false);
        Session.set('incognito', true);
        //console.log(Meteor.user());
        //console.log(Meteor.userId());
        traceUp = setInterval(() => {Meteor.call('traceMe',Geolocation.latLng())}, 3000);
    },
    'click .incognito': (event) => {
        event.preventDefault();
        Session.set('incognito', false);
        Session.set('traceMe', true);
        clearInterval(traceUp);
    },
    'change .startdate': (event) => {
        event.preventDefault();
        //console.log(event);
        Session.set('startdate', event.target.valueAsDate);
        //console.log(Session.get('date'));
    },
    'change .enddate': (event) => {
        event.preventDefault();
        //console.log(event);
        Session.set('enddate', event.target.valueAsDate);
        //console.log(Session.get('date'));
    }
});
