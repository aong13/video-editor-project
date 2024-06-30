import { Outlet } from "react-router-dom";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";

const PrivateRoute = () => {
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
