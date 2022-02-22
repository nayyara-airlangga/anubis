#!/bin/sh

echo -e "Pre-Purge:\n"
docker system df -v

echo "Purging unused and dangling resources..."
docker system prune -f

echo -e "Post-Purge:\n"
docker system df -v
