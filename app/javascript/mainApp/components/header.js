import React from 'react'
import styled from 'react-emotion'
import { Link,NavLink } from 'react-router-dom'

import logoFile from '../assets/images/logo-small.png'

const Wrapper = styled('div')`
  height: 72px;
  background-color: #ffffff;
  padding: 0 98px;
  display: flex;
  position: relative;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1), 0 1px 0 0 rgb(185, 192, 222);
  @media (max-width: 1120px) {
    padding: 0 15px;
  }
`
const Logo = styled(Link)`
  display: block;
  width: 35px;
  height: 40px;
  margin-top: 17px;
  background-image: url(${logoFile});
  background-repeat: no-repeat;
  background-size: cover;
  border: none;
`

const Menu = styled('div')`
  height: 100%;
  margin-left: 140px;
  @media (max-width: 4000px) {
    margin-left: 20px;
  }
`
const MenuInner = styled('div')`
  width: auto;
  margin: 0 auto;
  text-align: center;
  height: 100%;
`
const MenuItem = styled('a')`
  font-size: 16px;
  letter-spacing: 0.5px;
  height: 100%;
  display: inline-block;
  margin-left: 40px;
  text-transform: uppercase;
  &:first-child {
    margin-left: 0;
  }
  > span {
    color: rgb(101, 101, 101);
    height: 100%;
    display: block;
    padding-top: 24px;
  }
  &:hover {
    > span {
      color: #1932F5;
    }
  }
  &.selected{
    > span {
      color: #1932F5;
    }
  }
`

class Header extends React.Component {

  constructor(props){
    super(props);
    this.state = {
    }
  }

  componentDidMount() {


  }

  render(){



    const menu = (
      <Menu>
        <MenuInner>
          <MenuItem href="https://app.deco.network">
            <span>Assets Market</span>
          </MenuItem>
          <MenuItem href="https://github.com/deconet/news">
            <span>GitHub</span>
          </MenuItem>
        </MenuInner>
      </Menu>
    )

    return (
      <Wrapper>
          <Logo to="/" />
          {menu}
      </Wrapper>
    )
  }
}

export default Header