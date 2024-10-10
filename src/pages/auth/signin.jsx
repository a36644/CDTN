import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const SignIn = () => {
  const { register, handleSubmit, reset, setValue, watch } = useForm();
  const navigate = useNavigate();

  const onSubmit = (values) => {
    axios
      .post("http://localhost:8081/authenticate/signin", values)
      .then((res) => {
        if (res.data) {
          localStorage.setItem("token", res.data.token);

          const decodedToken = jwtDecode(res.data.token);
          const role = decodedToken.scope;

          if (role === "ADMIN") {
            toast.success("Đăng nhập thành công");
            setTimeout(function () {
              navigate("/admin");
            }, 1000);
          } else if (role === "TEACHER") {
            toast.success("Đăng nhập thành công");
            setTimeout(function () {
              navigate("/teacher");
            }, 1000);
          } else {
            toast.success("Đăng nhập thành công");
            setTimeout(function () {
              navigate("/student");
            }, 1000);
          }
        }
      })
      .catch((e) => console.log(e));
  };
  return (
    <div className="flex h-[100vh]">
      <div className="hidden lg:block w-2/3">
        <img
          src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
          alt="Login Background"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="w-full max-w-md m-auto bg-white rounded-lg shadow-lg py-10 px-16">
        <h1 className="text-4xl font-bold text-center">Login</h1>
        <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700">Email address</label>
            <input
              {...register("userName")}
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              {...register("password")}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="flex justify-between items-center mb-4">
            <div>
              <input type="checkbox" id="remember-me" className="mr-2" />
              <label htmlFor="remember-me" className="text-gray-600">
                Remember me
              </label>
            </div>
            <a href="#" className="text-blue-500 text-sm">
              Forgot password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            Sign in
          </button>
        </form>
        <div className="mt-6 flex items-center justify-center">
          <div className="border-t border-gray-300 w-16"></div>
          <span className="mx-4 text-gray-500">Or continue with</span>
          <div className="border-t border-gray-300 w-16"></div>
        </div>
        <div className="mt-6 flex space-x-4">
          <button className="w-full py-2 px-4 border rounded-lg flex items-center justify-center hover:bg-gray-100">
            <img
              src="https://img.icons8.com/color/24/000000/google-logo.png"
              alt="Google"
              className="w-5 h-5 mr-2"
            />
            Google
          </button>
          <button className="w-full py-2 px-4 border rounded-lg flex items-center justify-center hover:bg-gray-100">
            <img
              src="https://img.icons8.com/ios-glyphs/24/000000/office-365.png"
              alt="Office 365"
              className="w-5 h-5 mr-2"
            />
            Office 365
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
