# Команды Make

# Установить зависимости
install:
	npm install
# Запустить сервер для разработки
dev:
	npm run dev

# Запустить сервер
start:
	node index.js

# Проверить код
lint:
	npx eslint .

# Исправить ошибки автоматически
fix:
	npx eslint . --fix

# Удалить node_modules
clean:
	rm -rf node_modules

# Показать все команды
help:
	@echo "Доступные команды:"
	@echo "  make install   - Установить зависимости"
	@echo "  make dev       - Запустить сервер (npm run dev)"
	@echo "  make start     - Запустить сервер (node index.js)"
	@echo "  make lint      - Проверить код линтером"
	@echo "  make fix       - Исправить ошибки автоматически"
	@echo "  make clean     - Удалить node_modules"
	@echo "  make help      - Показать эту справку"