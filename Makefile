FILE := .env.local
ENV_VARIABLES := $(shell cat ${FILE})

test:
    echo $(ENV_VARIABLES)

dev-backend:
    cd backend && $(ENV_VARIABLES) yarn dev

dev-frontend:
    cd frontend && $(ENV_VARIABLES) yarn dev

_dev: dev-backend dev-frontend

dev:
    $(MAKE) _dev -j2