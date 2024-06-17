import { Route, Routes } from "react-router-dom";
import ViewProductsItem from "./view/ViewProductsItem";
import AddProductItem from "./add/AddProductItem";
import EditProductItem from "./edit/EditProductItem";


const ProductItemRoutes = () => {
    return (
        <Routes>
            <Route path="" element={<ViewProductsItem />} />
            <Route path="add" element={<AddProductItem />} />
            <Route path="edit/:ProductiteamId" element={<EditProductItem />} />
        </Routes>
    );
};

export default ProductItemRoutes;
