import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import Modal from "react-modal";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { deletepaper, getpaper, uprandom } from "../../function/Subject";
import Navbar from "./Navbar";
import Slidebar from "./Slidebar";
import "./helper.css";
import axios from "axios";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    background: "none",
    height: "80%",
    width: "80%",
    bottom: "auto",
    border: "none",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
const Viewpaper = () => {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [check, setcheckbox] = React.useState([]);
  const id = useParams().id;
  const [docx, setdocx] = React.useState({ link: "", subject: "" });
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  const { user } = useSelector((state) => state.user);
  const [data, setData] = React.useState([]);
  const [fdata, setfilter] = React.useState([]);
  React.useEffect(() => {
    if (user && user.token && id) {
      loadAlldata(user, id);
    }
  }, [user, id]);
  const loadAlldata = async (user, id) => {
    await getpaper(user.token, id).then((res) => {
      setData(res.data);
      setfilter(
        res.data.filter((item) => {
          return item.addedby == user.email;
        })
      );
    });
  };
  const deletep = async (e, p_id, pub_id) => {
    e.preventDefault();
    console.log(pub_id);
    let authtoken = user.token;
    axios
      .post(
        `${process.env.REACT_APP_API}/removepaper`,
        { asset_id: pub_id },
        { headers: { authtoken } }
      )
      .then(async (res) => {
        console.log(res);
        // const { resumes } = data;
        // let filteredImages = resumes.filter((item) => {
        //   return item.public_id !== res.data.public_id;
        // });
        await deletepaper(user.token, p_id).then((res) => {
          loadAlldata(user, id);
          toast.success("Paper deleted successfully");
        });
      })
      .catch((err) => {});
  };
  const [selectedpaper, setselectedpaper] = React.useState();
  const generaterandom = async () => {
    var randomselect = Math.floor(Math.random() * check.length);
    setselectedpaper(check[randomselect].index);
    console.log(check[randomselect].index);
    // await uprandom(user.token, randomselect).then((res) => {
    //   loadAlldata(user, id);
    //   toast.success("Paper deleted successfully");
    // });
  };
  const changevent = (e, index) => {
    let key = e.target.value;
    let value = e.target.checked;

    if (value == false) {
      setcheckbox(check.filter((item) => item[key] != true));
    } else {
      setcheckbox([...check, { [e.target.value]: e.target.checked, index }]);
    }
  };
  return (
    <>
      {console.log(fdata)}
      <Navbar />
      <Slidebar />
      {user && user.role == "admin" ? (
        <div className="contact">
          {data.length <= 0 ? (
            <h1 style={{ textAlign: "center", margin: "0 auto" }}>
              No data found
            </h1>
          ) : (
            <>
              {data.map((item, index) => {
                return (
                  <>
                    <div class="boxcard red" data-aos="zoom-in" key={item._id}>
                      <div className="detail">
                        <p>Paper No: {index}</p>
                        <p>Branch: {item.branch}</p>
                        <p>subject: {item.subject}</p>
                        <p>Semester: {item.sem}</p>
                        <p>Added By: {item.addedby}</p>
                        <p>
                          Preview Paper:
                          <a
                            style={{ color: "blue", cursor: "pointer" }}
                            onClick={() => {
                              openModal(item.event);
                              setdocx({
                                link: item.paper[0],
                                subject: item.paper[3],
                              });
                            }}
                          >
                            &nbsp;View
                          </a>
                        </p>
                        <i
                          onClick={(e) => {
                            deletep(e, item._id, item.paper[1]);
                          }}
                          style={{
                            float: "right",
                            color: "red",
                            fontSize: "20px",
                            cursor: "pointer",
                          }}
                          className="ri-delete-bin-7-line"
                        ></i>
                      </div>
                      {/* checkbox */}
                      <div>
                        <input
                          type="checkbox"
                          value={item._id}
                          style={{
                            width: "15px",
                            height: "15px",
                            margin: "6px",
                            opacity: "1",
                            padding: "5px",
                            outlineColor: "black",
                            cursor: "pointer",
                            position: "relative",
                          }}
                          onChange={(e) => changevent(e, index)}
                        />
                        <label style={{}} className="select">
                          Select
                        </label>
                      </div>
                      {/* <img src="https://assets.codepen.io/2301174/icon-supervisor.svg" alt=""/> */}
                    </div>
                  </>
                );
                /* Closing the `map` function. */
              })}
              <div className="bottomcard">
                <button onClick={generaterandom} className="selectpaper">
                  Generate Random
                </button>
                <br />
                {selectedpaper >= 0 ? (
                  <span>
                    <b>Selected Paper {selectedpaper} </b>
                  </span>
                ) : (
                  <></>
                )}
              </div>
            </>
          )}
        </div>
      ) : (
        <>
          <div className="contact">
            {fdata.length <= 0 ? (
              <h1 style={{ textAlign: "center", margin: "0 auto" }}>
                No data found
              </h1>
            ) : (
              fdata.map((item) => {
                return (
                  <div class="boxcard red" data-aos="zoom-in" key={item._id}>
                    <div className="detail">
                      <p>Branch: {item.branch}</p>
                      <p>subject: {item.subject}</p>
                      <p>Semester: {item.sem}</p>
                      <p>Added By: {item.addedby}</p>
                    </div>
                    <p>
                      Preview Paper:
                      <a
                        style={{ color: "blue", cursor: "pointer" }}
                        onClick={() => {
                          openModal(item.event);
                          setdocx({
                            link: item.paper[0],
                            subject: item.paper[3],
                          });
                        }}
                      >
                        &nbsp;View
                      </a>
                    </p>
                    <i
                      onClick={(e) => {
                        deletep(e, item._id, item.paper[1]);
                      }}
                      style={{
                        float: "right",
                        color: "red",
                        fontSize: "20px",
                        cursor: "pointer",
                      }}
                      className="ri-delete-bin-7-line"
                    ></i>
                    {/* <img src="https://assets.codepen.io/2301174/icon-supervisor.svg" alt=""/> */}
                  </div>
                );
              })
            )}
          </div>
        </>
      )}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        ariaHideApp={false}
        style={customStyles}
        contentLabel="Register"
      >
        <button
          className="close"
          style={{ outline: "none", border: "none", textAlign: "right" }}
          onClick={closeModal}
        >
          X
        </button>
        <h3 style={{ textAlign: "center" }}>{docx.subject}</h3>
        <br />
        <DocViewer
          documents={[
            { uri: docx.link }, // Remote file
            // { uri: require("./example-files/pdf.pdf") }, // Local File
          ]}
          pluginRenderers={DocViewerRenderers}
        />
        {/* </div> */}
      </Modal>
      <ToastContainer />
    </>
  );
};

export default Viewpaper;
