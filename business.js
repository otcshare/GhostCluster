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
var curVss;

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
    /*vehicle.subscribe(["running_status_speedometer", "running_status_engine_speed", "running_status_transmission_gear_status", "running_status_steering_wheel_angle"]);
    //vehicle.subscribe(["running_status_engine_speed"]);
    //vehicle.subscribe(["running_status_transmission_gear_status"]);
    //vehicle.subscribe(["running_status_steering_wheel_angle"]);
    vehicle.subscribe(["ThrottlePosition"]);
    vehicle.subscribe(["EngineCoolantTemperature"]);
    vehicle.subscribe(["MachineGunTurretStatus"]);
    vehicle.subscribe(["AirIntakeTemperature"]);*/

    vehicle.subscribe(["VehicleSpeed","EngineSpeed","MassAirFlow","AirIntakeTemperature","ThrottlePosition","EngineCoolantTemperature", "TransmissionShiftPosition",
                       "SteeringWheelAngle","MachineGunTurretStatus"]);

    document.addEventListener("VehicleSpeed",function(data) {

                                  adjvalue = data.value.value;
                                  curVss = adjvalue;
                                  var velocityUnits = $('#velocityUnits');

                                  if(velocityUnits.text() === "MPH")
                                      adjvalue = Math.floor(adjvalue * 0.62137);

                                  $('#velocity').text(adjvalue);

                                  calcAverageVelocity(adjvalue);
                              },false);

    document.addEventListener("EngineSpeed", function(data) {
                                  var value = data.value.value;
                                  if(value > 10000) value =10000;
                                  var needleDegs = value / 10000 * 180;
                                  $('#rpms').text(value);
                                  $('#rpmNeedle').css("-webkit-transform","rotate("+needleDegs+"deg)");
                              },false);

    document.addEventListener("TransmissionShiftPosition",function(data) {
                                  value = data.value.value;
								  if(value == 128)
									  $('#gear').text('Reverse');
								  else if(value == 0)
									  $('#gear').text('Neutral');
                                  else $('#gear').text(value);
								  
                              },false);

    document.addEventListener("SteeringWheelAngle", function(data) {
                                  value = data.value.value;
                                  $('#wheel').css("-webkit-transform","rotate("+value+"deg)");
                                  $('#machinegun').css("-webkit-transform","rotate("+value+"deg)");
                              },false);

    document.addEventListener("ThrottlePosition", function(data) {
                                  value = data.value.value;
                                  var needleDegs = (value / 100 * 180) + 270

                                  $('#throttleNeedle').css("-webkit-transform","rotate("+needleDegs+"deg)");

                              },false);

    document.addEventListener("EngineCoolantTemperature", function(data) {
                                  value = data.value.value;
                                  var needleDegs = (value / 180 * 70) + 270

                                  $('#engineCoolantNeedle').css("-webkit-transform","rotate("+needleDegs+"deg)");

                              },false);

    document.addEventListener("MachineGunTurretStatus", function(data) {
                                  value = data.value.value;
                                  if(value === "1")
                                      $('#machineGunTurretPopup').popup('open');
                                  else $('#machineGunTurretPopup').popup('close');

                              },false);

    document.addEventListener("MassAirFlow", function(data) {
                                  value = data.value.value;
                                  var maf = value;
                                  var vss = curVss;
                                  var mpg = Math.floor((14.7 * 6.17 * 4.54 * vss * 0.621371) / (3600 * maf / 100));

                                  $('#mpg').text(mpg);

                                  calcAverageMpg(mpg);

                              },false);



}

function connect(addy)
{
    vehicle = new Vehicle(connected, function(){$('#velocity').text("ERR");}, "ws://"+addy, "http-only");
}

window.onload = function()
{
    var addy = "127.0.0.1:23000";

    var vehicle = tizen.vehicle

    var vehicleSpeed = vehicle.get("VehicleSpeed");
    console.log("Vehicle speed: " + vehicleSpeed.VehicleSpeed);

    if(typeof(Storage)!== "undefined")
    {
        addyTemp = localStorage.address;
        if(addyTemp !== undefined) addy = addyTemp;
    }

    $("#address").val(addy);
    $("#address").change(function() { localStorage.address = $("#address").val(); });
    $("#connectButton").click(function() { connect(addy) });

    

    //connect(addy);

    var velocityUnits = $('#velocityUnits');
    velocityUnits.click(function() {
                              if(velocityUnits.text() === "MPH")
                              {
                                  velocityUnits.text("KPH");
                              }
                              else velocityUnits.text("MPH");
                        });

   vehicle.subscribe("VehicleSpeed",function(data) {
				  console.log("Vehicle data" + data.VehicleSpeed);
                                  adjvalue = data.VehicleSpeed;
                                  curVss = adjvalue;
                                  var velocityUnits = $('#velocityUnits');

                                  if(velocityUnits.text() === "MPH")
                                      adjvalue = Math.floor(adjvalue * 0.62137);

                                  $('#velocity').text(adjvalue);

                                  calcAverageVelocity(adjvalue);
                              });

   vehicle.subscribe("EngineSpeed", function(data) {
                                  var value = data.EngineSpeed;
                                  if(value > 10000) value =10000;
                                  var needleDegs = value / 10000 * 180;
                                  $('#rpms').text(value);
                                  $('#rpmNeedle').css("-webkit-transform","rotate("+needleDegs+"deg)");
                              });

    vehicle.subscribe("Transmission",function(data) {
                                  value = data.GearPosition;
                                  if(value == 128)
                                      $('#gear').text('Reverse');
                                  else if(value == 0)
                                      $('#gear').text('Neutral');
                                  else $('#gear').text(value);

                              });

    vehicle.subscribe("SteeringWheelAngle", function(data) {
                                  value = data.SteeringWheelAngle;
                                  $('#wheel').css("-webkit-transform","rotate("+value+"deg)");
                                  $('#machinegun').css("-webkit-transform","rotate("+value+"deg)");
                              });

    vehicle.subscribe("ThrottlePosition", function(data) {
                                  value = data.ThrottlePosition;
                                  var needleDegs = (value / 100 * 180) + 270

                                  $('#throttleNeedle').css("-webkit-transform","rotate("+needleDegs+"deg)");

                              });

    vehicle.subscribe("EngineCoolantTemperature", function(data) {
                                  value = data.EngineCoolantTemperature;
                                  var needleDegs = (value / 180 * 70) + 270

                                  $('#engineCoolantNeedle').css("-webkit-transform","rotate("+needleDegs+"deg)");

                              });

    vehicle.subscribe("MachineGunTurretStatus", function(data) {
                                  value = data.MachineGunTurretStatus;
                                  if(value === "1")
                                      $('#machineGunTurretPopup').popup('open');
                                  else $('#machineGunTurretPopup').popup('close');

                              });
}
