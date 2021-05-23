/**
 *  响应信息设置
 *  @module
 *  @param {number} funCode - 状态编号
 *  @return
 */
const output = function (funCode) {
    let funResponse = { state: funCode }
    switch (funCode) {
        case 20050:
            funResponse.message = 'success'
            break

        default:
            funResponse.state = 20059
            funResponse.message = 'unknown error'
    }

    return funResponse
}

module.exports = output