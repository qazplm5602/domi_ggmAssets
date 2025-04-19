import Header from "@components/Header/Header";
import LoginState from "@components/LoginState/LoginState";
import Popup from "@components/Popup/Popup";
import AdminCategory from "@pages/Admin/AdminCategory";
import AdminMenu from "@pages/Admin/AdminMenu";
import AdminAssetEdit from "@pages/Admin/AssetEdit";
import AdminUpload from "@pages/Admin/Upload";
import AssetDetail from "@pages/AssetDetail/AssetDetail";
import AssetsList from "@pages/Assets/AssetsList";
import Favorite from "@pages/Favorite/Favorite";
import Home from "@pages/Home/Home";
import Login from "@pages/Login/Login";
import NotFound from "@pages/NotFound/NotFound";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export default function App() {
    return <BrowserRouter>
        <LoginState />
        <Popup />
        <Header />

        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/assets" element={<AssetsList />} />
            <Route path="/asset/:id" element={<AssetDetail />} />
            <Route path="/domilove" element={<Favorite />} />
            <Route path="/admin" element={<AdminMenu />} />
            <Route path="/admin/upload" element={<AdminUpload />} />
            <Route path="/admin/edit/:id" element={<AdminAssetEdit />} />
            <Route path="/admin/category" element={<AdminCategory />} />
            <Route path="/*" element={<NotFound />} />
        </Routes>
    </BrowserRouter>;
}