import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { getallpaper, getdept, getpaper } from "../../function/Subject";
import Navbar from "./Navbar";
import Slidebar from "./Slidebar";
import "./table.css";
const Retrive_dept = () => {
  const [dept, setdept] = React.useState([]);
  const { user } = useSelector((state) => state.user);
  let history = useHistory();
  React.useEffect(() => {
    const loadUser = async () => {
      if (user && user.approved == true) {
        loadAllServices(user);
        loadAlldata(user);
        return user;
      }
    };
    loadUser().then((res) => {
      if (!res) {
        history.push("/");
      }
    });
    return;
  }, [user]);

  const loadAllServices = async (user) => {
    await getdept(user.token).then((res) => {
      setdept(res.data);
      console.log(res.data);
    });
  };
  const [paper, setPaper] = React.useState([]);
  const loadAlldata = async (user) => {
    await getallpaper(user.token).then((res) => {
      setPaper(res.data);
    });
  };
  const deleteDept = async (e, d_id, token) => {
    e.preventDefault();
    console.log(d_id);
    if (window.confirm("Are you sure you want to delete this department?")) {
      let authtoken = token;
      axios
        .post(
          `${process.env.REACT_APP_API}/removedept`,
          { dept_id: d_id },
          { headers: { authtoken } }
        )
        .then((res) => {
          console.log(res.data);
          loadAllServices(user);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <>
      <Navbar />
      <Slidebar />
      <div className="container3 ">
        <h2>Subjects</h2>
        <ul className="responsive-table">
          <li className="table-header">
            <div className="col col1">Branch</div>
            <div className="col col2" style={{ paddingRight: "6vw" }}>
              Subject
            </div>
            <div className="col col4" style={{ paddingRight: "6vw" }}>
              Year
            </div>

            <div className="col col6">Sem</div>
            <div className="col col6">No of Paper</div>
            <div className="col col7">View</div>
          </li>
          {dept.map((s) => {
            return (
              <li className="table-row">
                <div className="col col1" data-label="branch">
                  {s.branch}
                </div>
                <div
                  className="col col3 "
                  data-label="subject"
                  style={{ paddingRight: "6vw", wordBreak: "break-word" }}
                >
                  {s.subject}
                </div>
                <div className="col col4" data-label="year">
                  {s.year}
                </div>
                <div className="col col6" data-label="semester">
                  {s.sem}
                </div>
                <div className="col col6" data-label="No of Paper">
                  {JSON.stringify(
                    paper.filter((item) => item.subject == s.subject).length
                  )}
                </div>
                <div className="col col7" data-label="semester">
                  {/* {s._id} */}
                  <Link to={`/view-paper/${s.subject}`}>View</Link>
                </div>

                <i
                  onClick={(e) => deleteDept(e, s._id, user.token)}
                  style={{
                    float: "right",
                    color: "red",
                    fontSize: "20px",
                    cursor: "pointer",
                  }}
                  className="ri-delete-bin-7-line"
                ></i>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Retrive_dept;
