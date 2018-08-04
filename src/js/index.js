// tähän clientin puolen jutut
import Vue from 'vue/dist/vue.esm.js';
import socketio from 'socket.io-client';
import VueSocketIO from 'vue-socket.io';

Vue.use(VueSocketIO, socketio('http://localhost:3000'));

const app = new Vue({
    el: '#app',
    data: {
        tags: []
    },
    sockets: {
        connect () {
            console.log('Connected');
        },
        found (id) {
            console.log('got tag '+id);
            this.tags.push(id);
        }
    },
    components: {
        display: require('./components/display.vue').default
    }
});
