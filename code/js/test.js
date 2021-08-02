let var1, object1, array1;

object1 = {
    test: {
        id: 'value',
        id2: 'value2',
    },
    num1: 2,
    ay: "string",
}

const prompt = require('prompt-sync')();
var1 = prompt("test: ")
console.log(var1);
object1["input"] = var1;
array1 = Object.entries(object1);
console.log(array1);
