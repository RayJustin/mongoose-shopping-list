exports.DATABASE_URL = process.env.DATABASE_URL || global.DATABASE_URL || (process.env.NODE_ENV === 'production' ? 'mongodb://<dbuser>:<dbpassword>@ds153735.mlab.com:53735/justins_database' : 'mongodb://localhost/shopping-list-dev');

exports.PORT = process.env.PORT || 8080;
