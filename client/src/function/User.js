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
// export const register = async (phone, authtoken) => {
//   return await axios.post(`${process.env.REACT_APP_API}/register-user`, phone, {
//     headers: {
//       authtoken,
//     },
//   });
// };
