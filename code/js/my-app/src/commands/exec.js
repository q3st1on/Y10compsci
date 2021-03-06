export function exec(binary, folder, path) {
    let out;
    var index = 'a';
    for(let i = 0; i < folder.length; i++) {
        if(folder[i].id === (path+"/"+binary)) {
            if (folder[i].folder === true) {
                index = 'b';
            } else if (folder[i].x === false) {
                index = 'b'
            } else {
                index = i;
                break;
            }
        }
    }

    if (index !== 'a' && index !== 'b'){
        out = folder[index].value[0].value;
    }
    else if(index === 'a') {
        out = "No such file or directory";
    } else if (index === 'b') {
        out = "jsh: permission denied: "+path+"/"+binary;
    }

    return({style: {color: `lightblue`}, value: out, errorcheck: index})
    /*return({style: {color: `lightblue`}, value: "tqls", errorcheck: 0})*/
}