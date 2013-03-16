describe("Relay", function(){
  var relay;

  beforeEach(function() {
    relay = new Relay({
      port: 0,
      RelayOnValue: 1,
      RelayOffValue: 0,
      write: function(state, port) {
        console.log("writing:"+state + " " + port);
      }
    });
  });
  
  describe("when swithcing ON", function(){
    it("should switch the relay ON", function(){
      relay.switchOn();
      assert(relay.State() === 1);
    });
  });
  
  describe("when swithcing Off", function(){
    it("should switch the relay Off", function(){
      relay.switchOff();
      assert(relay.State() === 0);
    });
  });

  describe("when flipping", function(){
    it("should flip relay", function(){
      relay.flip();
      assert(relay.State() === 1);
      relay.flip();
      assert(relay.State() === 0);
    });
  });
});