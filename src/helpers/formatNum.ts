export const transformNumber = (number:string) => {
    let numberToTransform = parseFloat(number).toString();
    if (numberToTransform.indexOf('.') != -1) {
        let indexDecimal = numberToTransform.indexOf('.');
        let decimalNum = numberToTransform.slice(indexDecimal + 1);
        let intNum = parseInt(numberToTransform).toString();
    
        let numberTransformed = [];
        let counter = 0;
        for (let i = intNum.length - 1; i >= 0; i--) {
            
            if (counter === 3 && intNum[i] != '-') {
                counter = 0;
                numberTransformed.unshift(',');
                numberTransformed.unshift(intNum[i]);
            } else {
                numberTransformed.unshift(intNum[i]);
            };
            counter++;
        };
        numberTransformed.push('.' + decimalNum)
        return numberTransformed.join('')
    } else {
        let intNum = numberToTransform;
        let numberTransformed = [];
        let counter = 0;
        for (let i = intNum.length - 1; i >= 0; i--) {
            
            if (counter === 3 && intNum[i] != '-') {
                counter = 0;
                numberTransformed.unshift(',');
                numberTransformed.unshift(intNum[i]);
            } else {
                numberTransformed.unshift(intNum[i]);
            }
            counter++;
        };
        return numberTransformed.join('')
    }
}