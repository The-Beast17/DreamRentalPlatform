import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";

const SharedProtectedRoute = () => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await axios.get("http://localhost:5000/auth/verify", {
          withCredentials: true, // important for cookies!
        });

        if (res.data.authenticated) {
          setAuthenticated(true);
        } else {
          setAuthenticated(false);
        }
      } catch (err) {
        console.error("Verification failed:", err);
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, []);

  if (loading) return <div>Loading...</div>;

  return authenticated ? <Outlet /> : <Navigate to="/Authentication" />;
};

export default SharedProtectedRoute;

