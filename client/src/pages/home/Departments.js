import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import "../login/login.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Sem } from "./contant/Sem_constant";
import { addsubject } from "../../function/Subject";
import Slidebar from "./Slidebar";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
const initialstate = {
  branch: "",
  subject: "",
  year: "",
  sem: "",
};

const Departments = () => {
  const [value, setvalue] = useState(initialstate);
  const { user } = useSelector((state) => state.user);
  const handleChange = (e) => {
    setvalue({ ...value, [e.target.name]: e.target.value });
  };
  const handleyearchange = (e) => {
    const year_sem = Sem.filter((val) => {
      return e.target.value === val.id;
    });
    setvalue({ ...value, sem: year_sem[0].sem, year: year_sem[0].year });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (value.branch !== "" && value.subject !== "" && value.year !== "") {
        addsubject(value, user.token).then((res) => {
          if (res.status == 200) {
            toast.success("Subject Added");
            setvalue(initialstate);
          }
        });
      } else {
        toast.error("Please enter details");
      }
    } catch (err) {
      toast.error("An error Occured!");
    }
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
                  <label for="sem">Select Semester</label>
                  <select id="sem" onChange={(e) => handleyearchange(e)}>
                    {Sem.map((val) => {
                      return (
                        <option value={val.id}>
                          {val.id > 0 ? val.sem + " sem" : val.sem}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Year"
                    value={value.year > 0 ? value.year + " year" : ""}
                    disabled
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="branch"
                    className="form-control"
                    placeholder="branch"
                    value={value.branch}
                    onChange={(e) => handleChange(e)}
                  />
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    name="subject"
                    className="form-control"
                    placeholder="subject"
                    value={value.subject}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
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

export default Departments;
