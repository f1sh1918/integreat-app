import 'babel-polyfill'
import 'whatwg-fetch'

import React from 'react'
import ReactDOM from 'react-dom'
import createBrowserHistory from 'history/createBrowserHistory'
import { Provider } from 'react-redux'
import { I18nextProvider } from 'react-i18next'

// Pages
import LandingPage from './routes/LandingPage'
import LocationPage from './routes/LocationPage'
import SearchPage from './routes/SearchPage'
import ErrorPage from './routes/ErrorPage'
import DisclaimerPage from './routes/DisclaimerPage'

// Local imports
import store from './store'
import i18n from './i18n/i18n'
import { Fragment, initializeCurrentLocation } from 'redux-little-router'

/**
 * Holds the current history implementation
 */
export const history = createBrowserHistory()

const initialLocation = store.getState().router

if (initialLocation) {
  store.dispatch(initializeCurrentLocation(initialLocation))
}

/**
 * The root component of our app
 */
let App = (
  <I18nextProvider i18n={i18n}>
    <Provider store={store}>
      <Fragment forRoute="/">
        <div>
          <Fragment forRoute="/"><LandingPage/></Fragment>
          <Fragment forRoute="/:language/landing"><LandingPage/></Fragment>
          <Fragment forRoute="/:language/:location/location(/*)"><LocationPage/></Fragment>
          <Fragment forRoute="/:language/:location/search"><SearchPage/></Fragment>
          <Fragment forRoute="/:language/:location/disclaimer"><DisclaimerPage/></Fragment>
          <Fragment forNoMatch><ErrorPage/></Fragment>
        </div>
      </Fragment>
    </Provider>
  </I18nextProvider>
)

const container = document.getElementById('container')

ReactDOM.render(App, container)

// Sets the splash to hidden when the page is rendered
document.getElementById('splash').className += ' splash-hidden'

// Enables hot-module-reloading if it's enabled
if (module.hot) {
  module.hot.accept()
}
