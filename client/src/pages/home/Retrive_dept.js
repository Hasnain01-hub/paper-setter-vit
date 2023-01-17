import React from "react";
import { useSelector } from "react-redux";
import { getdept } from "../../function/Subject";
import Navbar from "./Navbar";
import Slidebar from "./Slidebar";
import "./table.css";
const Retrive_dept = () => {
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
      console.log(res.data);
    });
  };
  return (
    <>
      <Navbar />
      <Slidebar />
      <div className="container3">
        <h2>Department</h2>
        <ul className="responsive-table">
          <li className="table-header">
            <div className="col col1">Branch</div>
            <div className="col col2" style={{ paddingRight: "6vw" }}>
              Subject
            </div>
            <div className="col col3" style={{ paddingRight: "6vw" }}>
              Year
            </div>

            <div className="col col6">Sem</div>
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
                <div className="col col7" data-label="semester">
                  {s._id}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Retrive_dept;
