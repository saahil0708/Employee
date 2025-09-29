import { RouterProvider } from "react-router-dom";
import router from "./Routes/Routes";
import Login from "./Auth/Login";

export default function App() {
    // return <RouterProvider router={router} />;
    return <Login />;
}