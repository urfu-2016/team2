# Фотоквесты awesomequests

#### http://awesomequests.herokuapp.com

## Использован следующий набор технологий
1. Node.js
2. Express.js
3. PostgreSQL
4. Heroku
5. TravisCI
6. Webpack
7. Handlebars
8. Surge
9. Sequalize.js
10. cloudinary.js

## Скрипты менеджера пакетов

| Скрипт | Назначение |
| ---------------- | ------------------------------ |
| npm start | Запуск сервиса |
| npm test | Запуск тестов |
| npm lint | Запуск линтера |
| npm createTables | Команда заполнения базы данных |
| npm build | Запуск webpack |
| npm build:dev | Запуск webpack в режиме разработки |
| npm deploy:surge | Деплой статики в CDN |

## Участие в разработке
1. В первую очередь нужно сделать форк, у нас принято использовать механику Pull Requests.
2. Склонировать форк, установить npm-зависимости.
3. В форке делаем задачу.
4. Проверить lint, если нужно исправить.
5. Если задача затронула статику -- задеплоить ее в CDN.
6. Создать ПР. Убедиться, что все проверки тревиса прошли.
7. Если у ревьюера будут замечания -- придется их поправить в своем форке. Новые коммиты сами доедут в ПР.

## Структура приложения в файловой системе

```
`-- repo
    +-- app - папка со всем необходимым для запуска прилложению*
    |   +-- config - папка с js скриптами, содержащими настройку системы
    |   +-- controllers
    |	+-- fonts
    |   +-- middlewares
    |   +-- models -- модели для sequalize
    |   +-- services
    |   +-- views -- *.hbs. Содержатся в подпапках, имена которых соответствуют именам контроллеров
    |   +-- index.js
    |   `-- routes.js
    +-- scripts - папка содержит вспомогательные скрипты
    +-- .gitignore - указываем файлы, которые не хотим пушить в репозиторий
    `-- webpack.config.js - файл с настройками вебпака
```

## Разработчики
* [**@dkondrashin**](//github.com/dkondrashin)
* [**@FoKycHuK**](//github.com/FoKycHuK)
* [**@kol9nus**](//github.com/kol9nus)
* [**@nikitc**](//github.com/nikitc)
* [**@SemyonMakhaev**](//github.com/SemyonMakhaev)
