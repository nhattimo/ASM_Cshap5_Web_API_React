import { Route, Routes } from "react-router-dom";
import ViewCategories from "./view/ViewCategories"; // Đảm bảo tên import chính xác
import AddCategory from "./add/AddCategory";
import EditCategory from "./edit/EditCategory";

const CategoryRoutes = () => {
    return (
        <Routes>
            <Route path="" element={<ViewCategories />} />{" "}
            {/* Sửa lại tên ViewCategories */}
            <Route path="add" element={<AddCategory />} />
            <Route path="edit/:categoryId" element={<EditCategory />} />{" "}
            {/* Đảm bảo đồng nhất với useParams */}
        </Routes>
    );
};

export default CategoryRoutes;
