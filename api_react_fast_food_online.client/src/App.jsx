import { Route, Routes } from "react-router-dom";
import "./App.css";

import Home from "./pages/Home/index.jsx";
import UserLayout from "./layouts/user/UserLayout.jsx";
import Login from "./pages/Login/index.jsx";
import Register from "./pages/Register/index.jsx";

import SignInAdmin from "./pages/Admin/SignIn/index.jsx";
import SignUpAdmin from "./pages/Admin/SignUp/index.jsx";
import HomeAdmin from "./pages/Admin/Home/index.jsx";
import AdminLayout from "./layouts/admin/AdminLayout.jsx";
import RoleRoutes from "./pages/Admin/role/RoleRoutes.jsx";
import SupplierRoutes from "./pages/Admin/Supplier/SupplierRoutes.jsx";
import CategoryRoutes from "./pages/Admin/Category/CategoryRoutes.jsx";
import ProductItemRoutes from "./pages/Admin/ProductItem/ProductItemRoutes.jsx";

function App() {
    return (
        <div className="app">
            {/* Điều hướng */}
            <Routes>
                {/* Trang giao diện người dùng */}
                <Route element={<UserLayout />}>
                    <Route path={"/"} element={<Home />} />
                </Route>

                {/* Trang mới hoàn toàn */}
                <Route path={"/register"} element={<Register />} />
                <Route path={"/login"} element={<Login />} />

                {/* Trang giao diện ADMIN */}
                <Route element={<AdminLayout />}>
                    <Route path="/admin/curd/role/*" element={<RoleRoutes />} />
                    <Route
                        path="/admin/curd/supplier/*"
                        element={<SupplierRoutes />}
                    />
                    <Route
                        path="/admin/curd/category/*"
                        element={<CategoryRoutes />}
                    />
                    <Route
                        path="/admin/curd/productitem/*"
                        element={<ProductItemRoutes />}
                    />
                    <Route path={"/admin/home"} element={<HomeAdmin />} />
                </Route>
                <Route path={"/admin"} element={<SignInAdmin />} />
                <Route path={"/admin/sign-up"} element={<SignUpAdmin />} />
            </Routes>
        </div>
    );
}

export default App;
