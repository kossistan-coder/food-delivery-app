import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Suivue from 'semantic-ui-vue'
import 'semantic-ui-css/semantic.min.css';
import axios from 'axios'
import store from './vuex'
import vueEllipseProgress from 'vue-ellipse-progress'
axios.defaults.withCredentials = true;
axios.defaults.baseURL='http://localhost:8000'
axios.defaults.headers.common['Authorization'] = ' Bearer '+localStorage.getItem('token')
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
Vue.use(Suivue)
Vue.use(vueEllipseProgress)



Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
