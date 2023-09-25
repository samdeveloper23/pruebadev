const http = require('http');
const express = require('express');
const socketIo = require('socket.io');
const morgan = require('morgan');
const colors = require('colors');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const path = require('path');
const port = 6677;

const app = express();
const server = http.createServer(app);
const io = socketIo(server);


const corsOptions = {
    origin: 'http://eva00.sytes.net',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: false,
    optionsSuccessStatus: 204,
};

io.use(cors(corsOptions));

io.use(morgan('dev'));

io.use(express.json());

io.use(fileUpload());

io.use(express.static(path.join(__dirname, '..')));

app.get('/', (req, res) => {

    const indexPath = path.join(__dirname, '..', 'index.html');
    res.sendFile(indexPath);
});
const message = [{
    id: 1,
    text: 'Bienvenid@ al chat con socket y nodejs del taller impartido por sam machado',
    nick: 'SamVirtual',
}];

io.on('connection', (socket) => {  /*llamamos a socket para obtener las ropiedades de sus metodos*/

    console.log(`El cliente con IP: ${socket.handshake.address} se a conectato`);

    socket.emit('messages', message);

    socket.on('add-message', (data) => {
        message.push(data);
        io.emit('messages', message);
        const lastMessage = message[message.length - 1];
        console.log('Último mensaje:', lastMessage);
    });
});



server.listen(port, () => {
    console.log(`Servidor en correrto funcionamiento en el puerto: ${port}`.america);
})
