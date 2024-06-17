import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../constants/routes";
import "./styles.css";

const AddProductItem = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [rating, setRating] = useState(0);
    const [imageUrl, setImageUrl] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [supplierId, setSupplierId] = useState("");
    const [categories, setCategories] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
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

        fetchCategoriesAndSuppliers();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newProduct = {
            Name: name,
            Description: description,
            Rating: parseFloat(rating), // Ensure rating is parsed as float
            ImageUrl: imageUrl,
            CategoryId: parseInt(categoryId), // Ensure categoryId is parsed as int
            SupplierId: parseInt(supplierId), // Ensure supplierId is parsed as int
        };
        const token = localStorage.getItem("accessToken");

        fetch("http://localhost:12345/api/productitem", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(newProduct),
        })
            .then(() => {
                console.log("Add thành công");
                navigate(ROUTES.ADMIN.PRODUCTITEM.VIEW);
            })
            .catch((error) => {
                console.error("Error adding product:", error);
            });
    };

    return (
        <div className="add-product-container">
            <h1>Add Product</h1>
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
                <button type="submit">Add Product</button>
                <Link to={ROUTES.ADMIN.PRODUCTITEM.VIEW} className="back-link">
                    Back
                </Link>
            </form>
        </div>
    );
};

export default AddProductItem;
