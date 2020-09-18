const nxt = require('nodejs-nxt');

const NXT_SERIAL_PORT = '/dev/tty.NXT-DevB';

// convert a number to an unsigned number
// ex. 100 -> 100,  1 -> 1,  -1 -> 255,  -100 -> 156
const toUnsigned = (number) => {
  return number < 0 ? 0xFF + number + 1 : number;
}

// convert a number to an unsigned hexidecimal string
const toUnsignedHexString = (number) => {
  return `0x${toUnsigned(number).toString(16).toUpperCase()}`;
}

console.log('start');

const playBeep = (nxt0) => {
  return new Promise((resolve, reject) => {
    nxt0.PlayTone(1000, 2000, function(error) {
      if (error) {
        console.error('Could not play the tone!');
        return reject(error);
      }
      console.log('played sound!');
      return resolve();
    });
  });
};

const newNxt = () => {
  return new Promise((resolve, reject) => {
    console.log('connecting to serial port: ', NXT_SERIAL_PORT, '...');
    const myNxt = new nxt.NXT(NXT_SERIAL_PORT, async (error) => {
      if (error) {
        console.error('error connecting to NXT', error);
        return reject(error);
      } else {
        console.log('connected');
        return resolve(myNxt);
      }
    });
  });
};

(async () => {
  try {
    const nxt0 = await newNxt();
    await playBeep(nxt0);
    nxt0.Disconnect();
  } catch (error) {
    console.error('error running script', error);
  }
})();