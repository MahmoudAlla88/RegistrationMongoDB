import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile, logout } from "../api/auth";


const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfile();
        setUser(res.data);
      } catch (error) {
        toast.error("Unauthorized! Redirecting to login...");
        navigate("/auth");
      }
    };
    fetchProfile();
  }, [navigate]);

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out successfully");
    navigate("/auth");
  };

  if (!user) return <h2>Loading...</h2>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">Profile</h1>
      <div className="bg-gray-200 p-6 rounded-lg shadow-md mt-4">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>
      <button onClick={handleLogout} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">
        Logout
      </button>
    </div>
  );
};

export default Profile;
