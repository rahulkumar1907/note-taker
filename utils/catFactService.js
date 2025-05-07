const axios = require('axios');

const fetchCatFact = async () => {
    try {
        const res = await axios.get('https://catfact.ninja/fact');
        logger.info('Cat fact fetched:', res.data.fact);
        return res.data.fact;
    } catch (err) {
        logger.warn('Default cat fact applied as API fails');
        return 'Default cat fact if API fails.';
    }
};

module.exports = fetchCatFact;
