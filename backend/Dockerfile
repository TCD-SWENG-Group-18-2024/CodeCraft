# Use a Python base image
FROM python:3.11-slim-buster

# Set the working directory
WORKDIR /app

# Copy and install dependencies
COPY requirements.txt .
RUN pip3 install -r requirements.txt

# Copy backend source code
COPY response.py .
COPY codecraft.py .

# Expose port 8080
EXPOSE 8080

# Command to run the backend application
CMD [ "python", "codecraft.py" ]