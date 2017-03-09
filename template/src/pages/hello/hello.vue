<template>
    <div class='hello'>
        <el-button @click.native="visible = true">按钮</el-button>
        <el-dialog v-model="visible" title="Hello world">
          <p>欢迎使用 Element</p>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data: () => ({
            visible: false
        })
    };
</script>

<style scoped>
    .hello {
        padding: 16px;
    }
</style>
