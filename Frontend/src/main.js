import { createApp } from 'vue'
import App from './App'
import componentUI from '@/Components/UI'
import router from './router/router';
import store from '@/store'

const app = createApp(App)
componentUI.forEach(componentUI => {
	app.component(componentUI.name, componentUI)
})

app
		.use(router)
		.use(store)
		.mount('#app');