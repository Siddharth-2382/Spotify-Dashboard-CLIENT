# Spotify Dashboard Client

Spotify Dashboard CLIENT is a React-based client-side application that provides a user dashboard experience for Spotify. It allows users to explore their top tracks, artists, playlists, and more, with features inspired by the official Spotify web application.

This application relies on a backend server for fetching data from the Spotify API. The backend server is expected to be running at the URI specified in the `.env` file.

## Features

- View your top tracks, artists, and playlists on Spotify.
- Search for tracks, artists, and playlists.
- Discover new releases and browse different genres.
- View tracks, artists and playlists with details.
- And more...

## Prerequisites

Before running the Spotify Dashboard CLIENT, ensure that you need to set up and run the backend server for fetching data from the Spotify API. For information on how to setup a local server, go to:
[Spotify-Dashboard-SERVER](https://github.com/Siddharth-2382/Spotify-Dashboard-SERVER#readme)

## Installation

1. Clone the repository:

        git clone https://github.com/Siddharth-2382/Spotify-Dashboard-CLIENT.git
2. Navigate to the project directory:

        cd Spotify-Dashboard-CLIENT
3. Install the dependencies:

        npm install

## Configuration

The Spotify Dashboard CLIENT requires a backend server to fetch data from the Spotify API. To configure the backend URI, create a `.env` file in the project root directory and add the following line:

        REACT_APP_BACKEND_URI=http://localhost:8888/

Replace `http://localhost:8888/` with the actual URI of your backend server.

## Running the Application
To start the application, use the following command:

        npm start

This will start the development server and launch the application in your default web browser. The application should automatically reload if you make any changes to the source code.

## Mockup

![Spotify Metrics](https://github.com/Siddharth-2382/Spotify-Dashboard-CLIENT/assets/94699055/8b3db128-ba11-43bf-9b66-e2b71518d681)
