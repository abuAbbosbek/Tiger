// import AppRouters from "./App/AppRouters/index";
// import AuthRouters from "./App/AuthRouters/login";

// function App() {
//     const login = true;
//     return login ? <AuthRouters /> : <AppRouters />;
// }

// export default App;


import AppRouters from "../src/App/AppRouters/index";
import AuthRouters from "../src/App/AuthRouters/login";

function App() {
    let token = localStorage.getItem("accessToken")

    console.log(token)

    return token ?  <AppRouters /> : <AuthRouters />;
}

export default App;


