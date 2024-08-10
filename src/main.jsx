import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "../src/App"
import SearchComponent from "./pages/table";

ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <App />
        <SearchComponent />
    </BrowserRouter>
);
