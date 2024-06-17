import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../../constants/routes";
import "./styles.css";

const ViewProductsItem = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const token = localStorage.getItem("accessToken");
                const response = await fetch(
                    "http://localhost:12345/api/productitem",
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                if (!response.ok) {
                    const errorData = await response.text();
                    console.error("Error response:", errorData);
                    throw new Error("Failed to fetch data");
                }
                const productsData = await response.json();
                setProducts(productsData);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem("accessToken");
            const response = await fetch(
                `http://localhost:12345/api/productitem/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (!response.ok) {
                throw new Error("Failed to delete product");
            }
            setProducts(products.filter((product) => product.id !== id));
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    return (
        <div className="view-products-container">
            <h1 className="main-title">View Products</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="products-container">
                    {products.map((product) => (
                        <div key={product.id} className="product-item">
                            <p>
                                <strong>ID:</strong> {product.id}
                            </p>
                            <h2 className="product-name">
                                <strong>Name:</strong> {product.name}
                            </h2>
                            <p className="product-description">
                                <strong>Description:</strong>{" "}
                                {product.description}
                            </p>
                            <p>
                                <strong>Rating:</strong> {product.rating}
                            </p>
                            <img
                                src={product.imageUrl}
                                alt={product.name}
                                className="product-image"
                            />
                            <div className="product-actions">
                                <Link
                                    to={`${ROUTES.ADMIN.PRODUCTITEM.EDIT.replace(
                                        ":id",
                                        product.id
                                    )}`}
                                    className="edit-button"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() => handleDelete(product.id)}
                                    className="delete-button"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                    <div className="product-item-add">
                        <Link
                            to={ROUTES.ADMIN.PRODUCTITEM.ADD}
                            className="add-button"
                        >
                            Add Product
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ViewProductsItem;
