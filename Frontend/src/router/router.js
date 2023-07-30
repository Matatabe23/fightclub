import { createRouter, createWebHashHistory } from 'vue-router'
import { check, CheckDataWeb } from '@/Http/UserAPI'


import AuthReg from '@/pages/AuthReg.vue'


//Главная
import Main from '@/pages/Main.vue'

//Таблицы
import Everyone from '@/pages/Table/Everyone.vue'
import Summary from '@/pages/Table/Summary.vue'
import Attendance from '@/pages/Table/Attendance.vue'
import Drop from '@/pages/Table/Drop.vue'
import Queue from '@/pages/Table/Queue.vue'

//Правила
import Rules from '@/pages/Rules.vue'

//Админ панель = Создать новость
import CreateNew from '@/pages/AdminPanel/CreateNew.vue'

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

	//Участники
	{
		path: '/Everyone',
		component: Everyone,
		meta: {
			INTERN: true,
			FIGHTCLUB: true,
			OFFICER: true,
			DEVELOPER: true,
			ADMIN: true
		}
	},
	//Сводка
	{
		path: '/Summary',
		component: Summary,
		meta: {
			FIGHTCLUB: true,
			OFFICER: true,
			DEVELOPER: true,
			ADMIN: true
		}
	},
	//Посещаемость и зп
	{
		path: '/Attendance',
		component: Attendance,
		meta: {
			FIGHTCLUB: true,
			OFFICER: true,
			DEVELOPER: true,
			ADMIN: true
		}
	},
	//Дроп
	{
		path: '/Drop',
		component: Drop,
		meta: {
			FIGHTCLUB: true,
			OFFICER: true,
			DEVELOPER: true,
			ADMIN: true
		}
	},
	//Очередь на дроп
	{
		path: '/Queue',
		component: Queue,
		meta: {
			FIGHTCLUB: true,
			OFFICER: true,
			DEVELOPER: true,
			ADMIN: true
		}
	},

	//Правила
	{
		path: '/Rules',
		component: Rules,
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
		// Handle the error here
		console.error(error);
	});

});


  // if (roles.some(role => role !== null && role !== undefined && role !== 'USER')) {
  //   Promise.all(roles.map(role => check(token, role)))
  //     .then(values => {
  //       if (values.some(role => role !== null)) {
  //         next();
  //       } else {
  //         alert('Запросите роль у админа');
  //         next('/');
  //       }
  //     })
  //     .catch(error => {
  //       console.error(error);
  //       next('/');
  //     });
  // } else {
  //   next('/');
  // }







export default router;