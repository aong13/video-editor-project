import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./route/PrivateRoute";
import VideoEditor from "./pages/VideoEditor/VideoEditor";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<PrivateRoute />}>
          <Route path="edit-video" element={<VideoEditor />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
