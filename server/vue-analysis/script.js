function symbolIndex(code, symbol) {
    let indexList = []
    let beginIndex = 0
    let currentIndex = code.indexOf(symbol, beginIndex)
    while (currentIndex >= 0) {
        indexList.push(currentIndex)
        beginIndex = currentIndex + 1
        currentIndex = code.indexOf(symbol, beginIndex)
    }

    return indexList
}

function codeToObject() {

}

/**
 *  @function 解析script代码部分
 *  @param { string } scriptCode
 *  @returns { object }
 */
module.exports = function (scriptCode) {
    // import
    let importCode = scriptCode.match(/^<script>[\s\S]+export default/gi)[0].replace('<script>', '').replace('export default', '')
    let importList = importCode.split(/\n/ig)

    // 删除前后无效匹配
    for (let i = 0; i < importList.length; i++) {
        if (importList[i] === '') {
            importList.splice(i, 1)
            i = i - 1
        }
    }

    // exportDefault
    let exportDefaultCode = scriptCode.match(/export default[\s\S]+/gi)[0].replace('export default', '').replace('</script>', '').trim()

    let beginBraceIndex = symbolIndex(exportDefaultCode, '{')
    let endBraceIndex = symbolIndex(exportDefaultCode, '}')

    let quoteIndex = symbolIndex(exportDefaultCode, `'`)
    // 删除相邻无效引号索引
    for (let i = 0; i < quoteIndex.length - 1; i++) {
        if (quoteIndex[i] + 1 === quoteIndex[i + 1]) {
            quoteIndex.splice(i, 2)
            i = i - 1
        }
    }

    // 删除引号之间的对象括号
    for (let i = 0; i < quoteIndex.length - 1; i = i + 2) {
        for (let j = 0; j < beginBraceIndex.length; j++) {
            if (quoteIndex[i] < beginBraceIndex[j] && beginBraceIndex[j] < quoteIndex[i + 1]) {
                beginBraceIndex.splice(j, 1)
                j = j - 1
            }
        }
        for (let jj = 0; jj < endBraceIndex.length; jj++) {
            if (quoteIndex[i] < endBraceIndex[jj] && endBraceIndex[jj] < quoteIndex[i + 1]) {
                endBraceIndex.splice(jj, 1)
                jj = jj - 1
            }
        }
    }

    // 通过二分法配对对象括号
    let matchResult = []
    let halfArrayBeginIndex = 0
    let halfArrayEndIndex = beginBraceIndex.length
    let matchIndex = Math.floor((halfArrayEndIndex - halfArrayBeginIndex) / 2)

    for (let i = 0, l = endBraceIndex.length; i < l; i++) {
        // {...{...}...}
        if (matchIndex === 0) {
            matchResult.push({ beginBrace: beginBraceIndex[beginBraceIndex.length - 1], endBrace: endBraceIndex[i] })
            beginBraceIndex.pop()
            beginBraceIndex = beginBraceIndex
            matchIndex = Math.floor(beginBraceIndex.length / 2)
            continue
        }

        if (beginBraceIndex.length === 1) {
            matchResult.push({ beginBrace: beginBraceIndex[0], endBrace: endBraceIndex[i] })
            continue
        }

        // if {...}
        if (beginBraceIndex[matchIndex] < endBraceIndex[i]) {
            // {...}...{
            if (endBraceIndex[i] < beginBraceIndex[matchIndex + 1]) {
                matchResult.push({ beginBrace: beginBraceIndex[matchIndex], endBrace: endBraceIndex[i] })
                beginBraceIndex.splice(matchIndex, 1)

                // 重置搜索范围
                halfArrayBeginIndex = 0
                halfArrayEndIndex = beginBraceIndex.length
                matchIndex = Math.floor((halfArrayEndIndex - halfArrayBeginIndex) / 2)
                continue
            }

            // {...{...}...}
            if (matchIndex === beginBraceIndex.length - 1) {
                matchResult.push({ beginBrace: beginBraceIndex[matchIndex], endBrace: endBraceIndex[i] })
                beginBraceIndex.splice(matchIndex, 1)

                // 重置搜索范围
                halfArrayBeginIndex = 0
                halfArrayEndIndex = beginBraceIndex.length
                matchIndex = Math.floor((halfArrayEndIndex - halfArrayBeginIndex) / 2)
                continue
            }

            // {...{...}
            if (beginBraceIndex[matchIndex + 1] < endBraceIndex[i]) {
                halfArrayBeginIndex = matchIndex
                matchIndex = halfArrayBeginIndex + Math.floor((halfArrayEndIndex - halfArrayBeginIndex) / 2)
                i = i - 1
                continue
            }
        }

        // if }...{
        if (endBraceIndex[i] < beginBraceIndex[matchIndex]) {
            halfArrayEndIndex = matchIndex
            matchIndex = halfArrayBeginIndex + Math.floor((halfArrayEndIndex - halfArrayBeginIndex) / 2)
            i = i - 1
            continue
        }
    }

    matchResult.sort((a, b) => {
        return a.beginBrace - b.beginBrace
    })
    console.log('complete')
    console.log(matchResult)
}