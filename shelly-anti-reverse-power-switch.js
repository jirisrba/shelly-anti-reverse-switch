// Switch off relay if sending solar power to grid is higher than 0 W

let CONFIG = {
  maxNegativePower: 10, // in W
  statusCounter: 5, // number of events before switch off relay
  urlSwitch: "http://192.168.2.8/rpc/switch.set",
  switchId: 0,
  toggleTime: 5, // 5 sec
};

let counter = 0;

function activateSwitch() {
  Shelly.call(
    "HTTP.POST",
    {
      url: CONFIG.urlSwitch,
      body: { id: CONFIG.switchId, on: false, toggle_after: CONFIG.toggleTime },
      timeout: 5,
    },
    function (response, error_code, error_message) {}
  );
}

Shelly.addStatusHandler(function (notification) {
  if (typeof notification.delta.c_act_power !== "undefined") {
    console.log("EM c_act_power:", notification.delta.c_act_power);
    if (notification.delta.c_act_power < CONFIG.maxNegativePower * -1) {
      counter++;
      console.log("countdown to switch off relay:", counter);
      if (counter >= CONFIG.statusCounter) {
        print(
          "Turn on relay because of sending power: " +
            notification.delta.c_act_power +
            "W to grid"
        );
        activateSwitch();
        counter = 0;
      }
    } else {
      counter = 0;
    }
  }
}, null);
