import { Route, Routes } from "react-router-dom";
import EditRole from "./edit/EditRole";
import AddRole from "./add/AddRole";
import ViewRoles from "./view/ViewRoles";

const RoleRoutes = () => {
    return (
        <Routes>
            <Route path="" element={<ViewRoles />} />
            <Route path="add" element={<AddRole />} />
            <Route path="edit/:roleId" element={<EditRole />} />
        </Routes>
    );
};

export default RoleRoutes;
