<template>
    <div class='hello'>
        <el-button @click.native="switchLang">\{{$t("switchLang")}}</el-button>
        <el-button @click.native="send">\{{$t("btnText")}}</el-button>
        <el-dialog v-model="visible" title="Hello world">
          <p>\{{$t("welcome")}}</p>
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
            send: _send,
            switchLang () {
                const lang = Vue.config.lang === 'cn' ? 'en' : 'cn';
                Vue.config.lang = lang;
            }
        }
    }
</script>

<style scoped>
    .hello {
        padding: 16px;
    }
</style>
