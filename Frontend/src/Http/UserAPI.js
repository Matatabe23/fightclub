import { $autHost, $host  } from "@/Http/index"; // импортируем экземпляры axios для обращения к серверу
import jwtDecode from "jwt-decode"; // импортируем библиотеку для декодирования JWT-токена

// Функция для регистрации новых пользователей
export const registration = async (email, name, password) =>{
    const {data} = await $host.post('api/user/registration', {email, name, password}) // отправляем POST-запрос с данными на URL-адрес
    localStorage.setItem('token', data.token ) // сохраняем токен авторизации в localStorage браузера
    return jwtDecode(data.token) // декодируем токен и возвращаем его
}

// Функция для авторизации пользователя
export const login = async (email, password) =>{
    const {data} = await $host.post('api/user/login', {email, password}) // отправляем POST-запрос с данными на URL-адрес
    localStorage.setItem('token', data.token ) // сохраняем токен авторизации в localStorage браузера
    return jwtDecode(data.token) // декодируем токен и возвращаем его
}

// Функция для проверки авторизации пользователя
export const check = async () =>{
    const {data} = await $autHost.get('api/user/check') // отправляем GET-запрос на URL-адрес, защищенный авторизацией
    localStorage.setItem('token', data.token ) // сохраняем токен авторизации в localStorage браузера
    return jwtDecode(data.token) // декодируем токен и возвращаем его
}

export const CheckDataWeb = async () =>{
	const {data} = await $autHost.get('api/user/CheckDataWeb', ) // отправляем GET-запрос на URL-адрес, защищенный авторизацией
	localStorage.setItem('token', data.token ) // сохраняем токен авторизации в localStorage браузера
	return jwtDecode(data.token) // декодируем токен и возвращаем его
}


