import Header from "@components/Header/Header";
import LoginState from "@components/LoginState/LoginState";
import AssetDetail from "@pages/AssetDetail/AssetDetail";
import AssetsList from "@pages/Assets/AssetsList";
import Favorite from "@pages/Favorite/Favorite";
import Home from "@pages/Home/Home";
import Login from "@pages/Login/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export default function App() {
    return <BrowserRouter>
        <LoginState />
        <Header />

        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/assets" element={<AssetsList />} />
            <Route path="/asset/:id" element={<AssetDetail />} />
            <Route path="/domilove" element={<Favorite />} />
        </Routes>
    </BrowserRouter>;
}