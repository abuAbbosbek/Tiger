import AppRouters from "../src/App/AppRouters/index";
import AuthRouters from "../src/App/AuthRouters/login";

function App() {
    let token = localStorage.getItem("accessToken")

    console.log(token)

    return token ? <AppRouters /> : <AuthRouters />;
}

export default App;