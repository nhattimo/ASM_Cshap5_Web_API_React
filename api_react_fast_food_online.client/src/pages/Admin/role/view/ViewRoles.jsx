import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../../constants/routes";
import "./styles.css";

const ViewRoles = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token"); // hoặc lấy token từ nơi bạn lưu trữ
                console.log("Token lấy đc: " + token);
                const response = await fetch(
                    "http://localhost:12345/api/Roles",
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
                    throw new Error("Failed to fetch data");
                }
                const data = await response.json();
                setData(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await fetch(
                `http://localhost:12345/api/Roles/${id}`,
                {
                    method: "DELETE",
                }
            );
            if (!response.ok) {
                throw new Error("Failed to delete role");
            }
            setData(data.filter((item) => item.id !== id));
        } catch (error) {
            console.error("Error deleting role:", error);
        }
    };

    return (
        <div>
            <h1 className="main-title">View Roles</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="roles-container">
                    {data.map((item) => (
                        <div key={item.id} className="role-item">
                            <p>
                                <strong>ID: {item.id}</strong>
                            </p>
                            <h2>
                                <strong>Name:</strong> {item.roleName}
                            </h2>
                            <p>
                                <strong>Description:</strong> {item.description}
                            </p>
                            <div className="role-actions">
                                <Link
                                    to={`curd/role/edit/${item.id}`}
                                    className="edit-button"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() => handleDelete(item.id)}
                                    className="delete-button"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                    <div className="role-item-none">
                        <Link to={ROUTES.ADMIN.ROLE.ADD} className="add-button">
                            Add Role
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ViewRoles;
