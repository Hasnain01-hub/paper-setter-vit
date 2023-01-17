import axios from "axios";
export const currentUser = async (authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/current-user`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const createOrUpdateUser = async (userdata) => {
  return await axios.post(`${process.env.REACT_APP_API}/create-user`, userdata);
};

export const getuser = async (authtoken) => {
  return await axios.get(`${process.env.REACT_APP_API}/view-user`, {
    headers: {
      authtoken,
    },
  });
};

export const userupdate = async (authtoken, user) => {
  return await axios.put(
    `${process.env.REACT_APP_API}/update-user`,
    { user },
    {
      headers: {
        authtoken,
      },
    }
  );
};

// export const register = async (phone, authtoken) => {
//   return await axios.post(`${process.env.REACT_APP_API}/register-user`, phone, {
//     headers: {
//       authtoken,
//     },
//   });
// };
