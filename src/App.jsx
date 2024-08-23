import AppRouters from "./App/AppRouters/index";
import AuthRouters from "./App/AuthRouters/login";

function App() {
    const login = true;
    return login ? <AuthRouters /> : <AppRouters />;
}

export default App;


