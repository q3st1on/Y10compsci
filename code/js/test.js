print = (string)=> {document.getElementById("console").value = string;}

testingfunc = () => {
    print("test")
    var input = document.getElementById("console").value;
    input.addEventListener("keyup", function(event) {
        if (event.key === 'Enter') {
         event.preventDefault();
         print("YOUPRESSEDENTER")
        }
    });
}