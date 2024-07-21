Проект задеплоен на https://spaceburger.onrender.com/
Сервис render.com разворачивает проект из последнего коммита ветки sprint-6 (укажу на main после merge) 
на github и автоматически обновляется, если меняется ссылка на последний коммит.

для деплоя следует запустить npm run build, сделать коммит и запушить его на gitHub

Для того, чтобы запустить проект на локальном сервере нужно:
 - скачать его с gitHub, при помощи команды git clone https://github.com/RomanTolkachev/spaceBurger,
 - запустить его на локальном сервере при помощи команды npm run start

Для запуска e2e тестов нужно выполнить команду npm run cypress

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.


### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.



