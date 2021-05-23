const fileSystem = require('fs')
const responseWrite = require('../utils/response/index.js')
const vueStructureTemplate = require('../vue-structure/template.js')
const vueStructureScript = require('../vue-structure/script.js')
const vueStructureStyle = require('../vue-structure/style.js')

const vueAnalysisScript = require('../vue-analysis/script.js')

module.exports = {
    /**
     *  @function 分析vue文件
     *  @param { object } requestInfo
     *  @param { object } response
     *  @returns { boolean }
     */
    readFile: function () {
        fileSystem.readFile('./../ui/src/components/FormCode.vue', 'utf-8', (error, fileContent) => {
            if (error) throw error
            let template = fileContent.match(/^<template>[.\s\S]+<\/template>/gi)[0]
            let script = fileContent.match(/<script>[.\s\S]+<\/script>/gi)[0]
            let style = fileContent.match(/<style[.\s\S]+<\/style>/gi)[0]

            vueAnalysisScript(script)

            // console.log(template)
            // console.log(script)
            // console.log(style)
            return

            let scriptImport = script.match(/^<script>[.\s\S]+(?=export default)/gi)[0].replace('<script>', '')
            let scriptExportDefault = script.match(/export default[.\s\S]+/gi)[0].replace('</script>', '').replace('export default', '').trim()
            console.log(scriptImport)
            console.log(scriptExportDefault)
        })
    },

    /**
     *  @function 写入vue文件
     *  @param { object } requestInfo
     *  @param { object } response
     *  @returns { boolean }
     */
    writeCodeToFile: function (requestInfo, response) {
        let predefined = {
            'el-button': function (option) {
                return {
                    type: 'el-button',
                    attributes: {
                        'type': 'primary',
                        'size': 'mini',
                        'plain': true,
                        'round': true,
                        'circle': false,
                        'loading': true,
                        'disabled': true,
                        'icon': 'el-icon-eleme',
                        'autofocus': true,
                    },
                    event: {},
                    text: '按钮'
                }
            },
            'el-radio': function (option) {
                return {
                    type: 'el-radio',
                    attributes: {
                        'v-model': 'value',
                        'label': 'Radio',
                        'disabled': false,
                        'border': true,
                        'size': 'mini',
                        'name': 'name',
                    },
                    events: {
                        change: 'onChange'
                    }
                }
            }
        }

        let itemOptionList = [
            [ predefined['el-button'](), predefined['el-radio'](), ],
            [ predefined['el-button'](), predefined['el-radio'](), ]
        ]

        let template = ''
        itemOptionList.forEach((item, index) => {
            template = template + vueStructureTemplate(item)
        })

        let scriptData = `{
            name: 'FormCode',
            data() {
                return {
                    emformRaw: ${ vueStructureScript(itemOptionList) }
                }
            }
        }`
        let script = `<script>export default ${ scriptData }</script>`

        let content = `<template><div class="about"><el-form ref="form" :model="emformRaw" label-width="80px">${ template }</el-form></div></template>`
        content = content + '\n' + script
        fileSystem.writeFile('./../ui/src/components/FormCode.vue', content, (err) => {
            if (err) {
                return console.error(err)
            }
            console.log("数据写入成功！")
        })
        // responseWrite(response, 20050, 'text', itemOptionList)
    },
}