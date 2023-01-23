import axios from "axios";

export const addsubject = async (subject, authtoken) => {
  return await axios.post(`${process.env.REACT_APP_API}/add-subject`, subject, {
    headers: {
      authtoken,
    },
  });
};

export const getdept = async (authtoken) => {
  return await axios.get(
    `${process.env.REACT_APP_API}/view-subject`,

    {
      headers: {
        authtoken,
      },
    }
  );
};

export const getpaper = async (authtoken, id) => {
  return await axios.get(
    `${process.env.REACT_APP_API}/view-paper/${id}`,

    {
      headers: {
        authtoken,
      },
    }
  );
};

export const uploadpaper = async (subject, authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/upload-paper`,
    subject,
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const deletepaper = async (authtoken, paper_id) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/delete-paper`,
    { paper_id },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const uprandom = async (authtoken, random, id) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/update-random-no`,
    { random, id },
    {
      headers: {
        authtoken,
      },
    }
  );
};
