export function help(time, path, command) {
    if (command !== "") {
        return(
            <div style={{"white-space": "pre"}}>
                <div>
                    {custom(command)}
                </div>
            </div>
        )
    }
    return(
        <div style={{"white-space": "pre"}}>
            <div></div>
                <div>{"Hey there, Welcome to jsh, The Worlds Worst Javascript Terminal Emulator!!!"}</div>
                <div>{"You seem a bit new here, let me show ya arround."}</div>
                <br></br>
            <div>
                <div><b>{"What The Hell Is This??"}</b></div>
                <div>{"   JSH is a website that pretends to be a terminal, like is found in nearly every OS."}</div>
                <div>{"   Specifically, It behaves somewhat like ZSH, a bash derivative used mostly on linux"}</div>
                <div>{"   The prompt (funny text with colours on it) shows you the time ("}{time}{") your user (root)"}</div>
                <div>{"   and the path you are at ("}{path}{"). Paths are related to file systems. Basically, you"}</div>
                <div>{"   start at the Home folder and can then move to otehr folders within it, you can also move"}</div>
                <div>{"   back out of the folder you are in to go back to the folder before (e.g. Home)"}</div>
                <br></br>
            </div>
            <br></br>
            <div>
                <div><b>{"Commands:"}</b></div>
                <br></br>
                {cd(path)}
                {ls(path)}
                {pwd(path)}
                {cat()}
                {id()}
                {whoami()} 
            </div>
        </div>
    )
}

function custom(command) {
    if (command === "cat") {
        return(cat());
    } else if (command === "ls") {
        return(ls());
    } else if (command === "id") {
        return(id());
    } else if (command === "pwd") {
        return(pwd());
    } else if (command === "whoami") {
        return(whoami());
    } else if (command === "cd") {
        return(cd());
    }
}

function cd(path) {
    return(
        <div>
            <div><b>{"cd"}</b></div>
            <div>{"The cd command changes the directory you are in (hence the name cd)"}</div>
            <div>{"To use it you type cd followed by where you would like to go"}</div>
            <div>{"e.g. cd Gaming       | this will change directory to "}{path}{"/Gaming if it exists"}</div>
            <div>{"e.g. cd ..                     | this will go back to the previous directory"}</div>
            <br></br>
        </div>
    )
}
function cat() {
    return(
        <div>
            <div><b>{"cat"}</b></div>
            <div>{"the cat command prints the contents of a user specified file"}</div>
            <div>{"e.g. cat file                | this will print the contents of file"}</div>
            <br></br>
        </div>
    )

}
function ls(path) {
    return(
        <div>
            <div><b>{"ls"}</b></div>
            <div>{"The ls command lists the contents of the directory you are currently in or one specified"}</div>
            <div>{"e.g. ls                    | this will list the files in "}{path}</div>
            <div>{"e.g. ls /home      | this will list the files in /home"}</div>
            <br></br>
        </div>
    )
}
function id() {
    return(
        <div>
            <div><b>{"id"}</b></div>
            <div>{"the id command lists the privelages that you have on teh system"}</div>
            <div>{"e.g. id                    | this will show you have privs: uid=1000(q3st1on) gid=1000(q3st1on) groups=1000(q3st1on),5(tty)"}</div>
            <br></br>
        </div>
    )
}
function pwd(path) {
    return(
        <div>
            <div><b>{"pwd"}</b></div>
            <div>{"the pwd command prints the directory the user in currently in (hence the name pwd: Print Working Directory)"}</div>
            <div>{"e.g. pwd                | this will print "}{path}</div>
            <br></br>
        </div>
    )
}
function whoami() {
    return(
        <div>
            <div><b>{"whoami"}</b></div>
            <div>{"the whoami command prints the name of the user who ran id"}</div>
            <div>{"e.g. whoami                | this will print q3st1on"}</div>
            <br></br>
        </div>
    )
}