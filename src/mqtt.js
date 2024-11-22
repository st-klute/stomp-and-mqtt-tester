const mqtt = require('mqtt');
require('dotenv').config();

const IS_SSL = process.env.test_ssl == 'true';
const PORT = IS_SSL ? process.env.web_mqqt_port_ssl : process.env.web_mqqt_port;
const PROTOCOL = IS_SSL ? 'wss' : 'ws';
const MESSAGE_BODY = 'First MQTT Message with ' + (IS_SSL ? 'SSL' : 'HTTP');
const CLIENT_ID = 'mqttjs_' + Math.random().toString(16).substr(2, 8);
const HOST = `${PROTOCOL}://localhost:${PORT}/ws`;

const options = {
  keepalive: 60,
  clientId: CLIENT_ID,
  protocolId: 'MQTT',
  protocolVersion: 4,
  clean: true,
  reconnectPeriod: 1000,
  connectTimeout: 30 * 1000,
  will: {
    topic: 'WillMsg',
    payload: 'Connection Closed abnormally..!',
    qos: 0,
    retain: false,
  },
  rejectUnauthorized: false,
  username: process.env.username,
  password: process.env.password,
};

console.log(`Connect to server: HOST`);
const client = mqtt.connect(HOST, options);

client.on('error', (err) => {
  console.log('Connection error: ', err);
  client.end();
});

client.on('reconnect', () => {
  console.log('Reconnecting...');
});

client.on('connect', () => {
  console.log('connected');
  client.subscribe('presence', (err) => {
    if (!err) {
      client.publish('presence', MESSAGE_BODY);
    }
  });
});

client.on('message', (topic, message) => {
  console.log('Received:', message.toString());
  client.end();
});
