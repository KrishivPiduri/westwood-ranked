import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Home from "./pages/Home";
import Form from "./pages/Form";
import Leaderboard from "./pages/Leaderboard";
import Layout from "../components/Layout";
import ProfilePage from "./pages/ProfilePage";
import RequireAuth from "../components/RequireAuth.jsx";
import Login from "./pages/Login.jsx";
import {AuthProvider} from "../context/AuthContext.jsx";

function App() {
    return (
        <AuthProvider>
            <Router>
                <Layout>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/form" element={<RequireAuth><Form /></RequireAuth>} />
                        <Route path="/leaderboard" element={<Leaderboard />} />
                        <Route path="/profile/:userId" element={<ProfilePage />} />
                        <Route path="/Login" element={<Login />} />
                    </Routes>
                </Layout>
            </Router>
        </AuthProvider>
    );
}

export default App;
