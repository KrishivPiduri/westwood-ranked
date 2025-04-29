import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";

import Home from "./pages/Home";
import Form from "./pages/Form";
import Leaderboard from "./pages/Leaderboard";
import Layout from "../components/Layout";

function App() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/form" element={<Form />} />
                    <Route path="/leaderboard" element={<Leaderboard />} />
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;
