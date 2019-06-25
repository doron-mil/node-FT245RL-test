const ftdi = require('FT245RL');

// ftdi.find(0x403, 0x6001, function (err, devices) {
//     console.log('ddddd', devices.length, devices[0]);
// });

const vendorId = 0x403;
const productId = 0x6001;

ftdi.find( function (err, devices) {
    console.log('11111', err, devices);
    if (!devices || devices.length <= 0) {
        return;
    }
    const device = new ftdi.FtdiDevice(devices[0]);
    console.log('4444', JSON.stringify(device));

    device.on('error', function (err) {
        console.log('1111', err);
    });

    device.on('data', function (data) {
        console.log('1111', data);
    });

    device.on('modemStatus', function (status) {
        console.log('1111', status);
    });

    let open = 0;
    setInterval(function () {
        open = open ? 0 : 1;
        device.open({
            baudrate: 9600,
            databits: 8,
            stopbits: 1,
            parity: 'none',
            bitmode: 0x01, // for bit bang
            bitmask: 0xff    // for bit bang
        }, function (err) {
            device.on('data', function (data) {
                console.log('1111', data);
            });

            console.log('22222', err);
            const data = open ? [0xaa] : [0x0];
            device.write(data, function (err) {
                console.log('3333', err);
            });
            device.close();
        });
    }, 150);

    console.log('7777', JSON.stringify(device));
});
