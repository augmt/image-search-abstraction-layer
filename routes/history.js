"use strict";

const router = require("express").Router();

let searchQueries;

router.get("/", function (req, res) {
    if (!searchQueries) {
        searchQueries = require("../models/searchqueries")(req.db);
    }

    searchQueries.find({}).then(docs => {
        if (!docs.length) return res.end([]);

        docs = docs.map(doc => {
            return {
                searchPhrase: doc.searchPhrase,
                when: doc.when
            };
        });
        res.json(docs.reverse());
    });
});

module.exports = router;
