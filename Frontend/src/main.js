import { createApp } from 'vue'
import App from './App'
import router from './router/router';
import store from '@/store'

import componentUI from '@/Components/UI'
import componentPanel from '@/Components/Panels'
import componentOther from '@/Components/Other'

const app = createApp(App)

//Глобально в проекте регестрируем UI, Panel, Other компоненты
const components = [...componentUI, ...componentPanel, ...componentOther];
components.forEach(component => {
	app.component(component.name, component);
});


app
		.use(router)
		.use(store)
		.mount('#app');