import qs from 'qs'
import axios from 'axios'
import { interceptorRequest, interceptorResponse } from './interceptor.js'

// 创建axios实例
const request = axios.create({
    baseURL: '/',
    timeout: 1000 * 30,
    headers: {
        'Content-Type': 'application/json',
    }
})
 

export default request