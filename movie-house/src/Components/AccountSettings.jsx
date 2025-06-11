import React, { useEffect, useState } from "react";
import axios from "axios";

const AccountSettings = () => {
  const [email, setEmail] = useState("");
  const [originalEmail, setOriginalEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState(localStorage.getItem("status") || "Active" );
  const [originalStatus, setOriginalStatus] = useState(localStorage.getItem("status") || "Active" );
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("token"));
        if (!token) {
          setError("User is not logged in");
          return;
        }

        const response = await axios.get("http://localhost:5064/api/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setEmail(response.data.email);
        setOriginalEmail(response.data.email);
        setStatus(response.data.status || "Active");
        setOriginalStatus(response.data.status || "Active");
      } catch (err) {
        setError("Failed to fetch profile");
        console.error("Profile fetch error:", err);
      }
    };

    fetchProfile();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
    setSuccessMsg(null);
    setError(null);
  };

  const handleCancelClick = () => {
    setEmail(originalEmail);
    setPassword("");
    setStatus(originalStatus);
    setIsEditing(false);
    setError(null);
    setSuccessMsg(null);
  };

  const handleSaveClick = async () => {
    setLoading(true);
    setError(null);
    setSuccessMsg(null);

    try {
      const token = JSON.parse(localStorage.getItem("token"));
      if (!token) {
        setError("User is not logged in");
        setLoading(false);
        return;
      }

      await axios.put(
        "http://localhost:5064/api/profile",
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
      ).then(data => console.log(data));

      setOriginalEmail(email);
      setOriginalStatus(status);
      setPassword("");
      setIsEditing(false);
      setSuccessMsg("Profile updated successfully!");
    } catch (err) {
      setError("Failed to update profile.");
      console.error("Profile update error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return (
      <div style={{ padding: "20px", color: "red", fontWeight: "bold" }}>
        Error: {error}
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "50px auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        backgroundColor: "#fafafa",
      }}
    >
      <h2 style={{ marginBottom: "20px", color: "#333" }}>Account Settings</h2>

      {/* Email */}
      <label htmlFor="email" style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>
        Email:
      </label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        readOnly={!isEditing}
        style={{
          width: "100%",
          padding: "10px",
          fontSize: "1rem",
          borderRadius: "4px",
          border: isEditing ? "1px solid #007bff" : "1px solid #ccc",
          backgroundColor: isEditing ? "#fff" : "#e9ecef",
        }}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Leave blank to keep current"
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "1rem",
              borderRadius: "4px",
              border: "1px solid #ccc",
              backgroundColor: "#fff",
            }}
          />
        </>
      )}

      {/* Status */}
      <label htmlFor="status" style={{ display: "block", marginTop: "20px", marginBottom: "8px", fontWeight: "600" }}>
        Status:
      </label>
      <select
        id="status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        disabled={!isEditing}
        style={{
          width: "100%",
          padding: "10px",
          fontSize: "1rem",
          borderRadius: "4px",
          border: isEditing ? "1px solid #007bff" : "1px solid #ccc",
          backgroundColor: isEditing ? "#fff" : "#e9ecef",
        }}
      >
        <option value="Active">Active</option>
        <option value="Do Not Disturb">Do Not Disturb</option>
        <option value="Away">Away</option>
        <option value="Offline">Offline</option>
      </select>

      {/* Buttons */}
      <div style={{ marginTop: "20px" }}>
        {!isEditing ? (
          <button
            onClick={handleEditClick}
            style={{
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Edit
          </button>
        ) : (
          <>
            <button
              onClick={handleSaveClick}
              disabled={loading}
              style={{
                padding: "10px 20px",
                backgroundColor: "#28a745",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: loading ? "not-allowed" : "pointer",
                marginRight: "10px",
              }}
            >
              {loading ? "Saving..." : "Save"}
            </button>
            <button
              onClick={handleCancelClick}
              disabled={loading}
              style={{
                padding: "10px 20px",
                backgroundColor: "#6c757d",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              Cancel
            </button>
          </>
        )}
      </div>

      {successMsg && (
        <div style={{ marginTop: "15px", color: "green", fontWeight: "600", fontSize: "0.9rem" }}>
          {successMsg}
        </div>
      )}
    </div>
  );
};

export default AccountSettings;
