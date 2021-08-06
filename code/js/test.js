let var1, object1, array1;
print = (string)=> {console.log(string);}
const input = require('prompt-sync')();

object1 = {
    test: {
        id: 'value',
        id2: 'value2',
    },
    num1: 2,
    ay: "string",
}




var1 = input("test: ")
print(var1);
object1["input"] = var1;
array1 = Object.entries(object1);
print(array1);
