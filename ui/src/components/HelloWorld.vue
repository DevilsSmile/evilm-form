<template>
    <div class="em-form">
        <el-form ref="form" :model="formRaw" label-width="80px">
            <el-form-item label="活动名称">
                <el-col :span="24" align="left">
                    <el-button>默认按钮</el-button>
                </el-col>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'HelloWorld',
    props: {
        msg: String
    },
    data() {
        return {
            formRaw: {}
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
