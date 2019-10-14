import React from 'react'
import styled from 'react-emotion'
import { Link,NavLink } from 'react-router-dom'

import MaterialMenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';


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
  @media (max-width: 400px) {
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

const SortingBlock = styled('div')`
  margin-left: auto;
  cursor: pointer;
  display: flex;
  > div {
    > div {
      display: flex;
    }
  }
`

class Header extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      sorting: 'score'
    }
  }

  componentDidMount() {
    const { match } = this.props;
    const { params } = match;
    if (params.sorting) {
      this.setState({sorting: params.sorting})
    }
  }

  handleSortChange(event) {
    const sorting = event.target.value
    this.setState({
      sorting
    })
    this.props.history.push(`/${sorting}`)
  }

  render(){



    const menu = (
      <Menu>
        <MenuInner>
          <MenuItem href="https://github.com/deconet/news">
            <span>GitHub Repo</span>
          </MenuItem>
        </MenuInner>
      </Menu>
    )

    return (
      <Wrapper>
          <Logo to="/" />
          {menu}
          <SortingBlock>
            <FormControl style={{marginTop: 10}}>
              <InputLabel htmlFor="sorting">Sort</InputLabel>
              <Select
                value={this.state.sorting}
                onChange={this.handleSortChange.bind(this)}
                inputProps={{
                  name: 'sorting',
                  id: 'sorting',
                }}
              >
                <MaterialMenuItem value='score'>Score</MaterialMenuItem>
                <MaterialMenuItem value='comment_count'>Comments</MaterialMenuItem>
                <MaterialMenuItem value='story_time'>Time</MaterialMenuItem>
              </Select>
            </FormControl>
          </SortingBlock>
      </Wrapper>
    )
  }
}

export default Header