import md5 from "md5";
const apiURL = "https://gateway.marvel.com/v1/public/";
const publicKey = process.env.REACT_APP_PUBLIC_KEY;
const secretKey = process.env.REACT_APP_SECRET_KEY;
export const API = (endPoint, offset) => {
  const now = new Date().getTime().toString();
  const hash = md5(now + secretKey + publicKey);
  let authParams = `?ts=${now}&apikey=${publicKey}&hash=${hash}&limit=12`;
  if (offset) {
    authParams = `${authParams}&offset=${offset}`;
  }

  return `${apiURL}${endPoint}${authParams}`;
};
