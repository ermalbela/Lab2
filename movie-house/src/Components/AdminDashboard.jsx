import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Card, CardBody, CardHeader, Col, Row, Button, Table } from "react-bootstrap";
import Swal from "sweetalert2";
import AuthContext from "../_helper/AuthContext";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const {role} = useContext(AuthContext);
  const API_BASE = "http://localhost:5064/api/admin_dashboard"; // new controller


  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = JSON.parse(localStorage.getItem("token"));
      const response = await axios.get(`${API_BASE}/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch users.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, username) => {
    Swal.fire({
      title: `Delete ${username}?`,
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const token = JSON.parse(localStorage.getItem("token"));
          await axios.delete(`${API_BASE}/users/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          Swal.fire("Deleted!", `${username} has been removed.`, "success");
          fetchUsers();
        } catch (err) {
          Swal.fire("Error", "Failed to delete user.", "error");
          console.error(err);
        }
      }
    });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Determine if delete button should be shown
  const canDelete = (targetRole) => {
    if (targetRole === "Superadmin") return false; // cannot delete Superadmin
    if (role === "Superadmin") return true;        // can delete Admins & Users
    if (role === "Admin" && targetRole === "User") return true; // Admin only deletes Users
    return false;
  };

  return (
    <>
      <div className="title">
        <h2>Admin Dashboard</h2>
      </div>
      <Card>
        <CardHeader>
          <Row>
            <Col>
              <h3>Manage Users</h3>
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          {loading ? (
            <p>Loading users...</p>
          ) : error ? (
            <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>
          ) : (
            <Table hover striped bordered responsive className="custom-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Last Login</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center">
                      No users found.
                    </td>
                  </tr>
                ) : (
                  users.map((user, index) => (
                    <tr key={user.id}>
                      <td>{index + 1}</td>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td>{user.status}</td>
                      <td>{user.lastLogin ? new Date(user.lastLogin).toLocaleString() : "Never"}</td>
                      <td>
                        {canDelete(user.role) ? (
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleDelete(user.id, user.username)}
                          >
                            Delete
                          </Button>
                        ) : (
                          <span className="text-muted" >No Access</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          )}
        </CardBody>
      </Card>
    </>
  );
};

export default AdminDashboard;
