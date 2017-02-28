 Meteor.publish('traceme', function(){
    return TraceMe.find({userId: this.userId});
  });