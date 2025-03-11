import { Routes, Route } from "react-router-dom";
import Auth from "./pages/login";
import Profile from "./pages/Profile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<h1>Welcome to the Home Page</h1>} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default App;
