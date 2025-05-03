import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "/context/AuthContext";

export default function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50 border-b border-orange-600">
            <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
                <Link to="/" className="text-orange-600 font-bold text-xl">
                    Westwood Ranked
                </Link>

                <div className="flex items-center space-x-6">
                    <Link to="/" className="text-orange-600 hover:underline">
                        Home
                    </Link>
                    <Link to="/form" className="text-orange-600 hover:underline">
                        Submit Profile
                    </Link>
                    <Link to="/leaderboard" className="text-orange-600 hover:underline">
                        Leaderboard
                    </Link>

                    <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-orange-300">
                        <img
                            src={
                                user?.photoURL ||
                                "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
                            }
                            alt="Profile"
                            className="w-8 h-8 rounded-full object-cover bg-gray-200"
                        />
                        <span className="text-sm text-orange-600 font-medium">
                            {user?.name || "Guest"}
                        </span>
                        {user && (
                            <button
                                onClick={handleLogout}
                                className="text-sm text-orange-600 hover:underline hover:text-red-800 cursor-pointer hover:font-bold"
                            >
                                Logout
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
