# Introduction

Dialob is an open source platform developed to provide easy way to create, test and manage online dialogs that can be used on any online channel.

Dialob consists of following main modules:
* **Dialob Composer** that is a tool for subject matter experts, SMEs, to create and test online dialogs. Dialob Composer is available as a cloud service.
* **Dialob Manager** that is a backend service that is integrated to given online channel(s) and executes the dialog defined by Dialob Composer

This documentation provides information how a Dialob Manager can be integrated to a given online channel. Go [Dialob](www.dialob.io) to see some live examples.

# This repository

This repository is a reference implementation for Dialob Client UI.
Technical documentation about APIs and protocols is available [here](https://dialob.github.io/).

## Installation

- Running `npm install` in the components's root directory will install everything you need for development.

## Demo Development Server

- `npm start` will run a development server with the component's demo app at [http://localhost:3000](http://localhost:3000) with hot module reloading.

## Running Tests

- `npm test` will run the tests once.

- `npm run test:coverage` will run the tests and produce a coverage report in `coverage/`.

- `npm run test:watch` will run the tests on every change.

## Building

- `npm run build` will build the component for publishing to npm and also bundle the demo app.

- `npm run clean` will delete built resources.
