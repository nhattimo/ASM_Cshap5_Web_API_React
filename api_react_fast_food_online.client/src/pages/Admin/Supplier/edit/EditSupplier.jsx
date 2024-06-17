import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../constants/routes";
import "./styles.css";

const EditSupplier = () => {
    const { supplierId } = useParams(); // Sử dụng đúng tên tham số là supplierId
    const [name, setName] = useState("");
    const [company, setCompany] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        console.log(supplierId); // Kiểm tra giá trị của supplierId
        if (supplierId) {
            const fetchSupplier = async () => {
                try {
                    const token = localStorage.getItem("accessToken"); // Thêm phần lấy token nếu cần xác thực
                    const response = await fetch(
                        `http://localhost:12345/api/supplier/${supplierId}`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`, // Thêm header Authorization nếu cần
                            },
                        }
                    );
                    if (!response.ok) {
                        throw new Error("Failed to fetch supplier");
                    }
                    const data = await response.json();
                    setName(data.name);
                    setCompany(data.company);
                } catch (error) {
                    console.error("Error fetching supplier:", error);
                }
            };

            fetchSupplier();
        }
    }, [supplierId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedSupplier = { name, company };

        try {
            const token = localStorage.getItem("accessToken"); // Thêm phần lấy token nếu cần xác thực
            const response = await fetch(
                `http://localhost:12345/api/supplier/${supplierId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`, // Thêm header Authorization nếu cần
                    },
                    body: JSON.stringify(updatedSupplier),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to update supplier");
            }

            navigate(ROUTES.ADMIN.SUPPLIER.VIEW); // Chuyển về trang ViewSuppliers sau khi cập nhật thành công
        } catch (error) {
            console.error("Error updating supplier:", error);
        }
    };

    return (
        <div className="edit-supplier-container">
            <h1>Edit Supplier</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    required
                />
                <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Company"
                    required
                />
                <button type="submit">Update Supplier</button>
                <Link to={ROUTES.ADMIN.SUPPLIER.VIEW} className="back-link">
                    Back
                </Link>
            </form>
        </div>
    );
};

export default EditSupplier;
