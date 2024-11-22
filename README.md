# RabbitMQ STOMP & MQTT

RabbitMQ STOMP / MQTT examples.

## Quick Start

Run RabbitMQ broker.

```sh
# Install packages
npm install
```

Create a `.env` file and fill in the variables from `.env.example` file.

Execute the different examples:

```sh
# Install packages
test_ssl=true node src/mqtt.js
test_ssl=false node src/mqtt.js

test_ssl=true node src/stomp.js
test_ssl=false node src/stomp.js
```
