import { createContext } from 'react';
const progContext = createContext({
    program: 'jsh',
    changeProg: (prog) => {}
});
export default progContext;