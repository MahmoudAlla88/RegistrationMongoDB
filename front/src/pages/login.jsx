import { useState } from "react";
import { signup, login } from "../api/auth";
import { useNavigate } from "react-router-dom";


const Auth = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();
  const [message, setMessage] = useState(""); // لحفظ الرسالة
  const [error, setError] = useState("");
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = isRegister ? await signup(formData) : await login({ email: formData.email, password: formData.password });
      alert(res.data.message); 
      if (!isRegister) navigate("/profile");
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");    }
  };

  return (
    <div>
      <h2>{isRegister ? "Sign Up" : "Login"}</h2>
      <form onSubmit={handleSubmit}>
        {isRegister && <input name="name" placeholder="Name" onChange={handleChange} />}
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">{isRegister ? "Sign Up" : "Login"}</button>
      </form>
      <button onClick={() => setIsRegister(!isRegister)}>
        {isRegister ? "Already have an account? Login" : "Create an account"}
      </button>
    </div>
  );
};

export default Auth;
