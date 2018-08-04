const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const ruuvi = require('node-ruuvitag');
const _ = require('lodash');
const tags = {};

app.set('view engine', 'pug');
app.use('/static', express.static('dist'));

ruuvi.on('found', tag => {
    tags[tag.id] = tag;
});

app.get('/', (req, res, next) => {
    res.render('index', {});
    next();
}, (req, res) => {
    io.on('connection', client => {
        io.removeAllListeners();
        console.log('Client connected.');
        console.log(tags);

        _.each(tags, tag => {
            client.emit('found', tag.id);
            console.log(tag.id);
            tag.on('updated', data => {
                //console.log('updated');
                client.emit(tag.id, data);
            });
        });
    });
});

server.listen(3000);
