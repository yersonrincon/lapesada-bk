const express = require('express');
const app = express();
const cors = require ('cors');
const { variables } = require("./config");
const bodyParser = require('body-parser');
const usuariosApi =  require('./routes/usuariosRoute');
const passport = require('passport');
const fs = require("fs");
const https = require("https");
const cookieParser = require('cookie-parser'); // ojo
const session = require('express-session'); // ojo
const MemoryStore = require('memorystore')(session); // ojo
const morgan = require('morgan');

const config = require('./config/index');
const chalk = require('chalk');
chalk.level = 3;
const log = console.log;

// parse application/json
//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json({limit: '50mb',extended: true}));
app.use(morgan('dev'));

app.use(cookieParser(process.env.DEFAULT_USER_COOKIE_PASS)); //OJO
app.use( //OJO
    session({
        cookie: { maxAge: 86400000 },
        store: new MemoryStore({
            checkPeriod: 86400000 // prune expired entries every 24h
        }),
        secret: process.env.DEFAULT_USER_COOKIE_PASS,
        resave: true,
        saveUninitialized: true,
    })
);

app.use((req, res, next) => {
    let allowedOrigins = [
        "http://localhost:4200",
        "http://localhost:4201",
        "http://localhost:8444",
        "https://lapesada.herokuapp.com",
        "https://lapesada.herokuapp.com/",
        "https://git.heroku.com/lapesada.git"
       
    ];

    let origin = req.headers.origin;
    log(chalk.red.bgBlue.bold(`origin: ${origin}`));

    if (allowedOrigins.includes(origin)) {
        log(chalk.bgRed.white(`origin includes`, origin))
        res.header("Access-Control-Allow-Origin", origin); // restrict it to the required domain
    }


    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, token, authorization, apiKeyToken, responseType, timeout, content-type"
    );

    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

usuariosApi(app);

//desarrollo
app.listen(variables.PORT, () => {
//eslint-disable-next-line no-console
log(chalk.blueBright(
  `Escuchando por el puerto http://localhost:${variables.PORT}/api/`));
});

