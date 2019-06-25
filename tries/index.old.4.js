const ftdi = require('FT245RL');

// ftdi.find(0x403, 0x6001, function (err, devices) {
//     console.log('ddddd', devices.length, devices[0]);
// });

const vendorId = 0x403;
const productId = 0x6001;


ftdi.findFirst().then((device) => {
    device.on('error', function (err) {
        console.log('8888', err);
    });
    console.log('11111', device);
    let open = 0;
    let interval = setInterval(function () {
        open = open ? 0 : 1;
        device.open({
            baudrate: 9600,
            databits: 8,
            stopbits: 1,
            parity: 'none',
            bitmode: 0x01, // for bit bang
            bitmask: 0xff    // for bit bang
        }, function (err) {

            console.log('22222', err);
            if (err) {
                clearInterval(interval);
                return;
            }
            const data = open ? [0xaa] : [0x0];
            device.write(data, function (err) {
                console.log('3333', err);
            });
            device.close();
        });
    }, 150);

}).catch((err) => {
    console.error('ERRRrr', err);
});


