/**
 * @module 路由模块，集中处理接收到的请求，并且分发给制定处理函数。
 * @see route.js
 */
const modularPath = require('path')
const modularFileSystem = require('fs')

const imResponse = require('../utils/response/index.js')
const codeForm = require('../api/form.js')

/** 
 *  请求路径与响应处理函数的匹配对象。
 *      新增请求逻辑需要在该对象下添加对应的属性，以及对应的处理函数。
 *  @constant
 *  @type {object}
 */
let apiPath = {
    ['/readFile']: codeForm.readFile,
    ['/readCodeFile']: codeForm.writeCodeToFile,
}

/**
 *  根据 http 携带的信息执行对应逻辑
 *      分析 url 判断本次请求目的
 *      接收 body 中的数据
 *  @function
 *  @param { object } requestInfo
 *  @param { object } response
 *  @returns
 */
module.exports = function route(requestInfo, response) {
    // 此处判断路径中是否包含文件格式
    let isFile = /\/[a-z0-9]+\.[a-z0-9]+$/.test(requestInfo.pathname)
    if (isFile) {
        modularFileSystem.readFile(modularPath.join(__dirname + requestInfo.pathname), function (error, file) {
            if (error) {
                imResponse(response, 20058, 'text', 404)
            } else {
                imResponse(response, 20050, requestInfo.pathname, file)
            }
        })
    } else {
        console.log('requestInfo.pathname', requestInfo.pathname)
        apiPath[requestInfo.pathname](requestInfo, response)
    }
}