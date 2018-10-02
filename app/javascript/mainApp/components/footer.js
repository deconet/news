import React from 'react'
import styled from 'react-emotion'
import { Link } from 'react-router-dom'

import logoFile from '../assets/images/logo-full-opacity.png'

const Wrapper = styled('div')`
  height: 80px;
  background-color: #ffffff;
  display: flex;
  flex-shrink: 0;
  box-shadow: 0 -1px 0 0 rgb(185, 192, 222);
`
const Logo = styled(Link)`
  display: block;
  background-image: url(${logoFile});
  background-repeat: no-repeat;
  background-size: cover;
  width: 113px;
    height: 26px;
    border: none;
    margin-top: 30px;
    margin-left: 80px;
`
const Copyright = styled('div')`
  margin-top: 31px;
  margin-left: auto;
  font-size: 14px;
    color: rgba(49, 49, 49,0.65);
    margin-right: 80px;
`

class Footer extends React.Component {

  render(){
    return (
      <Wrapper>
        <Logo to="/" />
        <Copyright>© 2018 Deconet. All rights reserved</Copyright>
      </Wrapper>
    )
  }

}

export default Footer