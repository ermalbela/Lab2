import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { getProfile, updateProfile } from "../Endpoint";
import { Button, Card, CardBody, CardHeader, Col, Row } from "react-bootstrap";
import Swal from "sweetalert2";

const AccountSettings = () => {
  const [email, setEmail] = useState("");
  const [originalEmail, setOriginalEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState(JSON.parse(localStorage.getItem('status')));
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const statusOptions = ["Active", "Do Not Disturb", "Away", "Offline"];
  const dropdownRef = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("token"));
        if (!token) {
          setError("User is not logged in");
          return;
        }

        const response = await axios.get(getProfile, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);

        setEmail(response.data.email);
        setOriginalEmail(response.data.email);
        // setStatus(response.data.status || "Active");
      } catch (err) {
        setError("Failed to fetch profile");
        console.error("Profile fetch error:", err);
      }
    };

    fetchProfile();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
    setError(null);
  };

  const handleCancelClick = () => {
    setEmail(originalEmail);
    setPassword("");
    setIsEditing(false);
    setError(null);
  };

  const handleSaveClick = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = JSON.parse(localStorage.getItem("token"));
      if (!token) {
        setError("User is not logged in");
        setLoading(false);
        return;
      }

      await axios.put(
        updateProfile,
        {
          email,
          newPassword: password || "",
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ).then(res => {
        console.log(res.data)
        localStorage.setItem('status', JSON.stringify(status));
        window.dispatchEvent(new Event("statusChange"));
        Swal.fire('Success', "Profile updated successfully!", 'success');
      });

      setOriginalEmail(email);
      setPassword("");
      setIsEditing(false);
    } catch (err) {
      setError("Failed to update profile.");
      console.error("Profile update error:", err);
    } finally {
      setLoading(false);
    }
  };

  console.log(status);

  if (error) {
    return (
      <div style={{ padding: "20px", color: "red", fontWeight: "bold" }}>
        Error: {error}
      </div>
    );
  }

  return (
    <>
    <div className="title">
      <h2>Account Settings</h2>
    </div>
    <Card>
      <CardHeader>
        <Row>
          <Col>
            <h3>Account</h3>
          </Col>
        </Row>
      </CardHeader>
      <CardBody>
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <h4>Details</h4>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col>
                    {/* Email */}
                    <label htmlFor="email" style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>
                      Email:
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      readOnly={!isEditing}
                    />

                    {/* Password */}
                    {isEditing && (
                      <>
                        <label htmlFor="password" style={{ display: "block", marginTop: "20px", marginBottom: "8px", fontWeight: "600" }}>
                          New Password:
                        </label>
                        <input
                          type="password"
                          id="password"
                          className="form-control"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Leave blank to keep current"
                        />
                      </>
                    )}

                    {/* Status */}
                    <label htmlFor="status" style={{ display: "block", marginTop: "20px", marginBottom: "8px", fontWeight: "600" }}>
                      Status:
                    </label>
                    <div
                      ref={dropdownRef}
                      style={{
                        position: "relative",
                        width: "100%",
                        cursor: isEditing ? "pointer" : "not-allowed",
                        userSelect: "none",
                      }}
                    >
                      <div
                        onClick={() => isEditing && setIsDropdownOpen(!isDropdownOpen)}
                        className="form-control"
                        
                      >
                        {status || "Select status"}
                      </div>

                      {isEditing && isDropdownOpen && (
                        <ul className="status-dropdown custom-scrollbar">
                          {statusOptions.map((option) => {
                            console.log(option);
                            
                            return(
                            <li
                            key={option}
                              onClick={() => {
                                setStatus(option);
                                setIsDropdownOpen(false);
                              }}
                              className={`status-dropdown-items ${option === status ? "selected" : ''}`}
                            >
                              {option}
                            </li>
                          )})}
                        </ul>
                      )}
                    </div>


                    {/* Buttons */}
                    <div className="mt-4">
                      {!isEditing ? (
                        <Button onClick={handleEditClick} variant="primary">Edit</Button>
                      ) : (
                        <Col className="d-flex justify-content-between w-100">
                          <Button onClick={handleSaveClick} disabled={loading}>
                            {loading ? "Saving..." : "Save"}
                          </Button>
                          <Button onClick={handleCancelClick} disabled={loading} variant="secondary">
                            Cancel
                          </Button>
                        </Col>
                      )}
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </CardBody>
    </Card>
    </>
  );
};

export default AccountSettings;
