export default {
    arrayToJoinStringComma: function (value) {
        if (!Array.isArray(value)) {
            console.log('[emTransform] function arrayToJoinStringComma error')
            return
        }
        return value.join(',')
    },
    booleanToNumber: function (value) {
        if (typeof(value) !== 'boolean') {
            console.log('[emTransform] function booleanToNumber error')
            return
        }
        return value ? 1 : 0
    },
    booleanToNumberString: function (value) {
        if (typeof(value) !== 'boolean') {
            console.log('[emTransform] function booleanToNumber error')
            return
        }
        return value ? '1' : '0'
    },
    numberToBoolean: function (value) {
        if (typeof(value) !== 'number') {
            console.log('[emTransform] function numberToBoolean error')
            return
        }
        return !!value
    },
}