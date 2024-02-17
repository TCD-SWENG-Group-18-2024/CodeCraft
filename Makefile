# Define variables
PYTHON := python3
PIP := pip3
NPM := npm

# Define phony targets
.PHONY: all install-dependencies run-backend run-frontend

# Define targets
all: install-dependencies run-backend run-frontend

install-dependencies:
	@echo "Installing Python dependencies..."
	$(PIP) install -r backend/requirements.txt
	@echo "Installing Node.js dependencies..."
	cd frontend && $(NPM) install

run-backend:
	@echo "Running backend server..."
	$(PYTHON) backend/codecraft.py &

run-frontend:
	@echo "Running frontend server..."
	cd frontend && $(NPM) run start &