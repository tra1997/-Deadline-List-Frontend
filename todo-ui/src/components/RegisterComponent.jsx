import React, { useState } from "react";
import { registerAPICall } from "../services/AuthService";

const RegisterComponent = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // Thông báo kết quả
  const [error, setError] = useState(""); // Thông báo lỗi khi có trường trống

  const handleRegistrationForm = (e) => {
    e.preventDefault(); // Ngăn việc reload trang

    // Kiểm tra nếu trường nào bị bỏ trống
    if (!name || !username || !email || !password) {
      setError("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    const register = { name, username, email, password };
    console.log(register);

    registerAPICall(register)
      .then((response) => {
        console.log(response.data);
        setMessage("Tài khoản đăng ký thành công!"); // Thông báo thành công
        setError(""); // Xóa thông báo lỗi nếu đăng ký thành công
      })
      .catch((error) => {
        console.error(error);
        if (error.response && error.response.status === 400) {
          setMessage("Username hoặc Email đã tồn tại"); // Thông báo lỗi 400
        } else {
          setMessage("Đã xảy ra lỗi, vui lòng thử lại sau."); // Thông báo lỗi chung
        }
        setError(""); // Xóa thông báo lỗi về trường trống nếu có
      });
  };

  return (
    <div className="container">
      <br />
      <br />
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-header">
              <h2 className="text-center">User Registration Form</h2>
            </div>
            <div className="card-body">
              {message && <div className="alert alert-info text-center">{message}</div>} {/* Hiển thị thông báo kết quả */}
              {error && <div className="alert alert-danger text-center">{error}</div>} {/* Hiển thị lỗi trường trống */}
              <form onSubmit={handleRegistrationForm}>
                <div className="row mb-3">
                  <label className="col-md-3 col-form-label">Name</label>
                  <div className="col-md-9">
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Enter name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <label className="col-md-3 col-form-label">Username</label>
                  <div className="col-md-9">
                    <input
                      type="text"
                      name="username"
                      className="form-control"
                      placeholder="Enter username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <label className="col-md-3 col-form-label">Email</label>
                  <div className="col-md-9">
                    <input
                      type="text"
                      name="email"
                      className="form-control"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="row mb-3">
                  <label className="col-md-3 col-form-label">Password</label>
                  <div className="col-md-9">
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="form-group mb-3">
                  <button type="submit" className="btn btn-primary">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterComponent;
