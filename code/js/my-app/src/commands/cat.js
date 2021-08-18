export function cat (input, folder, path) {
    var ret1
    var ret2
    var index = 'a';
    for(let i = 0; i < folder.length; i++) {
        console.log(i);
        if(folder[i].id === (path+"/"+input)) {
            console.log(folder[i].id);
            if (folder[i].folder === "True") {
                index = 'b';
            } else {
                index = i;
            }
        }
    }
    console.log();
    if (index !== 'a' && index !== 'b'){
        ret1 = folder[index].value;
    }
    else if(index === 'a') {
        ret1 = "error";
        ret2 = "cat: "+input+": No such file or directory";
    } else if (index === 'b') {
        ret1 = "error";
        ret2 = "cat: "+input+": Is a directory";
    }
    console.log({ret1, ret2});
    return({ret1, ret2})
}