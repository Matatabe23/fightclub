import { check } from "@/Http/UserAPI";

export const NavBarModul = ({
	state: {
    userData: null,
  },
  mutations: {
    SET_USER_DATA(state, data) {
			state.userData = data
    },
  },
  getters: {
		//таблицы
		showSummaryButton: (state) => {
			if (state.userData && ['ADMIN', 'DEVELOPER', 'OFFICER', 'FIGHTCLUB'].includes(state.userData.role)) {
				return true;
			} else {
				return false;
			}
		},
		showAttendanceButton: (state) => {
			if (state.userData && ['ADMIN', 'DEVELOPER', 'OFFICER', 'FIGHTCLUB'].includes(state.userData.role)) {
				return true;
			} else {
				return false;
			}
		},
		showDropButton: (state) => {
			if (state.userData && ['ADMIN', 'DEVELOPER', 'OFFICER', 'FIGHTCLUB'].includes(state.userData.role)) {
				return true;
			} else {
				return false;
			}
		},
		showQueueButton: (state, to) => {
			if (state.userData && ['ADMIN', 'DEVELOPER', 'OFFICER', 'FIGHTCLUB'].includes(state.userData.role)) {
				return true;
			} else {
				return false;
			}
		},

		//Админ панель
		showAdminPanelButton: (state) => {
			if (state.userData && ['ADMIN', 'DEVELOPER'].includes(state.userData.role)) {
				return true;
			} else {
				return false;
			}
		},
	}
	
});
