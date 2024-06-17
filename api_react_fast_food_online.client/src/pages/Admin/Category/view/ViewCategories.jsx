import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../../constants/routes";
import "./styles.css";

const ViewCategories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const token = localStorage.getItem("accessToken");
                const response = await fetch(
                    "http://localhost:12345/api/category",
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                if (!response.ok) {
                    const errorData = await response.text();
                    console.error("Error response:", errorData);
                    throw new Error("Failed to fetch categories");
                }
                const data = await response.json();
                setCategories(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching categories:", error);
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await fetch(
                `http://localhost:12345/api/category/${id}`,
                {
                    method: "DELETE",
                }
            );
            if (!response.ok) {
                throw new Error("Failed to delete category");
            }
            setCategories(categories.filter((category) => category.id !== id));
        } catch (error) {
            console.error("Error deleting category:", error);
        }
    };

    return (
        <div>
            {console.log("Vào view")}
            <h1 className="main-title">View Categories</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="categories-container">
                    {categories.map((category) => (
                        <div key={category.id} className="category-item">
                            <p>
                                <strong>ID: {category.id}</strong>
                            </p>
                            <h2>
                                <strong>Name:</strong> {category.name}
                            </h2>
                            <div className="category-actions">
                                <Link
                                    to={`${ROUTES.ADMIN.CATEGORY.EDIT.replace(
                                        ":id",
                                        category.id
                                    )}`}
                                    className="edit-button"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() => handleDelete(category.id)}
                                    className="delete-button"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                    <div className="category-item-none">
                        <Link
                            to={ROUTES.ADMIN.CATEGORY.ADD}
                            className="add-button"
                        >
                            Add Category
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ViewCategories;
