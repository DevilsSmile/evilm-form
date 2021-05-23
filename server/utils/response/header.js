/**
 *  响应头部设置
 *  @module
 *  @param {object} response
 *  @param {string} type - 数据类型
 *  @return
 */
const output = function (response, type) {
    let header = {
        'Access-Control-Allow-Origin': 'http://localhost:8080',
        'Access-Control-Allow-Credentials': 'true'
    }
    switch (type) {
        case 'js':
            header['Content-Type'] = 'application/javascript;'
            header['Cache-Control'] = 'max-age=36000'
            break
            
        case 'ico':
            header['Content-Type'] = 'image/x-icon;'
            header['Cache-Control'] = 'max-age=36000'
            break
    
        case 'map':
            header['Content-Type'] = '*/*;'
            header['Cache-Control'] = 'max-age=36000'
            break
    
        case 'css':
            header['Content-Type'] = 'text/css;'
            header['Cache-Control'] = 'max-age=36000'
            break

        case 'html':
            header['Content-Type'] = 'text/html;'
            header['Cache-Control'] = 'max-age=36000'
            break
            
        case 'text':
            header['Content-Type'] = 'text/plain;'
            break
    }
    
    response.writeHead(200, header)
}

module.exports = output