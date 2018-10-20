import React from 'react'
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'
import styled from 'react-emotion'

import Header from './components/header'
import Footer from './components/footer'

import LandingPage from './components/landingPage'



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
  <Wrapper>
    <WithoutFooter>
      <Header {...props}/>
      <Inner>
        <LandingPage {...props}/>
      </Inner>
    </WithoutFooter>
    <Footer />
  </Wrapper>
)

const App = (props) => (
  <Router>
    <div>
      <Route path='/:sorting?' component={Root} />
    </div>
  </Router>
)
export default App;