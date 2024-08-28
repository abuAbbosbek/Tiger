// import AppRouters from "./App/AppRouters/index";
// import AuthRouters from "./App/AuthRouters/login";

// function App() {
//     const login = true;
//     return login ? <AuthRouters /> : <AppRouters />;
// }

// export default App;


import { useState } from "react";
import AppRouters from "../src/App/AppRouters/index";
import AuthRouters from "../src/App/AuthRouters/login";

function App() {
    const [login, setLogin] = useState(true);

    return login ? <AuthRouters /> : <AppRouters />;
}

export default App;


