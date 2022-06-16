import express from "express"
import morgan from "morgan"
import path from "path"
const exphbs = require('express-handlebars');

const app = express();

app.set('port',3000);
app.set('views', path.join(__dirname,'views'));
app.engine('.hbs', exphbs.create({
    defaultLayout: 'main',
    extname: '.hbs'
}).engine);

app.set('view engine','hbs');
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(require("./routes/index"));
app.use('/public', express.static(path.join(__dirname,'public')));


module.exports = app;