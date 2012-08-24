var counter = 0;
var velocityStream;
var batteryVoltageStream;
var rpmStream;
var headingStream;
var engineCoolantStream;
var throttleStream;
var intakeAirTempStream;
var engineLoadStream;
var engineoiltemp;
var mafStream;

var vehicle;

var mpgReadings = 0;
var prevMpg = 0;

function calcAverageMpg(newMpg) {
	prevMpg += parseInt(newMpg);
	mpgReadings++;

	var averageMpg = prevMpg / mpgReadings;
	$("#avgmpg").text(Math.floor(averageMpg));
}


var velReadings = 0;
var prevVel = 0;

function calcAverageVelocity(newVel) {
	prevVel += parseInt(newVel);
	velReadings++;

	var averageVel = prevVel / velReadings;
	$("#avgspeed").text(Math.floor(averageVel));
}

function connected()
{
    setInterval(function() {
                  vehicle.get("running_status_speedometer", function(data) {

                                  adjvalue = data[0].value;
                                  var velocityUnits = $('#velocityUnits');

                                  if(velocityUnits.text() === "MPH")
                                      adjvalue = Math.floor(data[0].value * 0.62137);

                                  $('#velocity').text(adjvalue);

                                  calcAverageVelocity(adjvalue);
                              },
                              function() { } );

                    vehicle.get("running_status_engine_speed", function(data) {
                                    var value = data[0].value;
                                    if(value > 10000) value =10000;
                                    var needleDegs = value / 10000 * 180;
                                    $('#rpms').text(value);
                                    $('#rpmNeedle').css("-webkit-transform","rotate("+needleDegs+"deg)");
                                },
                                function() { } );

                    vehicle.get("running_status_transmission_gear_status", function(data) {
                                    value = data[0].value;
                                    $('#gear').text(value);
                                },
                                function() { } );

                    vehicle.get("running_status_steering_wheel_angle", function(data) {
                                    value = data[0].value;
                                    $('#wheel').css("-webkit-transform","rotate("+value+"deg)");
                                },
                                function() { } );
              },1000);
}

window.onload = function()
{
            vehicle = new Vehicle(connected, function(){$('#velocity').text("ERR");}, "ws://localhost:23000", "http-only");

	var velocityUnits = $('#velocityUnits');
	velocityUnits.click(function() {
                              if(velocityUnits.text() === "MPH")
							  {
								  velocityUnits.text("KPH");
							  }
							  else velocityUnits.text("MPH");
						});




    /*nobdy.connected = function () {
		if(nobdy.supported.Velocity) {
			velocityStream = nobdy.createStream(nobdy.supported.Velocity);
			velocityStream.changed = function (value) {

				adjvalue = value;

                if(velocityUnits.text() === "MPH")
					adjvalue = Math.floor(value * 0.62137);

				$('#velocity').text(adjvalue);

				calcAverageVelocity(adjvalue);
			}
		}
		if(nobdy.supported.BatteryVoltage) {
			batteryVoltageStream = nobdy.createStream(nobdy.supported.BatteryVoltage);
			batteryVoltageStream.changed = function (value) {
				$('#batteryvoltage').text(batteryVoltageStream.batteryVoltage);
			}
		}
		if(nobdy.supported.EngineRPM) {
			rpmStream = nobdy.createStream(nobdy.supported.EngineRPM);
			rpmStream.changed = function (value) {
				var needleDegs = value / 10000 * 180;
				$('#rpms').text(rpmStream.engineRPM);


				$('#rpmNeedle').css("-webkit-transform","rotate("+needleDegs+"deg)");
			}
		}
		if(nobdy.supported.Heading) {
			headingStream = nobdy.createStream(nobdy.supported.Heading);
			headingStream.changed = function (value) {
				$('#heading').text(headingStream.heading);
			}
		}
		else $('#heading').text("Not supported").attr("style","textcolor=red");

		if(nobdy.supported.EngineCoolantTemp) {
			engineCoolantStream = nobdy.createStream(nobdy.supported.EngineCoolantTemp);
			engineCoolantStream.changed = function (value) {
				$('#enginecoolanttemp').text(engineCoolantStream.engineCoolantTemp);

				var needleDegs = (value / 180 * 70) + 270

				$('#engineCoolantNeedle').css("-webkit-transform","rotate("+needleDegs+"deg)");
			}
		}
		if(nobdy.supported.ThrottlePosition) {
			throttleStream = nobdy.createStream(nobdy.supported.ThrottlePosition);
			throttleStream.changed = function (value) {
				$('#throttle').text(throttleStream.throttlePosition);

				var needleDegs = (value / 100 * 180) + 270

				$('#throttleNeedle').css("-webkit-transform","rotate("+needleDegs+"deg)");
			}
		}
		if(nobdy.supported.IntakeAirTemp) {
			intakeAirTempStream = nobdy.createStream(nobdy.supported.IntakeAirTemp);
			intakeAirTempStream.changed = function (value) {
				$('#iat').text(intakeAirTempStream.intakeAirTemp);

				var needleDegs = (value / 200 * 286) + 217

				$("#iatNeedle").css("-webkit-transform","rotate("+needleDegs+"deg)");
			}
		}
		if(nobdy.supported.EngineLoad) {
			engineLoadStream = nobdy.createStream(nobdy.supported.EngineLoad);
			engineLoadStream.changed = function (value) {
				$('#engineload').text(engineLoadStream.engineLoad);

				var needleDegs = (value / 150 * 180) + 270

				$('#loadNeedle').css("-webkit-transform","rotate("+needleDegs+"deg)");
			}
		}
		if(nobdy.supported.MassAirFlow) {
			mafStream = nobdy.createStream(nobdy.supported.MassAirFlow);
			mafStream.changed = function(value) {
				var maf = value;
				var vss = velocityStream.velocity;
				var mpg = Math.floor((14.7 * 6.17 * 4.54 * vss * 0.621371) / (3600 * maf / 100));

				$('#mpg').text(mpg);

				calcAverageMpg(mpg);
			}
		}
    }*/

    //nobdy.connect("localhost:8082");
}
