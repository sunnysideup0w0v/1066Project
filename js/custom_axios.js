let axiosInstance = axios.create({
    baseURL: 'http://15.164.153.174',
    // http://192.168.0.73:5000
    timeout: 3000,
    headers: {'X-Http-Token': $.cookie('userToken')}
})