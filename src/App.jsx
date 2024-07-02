import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./route/PrivateRoute";
import VideoEditor from "./pages/VideoEditor/VideoEditor";
import "./App.css";
// import Home from "./pages/Home";
import VideoMerger from "./pages/VideoMerger/VideoMerger";
import LoginPage from "./pages/LoginPage/LoginPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<PrivateRoute />}>
          <Route path="edit-video" element={<VideoEditor />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="merge-video" element={<VideoMerger />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
