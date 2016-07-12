"use strict";

module.exports = function (db) {
    const searchResults = db.collection("searchresults");

    searchResults.createIndex({expireAt: 1}, {expireAfterSeconds: 0});

    return {
        find(query) {
            return searchResults.find(query).toArray();
        },
        insertMany(docs) {
            return searchResults.insertMany(docs);
        }
    };
};
