import axiosRoot from "axios";

const baseUrl = import.meta.env.VITE_API_URL;
export const axios = axiosRoot.create({
  baseURL: baseUrl,
});

export const getById = async (url) => {
  const { data } = await axios.get(`${baseUrl}/${url}`, {
    withCredentials: true,
  });

  return data;
};

export const get = async (url) => {
  const { data } = await axios.get(`${baseUrl}/${url}`, {
    withCredentials: true,
  });

  return data;
};

export const checkMe = async (url) => {
  const data = await axios
    .get(`${baseUrl}/${url}`, { withCredentials: true })
  return data;
};

export const getAll = async (url) => {
  const { data } = await axios.get(`${baseUrl}/${url}`, {
    withCredentials: true,
  });

  return data;
};

export const post = async (url, { arg }) => {
  const data = await axios.post(url, arg, { withCredentials: true });

  return data;
};

export const postLogin = async (url, { arg }) => {
  const data = await axios.post(url, arg);

  return data;
};

export const patch = async (url, { arg }) => {
  const data = await axios.put(url, arg, { withCredentials: true });
  return data;
};
