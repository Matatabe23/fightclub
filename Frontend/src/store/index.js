import { createStore } from "vuex";
import { AuthModul } from "@/store/AuthModul";

export default createStore({
	modules: {
		auth: AuthModul
	}
})