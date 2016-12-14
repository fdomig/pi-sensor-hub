# pi-sensor-hub
Raspberry Pi Sensor Hub

# Install

```sh
npm install
```

Bluetooth on Linux requires `cap_net_raw` privileges, enable with:

```sh
sudo setcap cap_net_raw+eip $(eval readlink -f `which node`)
```

# Run

```sh
npm start
```