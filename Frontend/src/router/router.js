import { createRouter, createWebHashHistory } from 'vue-router'
import { check, CheckDataWeb } from '@/Http/UserAPI'


import AuthReg from '@/pages/AuthReg.vue'

//Главная
import Main from '@/pages/Main.vue'

//Таблицы
import interpreter from '@/pages/Table/interpreter.vue'
import Drop from '@/pages/Table/Drop.vue'

//Админ панель = Создать новость
import CreateNew from '@/pages/AdminPanel/CreateNew.vue'
import GiveRole from '@/pages/AdminPanel/GiveRole.vue'

const routes = [
	{
		path: '/',
		component: AuthReg,
	},

	//Главная
	{
		path: '/Main',
		component: Main,
		meta: {
			INTERN: true,
			FIGHTCLUB: true,
			OFFICER: true,
			DEVELOPER: true,
			ADMIN: true
		}
	},
	
	// Посещаемость
	{
		path: '/interpreter',
		component: interpreter,
		meta: {
			INTERN: true,
			FIGHTCLUB: true,
			OFFICER: true,
			DEVELOPER: true,
			ADMIN: true
		}
	},

		// Дроп
		{
			path: '/Drop',
			component: Drop,
			meta: {
				INTERN: true,
				FIGHTCLUB: true,
				OFFICER: true,
				DEVELOPER: true,
				ADMIN: true
			}
		},
	
	//Админ панель = Создать новость
	{
		path: '/CreateNew',
		component: CreateNew,
		meta: {
			ADMIN: true,
			DEVELOPER: true
		}
	},

	//Админ панель = выдать роль
	{
		path: '/GiveRole',
		component: GiveRole,
		meta: {
			ADMIN: true,
			DEVELOPER: true
		}
	},
]

const router = createRouter({
	routes,
	history: createWebHashHistory(process.env.BASE_URL)
})



router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  const roles = Object.keys(to.meta);
  if (to.path === '/') {
    next();
    return;
  }
	
	CheckDataWeb(token)
	.then(response => {
		const userData = response;
		if (roles.includes(userData.role)) {
      next();
    } else {
      next('/');
			alert('Запросите роль у админа')
    }
	}).catch(error => {
		console.error(error);
	});
});

export default router;