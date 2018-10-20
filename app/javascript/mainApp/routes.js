import React from 'react'
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'
import styled from 'react-emotion'

import JssProvider from 'react-jss/lib/JssProvider';
import { create } from 'jss';
import { createGenerateClassName, jssPreset } from '@material-ui/core/styles';

import Header from './components/header'
import Footer from './components/footer'

import LandingPage from './components/landingPage'

const generateClassName = createGenerateClassName();
const jss = create({
  ...jssPreset(),
  // We define a custom insertion point that JSS will look for injecting the styles in the DOM.
  insertionPoint: 'jss-insertion-point',
});

const Wrapper = styled('div')`
  height: 100%;
  display: flex;
  flex-direction: column;
`
const WithoutFooter = styled('div')`
  flex: 1 0 auto;
`
const Inner = styled('div')`
  max-width: 1024px;
  margin: 0 auto;
  margin-top: 5px;
  padding-bottom: 128px;
`

const Root = props => (
  <JssProvider jss={jss} generateClassName={generateClassName}>
    <Wrapper>
      <WithoutFooter>
        <Header {...props}/>
        <Inner>
          <LandingPage {...props}/>
        </Inner>
      </WithoutFooter>
      <Footer />
    </Wrapper>
  </JssProvider>
)

const App = (props) => (
  <Router>
    <div>
      <Route path='/:sorting?' component={Root} />
    </div>
  </Router>
)
export default App;