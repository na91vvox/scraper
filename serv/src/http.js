const db = require('./db.js');
const consts = require('./consts.js');
const express = require('express');
const path = require('path');
const app = express();

const getValidQueryPage = (requestedPage) => {
    if (!requestedPage || isNaN(Number(requestedPage))) return 1;
    return Math.max(1, Math.min(Number(requestedPage), consts.TOTAL_PAGES_COUNT));
};

const DIST_PATH = path.join(__dirname, '..', 'dist')

function init() {

    app.use('/', express.static(DIST_PATH))

    app.get('/query-scraps', async (req, res) => {
        const reqPage = getValidQueryPage(req.query.page);
        res.send(await db.queryScraps(reqPage));
    });

    app.listen(8080, function () {
        console.log('+ Started http server, public serve at:', DIST_PATH);
    });
}

module.exports = {
    init,
};
