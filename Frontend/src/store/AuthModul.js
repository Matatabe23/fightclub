import { check } from '@/Http//UserAPI';

// Модуль для аутентификации
export const AuthModul = ({
  state: {
    isAdmin: false
  },
  getters: {
		
  },
  mutations: {
    SET_IS_ADMIN(state, value) {
      state.isAdmin = value;
    }
  },
  actions: {
    setIsAdminFromCheck({ commit }) {
      const userRole = check();
      commit('SET_IS_ADMIN', userRole === 'ADMIN' || userRole === 'DEVELOPER');
    }
  }
});
