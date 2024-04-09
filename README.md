# About

Our project is **CodeCraft**, the goal of which is to revolutionize Software Engineering with AI. We are developing a web application which utilises multiple different AI models, such as GPT 3.5, StarCode and Code Llama to create a place for developers to perform code analysis, completion, generation and translation.

### You can try CodeCraft for yourself here!
https://codecraft.1f106c1j1agn.eu-gb.codeengine.appdomain.cloud/

### Follow one of the methods below to download and run the application.
Note that this application is a work in progress and that private API Keys are required to run it. Please contact the developers if you need access to these keys.

 - [Method 1: Using Docker (Recommended)](#method-1-using-docker-recommended)
 - [Method 2: Using Make](#method-2-using-make)
 - [Developer Instructions](#developer-instructions)

# Method 1: Using Docker (Recommended)

## 1. Prerequisites

Before you begin, ensure you have the following:

- Docker Desktop running on your machine
- A command line terminal running on your machine
- Access to an internet connection
- A web browser running on your machine
- A backend `.env` file containing API Keys from the developers
- A file explorer running on your machine (optional)

## 2. Clone the Repository

- In your command line terminal, navigate to the directory in which you would like to clone the repository.
- Once inside your chosen directory, run `git clone https://github.com/TCD-SWENG-Group-18-2024/CodeCraft.git` on your terminal to clone the repository.
- Using your command line or your file explorer, place your backend `.env` file containing the API Keys in the `backend` folder of the cloned repository.
- Using your command line or your file explorer, create a `.env` file in the frontend folder with the following key-value pair: `REACT_APP_BACKEND_URL = "http://localhost:8080"`. If you want to test with the deployed backend, replace this URL with `"https://backend.1f106c1j1agn.eu-gb.codeengine.appdomain.cloud/"`.

## 3. Run Docker Compose

- Navigate to the root folder of the cloned repository in your terminal and run the command `docker compose up` to build and run the application inside connected docker containers.

## 4. Run the Web Application

- In your web browser, enter the URL `http://localhost:3000` to access the application from your browser.

### When you are finished:
- You can use a Keyboard Interrupt such as `Ctrl + C` to kill the application from your terminal.
- Run `docker compose down` inside your terminal to deconstruct the containers running the application.

# Method 2: Using Make

## 1. Prerequisites

In order to use this method you will need to have GNU Make installed on your local machine. You can download it [here](https://www.gnu.org/software/make/#download).

Once you have Make installed, ensure you have the following:

- A command line terminal running on your machine
- Access to an internet connection
- A web browser running on your machine
- A `.env` file containing API Keys from the developers
- A file explorer running on your machine (optional)

## 2. Clone the Repository

- In your command line terminal, navigate to the directory in which you would like to clone the repository.
- Once inside your chosen directory, run `git clone https://github.com/TCD-SWENG-Group-18-2024/CodeCraft.git` on your terminal to clone the repository.
- Using your command line or your file explorer, place your `.env` file containing the API Keys in the `backend` folder of the cloned repository.
- Using your command line or your file explorer, create a `.env` file in the frontend folder with the following key-value pair: `REACT_APP_BACKEND_URL = "http://localhost:8080"`. If you want to test with the deployed backend, replace this URL with `"https://backend.1f106c1j1agn.eu-gb.codeengine.appdomain.cloud/"`.

## 3. Run the Makefile

- Navigate to the root folder of the cloned repository in your terminal and run the command `make all` to install all dependencies and run the application.

## 4. Run the Web Application

- In your web browser, enter the URL `http://localhost:3000` to access the application from your browser.

### When you are finished:
- You can use a Keyboard Interrupt such as `Ctrl + C` to kill the application from your terminal.

# Developer Instructions

## Prerequisites

Before you begin, ensure you have the following installed:
- Python 3 or higher
- React
- Flask 
- NPM (Node Package Manager)

## Getting Started

Follow these steps to get the application running on your local machine:

### Starting the Flask Backend

1. Open your terminal.
2. Navigate to the `backend` directory.
3. Create a virtual environment:
   
   (Windows)
   ```
   python -m venv venv
   ```
   (Mac)
   ```
   python -m venv venv
   ```
  
4. Make sure to activate the virtual environment:
   
   (Windows)
   ```
   venv\Scripts\activate
   ```
   (Mac)   
   ```
   source venv/bin/activate
   ```
5. Install the Flask App requirements:
   
   (Windows)
   ```
   pip install -r requirements.txt
   ```
   (Mac)
   ```
   pip3 install flask
   ```
6. Now run the command:
   
   (Windows)
   ```
   python codecraft.py
   ```
   (Mac)
   ```
   python3 codecraft.py
   ```
   
   The backend should now be running on `http://localhost:8080`
   
### Starting the React frontend

1. Open your command line terminal
2. Navigate to the `frontend` directory
3. Install the React App requirements:
   ```
   npm install
   ```

4. Now run the command:
   ```
   npm start
   ```
   The frontend should now be running on `http://localhost:3000`
