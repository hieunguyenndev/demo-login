import axios from "axios";

const getRequest = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL
})


export const post = async (url, data = {}) => {
    const response = await getRequest.post(url, data)
    return response
}

export default getRequest