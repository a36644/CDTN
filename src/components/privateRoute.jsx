/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

const PrivateRouter = (props) => {
  const token = localStorage.getItem("token");

  if (!token) {
    toast.error("Bạn cần đăng nhập để truy cập");
    return <Navigate to="/authenticate/signin" />;
  }

  try {
    const decodedToken = jwtDecode(token);
    const role = decodedToken.scope;

    if (role === "STUDENT" && props.requiredRole !== "STUDENT") {
      toast.error("Bạn không có quyền truy cập");
      return <Navigate to="/student" />;
    }

    if (role === "TEACHER" && props.requiredRole !== "TEACHER") {
      toast.error("Bạn không có quyền truy cập");
      return <Navigate to="/teacher" />;
    }

    if (role === "ADMIN") {
      return <div>{props.children}</div>;
    }

    if (role === props.requiredRole) {
      return <div>{props.children}</div>;
    } else {
      toast.error("Bạn không có quyền truy cập vào trang này");
      return <Navigate to="/" />;
    }
  } catch (error) {
    if (error.response.status === 401) {
      toast.error("Token không hợp lệ, vui lòng đăng nhập lại");
      localStorage.removeItem("token"); // Clear invalid token
      return <Navigate to="/authenticate/signin" />;
    }
  }
};

export default PrivateRouter;
