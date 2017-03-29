<template>
    <div class='hello'>
        <el-button @click.native="send">点我~</el-button>
        <el-dialog v-model="visible" title="Hello world">
          <p>欢迎使用 Element</p>
        </el-dialog>
    </div>
</template>

<script>
    import {Button, Dialog} from 'element-ui'

    Vue.use(Button)
    Vue.use(Dialog)

    const _send = function() {
        this.visible = true
    }

    export default {
        data: () => ({
            visible: false
        }),
        methods: {
            send: _send
        }
    }
</script>

<style scoped>
    .hello {
        padding: 16px;
    }
</style>
