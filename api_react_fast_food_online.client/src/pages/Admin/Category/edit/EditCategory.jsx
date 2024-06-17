import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../constants/routes";
import "./styles.css";

const EditCategory = () => {
    const { categoryId } = useParams(); // Sử dụng đúng tên tham số là categoryId
    const [name, setName] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:12345/api/category/${categoryId}`) // Sử dụng categoryId
            .then((response) => response.json())
            .then((data) => {
                setName(data.name);
            })
            .catch((error) => {
                console.error("Error fetching category:", error);
            });
    }, [categoryId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedCategory = { Name: name };

        fetch(`http://localhost:12345/api/category/${categoryId}`, {
            // Sử dụng categoryId
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedCategory),
        })
            .then(() => {
                navigate(ROUTES.ADMIN.CATEGORY.VIEW); // Chuyển về trang ViewCategories sau khi cập nhật thành công
            })
            .catch((error) => {
                console.error("Error updating category:", error);
            });
    };

    return (
        <div className="edit-category-container">
            <h1>Edit Category</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    required
                />
                <button type="submit">Update Category</button>
                <Link to={ROUTES.ADMIN.CATEGORY.VIEW} className="back-link">
                    Back
                </Link>
            </form>
        </div>
    );
};

export default EditCategory;
