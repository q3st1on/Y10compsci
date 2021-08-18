export function cd(input, folder, path) {
    var ret1
    var ret2
    if (input !== ".." && input !== "/" && input !== "."){
      var index = 'a';
      for(let i = 0; i < folder.length; i++) {
        if(folder[i].id === (path+"/"+input)) {
          if (folder[i].folder === "False") {
            index = 'b';
          } else {
            index = i;
          }
        }
      }
      if (index !== 'a' && index !== 'b'){
        ret1 = path+"/"+input;
      }
      else if(index === 'a') {
        ret1 = "error";
        ret2 = "cd: no such file or directory: "+input;
      } else if (index === 'b') {
        ret1 = "error";
        ret2 = "cd: not a directory: "+input;
      }
  
      return({ret1, ret2})
    } else if(input === "..") {
      if (path === "/home") {
        ret1 = path;
        ret2 = "";
        return({ret1, ret2})
      }
      var posdel;
      var foldercount = path.split("/").length - 1;
      if (foldercount === 2) {
        posdel = path.indexOf("/", 1);
        ret1 = path.slice(0,posdel)
      } else if (foldercount === 3) {
        posdel = path.indexOf("/", 1);
        posdel = path.indexOf("/", posdel+1)
        ret1 = path.slice(0,posdel)
      }
      ret2 = "";
      return({ret1, ret2})
    } else if (input === ".") {
      ret1 = path;
      ret2 = "";
      return({ret1, ret2})
    }else {
      ret1 = "/home";
      ret2 = "";
      return({ret1, ret2})
    }  
}