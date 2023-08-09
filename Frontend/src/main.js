import { createApp } from 'vue'
import App from './App'
import componentUI from '@/Components/UI'
import componentPanel from '@/Components/Panels'
import componentOther from '@/Components/Other'
import router from './router/router';
import store from '@/store'

const app = createApp(App)

//Глобально в проекте регестрируем UI, Panel, Other компоненты
componentUI.forEach(componentUI => {
	app.component(componentUI.name, componentUI)
})
componentPanel.forEach(componentPanel => {
	app.component(componentPanel.name, componentPanel)
})
componentOther.forEach(componentOther => {
	app.component(componentOther.name, componentOther)
})

app
		.use(router)
		.use(store)
		.mount('#app');