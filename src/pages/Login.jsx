// pages/Login.jsx
import { auth, provider } from "/firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            await signInWithPopup(auth, provider);
            navigate("/");
        } catch (error) {
            console.error("Login error:", error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="border border-orange-600 p-10 rounded-lg shadow-xl text-center space-y-6">
                <h1 className="text-3xl font-bold text-orange-600">Sign In</h1>
                <button
                    onClick={handleLogin}
                    className="bg-orange-600 hover:bg-orange-700 text-white py-3 px-6 rounded-lg font-semibold transition duration-200"
                >
                    Sign in with Google
                </button>
            </div>
        </div>
    );
}
