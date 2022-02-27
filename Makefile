# Production
prod:
	docker compose up -d
	docker compose logs -f

down:
	docker compose down

# Development
dev:
	docker compose -f docker-compose.dev.yml up -d
	docker compose logs -f

down-dev:
	docker compose -f docker-compose.dev.yml down

# Other commands
logs:
	docker compose logs -f

purge:
	echo -e "Pre-Purge:\n"
	docker system df -v

	echo "Purging unused and dangling resources..."
	docker system prune -f

	echo -e "Post-Purge:\n"
	docker system df -v