import axios from "axios";


const ax = (headers: { [key: string]: string|null }) => axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        "Content-Type": "application/json",
        ...headers,
    },
});
export default ax;