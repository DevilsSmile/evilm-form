/**
 * url 分类模块
 * 根据 url 地址里包含的关键词来分类 url 的实际作用
 * 1.https://user:password@sub.example.com:80/
 * 2.https://user:password@sub.example.com:80/api/path
 * 3.https://user:password@sub.example.com:80/api/path/file.type
 * 4.https://user:password@sub.example.com:80/api/path?key=value&key=value
 * 5.https://user:password@sub.example.com:80/api/path?key=value&key=value#hash
 * @module url
 * @see url.js
 */

let imUrl = require('url')
let resourcesPath = '/html'

let output = function (funUrl) {
    funUrl = 'https://user:password@sub.example.com:80' + funUrl
    let funUrlComponent = new imUrl.URL(funUrl)
    let funReturn = {
        type: '',
        apiPath: '',
        apiParam: '',
        fileName: '',
        fileType: '',
        filePath: '',
    }

    // 1.
    if (funUrlComponent.pathname === '/') {
        // 1.
        // url 为网站主页地址
        // 需要返回主页 html 文件并且设置对应的 response headers
        funReturn.type = 'file'
        funReturn.fileName = 'index.html'
        funReturn.fileType = 'html'
        funReturn.filePath = resourcesPath + '/index.html'
        return funReturn
    }

    // 2.3.
    if (funUrlComponent.search === '') {
        let funRegExp = new RegExp('[a-zA-Z0-9~!@#$%^&()_+-]+\\.[a-zA-Z0-9]+$')
        let funResult = funUrlComponent.pathname.match(funRegExp)

        // 2.
        // url 为不带参数的接口请求
        // 执行对应的接口函数
        if (funResult === null) {
            funReturn.type = 'function'
            funReturn.apiPath = funUrlComponent.pathname
            return funReturn
        }

        // 3.
        // url 为文件请求
        // 需要根据请求文件的类型设置对应的 response headers
        if (funResult !== null) {
            funRegExp = new RegExp('[a-zA-Z0-9]+$')

            funReturn.type = 'file'
            funReturn.fileName = funResult[0]
            funReturn.fileType = funReturn.fileName.match(funRegExp)[0]
            funReturn.filePath = resourcesPath + funUrlComponent.pathname
            return funReturn
        }
    }

    // 4.5.
    if (funUrlComponent.search !== '') {
        let funKeyValue = funUrlComponent.search.substring(1).replace(/&/g, '","').replace(/=/g, '":"')
        funReturn.apiParam = '{"' + funKeyValue + '"}'

        // 4.
        // url 为带参数的接口请求
        // 需要转化 url 中的键值为对象
        if (funUrlComponent.hash === '') {
            funReturn.type = 'function'
            funReturn.apiPath = funUrlComponent.pathname
            return funReturn
        }

        // 5. 
        // url 为带参数，带锚点的接口请求
        // 需要转化 url 中的键值为对象
        if (funUrlComponent.hash !== '') {
            funReturn.type = 'function'
            funReturn.apiPath = funUrlComponent.pathname
            return funReturn
        }
    }
}

module.exports = output