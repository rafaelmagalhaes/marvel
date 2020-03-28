import md5 from "md5";
const apiURL = "https://gateway.marvel.com/v1/public/";
const publicKey = process.env.REACT_APP_PUBLIC_KEY;
const secretKey = process.env.REACT_APP_SECRET_KEY;
export const API = (endPoint) => {
  const now = new Date().getTime().toString();
  const hash = md5(now + secretKey + publicKey);
  const authParams = `?ts=${now}&apikey=${publicKey}&hash=${hash}`;

  return `${apiURL}${endPoint}${authParams}`;
};
