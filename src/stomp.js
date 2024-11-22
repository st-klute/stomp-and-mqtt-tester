const { Client } = require('@stomp/stompjs');
const WebSocket = require('ws');
require('dotenv').config();

const IS_SSL = process.env.test_ssl == 'true';
const PORT = IS_SSL ? process.env.web_stomp_port_ssl : process.env.web_stomp_port;
const PROTOCOL = IS_SSL ? 'wss' : 'ws';
const MESSAGE_BODY = 'First STOMP Message with ' + (IS_SSL ? 'SSL' : 'HTTP');
const HOST = `${PROTOCOL}://localhost:${PORT}/ws`

console.log(`Connect to server: ${HOST}`);

const client = new Client({
  brokerURL: HOST,
  connectHeaders: {
    login: process.env.username,
    passcode: process.env.password,
    rejectUnauthorized: false,
  },
  onConnect: () => {
    console.log('connected')
    client.subscribe('/topic/test01', (message) =>
      console.log(`Received: ${message.body}`),
    )
    client.publish({ destination: '/topic/test01', body: MESSAGE_BODY });
  },
  debug: function (str) {
    //console.log(str)
  },
  onStompError: function (str) {
    console.log(str);
  },
  onWebSocketError: function (str) {
    console.log(str);
  },

  webSocketFactory: function () {
    return new WebSocket(HOST, {
      rejectUnauthorized: false,
    });
  },
})

client.activate();

setTimeout(async () => await client.deactivate(), 3000);