const { Pool } = require('pg');

const pool = new Pool({
    user: 'agicmdsrtyhfnv',
    host: 'ec2-50-19-255-190.compute-1.amazonaws.com',
    database: 'd7g5c1feemi9lu',
    password: '4d6c3106180f3a50bf4136d167c592ed017938c7f671760ccb949ce231f23774',
    port: 5432,
    ssl:{
        rejectUnauthorized: false
    }
});

const query = (text, param) => {
    return pool.query(text, param);
}

module.exports = {
    query
}