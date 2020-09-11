import axios from 'axios'
// const axios = require("axios").default;

export default axios.create({
  baseURL: 'https://simple-blog-api.crew.red/posts/',
})
