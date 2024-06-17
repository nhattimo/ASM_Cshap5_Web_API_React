import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../../constants/routes";
import "./styles.css";

const ViewSuppliers = () => {
    const [suppliers, setSuppliers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSuppliers = async () => {
            try {
                const token = localStorage.getItem("accessToken");
                const response = await fetch(
                    "http://localhost:12345/api/supplier",
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
                    throw new Error("Failed to fetch suppliers");
                }
                const data = await response.json();
                setSuppliers(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching suppliers:", error);
                setLoading(false);
            }
        };

        fetchSuppliers();
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await fetch(
                `http://localhost:12345/api/supplier/${id}`,
                {
                    method: "DELETE",
                }
            );
            if (!response.ok) {
                throw new Error("Failed to delete supplier");
            }
            setSuppliers(suppliers.filter((supplier) => supplier.id !== id));
        } catch (error) {
            console.error("Error deleting supplier:", error);
        }
    };

    return (
        <div>
            {console.log("Vào view")}
            <h1 className="main-title">View Suppliers</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="suppliers-container">
                    {suppliers.map((supplier) => (
                        <div key={supplier.id} className="supplier-item">
                            <p>
                                <strong>ID: {supplier.id}</strong>
                            </p>
                            <h2>
                                <strong>Name:</strong> {supplier.name}
                            </h2>
                            <p>
                                <strong>Company:</strong> {supplier.company}
                            </p>
                            <div className="supplier-actions">
                                <Link
                                    to={`${ROUTES.ADMIN.SUPPLIER.EDIT.replace(
                                        ":id",
                                        supplier.id
                                    )}`}
                                    className="edit-button"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() => handleDelete(supplier.id)}
                                    className="delete-button"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                    <div className="supplier-item-none">
                        <Link
                            to={ROUTES.ADMIN.SUPPLIER.ADD}
                            className="add-button"
                        >
                            Add Supplier
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ViewSuppliers;
