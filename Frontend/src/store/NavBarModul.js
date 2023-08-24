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
    Showinterpreter: (state) => {
      if (state.userData && ['ADMIN', 'DEVELOPER', 'OFFICER', 'FIGHTCLUB'].includes(state.userData.role)) {
        return true;
      } else {
        return false;
      }
    },
    showDrop: (state) => {
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

		GiveUserData: (state) => {
      const token = localStorage.getItem('token');
    if (token) {
      check(token).then((Name) => {
        this.$store.commit('SET_USER_DATA', Name);
      });
    }
    },
  },
});
