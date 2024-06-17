import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../constants/routes";
import "./styles.css"; // Import CSS file

const AddSupplier = () => {
    const [name, setName] = useState("");
    const [company, setCompany] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const newSupplier = { Name: name, Company: company };
        const token = localStorage.getItem("accessToken"); // Lấy token từ localStorage hoặc sessionStorage
        console.log(newSupplier);
        fetch("http://localhost:12345/api/supplier", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`, // Thêm token vào header Authorization
            },
            body: JSON.stringify(newSupplier),
        })
            .then((response) => response.json())
            .then(() => {
                console.log("Add thành công");
                navigate(ROUTES.ADMIN.SUPPLIER.VIEW); // Chuyển về trang ViewSuppliers sau khi thêm thành công
            })
            .catch((error) => {
                console.log("Add thất bại");
                console.error("Error adding supplier:", error);
            });
    };

    return (
        <div className="add-supplier-container">
            <h1>Add Supplier</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Supplier Name"
                    required
                />
                <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Company"
                    required
                />
                <button type="submit">Add Supplier</button>
                <Link to={ROUTES.ADMIN.SUPPLIER.VIEW} className="back-link">
                    Back
                </Link>
            </form>
        </div>
    );
};

export default AddSupplier;
