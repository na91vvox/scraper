const Axios = require('axios');
const axios = Axios.default.create({ timeout: 7000 });
const consts = require('./consts.js');

const URL = `https://www.sreality.cz/api/cs/v2/estates`
   + `?category_main_cb=1&category_type_cb=1&page=1&per_page=${consts.TOTAL_ITEMS_COUNT}&tms=${Date.now()}`;

async function scrape() {
   const result = await axios.get(URL);
   const resultMapped = result.data._embedded.estates.map((estate) => {
      return {
         title: estate.name,
         image: estate._links.images[0].href,
      };
   });
   return resultMapped;
}

module.exports = {
   scrape,
};
