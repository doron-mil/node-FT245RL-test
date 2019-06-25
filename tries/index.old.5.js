const ftdi = require('FT245RL');


const convertPortsOnArrayToData = (aPortsOnArray) => {
    let portsOnComputedArray = aPortsOnArray;
    if (aPortsOnArray.length === 4) {
        portsOnComputedArray = aPortsOnArray.flatMap(x => [0, x]);
    }
    const retValue = parseInt( portsOnComputedArray.reverse().join('') ,2);
    return retValue;
};

console.log( 'aaaaa' , convertPortsOnArrayToData([1,0,0,0]).toString(16))
console.log( 'aaaaa' , convertPortsOnArrayToData([0,1,0,0]).toString(16))
console.log( 'aaaaa' , convertPortsOnArrayToData([0,0,1,0]).toString(16))
console.log( 'aaaaa' , convertPortsOnArrayToData([0,0,0,1]).toString(16))
console.log( 'aaaaa' , convertPortsOnArrayToData([1,0,1,0]).toString(16))
console.log( 'aaaaa' , convertPortsOnArrayToData([0,1,0,1]).toString(16))
console.log( 'aaaaa' , convertPortsOnArrayToData([1,1,0,0]).toString(16))
console.log( 'aaaaa' , convertPortsOnArrayToData([0,0,1,1]).toString(16))
console.log( 'aaaaa' , convertPortsOnArrayToData([1,1,1,1]).toString(16))
