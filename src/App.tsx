import { Route, HashRouter as Router, Routes } from "react-router";
import "./App.css";
import { Layout } from "./components/menus/Layout";
import { LightPage } from "./components/menus/LightPage";
import { LightHelpPage } from "./components/menus/LightHelpPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<LightPage />} />
          <Route path="/help" element={<LightHelpPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
