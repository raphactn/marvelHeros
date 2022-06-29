import axios from "axios";
import md5 from "md5";

const privateKey = 'a8165f58f2cdedf84d7537af8ba063dd057e7808'
const publicKey = 'd6caa04a415e01e2641df1a2d5079872'
const time = Number(new Date());
const hash = md5(time + privateKey + publicKey)

const api = axios.create({
    baseURL: 'http://gateway.marvel.com/v1/public/',
    params: {
        ts: time,
        apikey: publicKey,
        hash: hash,
    },
});

export default api;