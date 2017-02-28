var {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLID,
    GraphQLSchema,
    GraphQLList
} =
require('graphql');

var locationType = new GraphQLObjectType({
    name: 'Location',
    description: 'user Location',
    fields: {
        lat: {
            type: GraphQLInt,
        },
        long: {
            type: GraphQLInt,
        },
        date: {
            type: GraphQLString,
        }
    }
});

var userType = new GraphQLObjectType({
    name: 'User',
    description: 'fake data json...',
    fields: {
        _id: {
            type: GraphQLID,
        },
        userId: {
            type: GraphQLInt,
        },
        locations: {
            type: new GraphQLList(locationType),
        }
    }
});

var queryType = new GraphQLObjectType({
    name: 'Query',
    description: 'entry point...',
    fields: {
        traceUserByDateToDate: {
            type: new GraphQLList(userType),
            args: {
                userId: {
                    type: GraphQLInt,
                },
                byDate: {
                    type: GraphQLString,
                },
                toDate: {
                    type: GraphQLString,
                }
            },
            resolve: (root, args) => {
                return User.find({ userId: args.userId }, (err, user) => {
                    if (err) throw err;
                    //do somethink whith users                    
                })
            }
        },
    },
});


var mutationType = new GraphQLObjectType({
    name: 'Mutation',
    description: 'updates...',
    fields: {
        addUserTrace: {
            type: userType,
            args: {
                userId: {
                    type: GraphQLInt,
                },
                lat: {
                    type: GraphQLInt,
                },
                long: {
                    type: GraphQLInt,
                },
                date: {
                    type: GraphQLString,
                },
            },
            resolve: (root, args) => {
                return new Promise((resolve, reject) => {
                    User.update({
                            userId: args.userId
                        }, {
                            $push: {
                                locations: {
                                    lat: args.lat,
                                    long: args.long,
                                    date: args.date
                                }
                            }
                        }, { upsert: true },
                        (err, status) => {
                        	//console.log(status);
                            if (err) reject(err);
                            User.findOne({
                                userId: args.userId
                            }, (err, user) => {
                            	//console.log(user);
                                resolve(user);
                            });

                        });
                })
            },
        },
    },
});


var schema = new GraphQLSchema({
    query: queryType,
    mutation: mutationType,
});

module.exports = schema;
