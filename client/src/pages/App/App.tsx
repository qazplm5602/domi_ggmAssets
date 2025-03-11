import Header from "@components/Header/Header";
import Login from "@pages/Login/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export default function App() {
    return <BrowserRouter>
        <Header />
        <Routes>
            <Route path="/" element={<h1>main.</h1>} />
            <Route path="/login" element={<Login />} />
        </Routes>
    </BrowserRouter>;
}