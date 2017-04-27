<template>
    <content-wrapper app-name='管理平台' page-name='用户管理'>
        <bh-button type='primary' @click='visible = true'>Welcome to BhVue</bh-button>
        <div class='bh-mt-8' v-if='visible' @click='visible = false'>
            Click me to hide !
        </div>
    </content-wrapper>
</template>

<script>
    import BhButton from 'bh-vue/dist/BhButton';
    import ContentWrapper from 'components/contentWrapper';

    export default {
        data: () => ({
            visible: false,
            copyright: '版权信息：© 2015 江苏金智教育信息股份有限公司 苏ICP备10204514号'
        }),
        components: {ContentWrapper, BhButton}
    };
</script>
