import { $autHost, $host  } from "@/Http/index"; // импортируем экземпляры axios для обращения к серверу
import jwtDecode from "jwt-decode"; // импортируем библиотеку для декодирования JWT-токена

// Добавление постов
export const Posts = async (posts) =>{
	const {data} = await $autHost.post('api/posts/push', posts) // отправляем POST-запрос с данными на URL-адрес
	return data //Возвращаем результат функции
}