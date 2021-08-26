export function ls(folder, path) {
    var index;
    for(let i = 0; i < folder.length; i++) {
      if(folder[i].id === path) {
        index = i;
      }
    }
    return(
      <>
      <div>
      .
      </div>
      <div>
      ..
      </div>
      <div>
          {folder[index].value.map(id1 => (
                <p style={{colour: `lightblue`}}>{id1.value}</p>
          ))}
      </div>
      </>
    )
}