import { Route, Routes } from "react-router-dom";
import Error404 from "./components/Error404";

const ErrorsPage = () => {
    return (
        <Routes>
            <Route path="404" element = {<Error404/>} />
        </Routes>
    )
}

export default ErrorsPage;