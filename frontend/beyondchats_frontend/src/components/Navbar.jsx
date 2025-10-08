import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-md">
      <h1 className="font-bold text-2xl">BeyondChats</h1>
      <div className="space-x-4 flex items-center">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/quiz" className="hover:underline">Quiz</Link>
        <Link to="/dashboard" className="hover:underline">Dashboard</Link>
        <Link to="/chat" className="hover:underline">Chat</Link>
        <Link to="/videos" className="hover:underline">Videos</Link>
        <button
          onClick={handleLogout}
          className="ml-4 bg-red-500 hover:bg-red-600 px-3 py-1 rounded transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

