// components/Layout.jsx
import Navbar from "./Navbar";

export default function Layout({children}) {
    return (
        <>
            <Navbar />
            <div className="pt-20 px-4"> {/* Adds spacing below navbar */}
                {children}
            </div>
        </>
    );
}
