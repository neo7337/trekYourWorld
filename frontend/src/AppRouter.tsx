import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Contact from "./pages/Contact";

const AppRouter: React.FC = () => {
    return (
        <Routes>
            <Route path="/" Component={Home} />
            <Route path="/search" Component={Search} />
            <Route path="/contact-us" Component={Contact} />
        </Routes>
    )
}

export default AppRouter;