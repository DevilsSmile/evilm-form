function hasBindValue (labelOption, emform) {

}

module.exports = function createScript(itemOptionList) {
    let emform = {}
    itemOptionList.forEach((item, index) => {
        item.forEach((label, index) => {
            console.log(label)
            if (label.attributes.hasOwnProperty('v-model')) {
                switch(label.type) {
                    case 'el-input':
                    case 'el-radio':
                        emform[label.attributes['v-model']] = ''
                    break
                }
            }
        })
    })

    return JSON.stringify(emform)
}