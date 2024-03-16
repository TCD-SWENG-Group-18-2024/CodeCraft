# Define variables
PYTHON := python
PIP := pip3
NPM := npm
DOCKER := docker

# Define phony targets
.PHONY: all install-dependencies install-backend install-frontend install-milvus run-backend run-frontend

# Define targets
all: install-dependencies run-application

install-dependencies: install-backend install-frontend install-milvus

run-application: run-backend run-frontend

install-backend:
	@echo "Installing Python dependencies..."
	$(PIP) install -r backend/requirements.txt

install-frontend:
	@echo "Installing Node.js dependencies..."
	cd frontend && $(NPM) install

install-milvus:
	@echo "Installing MilvusDB..."
	cd backend/MilvusDB && $(DOCKER) compose up -d

run-backend:
	@echo "Running backend server..."
	start /b ${PYTHON} backend/codecraft.py &

run-frontend:
	@echo "Running frontend server..."
	cd frontend && $(NPM) run start &