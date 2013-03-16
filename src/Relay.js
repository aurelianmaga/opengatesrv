

function Relay(hardware){
  var self = this;
 
  var StateOff = 0;
  var StateOn = 1;
  var state = StateOff;
  
  self.State = function() {
    return state;
  };
  
  self.flip = function() {
    if (state === StateOff) {
      self.switchOn();
    }else{
      self.switchOff();
    }
  };
  
  self.switchOn = function(){
    self.switch(hardware.RelayOnValue);
    state = StateOn;
  };
  
  self.switchOff = function() {
    self.switch(hardware.RelayOffValue);
    state = StateOff;
  };
  
  self.switch = function(state) {
    hardware.write(state, hardware.port); 
  };
};

module.exports = Relay;