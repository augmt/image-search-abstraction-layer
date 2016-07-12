"use strict";

const router = require("express").Router();
const customsearch = require("googleapis").customsearch("v1");
const moment = require("moment-timezone");

let searchQueries;
let searchResults;

const getImageData = require("../helpers/get-image-data");

const DEFAULT_SEARCH_PARAMS = {
    cx: process.env.CSE_ID,
    auth: process.env.GOOGLE_API_KEY,
    safe: "medium",
    searchType: "image"
};

router.get("/", function (req, res) {
    if (!req.query.q || !req.query.q.trim()) return res.redirect(301, "/");
    if (req.query.offset > 9) return res.sendStatus(400);

    const searchPhrase = req.query.q.trim();
    const offset = req.query.offset || 0;
    if (!searchQueries) {
        searchQueries = require("../models/searchqueries")(req.db);
    }
    if (!searchResults) {
        searchResults = require("../models/searchresults")(req.db);
    }

    const PTZ = moment.tz("America/Los_Angeles");
    const expireAt = PTZ.startOf("day").hour(24).toDate();

    searchQueries.insertOne({
        searchPhrase,
        when: new Date(),
        expireAt
    });

    searchResults
        .find({
            searchPhrase,
            index: {
                $gte: offset * 10 + 1,
                $lt: offset * 10 + 11
            }
        })
        .then(docs => {
            if (docs.length) return res.json(docs.map(getImageData));

            const searchParams = Object.assign({}, DEFAULT_SEARCH_PARAMS, {
                q: searchPhrase,
                start: offset * 10 + 1
            });
            customsearch.cse.list(searchParams, (err, data) => {
                if (err) {
                    console.error(err.stack);
                    return res.sendStatus(500);
                }
                if (!data.items) return res.end([]);

                let docs = data.items.map(getImageData);

                res.json(docs);

                for (let i = 0; i < docs.length; i++) {
                    docs[i].expireAt = expireAt;
                    docs[i].index = data.queries.request[0].startIndex + i;
                    docs[i].searchPhrase = searchPhrase;
                }

                searchResults.insertMany(docs);
            });
        });
});

module.exports = router;
