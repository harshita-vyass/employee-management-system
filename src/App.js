import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Home from "./pages/Home";
import LeaveManager from "./pages/LeaveManager";
import Users from "./pages/Users";
import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";
import Projects from "./pages/Projects";
import Clients from "./pages/Clients";
import useAuthRedirect from "./hooks/useAuthRedirect";

function App() {
  useAuthRedirect(); 
  return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="leaves" element={<LeaveManager />} />
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Home />} />
          <Route path="leaves" element={<LeaveManager />} />
          <Route path="users" element={<Users />} />
          <Route path="projects" element={<Projects />} />
          <Route path="clients" element={<Clients />} />
        </Route>
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
  );
}

export default App;
