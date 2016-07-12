"use strict";

module.exports = function (db) {
    const searchQueries = db.collection("searchqueries");

    searchQueries.createIndex({expireAt: 1}, {expireAfterSeconds: 0});

    return {
        find(query) {
            return searchQueries.find(query).toArray();
        },
        insertOne(doc) {
            return searchQueries.insertOne(doc);
        }
    };
};
