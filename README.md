This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Demo

Demo link [here](https://marvel-8bdde.web.app/), hosted with firebase hosting

## Overview

This a react project with boostrap, Simple website where it fetches a list of marvel characters provide by the marvel API,
users can also search by characters name 

In the detail page user can edit the characters name and upload new image up to 1mb, all details are stored in local 
storage

note. I set a timeout of 1.5 seconds so i can see the thanos gauntlet animation


## Setup for development

rename  `.env-example` to `.env`  head over to [https://developer.marvel.com](https://developer.marvel.com) to obtain your API keys
replace the public and private keys inside `.env`

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
