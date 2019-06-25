var ftdi = require('ftdi');

//1027 = 0x403 24577 = 0x6001

ftdi.find(0x403, 0x6001, function (err, devices) {
    console.log('ddddd', devices.length, devices[0]);

    if (devices.length <= 0) {
        console.log('No device found');
        return;
    }
    var device = new ftdi.FtdiDevice(devices[0]);

    device.on('error', function (err) {
        console.log("Error3: " + err)
    });

    device.open({
            baudrate: 9600,//115200, //19200,
            databits: 8,
            stopbits: 1,
            parity: 'none',
            bitmode: 'sync', // for bit bang
            bitmask: 0xff    // for bit bang
        },
        function (err) {

            console.log('[DEVICE] Connected!', device.deviceSettings);

            device.on('data', function (data) {
                console.log("QQQQQQQ: ", data, err ? err : 'noErr ');
            });

            // const writeArray = ['0x04', '0x40'];
            // const writeArray = ['0x40'];
            // const writeArray = [0x01];
            // const writeArray = [0x40];
            // const writeArray = [0x04, 0x40];
            const writeArray = [0x6e];

            //device.setLineProperty(8, 2, ftdi.NONE);

            // device.setLineProperty(8, 2, 0);
            // Turns all relays on, on the USB RLY08
            // http://www.robot-electronics.co.uk/htm/usb_rly08tech.htm
            // device.write('d');

            // device.write('d', () => {
            //     console.log('11111111');
            // });

            var ON = 1;
            var OFF = 0;
            var array = new Array(ON, ON, OFF, ON).reverse();
            console.log(array.join(""),parseInt(array.join(""), 2));
            device.write([0xff], function (err) {
            // device.write([parseInt(array.join(""), 2)], function (err) {

            });
                // device.close();
                // device.write([0x01, 0x02], function (err) {
                //     console.log("Error2: " + err);
                // });

                console.log('fffffff');
            });

            console.log('ssssss');
        });


    console.log('eeeee');
