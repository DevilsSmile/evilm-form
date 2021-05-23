<template>
    <div class="home">
        <HelloWorld></HelloWorld>
        <FormCode></FormCode>
        <el-button type="success" id="fileImport" @click="createCodeFile">生成代码</el-button>
    </div>
</template>

<script>
import request from '@/utils/request/request.js'
import FormCode from '@/components/FormCode.vue'
import HelloWorld from '@/components/HelloWorld.vue'

export default {
    name: 'Home',
    components: {
        FormCode,
        HelloWorld
    },
    data: function () {
        return {

        }
    },
    mounted: function () {

    },
    methods: {
        createCodeFile: function () {
            request({
                url: 'readCodeFile',
            }).then((result) => {

            }).catch((error) => {
                console.log('error', error)
            })
        },
    }
}
</script>
