var cafPiFace = require('caf_piface')
var Relay = require('./Relay');

var r = new Relay({
  port: 0,
  RelayOnValue: 1,
  RelayOffValue: 0,
  write: function(state, port) {
    piFaceBoard = new cafPiFace.PiFace();
    piFaceBoard.init();
    piFaceBoard.write(state, port);
    piFaceBoard.shutdown()
  }
});

r.flip();
