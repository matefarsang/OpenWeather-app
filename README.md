# OpenWeather application

Weather information

This app contains weather information for the following cities:

Budapest, Győr, Debrecen, Miskolc, Pécs, Sopron, Szeged and Gyékényes

We can choose from 2 languages, Hungarian & English.

The weather information is updated every 10 minutes.

The backend is written in typescript and uses express framework and Axios.
Requests are logged by winston.
MongoDB is used as the database with mongoose library.

The Frontend is written in ReactJs and uses Axios.

## The application is dockerized, so before running it, it needs to be installed.

# 🏃 Run Locally

Clone the project

git clone https://github.com/matefarsang/OpenWeather-app.git

Go to the project directory
as root, use the nvm use command for the corresponding node version

## Installation

cd packages/backend
npm install

Install dependencies

cd packages/frontend
npm install

Install dependencies

## Start the application

Go back to the project directory root

### docker-compose up

The application start on http://localhost:4001

# Enjoy : )

@matefarsang
