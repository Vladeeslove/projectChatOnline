const exp = require("express"),
    app = exp(),
    server = require('http').Server(app),
    cookieParser = require('cookie-parser'),
    sio = require("socket.io")(server);



console.log("Инициализация глобальных переменных завершена");

app.use(exp.static(__dirname + '/chat/client'));
app.use(cookieParser());

app.get('/', function(req, res){
    if(req.cookie['userName']){
        res.sendFile('chat/client/testSoket.html', {root: __dirname });
    }else{

    }

});

app.get('/setNameUser', function(req, res){
    if(req.cookie['userName']){

    }else{
        res.sendFile('chat/client/testSoket.html', {root: __dirname });
    }

});

//
//
/*          SOKET.IO FUNCTIONS            */
//
//

sio.on('connection', function (socket) { // Создаем обработчик события 'connection' которое создает io.connect(port); с аргументом socket
    var name = 'U' +socket.id; //(socket.id).toString().substr(1,4); // Создаем никнейм нашему клиенту. В начале буква 'U' дальше берем 3 символа ID (сокета) после первого символа, и все это клеим с помощью '+'
    socket.broadcast.emit('newUser', name); // Отсылает событие 'newUser' всем подключенным, кроме текущего. На клиенте навешаем обработчик на 'newUser' (Отправляет клиентам событие о подключении нового юзера)
    socket.emit('userName', name); // Отправляем текущему клиенту событие 'userName' с его ником (name) (Отправляем клиенту его юзернейм)

    console.log(name + ' подключился к чату!'); // Логгирование


    socket.on('message', function(msg){ // Обработчик на событие 'message' и аргументом (msg) из переменной message
        console.log('-----------'); // Logging
        console.log('Пользователь: ' + name + ' | Сообщение: ' + msg);
        console.log('====> Отправка сообщений остальным участникам...');
        sio.sockets.emit('messageToClients', msg, name); // Отправляем всем сокетам событие 'messageToClients' и отправляем туда же два аргумента (текст, имя юзера)
    });

});


server.listen(3000, function () {
    console.log('App listening on port 3000!');
});

