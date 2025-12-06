import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext.jsx";

export function Header() {
    const { isAuthenticated, user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate("/");
        } catch (err) {
            console.error("Logout failed:", err);
        }
    };

    const getNavLinkClass = ({ isActive }) =>
        isActive ? "nav-link nav-link-active" : "nav-link";

    return (
        <header className="site-header">
            <nav className="nav-bar">
                {/* Left side */}
                <div className="nav-left">
                    <NavLink to="/" className="logo">
                        AlaskaExplorer
                    </NavLink>

                    <NavLink to="/guides" className={getNavLinkClass}>
                        Guides
                    </NavLink>

                    <NavLink to="/about" className={getNavLinkClass}>
                        About
                    </NavLink>

                    <NavLink to="/contact" className={getNavLinkClass}>
                        Contact
                    </NavLink>

                    {isAuthenticated && (
                        <>
                            <NavLink to="/my-guides" className={getNavLinkClass}>
                                My Guides
                            </NavLink>

                            <NavLink to="/guides/create" className={getNavLinkClass}>
                                Create Guide
                            </NavLink>
                        </>
                    )}
                </div>

                {/* Right side */}
                <div className="nav-right">
                    {isAuthenticated ? (
                        <>
                            <NavLink to="/profile" className={getNavLinkClass}>
                                {user?.displayName || user?.email || "Profile"}
                            </NavLink>

                            <button type="button" className="nav-link nav-button" onClick={handleLogout}>
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <NavLink to="/login" className={getNavLinkClass}>
                                Login
                            </NavLink>

                            <NavLink to="/register" className={getNavLinkClass}>
                                Register
                            </NavLink>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
}
