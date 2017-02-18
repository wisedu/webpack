<template>
    <bh-header :slogon='appName' user-info=''></bh-header>
    <main>
        <article bh-layout-role="single" v-el:main>
            <h2>{{pageName}}</h2>
            <section>
                <slot></slot>
            </section>
        </article>
    </main>
    <bh-footer :copyright='copyright'></bh-footer>
</template>

<script>
    /**
     * 目前此组件适合用于创建单个应用的布局，
     * 默认包含 res 库中的 header 和 footer 样式，
     * 可根据需要自行修改。
     */
    import BhHeader from 'bh-vue/BhHeader';
    import BhFooter from 'bh-vue/BhFooter';

    export default {
        props: {
            appName: String, // 应用组名称（大标题）
            pageName: String, // 当前页面名称 (小标题)
            copyright: { // 页脚信息
                default: '版权信息：© 2015 江苏金智教育信息股份有限公司 苏ICP备10204514号'
            }
        },
        ready () {
            this.$nextTick(() => BH_UTILS.setContentMinHeight($(this.$els.main)));
        },
        components: {BhHeader, BhFooter}
    }
</script>
