# About

Our project is **CodeCraft**, the goal of which is to revolutionize Software Engineering with AI. We are developing a web application which utilises many different AI models, such as watsonx.ai, OpenAI and more to create a place for developers to perform code analysis, completion, generation and translation.

### Follow one of the methods below to download and run the application.
Note that this application is a work in progress and that private API Keys are required to run it. Please contact the developers if you need access to these keys.

# Method 1: Using Docker (Recommended)

## 1. Prerequisites

Before you begin, ensure you have the following:

- Docker Desktop running on your machine
- A command line terminal running on your machine
- Access to an internet connection
- A web browser running on your machine
- A `.env` file containing API Keys from the developers
- A file explorer running on your machine (optional)

## 2. Clone the Repository

- In your command line terminal, navigate to the directory in which you would like to clone the repository.
- Once inside your chosen directory, run `git clone https://github.com/TCD-SWENG-Group-18-2024/CodeCraft.git` on your terminal to clone the repository.
- Using your command line or your file explorer, place your `.env` file containing the API Keys in the `backend` folder of the cloned repository.

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
- npm (Node Package Manager)

## Getting Started

Follow these steps to get the application running on your local machine:

### Starting the Backend

1. Open your terminal.
2. Navigate to the flask-backend directory.
3. create virtual environment
   (Windows)
   ```
   python -m venv venv
   ```
   (Mac)
   ```
   python -m venv venv
   ```
  
4. make sure to activate virtual environment
   (Windows)
   ```
   venv\Scripts\activate
   ```
   (Mac)   
   ```
   source venv/bin/activate
   ```
5. install Flask App requirements
   (Windows)
   ```
   pip install -r requirements.txt
   ```
   (Mac)
   ```
   pip3 install flask
   ```
6. now run
   (Windows)
   ```
   python codecraft.py
   ```
   (Mac)
   ```
   python3 codecraft.py
   ```
   
   backend would be running on `http://localhost:5000`
   


### Starting the React frontend

1. Open your terminal
2. Make sure to navigate into the root directory of the frontend as follows:
```
cd …../-frontend
```
3. Install App requirements:
   ```
   npm install
   ```

4. Run the frontend on a local server using the following:
```
npm start
```
5. frontend should be running on `http://localhost:3000`