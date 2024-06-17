import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../constants/routes";
import "./styles.css"; // Import CSS file

const AddCategory = () => {
    const [name, setName] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const newCategory = { Name: name };
        const token = localStorage.getItem("accessToken"); // Lấy token từ localStorage hoặc sessionStorage
        console.log(newCategory);
        fetch("http://localhost:12345/api/category", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`, // Thêm token vào header Authorization
            },
            body: JSON.stringify(newCategory),
        })
            .then((response) => response.json())
            .then(() => {
                console.log("Add thành công");
                navigate(ROUTES.ADMIN.CATEGORY.VIEW); // Chuyển về trang ViewCategories sau khi thêm thành công
            })
            .catch((error) => {
                console.log("Add thất bại");
                console.error("Error adding category:", error);
            });
    };

    return (
        <div className="add-category-container">
            <h1>Add Category</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Category Name"
                    required
                />
                <button type="submit">Add Category</button>
                <Link to={ROUTES.ADMIN.CATEGORY.VIEW} className="back-link">
                    Back
                </Link>
            </form>
        </div>
    );
};

export default AddCategory;
