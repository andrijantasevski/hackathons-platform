import Axios from 'axios'

const axios = Axios.create({
    baseURL: "https://hackathonplatform-production.up.railway.app",
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true,
})

export default axios