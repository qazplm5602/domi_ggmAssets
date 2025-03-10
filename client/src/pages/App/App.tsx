import Header from "@components/Header/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export default function App() {
    return <BrowserRouter>
        <Header />
        <Routes>
            <Route path="/" element={<h1>main.</h1>} />
        </Routes>
    </BrowserRouter>;
}