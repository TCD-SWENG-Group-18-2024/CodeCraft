# Define variables
PYTHON := python3  
PIP := pip3
NPM := npm

# Define phony targets
.PHONY: all install-dependencies install-backend install-frontend run-backend run-frontend

# Define targets
all: install-dependencies run-backend run-frontend

install-dependencies: install-backend install-frontend

install-backend:
	@echo "Installing Python dependencies..."
	cd backend && $(PIP) install -r requirements.txt

install-frontend:
	@echo "Installing Node.js dependencies..."
	cd frontend && $(NPM) install

run-backend:
	@echo "Running backend server..."
	cd backend && $(PYTHON) codecraft.py &

run-frontend:
	@echo "Running frontend server..."
	cd frontend && $(NPM) run start &
