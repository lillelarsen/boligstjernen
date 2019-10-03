/**
 * @module Helper/redirects
 */

/**
 * Denne funktion henter endpointet fra URL
 * @param {String} url - Placeholder url'en
 */
exports.refererRedirect = function(url) {
        const refererRedirect = new URL(url).pathname;
        return refererRedirect;
}