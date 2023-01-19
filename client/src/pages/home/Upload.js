import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getdept, uploadpaper } from "../../function/Subject";
import "./helper.css";
import Navbar from "./Navbar";
import Slidebar from "./Slidebar";
const initialdata = {
  paper: [],
  sem: "",
  subject: "",
  year: "",
  branch: "",
  addedby: "",
};
const Uploadpaper = () => {
  const [dept, setdept] = React.useState([]);
  const { user } = useSelector((state) => state.user);
  React.useEffect(() => {
    if (user && user.token) {
      loadAllServices(user);
    }
  }, [user]);

  const loadAllServices = async (user) => {
    await getdept(user.token).then((res) => {
      setdept(res.data);
    });
  };
  const [data, setData] = useState(initialdata);
  const [file, setfile] = useState("");

  const fileUpload = async (e) => {
    e.preventDefault();
    if (e.target.files[0].size > 3145728)
      return toast.error("File size should be less than 3MB!");

    setfile(e.target.files[0].name);
    const datas = new FormData();
    datas.append("file", e.target.files[0]);
    datas.append("upload_preset", "carrer");

    const dataFile = await fetch(
      "https://api.cloudinary.com/v1_1/dpwustwce/raw/upload",
      {
        method: "POST",
        body: datas,
      }
    )
      .then((r) => r.json())
      .catch((err) => {
        console.log(err);
      });
    if (dataFile.secure_url !== null) {
      setData({
        ...data,
        paper: [dataFile.url, dataFile.public_id],
      });
      console.log(dataFile);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      if (data.branch !== "" && data.subject !== "" && data.addedby !== "") {
        uploadpaper(data, user.token).then((res) => {
          if (res.status == 200) {
            toast.success("Subject Added");
            setData(initialdata);
            setfile("Select File");
          }
        });
      } else {
        toast.error("Please enter details");
      }
    } catch (err) {
      toast.error("An error Occured!");
    }
  };
  const handleResumeRemove = (data) => {
    setData({ ...data, paper: [] });
    let authtoken = user.token;
    console.log(data[1]);
    axios
      .post(
        "http://localhost:8000/api/removepaper",
        { public_id: data[1] },
        { headers: { authtoken } }
      )
      .then((res) => {
        console.log(res);
        const { resumes } = data;
        let filteredImages = resumes.filter((item) => {
          return item.public_id !== res.data.public_id;
        });
      })
      .catch((err) => {});
  };
  return (
    <>
      <Navbar />
      <Slidebar />
      <div className="profile-authentication-area">
        <div className="d-table1">
          <div className="container">
            <div className="signin-form">
              <h2 style={{ fontWeight: "bold" }}>Add Subject</h2>
              <form>
                <div className="form-group">
                  <label>Branch</label>
                  <select
                    className="form-control"
                    name="branch"
                    value={data.branch}
                    onChange={(e) => {
                      setData({ ...data, branch: e.target.value });
                      // setdept(
                      //   dept.filter((d) => {
                      //     return d === e.target.value;
                      //   })
                      // );
                    }}
                  >
                    <option value="">Select Branch</option>
                    {[
                      "Information technology",
                      "computer eng",
                      "Electronic eng",
                      "biomedical eng",
                    ].map((d) => (
                      <option value={d}>{d}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Sem</label>
                  <select
                    className="form-control"
                    name="sem"
                    value={data.sem}
                    onChange={(e) => {
                      setData({ ...data, sem: e.target.value });
                      // setdept(
                      //   prev.filter((d) => {
                      //     return d === e.target.value;
                      //   })
                      // );
                    }}
                  >
                    <option value="">Select Semester</option>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((d) => (
                      <option value={d}>{d}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Subject</label>
                  <select
                    className="form-control"
                    name="subject"
                    value={data.subject}
                    onChange={(e) => {
                      setData({
                        ...data,
                        subject: e.target.value,
                        addedby: user.email,
                      });
                    }}
                  >
                    <option value="">Select Subject</option>
                    {dept.map((d) => (
                      <option value={d.subject}>{d.subject}</option>
                    ))}
                  </select>
                </div>
                <label for="file" className="btnclass">
                  Upload Resume
                </label>
                <div className="form-group flex-row">
                  <input
                    type="file"
                    className="form-control"
                    style={{ display: "none" }}
                    accept=".docx"
                    id="file"
                    name="file"
                    onChange={fileUpload}
                  />

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Select Docx"
                    value={file}
                    disabled
                  />
                  {data.paper.length > 0 && (
                    <i
                      style={{
                        position: "relative",
                        top: "-30px",
                        float: "right",
                      }}
                      onClick={() => {
                        handleResumeRemove(data.paper);
                        setData({ ...data, paper: [] });
                        setfile("");
                      }}
                      className="ri-close-line"
                    ></i>
                  )}
                </div>

                {/* <div className="form-group">
                  <input
                    type="text"
                    name="subject"
                    className="form-control"
                    placeholder="subject"
                    value={value.subject}
                    onChange={(e) => handleChange(e)}
                  />
                </div> */}
                <div className="row align-items-center"></div>
                <button onClick={handleSubmit}>Add</button>
              </form>
            </div>
          </div>
        </div>

        <ToastContainer />
      </div>
    </>
  );
};

export default Uploadpaper;
