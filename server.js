// Dependencies....................................
// we will need path for serving up static files...
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 3001;

// connecting to sql database via the config folder ..................................................
const sequelize = require('./config/connection');

// setting up everthing we need to use express session and sequelize store.............................
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));
//.......................................................................................................

// handle bars and helpers ..............................................................................
//const helpers = require('./utils/helpers');
const hbs = exphbs.create({ });
// if we instroduce a helpers file for authentication the the above const will look as follows
//const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// use middleware to prepare req.body and to serve static files.....................................
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// telling express to serve up static files we created in public folder..............................
app.use(express.static(path.join(__dirname, 'public')));

// TELLING EXPRESS TO USE THE ROUTES WE CREATED IN ./controllers/index................................
app.use(require('./controllers'));

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});