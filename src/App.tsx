import { Route, HashRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import { HomePage } from "./components/menus/HomePage";
import { Layout } from "./components/menus/Layout";
import { HelpPage } from "./components/menus/HelpPage";
import { ParameterPage } from "./components/menus/ParameterPage";
import { DetailsHelpPage } from "./components/menus/DetailsHelpPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/help-details" element={<DetailsHelpPage />} />
          <Route path="/settings" element={<ParameterPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
