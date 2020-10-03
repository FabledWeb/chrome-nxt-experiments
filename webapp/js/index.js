
function _requestBluetoothDevice2(name) {
  return navigator.bluetooth.requestDevice({
    filters: [{
      name: name
    }],
    optionalServices: ['battery_service']
  });
}

function _connect(device) {
  return device.gatt.connect();
}

async function requestBluetoothDevice() {
  try {
    const device = await _requestBluetoothDevice2('NXT');
    const server = await _connect(device);
    debugger;
  } catch (err) {
    console.error('caught error', err);
  }
}