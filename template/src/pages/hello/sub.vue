<template>
    <div class='sub'>
        这是一个子页面
        <a href="#" @click='back'>返回</a>
    </div>
</template>

<script type="text/javascript">
    export default {
        methods: {
            back () {
                history.back();
            }
        }
    };
</script>

<style scoped>
    .sub {
        line-height: 4rem;
    }
</style>
