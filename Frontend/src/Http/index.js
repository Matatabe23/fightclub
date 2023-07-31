import axios from 'axios'; // импортируем библиотеку axios для работы с HTTP-запросами

// создаем экземпляр axios с базовым URL http://localhost:5000/ для выполнения запросов
const $host = axios.create({
    baseURL: 'http://92.53.86.217:5000/' 
});

// создаем новый экземпляр axios для выполнения запросов с авторизационным заголовком
const $autHost = axios.create({
    baseURL: 'http://92.53.86.217:5000/'
});

// создаем функцию для добавления авторизационного заголовка к запросу
const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`; // извлекаем токен из локального хранилища и добавляем его в авторизационный заголовок
    return config;
};

// добавляем созданную функцию в цепочку интерсепторов для отправки запроса с авторизационным заголовком
$autHost.interceptors.request.use(authInterceptor);

// экспортируем созданные экземпляры axios для дальнейшего использования в приложении
export {
    $host,
    $autHost
};
