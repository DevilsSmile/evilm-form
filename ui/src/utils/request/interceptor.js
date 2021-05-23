// 重构日期：2021-03

import { messageSwitch } from './messageSwitch.js'

/**
 *  @function 请求状态判断
 *  @param {object} response 请求响应对象
 *  @returns {object || boolean}
 */
function requestState (response) {
    // 请求响应失败
    if (response.errMsg === 'request:fail ') {
        console.log('[request] fail')
        return false
    }

    // 请求响应成功
    if (response.statusCode === 200) {
        return true
    }

    // 请求路径错误
    if (response.statusCode >= 400) {
        console.log('[request] path fail')
        return false
    }

    // 服务器错误
    if (response.statusCode >= 500) {
        console.log('[request] server fail')
        return false
    }
}

/**
 *  @function 应用业务状态判断
 *  @param {object} funcData 应用业务数据对象
 *  @returns {object || boolean}
 */
function businessDataState (funcData) {
    // 以下 code 状态根据具体项目做相应的修改
    let funcDataStateCode = funcData.code
    switch (funcDataStateCode) {
        // 业务错误逻辑
        case 0:
            return {
                success: false,
                response: {
                    code: funcData.code,
                    data: funcData.data || {},
                    message: messageSwitch(funcData.msg)
                }
            }
        break

        // 业务正常逻辑
        case 1:
            if (funcData.list) {
                return {
                    success: true,
                    response: {
                        code: funcData.code,
                        data: funcData.list,
                        message: messageSwitch(funcData.msg)
                    }
                }
            }

            return {
                success: true,
                response: {
                    code: funcData.code,
                    data: funcData.data || {},
                    message: messageSwitch(funcData.msg)
                }
            }
        break

        // 业务系统异常
        case 2:
            return {
                success: false,
                response: {
                    code: funcData.code,
                    data: funcData.data || {},
                    message: messageSwitch(funcData.msg)
                }
            }
        break

        default:
            return {
                success: false,
                response: {
                    code: funcData.code,
                    data: funcData.data ? funcData.data : {},
                    message: messageSwitch(funcData.msg)
                }
            }
            break
    }
}

/**
 *  @function 请求拦截器，对请求进行配置修改或者拦截。
 *  @param {object} 请求配置
 *  @returns {object || boolean}
 */
export function interceptorRequest (funcOption) {
    // 请求参数统一增加 sessionKey
    let funcSessionKey = wx.getStorageSync('sessionKey')
    if (funcSessionKey) {
        if (funcOption.data) {
            funcOption.data['mySessionKey'] = funcSessionKey
        } else {
            funcOption.data = { 'mySessionKey': funcSessionKey }
        }
    }

    // 请求头部统一增加应用编号校验
    funcOption.header['Authorization'] = 'Basic MDAwMTo2ZGY4NjEzZDg5MTM2Nzc3ODdlYzlkMDYzNTkzMzQ2NTE='
    funcOption.header['Content-Type'] = 'application/json;charset=utf-8' 

    // let funcToken = App.globalData.encryptedData.token
    // let funcSecret = '4b16f0e4b729a04d756e2af1bf2132693d22fad6746330c00f1e3408bb4cdb3547ce13ee48591a47ecd4ce8f6f02602e599bf3586095b67a8ba6382885e89628'
    // let funcMd5 = iMd5(funcToken + JSON.stringify(funcOption.params) + funcSecret)
    return funcOption
}

/**
 *  @function 响应拦截器。对响应数据做统一处理。
 *  @param {object} 请求配置
 *  @param {object} 请求响应对象
 *  @returns {object || undefined}
 */
export function interceptorResponse (response) {
    if (!requestState(response)) {
        return {
            success: false,
            response: {}
        }
    }

    return businessDataState(response.data)
}