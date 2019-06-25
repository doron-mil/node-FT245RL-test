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

    let data = 0;
    let counter = -1;
    let itCounter = 0;
    let a2 = 0;
    let prev = 0;
    let allOn = true ;
    let interval = setInterval(function () {
        counter++;
        if (data >= 15) {
            data = 0;
            itCounter++;
        }
        const mod = counter % 4;
        const itMod = itCounter % 2;
        const a1 = 1 << mod;
        const a3 = a1 | data;
        a2 = (a3 !== data) ? a3 : a2;
        data = (mod == 3) ? a2 : data;
        if (a2 != prev) {
            const dataArray = Array.from(a2.toString(2).padStart(4, '0'))
                .map(x => Number.parseInt(x));
            if (itMod === 0) {
                dataArray.reverse();
            }
            ftdi.switchPorts(device, dataArray, (err) => {
                console.log('*********** ', dataArray);
            });
        }else{
           ftdi.switchAllPorts(device, allOn , (err) => {
                console.log('*********** ', itMod);
                allOn = !allOn;
            });
        }
        prev = a2;

    }, 100);

}).catch((err) => {
    console.error('ERRRrr', err);
});

