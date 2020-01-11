import './assets/rem'
import Vue from 'vue'
import App from './App.vue'
import router from './router'

import { PullRefresh } from 'vant';
import { Tabbar, TabbarItem } from 'vant';
import { Card } from 'vant';
import { Grid, GridItem } from 'vant';
import { Lazyload } from 'vant';
import { Toast } from 'vant';
import { List } from 'vant';
import { Image } from 'vant';
import { Swipe, SwipeItem } from 'vant';
import { Button } from 'vant';
import { Stepper } from 'vant';
import './assets/base.css'

Vue.use(PullRefresh);
Vue.use(Tabbar).use(TabbarItem);
Vue.use(Card);
Vue.use(Grid).use(GridItem);
Vue.use(Lazyload);
Vue.use(Toast);
Vue.use(List);
Vue.use(Image);
Vue.use(Swipe).use(SwipeItem);
Vue.use(Button);
Vue.use(Stepper);
Vue.use(Toast);



// 导入按需加载的 vant 组件
import './plugins/vant'

// import VueResource from 'vue-resource'
// Vue.use(VueResource);
// Vue.http.options.emulateJSON = false

// 导入axios
import axios from 'axios'


//配置请求的路径
axios.defaults.baseURL='http://www.liulongbin.top:3005/'


Vue.prototype.$http = axios

Vue.config.productionTip = false


Vue.filter('dateFormat',function(originVal){
  const dt = new Date(originVal)
  const y = dt.getFullYear()
  const m =(dt.getMonth()+1+'').padStart(2,'0')
  const d = (dt.getDate()+'').padStart(2,'0')

  const hh =(dt.getHours()+'').padStart('2',0)
  const mm = (dt.getMinutes()+'').padStart(2,'0')
  const ss = (dt.getSeconds()+'').padStart(2,'0')

  return `${y}-${m}-${d}  ${hh}:${mm}:${ss}`
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
