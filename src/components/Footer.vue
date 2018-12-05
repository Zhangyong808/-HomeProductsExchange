<template>
  <div class="comp footer-comp bg--grey">
        <div class="info">
            <nav class="nav">
                <router-link to="/">法律声明 | </router-link>
                <router-link to="/">商家加盟 | </router-link>
                <router-link to="/">市场加盟 | </router-link>
                <router-link to="/">关于我们 | </router-link>
            </nav>
            <span class="text--grey">ICP许可证：沪ICP备16039820号-2</span>
        </div>
        <div class="info text--grey">Copyright © 2017-2018 上海东方美居网络技术有限公司 保留所有权利</div>
        <div class="info text--grey">免责声明：本网站图片由设计师自行上传，如权利人发现存在误传其作品情形，请及时与本站联系</div>
  </div>
</template>
<style lang="stylus">
.footer-comp {
    box-sizing: border-box;
    padding-top: 50px;
    text-align: center;
    font-size: 12px;
    height: 180px;
    background-color: rgba(242,242,242,1);
    .info{
        margin-bottom: 10px;
    }
    .nav {
        display: inline-block;
        margin-right: 10px;
        a {
            font-weight: bold;
            text-decoration: none;
            color: #666;
        }

        a.router-link-exact-active {
            color: #666
        }
    }
}
</style>
