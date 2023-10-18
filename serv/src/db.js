const { Client } = require('pg');
const scraper = require('./scraper.js');
const consts = require('./consts.js');

const client = new Client({
    host: 'pgdb',
    user: 'postgres',
    database: 'postgres',
    password: 'password123',
});

async function populate() {
    await client.query('CREATE TABLE scraps (id BIGSERIAL PRIMARY KEY, title VARCHAR, image VARCHAR)');
    const rowsSql = (await scraper.scrape())
        .map(item => `('${item.title}', '${item.image}')`)
        .join(',');
    client.query(`INSERT INTO scraps(title, image) VALUES ${rowsSql};`);
}

async function queryScraps(page) {
    const result = await client.query(`SELECT id, title, image FROM scraps ORDER BY scraps.id ASC `
        + `LIMIT ${consts.ITEMS_PER_PAGE_COUNT} OFFSET ${(page - 1) * consts.ITEMS_PER_PAGE_COUNT};`);
    return {
        items: result.rows,
        currentPage: page,
        totalItemsCount: consts.TOTAL_ITEMS_COUNT,
        totalPagesCount: consts.TOTAL_PAGES_COUNT,
        itemsPerPageCount: consts.ITEMS_PER_PAGE_COUNT,
    };
}


const initState = {
    isInit: false,
    interval: null,
};
function init() {
    if (initState.interval) return;
    initState.interval = setInterval(() => {
        if (initState.isInit) {
            return;
        }
        client.connect().then(() => {
            initState.isInit = true;
            populate();
            clearInterval(initState.interval);
        });
    }, 2000);
}

module.exports = {
    init,
    queryScraps,
};
