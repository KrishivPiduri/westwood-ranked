// components/RequireAuth.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {useAuth} from "../context/AuthContext.jsx";

export default function RequireAuth({ children }) {
    const navigate = useNavigate();
    const {user} = useAuth();

    useEffect(() => {
        if (!user) navigate("/login");
    }, [navigate]);

    return children;
}
