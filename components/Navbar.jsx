// components/Navbar.jsx
import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50 border-b border-orange-600">
            <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
                <Link to="/" className="text-orange-600 font-bold text-xl">
                    Westwood Ranked
                </Link>
                <div className="space-x-6">
                    <Link to="/" className="text-orange-600 hover:underline">
                        Home
                    </Link>
                    <Link to="/form" className="text-orange-600 hover:underline">
                        Submit Profile
                    </Link>
                    <Link to="/leaderboard" className="text-orange-600 hover:underline">
                        Leaderboard
                    </Link>
                </div>
            </div>
        </nav>
    );
}
