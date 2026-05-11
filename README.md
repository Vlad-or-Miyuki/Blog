# Journal Blog

Универсальный MERN-блог для публикации заметок, статей и постов на любую тему.

## Возможности

- регистрация и вход по JWT;
- создание, редактирование и удаление своих постов;
- загрузка изображения к посту;
- просмотр общей ленты и своих публикаций;
- детальная страница поста;
- комментарии;
- лайки;
- счетчик просмотров.

## Стек

- React
- Redux Toolkit
- React Router
- Tailwind CSS
- Node.js
- Express
- MongoDB
- Mongoose
- JWT

## Структура

```text
mern_blog-main/
  client/          React-приложение
  server/          Express API
  server/uploads/  изображения постов
  .env             переменные окружения сервера
```

## Переменные окружения

В корне проекта нужен файл `.env`:

```env
MONGO_URI=mongodb://localhost:27017/mern_blog
JWT_SECRET=mySecretKeyForJWT12345
PORT=5000
```

## Установка

Установить зависимости сервера из корня проекта:

```powershell
npm.cmd install
```

Установить зависимости клиента:

```powershell
cd client
npm.cmd install
```

## Запуск

Сначала убедитесь, что MongoDB запущена локально.

Сервер запускается из корня проекта:

```powershell
cd C:\path\to\mern_blog-main
npm.cmd start
```

API будет доступно по адресу:

```text
http://localhost:5000/api
```

Клиент запускается во втором терминале:

```powershell
cd C:\path\to\mern_blog-main\client
npm.cmd start
```

Приложение откроется по адресу:

```text
http://localhost:3000
```

## Где хранятся данные

Данные пользователей, постов, комментариев и лайков хранятся в локальной MongoDB:

```text
mongodb://localhost:27017/mern_blog
```

Изображения постов хранятся файлами в папке:

```text
server/uploads
```

В MongoDB у поста хранится только имя файла изображения.

## Сборка клиента

```powershell
cd client
npm.cmd run build
```

Команда создаст папку `client/build`. Это сгенерированная папка, ее не обязательно хранить в репозитории.

## Перенос на другой компьютер

Чтобы проект запустился на другом компьютере, нужны:

- Node.js;
- MongoDB;
- зависимости из `package.json`;
- файл `.env`;
- папка `server/uploads`, если нужны старые изображения;
- экспорт базы MongoDB, если нужны старые пользователи, посты, комментарии и лайки.

Для общей базы между несколькими компьютерами можно использовать MongoDB Atlas и заменить `MONGO_URI` в `.env`.
