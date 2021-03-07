import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'
import http from 'http'
import cookieSession from 'cookie-session'
var fileUpload = require('express-fileupload');

import db from "./models";
import auth from './router/auth';
import studentRouter from './router/student';
import adminRouter from './router/admin';
import coachRouter from './router/coach';
import accountRouter from './router/account';

let app = express();

app.set('views', path.join(__dirname,'templates'));

app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
    safeFileNames: true,
    preserveExtension: true
}));
// app.set('trust proxy', 1) // trust first proxy
app.use(cookieSession({
    name: "session",
    keys : ['key'],
    maxAge : 24*60*60*1000
}))
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/static', express.static(path.join(__dirname, 'public')));
// auth
app.use(auth);
// setuse
//router
app.use("/admin",adminRouter);
app.use("/student",studentRouter);
app.use("/coach",coachRouter);
app.use('/admin/account',accountRouter);

const expressNunjucks = require('express-nunjucks');
const isDev = app.get('env') === 'development';

var njk = expressNunjucks(app, {
    watch: isDev,
    noCache: true,
    autoescape: false,
    watch: true, 
    cache: false,
});

app.set('engine',njk);


let server = http.createServer(app);

db.sequelize.authenticate().then(() => {
    console.log('Connection to database mysql has been established successfully.');
    db.sequelize.sync({ force: false }).then(() => {
        server.listen(process.env.PORT || 3000, () => console.log("Server is listening on port 3000"));
    });

}).catch(err => {
    console.error('Unable to connect to the database:', err);
});