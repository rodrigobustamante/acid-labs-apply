# Acid Labs Apply - Rodrigo Bustamante

## Table of Contents

1. [Introduction](#1-introduction)
2. [Containers and Projects](#2-containers-and-projects)
3. [Run the project](#3-run-the-project)

## 1. Introduction

This repository is my apply for Acid Labs. The repository is divided in two folders and three configurations files.

The objective of the configuratios file is the next:

- docker-compose.local.yml: Make containers to run the project on a local environment.
- docker-compose.prod.yml: Make containers to upload this containers to [Docker Hub](https://hub.docker.com).
- dockhero-compose.yml: Docker routine to upload the project to Dockhero [DockHero](https://dockhero.io).

## 2. Containers and Projects

### 2.1 Backend

Structure:

```markdown
├── api
│ └── index.js
├── services
│ ├── country_data.js
│ ├── geocode.js
│ └── weather.js
├── index.js
├── .dockerignore
├── package.json
└── Dockerfile (This file define the routine to build the 'server' container )
```

Inside of this project, we can found the index.js file. This file define the microservice initialization, the port to use (in this case, 8000), and it defines the endpoint where the microservice receive the request.

Inside the folder **services**, we can found the files where the microservices make the request to third parties services, the third parties services in use are:

- [Darksky](https://darksky.net/dev/docs) -> Weather of the selected country.
- [Rest Countries](https://restcountries.eu) -> Information of the selected country.
- [Google Maps Geocode](https://developers.google.com/maps/documentation/geocoding/start) -> It is used twice, to process the latitude and longitude sended by the client, the microservice save the country code (Chile = CL, Brasil = BR), and in a second instance to get the latitude and longitude from the country capital.

And finally, inside of the **api** folder, we can found an unic file, this file contains a method which process the client request and return the requested information.
This method has a 10% of error ()
Este método tiene un error de un 10% (developed voluntarily), if an error exists, the method must be called until that correctly returns what was requested.

### 2.2 Frontend

Structure and definition:

```markdown
├── public
│ └── images
│ └── icons (This folder contains the weather icons)
│ └── acidlabs.png (Image putted on the AppBar)
├── src
│ ├── components (This folder contains the components used on the project)
│ │ └── general (This folder contains the Layout component)
│ │ └── map (This folder contains the Modal and Map components)
│ │ └── api (This folder the actions and the state files for weather state)
│ ├── config (This folder contains the routes and store configuration file for Redux)
│ ├── constants (This folder contains the constants files, for example, the icons route)
│ ├── helpers (This folder contains the helpers for this project, unix date to human date, actual season and toFixed)
│ ├── views (This folder contains the Map View for the project)
│ ├── App.js (This file is the principal of the project, this contains the styles theme and the routes)
│ └── index.js (This file is the attendant for recive the redux state and render the jsx on html)
├── .dockerignore
├── package.json
└── Dockerfile (This file define the routine to build the 'client' container )
```

Inside of this folder, we can found a [ReactJS](https://reactjs.org/) project, initialized with [create-react-app](https://facebook.github.io/create-react-app/docs/getting-started).

The used libraries are:

- [Axios](https://github.com/axios/axios) -> Used to make HTTP request to the API.
- [Redux](https://redux.js.org/introduction/getting-started) -> Used to manage the state of the app.
- [Material-UI](http://material-ui.com) -> Used to make the UI components.
- [Google Map React](https://github.com/google-map-react/google-map-react) -> Used to the map creation.
- [Font Awesome](https://fontawesome.com/how-to-use/on-the-web/using-with/react) -> Used to put an icon on the map.

### 2.3 [Redis](https://redis.io/)

Redis is used to save some request in memory, with the objective of do not make extra requests.

### 2.4 [Traefik](https://traefik.io/)

Traefik is a load balancer and a reverse proxy, is used on this project with the objective of manage the request.

## 3 Run the project

### 3.1 Requisites

- Docker
- Docker Compose
- A Darksky API KEY
- A Google Maps API KEY

### 3.2 Installation guide

#### 3.2.1

Create an .env file (copy the structure of the .env.example file) and put your Google Maps and Darksky API KEY.

#### 3.2.2

Run the next command on your terminal, located on the root of the repository.

```bash
  docker-compose -f docker-compose.local.yml build
```

### 3.2.3

Run the next command on your terminal, located on the root of the repository.

```bash
  docker-compose -f docker-compose.local.yml up
```

Or

```bash
  docker-compose -f docker-compose.local.yml up -d
```

to run containers in the background.

### 3.2.4

In your browser, go to the next [link](http://frontend.acid.localhost)

Enjoy!
