import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
    scrollBehavior() {
        return { x: 0, y: 0 };
    },
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('./views/Register.vue')
        },
        {
            path: '/findPassword',
            name: 'findPassword',
            component: () => import('./views/FindPassword.vue')
        },
        {
            path: '/my',
            name: 'my',
            component: () => import('./views/My.vue')
        },
        {
            path: '/onlineMarket',
            name: 'onlineMarket',
            component: () => import('./views/Market.vue')
        },
        {
            path: '/marketDetail',
            name: 'marketDetail/:id',
            component: () => import('./views/MarketDetail.vue')
        },
        {
            path: '/merActivity',
            name: 'merActivity',
            component: () => import('./views/MerActivity.vue')
        },
        {
            path: '/marActivity',
            name: 'marActivity',
            component: () => import('./views/MarActivity.vue')
        },
        {
            path: '/activityDetail',
            name: 'activityDetail/:id',
            component: () => import('./views/ActivityDetail.vue')
        },
        {
            path: '/goods',
            name: 'goods',
            component: () => import('./views/Goods.vue')
        },
        {
            path: '/goodsDetail',
            name: 'goodsDetail',
            component: () => import('./views/GoodsDetail.vue')
        },
        {
            path: '/photo',
            name: 'photo',
            component: () => import('./views/Photo.vue')
        },
        {
            path: '/photoList',
            name: 'photoList',
            component: () => import('./views/PhotoList.vue')
        },
        {
            path: '/photoDetail',
            name: 'photoDetail',
            component: () => import('./views/PhotoDetail.vue')
        },
        {
            path: '/company',
            name: 'company',
            component: () => import('./views/Company.vue')
        },
        {
            path: '/companyDetail',
            name: 'companyDetail/:id',
            component: () => import('./views/CompanyDetail.vue')
        },
        {
            path: '/decorator',
            name: 'decorator',
            component: () => import('./views/Decorator.vue')
        },
        {
            path: '/decoratorDetail',
            name: 'decoratorDetail/:id',
            component: () => import('./views/DecoratorDetail.vue')
        },
        {
            path: '/caseDetail',
            name: 'caseDetail/:id',
            component: () => import('./views/CaseDetail.vue')
        },
        {
            path: '/shop',
            name: 'shop',
            component: () => import('./views/Shop.vue')
        },
        {
            path: '/shopDetail',
            name: 'shopDetail/:id',
            component: () => import('./views/ShopDetail.vue')
        },
        {
            path: '/boutiqueDetail',
            name: 'boutiqueDetail',
            component: () => import('./views/BoutiqueDetail.vue')
        },
        {
            path: '/decorationSchool',
            name: 'decorationSchool',
            component: () => import('./views/School.vue')
        },
        {
            path: '/wiki',
            name: 'wiki',
            component: () => import('./views/Wiki.vue')
        },
        {
            path: '/wikiDetail',
            name: 'wikiDetail/:id',
            component: () => import('./views/WikiDetail.vue')
        },
        {
            path: '/news',
            name: 'news',
            component: () => import('./views/News.vue')
        },
        {
            path: '/newsDetail',
            name: 'newsDetail/:id',
            component: () => import('./views/NewsDetail.vue')
        },
        {
            path: '/recruit',
            name: 'recruit',
            component: () => import('./views/Recruit.vue')
        },
        {
            path: '/merchant',
            name: 'merchant',
            component: () => import('./views/Merchant.vue')
        },
        {
            path: '/city',
            name: 'city',
            component: () => import('./views/City.vue')
        }
    ]
});
