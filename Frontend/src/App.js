import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import AdminHome from "./Pages/AdminHome";
import { ToastContainer } from "react-toastify";
import PrivateComponent from "./AuthCheck";
import Logout from "./Component/Logout";
import ClientHome from "./Pages/ClientHome";
import BookInfo from "./Pages/Client/BookInfo";

function App() {
  return (
    <div>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<ClientHome />} />
        <Route path="/bookinfo" element={<BookInfo />} />
        
          {/* admin routes */}

          <Route path="/Login" element={<Login />} />

          <Route element={<PrivateComponent children={undefined} />}>
            <Route path="/Home" element={<AdminHome />} />
            <Route path="/logout" element={<Logout />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
