import Vue from 'vue'
import Router from 'vue-router'
import Index from '../components/index/index.vue'
import Classify from '../components/classify/classify.vue'
import Baby from '../components/baby/baby.vue'
import Mine from '../components/mine/mine.vue'
import MenuDetail from 'components/menu_detail/menu_detail'
import MenuList from 'base/menulist/menulist'
import Search from 'components/search/search'
import SubjectList from 'components/subject-list/subject-list'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      //重定向
      redirect: '/Index'
    }, {
      path: '/index',
      name: "index",
      component: Index
    }, {
      path: '/classify',
      name: 'classify',
      component: Classify,
    }, {
      path: '/baby',
      name: 'baby',
      component: Baby
    }, {
      path: '/mine',
      name: 'mine',
      component: Mine
    }, {
      path: '/menudetail/:id',
      name: 'menudetail',
      component: MenuDetail
    },{
      path:'/menulist/:id',
      name:'menulist',
      component:MenuList
    },{
      path:'/search',
      name:'search',
      component:Search
    },{
      path:'/subject-list',
      name:'subjectlist',
      component:SubjectList
    }
  ]
})
