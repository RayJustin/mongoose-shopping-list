exports.DATABASE_URL = process.env.DATABASE_URL || global.DATABASE_URL || (process.env.NODE_ENV === 'production' ? 'mongodb://<dbuser>:<dbpassword>@ds153735.mlab.com:53735/justins_database' : 'mongodb://Justin:Guitar36@ds153735.mlab.com:53735/justins_database');

exports.PORT = process.env.PORT || 8080;

// I need to understand exactly whats going on here