import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "../../../../constants/routes";
import "./styles.css";

const EditProductItem = () => {
    const { id } = useParams(); // Lấy id từ URL
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [rating, setRating] = useState(0);
    const [imageUrl, setImageUrl] = useState("");
    const [categoryId, setCategoryId] = useState(""); // Khởi tạo là chuỗi rỗng
    const [supplierId, setSupplierId] = useState(""); // Khởi tạo là chuỗi rỗng
    const [categories, setCategories] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const token = localStorage.getItem("accessToken");
                const response = await fetch(
                    `http://localhost:12345/api/productitem/${id}`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch product details");
                }

                const productData = await response.json();
                setName(productData.Name);
                setDescription(productData.Description);
                setRating(productData.Rating);
                setImageUrl(productData.ImageUrl);
                setCategoryId(productData.CategoryId.toString());
                setSupplierId(productData.SupplierId.toString());
            } catch (error) {
                console.error("Error fetching product details:", error);
            }
        };

        const fetchCategoriesAndSuppliers = async () => {
            try {
                const token = localStorage.getItem("accessToken");
                const [categoriesResponse, suppliersResponse] =
                    await Promise.all([
                        fetch("http://localhost:12345/api/category", {
                            headers: { Authorization: `Bearer ${token}` },
                        }),
                        fetch("http://localhost:12345/api/supplier", {
                            headers: { Authorization: `Bearer ${token}` },
                        }),
                    ]);

                const categoriesData = await categoriesResponse.json();
                const suppliersData = await suppliersResponse.json();

                setCategories(categoriesData);
                setSuppliers(suppliersData);
            } catch (error) {
                console.error(
                    "Error fetching categories and suppliers:",
                    error
                );
            }
        };

        fetchProductDetails();
        fetchCategoriesAndSuppliers();
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedProduct = {
            Id: parseInt(id),
            Name: name,
            Description: description,
            Rating: parseFloat(rating),
            ImageUrl: imageUrl,
            CategoryId: parseInt(categoryId),
            SupplierId: parseInt(supplierId),
        };
        const token = localStorage.getItem("accessToken");

        fetch(`http://localhost:12345/api/productitem/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(updatedProduct),
        })
            .then(() => {
                console.log("Update thành công");
                navigate(ROUTES.ADMIN.PRODUCTITEM.VIEW);
            })
            .catch((error) => {
                console.error("Error updating product:", error);
            });
    };

    return (
        <div className="edit-product-container">
            <h1>Edit Product</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Product Name"
                    required
                />
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                    required
                />
                <input
                    type="number"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    placeholder="Rating"
                    step="0.1"
                    min="0"
                    max="5"
                    required
                />
                <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="Image URL"
                    required
                />
                <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    required
                >
                    <option value="" disabled>
                        Select Category
                    </option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
                <select
                    value={supplierId}
                    onChange={(e) => setSupplierId(e.target.value)}
                    required
                >
                    <option value="" disabled>
                        Select Supplier
                    </option>
                    {suppliers.map((supplier) => (
                        <option key={supplier.id} value={supplier.id}>
                            {supplier.name}
                        </option>
                    ))}
                </select>
                <button type="submit">Update Product</button>
                <Link to={ROUTES.ADMIN.PRODUCTITEM.VIEW} className="back-link">
                    Back
                </Link>
            </form>
        </div>
    );
};

export default EditProductItem;
