const SensorTag = require('sensortag');

SensorTag.discover(function (tag) {

  console.log('found Sensortag', tag.address);

  const data = {
    objectTemp: 0,
    ambientTemp: 0,
    humidity: 0,
    temp: 0
  };

  tag.on('disconnect', function() {
		console.log('disconnected!');
		process.exit(0);
	});

  function connectAndSetUpMe() {
    console.log('connectAndSetUp');
    tag.connectAndSetUp(enableIrTempMe);
  }

  function enableIrTempMe() {
    console.log('enableIRTemperatureSensor');
    tag.enableIrTemperature(enableHumidityMe);
  }

  function enableHumidityMe() {
    console.log('enableHumiditySensor');
    tag.enableHumidity(notifyMe);
  }

  function notifyMe() {
    tag.notifyIrTemperature(listenForTempReading);
    tag.notifyHumidity(listenForHumidityReading);
    tag.notifySimpleKey(listenForButton);
  }

  function listenForTempReading() {
		tag.on('irTemperatureChange', function(objectTemp, ambientTemp) {
      data.objectTemp = objectTemp;
      data.ambientTemp = ambientTemp;
	   });
	}

  function listenForHumidityReading() {
    tag.on('humidityChange', function (temp, humidity) {
      data.temp = temp;
      data.humidity = humidity;
    });
  }

	// when you get a button change, print it out:
	function listenForButton() {
		tag.on('simpleKeyChange', function(left, right) {
			if (left) {
				console.log('left: ' + left);
			}
			if (right) {
				console.log('right: ' + right);
			}
			// if both buttons are pressed, disconnect:
			if (left && right) {
				tag.disconnect();
			}
	   });
	}

	// Now that you've defined all the functions, start the process:
	connectAndSetUpMe();

  data.interval = setInterval(function () {
    if (data.ambientTemp) {
      process.stdout.write(
        "Ambient " + data.ambientTemp.toFixed(1) + "°C, " +
        "Object " + data.objectTemp.toFixed(1) + "°C, " +
        "Humidity " + data.humidity.toFixed(1) + "%, " +
        "Temp " + data.temp.toFixed(1) + "°C, " + 
        "     \r");
    }
  }, 1000);

});