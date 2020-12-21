This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

[![Netlify Status](https://api.netlify.com/api/v1/badges/b24a1f1e-19c1-43aa-973d-75961888f47e/deploy-status)](https://app.netlify.com/sites/states-of-change/deploys)


## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify



## Local storage

* `nesta_progress` - is the current step in the process the user is on.

* `nesta_pro_skills`
* `nesta_con_skills`
* `nesta_pro_attitudes`
* `nesta_con_attitudes`


## Flow when not logged in

### Tool0Start
- sets `nesta_progress` to 0
- if called with restart sets `nesta_pro_skills`, `nesta_con_skills`, `nesta_pro_attitudes`, `nesta_con_attitudes` to empty

### Tool1StrongSkills

- set `nesta_progress` to 1
- create and set `nesta_pro_skills` to []
- select options and update `nesta_pro_skills` to `"[4,5,6,9,8]"`

### Tool2WeakSkills

- set `nesta_progress` to 2
- create and set `nesta_pro_skills` to []
- select options and update `nesta_pro_skills` to `"[4,5,6,9,8]"`
- uses `nesta_pro_skills` to hide ones already selected

### Tool3StrongAttitudes

- set `nesta_progress` to 3
- create and set `nesta_pro_attitudes` to []
- select options and update `nesta_pro_attitudes` to `"[4,5,6,9,8]"`

### Tool4WeakAttitudes

- set `nesta_progress` to 4
- create and set `nesta_con_attitudes` to []
- select options and update `nesta_con_attitudes` to `"[4,5,6,9,8]"`
- uses `nesta_pro_attitudes` to hide ones already selected

### Tool5SignUp

#### sign in
