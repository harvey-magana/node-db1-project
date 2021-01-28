const db = require('../data/dbConfig.js');

module.exports = {
    get,
    getById,
    insert,
    update,
    remove,
  };

async function get() {
    const sql = await db('accounts').toString();

    const accounts = await db('accounts');
    return accounts;
}