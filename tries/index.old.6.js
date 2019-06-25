const ftdi = require('FT245RL');


const convertPortsOnArrayToData = (aPortsOnArray) => {

    let data = 0;
    let counter = -1;
    let a2 = 0;
    let prev = 0;

    while (counter < 100) {
        counter++;
        if (data >= 15) {
            data = 0;
        }
        const mod = counter % 4;
        const a1 = 1 << mod;
        const a3 = a1 | data;
        a2 = (a3 !== data) ? a3 : a2;
        data = (mod == 3) ? a2 : data;
        if (a2 == prev) {
            // console.log( '^^' , counter,mod,a2,prev,a3)
            continue;
        }
        prev = a2;

        // console.log(mod, a1.toString(2), a2.toString(2), data.toString(2));

        // console.log( a2.toString(2).padStart(4,'0'));
        console.log(Array.from(a2.toString(2).padStart(4,'0'))
            .map(x=>Number.parseInt(x)).reverse());


    }


};

convertPortsOnArrayToData();
