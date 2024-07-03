import React, { useState } from "react";
import axios from "axios";
//import "../../assets/css/app.css";
import { useNavigate } from "react-router-dom";

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const note = Object.fromEntries(formData);
  return fetch("/api/notes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer SOMEJWTTOKEN",
    },
    body: JSON.stringify(note),
  });
}

function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "我就是個測試",
    gender: true,
    dateOfBirth: "1978-05-23",
    email: "123testtest01@gmail.com",
    password: "a123123!",
    address: "桃園市龜山區紅寶七街325號",
    phoneNumber: "0989371508",
  });
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const value = target.type === "checkbox" ? target.checked : target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // 注意：更改URL以匹配你的實際後端API端點
      const response = await axios.post(
        "https://localhost:7236/api/EmailSend/Register",
        formData
      );

      console.log(response.data);
      navigate("/CheckVerificationCode", { state: { email: formData.email } });
      alert("註冊成功！");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("註冊失敗1：", error.response?.data);
        alert("註冊失敗2：" + error.response?.data);
      } else {
        console.error("註冊失敗3：", error);
        alert("註冊失敗4：" + String(error));
      }
    }
  };

  return (
    <section className="content-inner shop-account">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-6 mb-4">
            <div className="login-area">
              <form onSubmit={handleSubmit}>
                <h4 className="text-secondary">Registration</h4>
                <p className="font-weight-600">這邊可以註冊會員</p>
                <div className="mb-4 form-group">
                  <label className="label-title">姓名</label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="姓名"
                    value={formData.name}
                    className="form-control"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4 form-group">
                  <label className="label-title">性别：</label>
                  <select
                    name="gender"
                    value={String(formData.gender)}
                    onChange={handleChange}
                    className="form-control"
                  >
                    <option value="true">男性</option>
                    <option value="false">女性</option>
                  </select>
                </div>

                <div className="mb-4 form-group">
                  <label htmlFor="dateOfBirth">出生日期:</label>
                  <input
                    id="dateOfBirth"
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="mb-4 form-group">
                  <label htmlFor="email">電子信箱:</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="電子信箱"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="mb-4 form-group">
                  <label htmlFor="password">密碼:</label>
                  <input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="密碼"
                    value={formData.password}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="mb-4 form-group">
                  <label htmlFor="address">地址:</label>
                  <input
                    id="address"
                    type="text"
                    name="address"
                    placeholder="地址"
                    value={formData.address}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="mb-4 form-group">
                  <label htmlFor="phoneNumber">手機號碼:</label>
                  <input
                    id="phoneNumber"
                    type="text"
                    name="phoneNumber"
                    placeholder="手機號碼"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                <div className="mb-5">
                  <small>
                    Your personal data will be used to support your experience
                    throughout this website,to manage access to your account,and
                    for other purposes described in our{" "}
                    <a href="privacy-policy.html">privacy policy</a>.
                  </small>
                </div>
                <div className="btn btn-primary btnhover w-100 me-2">
                  <button type="submit" className="btn btn-primary">
                    註冊
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>

    // <section className="content-inner shop-account">
    //   <div className="container">
    //     <div className="row justify-content-center">
    //       <div className="col-lg-6 col-md-6 mb-4">
    //         <div className="login-area">
    //           <form onSubmit={handleSubmit}>
    //             <h4 className="text-secondary">Registration</h4>
    //             <p className="font-weight-600">這邊可以註冊會員</p>
    //             <div className="mb-4">
    //               <label className="label-title">姓名</label>
    //               <input
    //                 className="form-control"
    //                 id="name"
    //                 type="text"
    //                 name="name"
    //                 placeholder="姓名"
    //                 value={formData.name}
    //                 onChange={handleChange}
    //               />
    //             </div>
    //             <div className="mb-4">
    //               <label className="label-title">性别：</label>
    //               <select
    //                 name="gender"
    //                 value={String(formData.gender)}
    //                 onChange={handleChange}
    //                 className="form-control"
    //               >
    //                 <option value="true">男性</option>
    //                 <option value="false">女性</option>
    //               </select>
    //             </div>

    //             <div className="mb-4">
    //               <label htmlFor="dateOfBirth">出生日期:</label>
    //               <input
    //                 id="dateOfBirth"
    //                 type="date"
    //                 name="dateOfBirth"
    //                 value={formData.dateOfBirth}
    //                 onChange={handleChange}
    //                 className="form-control"
    //               />
    //             </div>
    //             <div className="mb-4">
    //               <label htmlFor="email">電子信箱:</label>
    //               <input
    //                 id="email"
    //                 type="email"
    //                 name="email"
    //                 placeholder="電子信箱"
    //                 value={formData.email}
    //                 onChange={handleChange}
    //                 className="form-control"
    //               />
    //             </div>

    //           </form>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </section>
  );
}

export default RegisterForm;
