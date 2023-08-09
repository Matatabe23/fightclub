import { createStore } from "vuex";
import { NavBarModul } from "@/store/NavBarModul";

export default createStore({
	modules: {
		navbar: NavBarModul
	}
})