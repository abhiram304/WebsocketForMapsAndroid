
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');
var server = require('websocket').server;
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);


var socket = new server({
    httpServer: http.createServer(app).listen(process.env.PORT || 5000,function(){
    	console.log("Server Listening ");
    })
});

socket.on('request', function(request) {
    var connection = request.accept(null, request.origin);

    connection.on('message', function(message) {
        console.log(message.utf8Data);       
       /*comments=['Missed to field','Classic Text Book Shot','Hat trick','Classical Shot','Unbelievable miss','Out of the stadium!'];
        //connection.sendUTF('hello');
        
        	i=0;
        	var interval=setInterval(func, 5000);
        	var score=[1,2,3,4,5,6];
        	function func(){
        		if(i==6){i=0;}
        		connection.sendUTF("Score: "+ score[i]+"<br> Comment: "+comments[i]);
        		console.log(score[i]);
        		
        		i++;	
        		console.log("++"+score[i]);
        	}
*/        //out();
        /*setTimeout(function() {
        	connection.sendUTF('Location: '+ (i++));
        }, 1000);*/
    });
    connection.on('close', function(connection) {
        console.log('connection closed');
    });
}); 


/*http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
*/