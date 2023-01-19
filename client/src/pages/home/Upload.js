import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Upload = () => {
  const [data, setData] = useState({});
  const [file, setfile] = useState("");

  const fileUpload = async (e) => {
    e.preventDefault();
    if (e.target.files[0].size > 3145728) {
      toast.error("File size should be less than 3MB!");
      return;
    }
    setfile(e.target.files[0].name);
    const datas = new FormData();
    datas.append("file", e.target.files[0]);
    datas.append("upload_preset", "job_applications");

    const dataFile = await fetch(
      "https://api.cloudinary.com/v1_1/dd4kpw7ar/image/upload",
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
        resume: [dataFile.secure_url, dataFile.public_id],
      });
    }
  };

  const handleResumeRemove = (data) => {
    setData({ ...data, resume: [] });

    console.log(data[1]);
    axios
      .post("http://localhost:8000/api/removeresume", { public_id: data[1] })
      .then((res) => {
        console.log(res);
        const { resumes } = data;
        let filteredImages = resumes.filter((item) => {
          return item.public_id !== res.data.public_id;
        });
      })
      .catch((err) => {});
  };
  return <></>;
};

export default Upload;
