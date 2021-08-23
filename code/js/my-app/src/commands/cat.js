export function cat (input, folder, path) {
    var ret1
    var ret2
    var index = 'a';
    for(let i = 0; i < folder.length; i++) {
        if(folder[i].id === (path+"/"+input)) {
            if (folder[i].folder === "True") {
                index = 'b';
            } else {
                index = i;
                break;
            }
        }
    }
    if (index !== 'a' && index !== 'b'){
        ret1 = folder[index].value[0].value;
    }
    else if(index === 'a') {
        ret1 = "error";
        ret2 = "cat: "+input+": No such file or directory";
    } else if (index === 'b') {
        ret1 = "error";
        ret2 = "cat: "+input+": Is a directory";
    }
    return({ret1, ret2})
}