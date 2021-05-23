/**
 *  响应设置模块
 *  @module
 *  @param { object } response 请求连接对象
 *  @param { number } code 状态编号
 *  @param { string } type 数据类型
 *  @param { string } data 具体数据
 *  @return
 */

const imState = require('./state.js')
const header = require('./header.js')
const output = function (response, code, type, data) {
    header(response, type)
    console.log('code', code)

    if (type === 'text') {
        let funResultData = imState(code)
        funResultData.data = data
        response.write(JSON.stringify(funResultData))
        response.end()
    } else {
        response.write(data.toString())
        response.end()
    }
}

module.exports = output