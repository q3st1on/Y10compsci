import { createContext } from 'react';
const progContext = createContext({
    program: 'tlqs',
    changeProg: (prog) => {}
});
export default progContext;