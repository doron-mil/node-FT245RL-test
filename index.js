const ftdi = require('ft245rl');

const funcMap = [];

const setOnDeviceListeners = (aDevice) => {

    aDevice.on('error', function (err) {
        console.log('ON ERROR !!!', err);
        return;
    });
    aDevice.on('open', function () {
        console.log('ON OPEN !!!');
        return;
    });
    aDevice.on('data', function (data) {
        console.log('ON DATA !!!', data);
        return;
    });
    aDevice.on('close', function (data) {
        console.log('ON CLOSE !!!', data);
        return;
    });
    console.log('GO DEVICE !!!', aDevice);
};

funcMap[0] = () => ftdi.find(0x403, 0x6001, function (err, devices) {
    console.log('ddddd', devices.length, devices[0]);
});

const card1_vendorId = 0x403;
const card1_productId = 0x6001;
const card1_serialNumber = 'DAE002N9';

const card2_vendorId = 0x403;
const card2_productId = 0x6001;
const card2_serialNumber = 'A601AXC8';

funcMap[1] = (aPortsCount) => ftdi.findFirst().then((device) => {
    setOnDeviceListeners(device);

    ftdi.openDevice(device).then(() => {

        let data = 0;
        let counter = -1;
        let itCounter = 0;
        let a2 = 0;
        let prev = 0;
        let allOn = true;
        let interval = setInterval(function () {
            counter++;
            if (data >= ((aPortsCount === 8) ? 255 : 15)) {
                data = 0;
                itCounter++;
            }
            const mod = counter % aPortsCount;
            const itMod = itCounter % 2;
            const a1 = 1 << mod;
            const a3 = a1 | data;
            a2 = (a3 !== data) ? a3 : a2;
            data = (mod === aPortsCount - 1) ? a2 : data;
            if (a2 != prev) {
                const dataArray = Array.from(a2.toString(2).padStart(aPortsCount, '0'))
                    .map(x => Number.parseInt(x));
                if (itMod === 0) {
                    dataArray.reverse();
                }
                ftdi.switchPorts(device, dataArray).then(() => {
                    console.log('*********** ', dataArray);
                }).catch((err) => {
                    console.error('Failed to switchPorts !!!!', dataArray);
                });
            } else {
                ftdi.switchAllPorts(device, allOn).then(() => {
                    console.log('All******** ', itMod);
                    allOn = !allOn;
                }).catch((err) => {
                    console.error('Failed to switchAllPorts  !!!! on : ', allOn);
                });
            }
            prev = a2;

        }, 750);
    }).catch((err) => {
        console.error('Failed to open !!!!');
    });

}).catch((err) => {
    console.error('ERRRrr', err);
});

// funcMap[0]();
funcMap[1](8);
