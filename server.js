var express = require("express")
var bodyParser = require('body-parser')
app = express();
// we set the port programmatically, in case we need to change it later
var port = 8080;
//this is where we are going to getch our html from
var root = '/public'
//tell express to use the static middleware,
app.use(express.static(__dirname + root));
//start the app and listen to the port

const log4js = require("log4js");
log4js.configure({
    appenders: { logs: { type: "file", filename: "logs.log" } },
    categories: { default: { appenders: ["logs"], level: "info" } }
});

const logger = log4js.getLogger("logs");

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.get("/test", function (request, response) {
    var param = request.query.username
    logger.info('Get requested by ' + param)
    response.send('Thank you for requesting our Get Service')
})

app.get("/calc", function (request, response) {
    var operator = request.query['operator'];
    var num1 =Number(request.query['num1']) ;
    var num2 = Number(request.query['num2']);
   
    var result;
    switch (operator) {
        case 'plus':
            result = num1+num2
            break;
        case 'minus':
            result = num1-num2
            break;

        case 'div':
            result = num1/num2
            break;

        case 'mul':
            result = num1*num2
            break;
        default:
            logger.error('Invalid Operator')
        // code block
    }
    logger.info('Num1: ' + num1 +'Num2:'+num2 +'Operator:'+operator)
    response.send('Calculated value:'+ result)
})

app.post('/test', function (request, response) {
    console.log(request.body)
    var data = request.body;
    logger.info('Post requested, here is the data :' + data)
    response.send('Thank you for requesting our Post Service')
})

app.listen(port);
console.log("Listening on port ", port);