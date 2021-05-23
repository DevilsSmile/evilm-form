function attributesToAtring (attributes) {
    let keys = Object.keys(attributes)
    let values = Object.values(attributes)
    let domAttribute = ''

    for (let i = 0, l = keys.length; i < l; i++) {
        let domAttributePart = ''
        if (typeof values[i] === 'boolean') {
            domAttributePart = ' :' + keys[i] + '="' + values[i] + '"'
        }
        if (typeof values[i] === 'string') {
            domAttributePart = ' ' + keys[i] + '="' + values[i] + '"'
        }

        domAttribute = domAttribute + domAttributePart
    }
    return domAttribute
}

function eventToAtring (event) {
    let keys = Object.keys(event)
    let values = Object.values(event)
    let domEvent = ''

    for (let i = 0, l = keys.length; i < l; i++) {
        let domEventPart = ''
        domEventPart = ' @' + keys[i] + '=' + values[i]
        domEvent = domEvent + domEventPart
    }
    return domEvent
}

function hasText (domOption) {
    switch (domOption.type) {
        case 'el-button':
            return domOption.text
        break
    }

    return ''
}

function renderLabel(labelOption) {
    return `<${labelOption.type}${attributesToAtring(labelOption.attributes)}>${hasText(labelOption)}</${labelOption.type}>`
}

module.exports = function renderItem (itemOption) {
    let labelTemplate = ''
    itemOption.forEach((label, index) => {
        labelTemplate = labelTemplate + renderLabel(label)
    })
    let itemTemplate = `<el-form-item label="活动名称">${ labelTemplate }</el-form-item>`
    return itemTemplate
}