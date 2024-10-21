import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./ProfilePage.css";
import { Camera } from "lucide-react";
import Spinner from 'react-bootstrap/Spinner';

const Profile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [userType, setUserType] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const iid = localStorage.getItem("userId");

  const [image, setImage] = useState(null); // State for the uploaded image

  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/users/profile/${iid}`
      );
      console.log(response.data);
      setUser(response.data.additionalData);
      setUserType(response.data.additionalData.userType);
      setUserEmail(response.data.user.email);
      setFormData(response.data.additionalData);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setError("Failed to fetch user data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();

    // Load image from localStorage when the component mounts
    const savedImage = localStorage.getItem("profileImage");
    if (savedImage) {
      setImage(savedImage);
    }
  }, [iid]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageBase64 = event.target.result;
        setImage(imageBase64);
        localStorage.setItem("profileImage", imageBase64); // Save image to localStorage
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint =
      userType === "teacher"
        ? `http://localhost:5000/api/teachers/update/${id}`
        : `http://localhost:5000/api/students/update/${id}`;

    try {
      const response = await axios.put(endpoint, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Update response:", response.data);

      if (response.data.success) {
        setUser({ ...formData, onlineStatus: user.onlineStatus });
        setIsEditing(false);
        fetchUserData();
      }
    } catch (error) {
      console.error("Error updating user data:", error);
      setError(`Failed to update ${userType} data`);
    }
  };



  if (loading) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center" style={{ height: '100vh' }}>
        <h2 className="mb-4">Please wait, content is loading...</h2>
        <Spinner animation="border" role="status" variant="primary" style={{ width: '4rem', height: '4rem' }}>
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="bg-profile">
      <div className="profile-page">
        {/* Profile Header Section */}
        <div className="profile-header">
          <div className="avatar-container">
            <img
              src={image || user.profilePicture || user.image}
              alt="Profile"
              className="profile-avatar"
            />
            <label className="camera-icon">
              <Camera className="w-5 h-5" />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
            </label>
          </div>
          <h1>
            {user.first_name || user.firstName}{" "}
            {user.last_name || user.lastName}
          </h1>
          <p
            className={`online-status ${user.onlineStatus === "online" ? "online" : "offline"
              }`}
          >
            Status: {user.onlineStatus}
          </p>
        </div>


        {/* Edit Form Section */}
        {isEditing ? (
          <form>
            {/* Common User Fields */}

            <div>
              <label>Date of Birth:</label>
              <input
                type="date"
                name="date_of_birth"
                value={
                  formData.date_of_birth
                    ? formData.date_of_birth.split("T")[0]
                    : ""
                }
                onChange={handleChange}
              />
            </div>

            {/* Additional fields for Students */}
            {userType === "student" && (
              <div>
                <h2>Student Details</h2>
                <div>
                  <label>Phone:</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone || ""}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label>Gender:</label>
                  <select
                    name="gender"
                    value={formData.gender || ""}
                    onChange={handleChange}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label>Academic Level:</label>
                  <select
                    name="academic_level"
                    value={formData.academic_level || ""}
                    onChange={handleChange}
                  >
                    <option value="Primary">Primary</option>
                    <option value="Middle School">Middle School</option>
                    <option value="High School">High School</option>
                    <option value="Undergraduate">Undergraduate</option>
                    <option value="Postgraduate">Postgraduate</option>
                  </select>
                </div>
                <div>
                  <label>Language:</label>
                  <select
                    name="language"
                    value={formData.language || ""}
                    onChange={handleChange}
                  >
                    <option value="All Languages">All Languages</option>
                    <option value="English">English</option>
                    <option value="Arabic">Arabic</option>
                  </select>
                </div>
              </div>
            )}
            {/* Additional fields for Teachers */}
            {userType === "teacher" && (
              <div>
                <h2>Teacher Details</h2>
                <div>
                  <label>Phone:</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone || ""}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label>Country:</label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country || ""}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label>Bio:</label>
                  <textarea
                    name="teacher_desc"
                    value={formData.teacher_desc || ""}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label>Subject:</label>
                  <select
                    name="subject"
                    value={formData.subject || ""}
                    onChange={handleChange}
                  >
                    <option value="Math">Math</option>
                    <option value="English">English</option>
                    <option value="Science">Science</option>
                    <option value="History">History</option>
                    <option value="Geography">Geography</option>
                    <option value="Physics">Physics</option>
                    <option value="Biology">Biology</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Arabic">Arabic</option>
                    <option value="French">French</option>
                    <option value="Philosophy">Philosophy</option>
                    <option value="Psychology">Psychology</option>
                  </select>
                </div>
                <div>
                  <label>Years of Experience:</label>
                  <input
                    type="number"
                    name="years_of_experience"
                    value={formData.years_of_experience || ""}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label>Gender:</label>
                  <select
                    name="gender"
                    value={formData.gender || ""}
                    onChange={handleChange}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label>Level:</label>
                  <select
                    name="level"
                    value={formData.level || ""}
                    onChange={handleChange}
                  >
                    <option value="All levels">All levels</option>
                    <option value="Junior">Junior</option>
                    <option value="Middle">Middle</option>
                    <option value="Senior">Senior</option>
                  </select>
                </div>
                <div>
                  <label>Language:</label>
                  <select
                    name="language"
                    value={formData.language || ""}
                    onChange={handleChange}
                  >
                    <option value="All Languages">All Languages</option>
                    <option value="English">English</option>
                    <option value="Arabic">Arabic</option>
                  </select>
                </div>
              </div>
            )}

            <button type="submit" onClick={handleSubmit}>
              Save
            </button>
            <button type="button" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </form>
        ) : (
          <div className="profile-details">
            {/* عرض معلومات المستخدم */}
            <p className="inline-info">
              <strong>Email:</strong> {userEmail}
            </p>
            <p className="inline-info">
              <strong>Date of Birth:</strong>{" "}
              {user.date_of_birth
                ? new Date(user.date_of_birth).toLocaleDateString()
                : "Not provided"}
            </p>

            {/* معلومات إضافية بناءً على نوع المستخدم */}
            {userType === "teacher" ? (
              <div>
                <h2>Teacher Details</h2>
                <p className="inline-info">
                  <strong>Phone:</strong> {user.phone || "Not provided"}
                </p>
                <p className="inline-info">
                  <strong>Subject:</strong> {user.subject || "Not provided"}
                </p>
                <p className="inline-info">
                  <strong>Years of Experience:</strong>{" "}
                  {user.years_of_experience || "Not provided"}
                </p>
                <p className="inline-info">
                  <strong>Gender:</strong> {user.gender || "Not provided"}
                </p>
                <p className="inline-info">
                  <strong>Level:</strong> {user.level || "Not provided"}
                </p>
                <p className="inline-info">
                  <strong>Bio:</strong> {user.teacher_desc || "No bio provided"}
                </p>
                <p className="inline-info">
                  <strong>Country:</strong> {user.country || "Not provided"}
                </p>
                <p className="inline-info">
                  <strong>Language:</strong> {user.language || "Not provided"}
                </p>
              </div>
            ) : userType === "student" ? (
              <div>
                <h2>Student Details</h2>
                <p className="inline-info">
                  <strong>Phone:</strong> {user.phone || "Not provided"}
                </p>
                <p className="inline-info">
                  <strong>Gender:</strong> {user.gender || "Not provided"}
                </p>
                <p className="inline-info">
                  <strong>Academic Level:</strong>{" "}
                  {user.academic_level || "Not provided"}
                </p>
                <p className="inline-info">
                  <strong>Language:</strong> {user.language || "Not provided"}
                </p>
              </div>
            ) : (
              <div>
                <h2>Unknown User Type</h2>
                <p>Please select a valid user type.</p>
              </div>
            )}

            <button
              className="edit-profile-btn"
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;