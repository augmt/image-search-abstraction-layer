"use strict";

const express = require("express");
const router = express.Router();
const google = require("googleapis");
const customsearch = google.customsearch("v1");

const DEFAULT_SEARCH_PARAMS = Object.freeze({
    cx: process.env.CSE_ID,
    auth: process.env.GOOGLE_API_KEY,
    safe: "medium",
    searchType: "image"
});

function getImageData(searchResult) {
    return {
        snippet: searchResult.snippet,
        url: searchResult.link,
        size: searchResult.image.width + " × " + searchResult.image.height,
        context: searchResult.image.contextLink
    };
}

router.get("/", function (req, res) {
    const searchPhrase = req.query.q;
    if (!searchPhrase) {
        return res.redirect(301, "/");
    }

    const offset = req.query.offset || 0;
    if (offset > 9) {
        return res.sendStatus(400);
    }

    const searchParams = Object.assign({}, DEFAULT_SEARCH_PARAMS, {
        q: searchPhrase,
        start: offset * 10 + 1
    });
    customsearch.cse.list(searchParams, function (err, data) {
        if (err) {
            console.error(err.stack);
            return res.sendStatus(500);
        }
        if (!data.items) {
            return res.end([]);
        }

        const searchResults = data.items.map(getImageData);
        res.json(searchResults);
    });
});

module.exports = router;
