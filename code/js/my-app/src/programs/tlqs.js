const [current_program, setCurrent_program]= useState('jsh');
const [counter, setCounter] = useState(0);
const { changeProg } = useContext(progContext);
/*THIS CODE IS FOR RENDERING THE TTY*/
const handleChange = (event) => {
  setValue(event.target.value);
};
const scrolldownRef = React.createRef();

const scrollToBottom = () => {
  scrolldownRef.current?.scrollIntoView({ behavior: "smooth" })
};
useEffect(()=>{
  scrollToBottom();
},[])
useEffect(() => {
  scrollToBottom();
})
const onKeyDownHandler = event => {
  if (event.keyCode === 186) {
    if (event.keyCode === 81) {
      setCurrent_program('jsh');
    }
  }
};

const handlettySubmit = (event) => {
  if (event.keyCode === 38) {
    setCounter(counter+1);
  }
  event.preventDefault();
};


/*THIS IS THE END OF CODE FOR RENDERING TQLS*/
const changeToTqls = () => changeProg("tqls");
if (current_program === "tqls") {
  return (
    <>
    <form onSubmit={(event) => handleformSubmit(event)}>
      <div>
        {renderTQLS(counter)}
      </div>
    </form>
    </>
  );
} else {
  setCurrent_program("tqls");
  changeToJsh();
  console.log("jsh lmao");
  console.log(progContext);
  return(
    <>
    <form onSubmit={(event) => handleformSubmit(event)}>
      <div>
        {renderTQLS(counter)}
      </div>
    </form>
    </>
  );
};