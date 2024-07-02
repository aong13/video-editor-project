import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import { useEffect } from "react";

const PrivateRoute = () => {
  const { pathname } = useLocation();
  const [, main, sub] = pathname.split("/");
  const selected = sub ? [sub, main] : [main];
  const navigate = useNavigate();

  useEffect(() => {
    !selected[0] && navigate("/edit-video");
  }, [navigate, selected]);

  return (
    <div>
      <Header />
      <main style={{ maxWidth: "1288px", margin: "0 auto" }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default PrivateRoute;
