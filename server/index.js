let modularHttp = require('http')
let modularRoute = require('./route/route.js')

let serverIP = '127.0.0.1'
// let serverIP = '106.54.213.135'                  // 服务器ip
let serverPort = 80
let server = modularHttp.createServer()

const codeForm = require('./api/form.js')

/**
 *  @function http接收事件
 *  @param {object} request - http://nodejs.cn/api/http.html#http_class_http_incomingmessage
 *  @param {object} response - http://nodejs.cn/api/http.html#http_class_http_serverresponse
 *  @returns
 */
server.on('request', function (request, response) {
    let requestServer = request.server
    let requestHeader = request.headers
    let requestMethod = request.method
    let requestHttpVersion = request.httpVersion
    let requestUrl = request.url
    let requestHttpType = request.connection.encrypted ? 'http://' : 'https://'
    
    // requestInfo = {
    //     href: 'https://127.0.0.1/apiPath?paramsA=valueA&paramsB=valueB',
    //     origin: 'https://127.0.0.1',
    //     protocol: 'https:',
    //     username: '',
    //     password: '',
    //     host: '127.0.0.1',
    //     hostname: '127.0.0.1',
    //     port: '',
    //     pathname: '/apiPath',
    //     search: '?paramsA=valueA&paramsB=valueB',
    //     searchParams: {
    //       'paramsA': 'valueA',
    //       'paramsB': 'valueB',
    //     },
    //     hash: '',
    // }
    try {
        let requestInfo = new URL(requestHttpType + serverIP + request.url)
        console.log('is url')
        modularRoute(requestInfo, response)
    } catch (error) {
        console.log('not url')
        response.end()
    }
})

/**
 *  @function http监听属性设置
 *  @param {number} serverPort
 *  @param {string} serverIP
 *  @returns
 */
server.listen(serverPort, serverIP)

process.on('uncaughtException', (error) => {
    console.log('call uncaughtException handle')
    console.log(error)
})
console.clear()
console.log('server has started')

// codeForm.writeCodeToFile()
codeForm.readFile()