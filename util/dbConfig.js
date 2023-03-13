const development = {
    username: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    host: process.env.PG_HOST,
    port: parseInt(process.env.PG_HOST) || 5432,
    database: process.env.PG_DB
}

module.exports = development;
