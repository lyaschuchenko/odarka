# Одарка

[Одаркa](https://t.me/Odarka_uabot) - перша в світі бот-русофобка. Просто додайте її в групу - і вона буде наводити жах на його учасників, жорстоко караючи за будь-які прояви русизму.

> Всі персонажі є вигаданими, та будь-який збіг з реально живими або померлими людьми випадковий. Позиції, вірування та точки зору висловлені цим ботом можуть різнитись з позиціями, віруваннями та точками зору його розробників.

![Одарка](https://github.com/lyaschuchenko/odarka/blob/master/Odarka.png?raw=true)

### Інсталяція

Для запуску Одарки необхідно встановити Node.js та Docker. 
- Node.js
  - `curl -sL https://deb.nodesource.com/setup_18.x -o nodesource_setup.sh`
  - `sudo bash nodesource_setup.sh`
  - `sudo apt install nodejs`
- Docker
  - `sudo apt install apt-transport-https ca-certificates curl software-properties-common`
  - `curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg`
  - `echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null`
  - `sudo apt update`
  - `sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin`
  - `curl -L "https://github.com/docker/compose/releases/download/v2.9.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose`
  - `chmod +x /usr/local/bin/docker-compose`

Окрім цього необхідно мати валідний Telegram-токен, який можна отримати за допомогою спеціального боту [BotFather](https://core.telegram.org/bots#6-botfather). Подальші кроки:

- Клонуйте цей репозиторій.
- Відредагуйте файл `.env` в кореневій папці з наступним змістом:
	
	ODARKA_TELEGRAM_TOKEN=<Ваш Telegram-токен>

- Введіть в термінал `npm install` для встановлення залежностей.
- Введіть в термінал `npm run docker` для запуску самого боту.

### Моніторинг

Одарка зберігає певні дані під час роботи, наприклад список чатів та оброблені повідомлення. Вони зберігаються у запущеному локально [Redis](https://redis.io). Для доступу до цих даних доступні як звичайний [RedisInsight](http://localhost:2206) так і спеціальний дешборд саму [Одарку](http://localhost:2205). 

### Конфіденційність

Одарка пропускає через себе усі повідомлення групи в яку він був додана - але з точки зору коду ми стараємось максимально добросовісно відноситись до конфіденційності користувачів і зберігати мінімально можливий обсяг данних. Він включає в себе:

- Деталі чату (назва, юзернейм, кількість оброблених та надісланих Одаркою повідомлень).
- Повідомлення на які була дана відповідь (відправник, текст повідомлення, текст відопвіді).

Дані які Одарка НЕ зберігає:

- Список користувачів чату.
- Повідомлення на які НЕ була дана відповідь.
- Додаткова інформація про користувача.

Для додаткового захисту інформація про оброблені повідомлення зберігається не більше семи днів, після чого автоматично видаляється.

### Ліцензія
GNU GPLv3
