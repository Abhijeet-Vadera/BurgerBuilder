import axios from 'axios'

const instance = axios.create({
    baseURL:'https://react-my-burger-9774d.firebaseio.com/'
})

export default instance;