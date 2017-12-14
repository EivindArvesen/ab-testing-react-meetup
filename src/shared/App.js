import React from 'react';
import PropTypes from 'prop-types';
import { Experiment, Variant } from 'react-ab-test';

import {
  Route,
  Switch,
  Link
} from 'react-router-dom';

import logo from './logo.svg';

const Header = () => (
  <div className="App-header">
    <img src={logo} className="App-logo" alt="logo" />
    <h2>Welcome to Universal React</h2>
  </div>
)

export const PageNotFound = (props, context = {}) => {
  if (context.setStatus) {
    context.setStatus(404)
  }

  return (
    <div>
      <h1>
        Page not found
      </h1>
      <Link to="/">
        Go home
      </Link>
    </div>
  )
}
PageNotFound.contextTypes = {
  setStatus: PropTypes.func.isRequired
}

const TestRouterPage = ({ match }) => (
  <div className="App-intro">
    <p>
      Test page {match.params.id}
    </p>
    <p>
    <Link to={`/`}>
      Home
    </Link>
    </p>
    <p>
      <Link to={`/aljlskaklksdkfaj falsflasd`}>
        Go to non-existent page
      </Link>
    </p>
  </div>
)

const isClient = typeof window !== 'undefined';
const variant = isClient ? localStorage.getItem(`PUSHTELL-Comment Link`) : '';

const Home = () => (
  <div className="App-intro">
    <p>Welcome to the homepage.</p>
    <p>You have been assigned test-variation <code>{variant}</code>.</p>
    <p>The test variation above is set dynamically</p>
    <Experiment name="Comment Link">
      <Variant name="Original">
        <h1>This is static content for Original</h1>
      </Variant>
      <Variant name="A">
        <h1>This is static content for A</h1>
      </Variant>
      <Variant name="B">
        <h1>This is static content for B</h1>
      </Variant>
    </Experiment>
  </div>
)

const App = () => (
  <div className="App">
    <Route path="/" component={ ({ match }) => (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/test/:id" component={TestRouterPage}/>
          <Route component={PageNotFound}/>
        </Switch>
      </div>
    )}/>
  </div>
)

export default App
