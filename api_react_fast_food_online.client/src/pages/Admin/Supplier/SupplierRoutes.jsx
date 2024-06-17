import { Route, Routes } from "react-router-dom";
import ViewSuppliers from "./view/ViewSuppliers";
import AddSupplier from "./add/Addsupplier";
import EditSupplier from "./edit/EditSupplier";

const SupplierRoutes = () => {
    return (
        <Routes>
            <Route path="" element={<ViewSuppliers />} />
            <Route path="add" element={<AddSupplier />} />
            <Route path="edit/:supplierId" element={<EditSupplier />} />
        </Routes>
    );
};

export default SupplierRoutes;
