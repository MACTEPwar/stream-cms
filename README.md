1. Запуска приложения `ng serve --host 0.0.0.0`
2. Ставим `server.url` = внешнему локальному url `http://192.168.0.100:4200`
3. Открыть в андроид студио `npx cap open android`
3. Скопирвоать в андроид студио `npx cap copy android` (пишут что для ng serve не нужно это)
4. Билд apk `Build` -> `Build APK`
5. Приложение тут `./android/app/build/outputs/apk/debug/app-debug.apk`