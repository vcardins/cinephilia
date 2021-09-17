# Instructions

During this assignment, you’ll have to create a React app. The purpose of the app is going to create a little search engine for movies. A user would like to use your app in order to find movies that have been released between two dates. The movies have to be ordered by rating.

_Note: The user can input a start date without an end date and vice and versa._

You’ll also need the documentation about the [Discover API](https://www.themoviedb.org/documentation/api/discover).

In order to call the API, you will need an API key. You can either create an account in the database or use this provided API key: ????

Your app should:

1. Be responsive
1. Contain interactive images (like zooming, or overlay)
1. The gallery should contain at least titles and ratings
1. Pagination

[Demo](https://cinephilia-tmdb.netlify.app/)

# Principles and Design Decisions

1. ❤️ The code organization followed my personal coding style
1. 🔥 The components were built with decoupling and separation of concerns in mind so, it'd be easy to customize and add new features
1. 🚀 The layout and the responsiveness was designed mostly using CSS Grid
1. 💪 All the code was built from scratch (avoided importing third party libs), based on my own experiences from previously developed apps (PS: The _useMountTransition_ hook was an exception).
1. 💅 The look and feel could be much improved but I considered out of the scope of this assignment


# Nices to have/To Do
1. Write unit tests using Jest/enzyme or react-testing-library
2. Write integration tests using Cypress
3. Improve user experience with pre-loaders when loading data and images
4. ...

# Setup

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
