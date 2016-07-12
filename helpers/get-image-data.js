"use strict";

module.exports = function (doc) {
    return {
        snippet: doc.snippet,
        url: doc.url || doc.link,
        size: doc.size || `${doc.image.width}×${doc.image.height}`,
        context: doc.context || doc.image.contextLink
    };
};
