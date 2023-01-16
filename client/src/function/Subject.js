import axios from "axios";

export const addsubject = async (subject,authtoken) => {
  return await axios.post(`${process.env.REACT_APP_API}/add-subject`, subject, {
    headers: {
      authtoken,
    },
  });
};
