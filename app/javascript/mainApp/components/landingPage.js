import { apiGet } from '../utils/api'
import { HOST } from '../../settings'

import React from 'react';
import styled, { css } from 'react-emotion'
import InfiniteScroll from 'react-infinite-scroll-component';

import JssProvider from 'react-jss/lib/JssProvider';
import { create } from 'jss';
import { createGenerateClassName, jssPreset } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

const generateClassName = createGenerateClassName();
const jss = create({
  ...jssPreset(),
  // We define a custom insertion point that JSS will look for injecting the styles in the DOM.
  insertionPoint: 'jss-insertion-point',
});


const Root = styled('div')`
  max-width: 1024px;
  margin-left: 10px;
  margin-right: 10px;
  text-align: center;
`

const StoryCard = styled(Card)`
  min-width: 275px;
  margin-top: 20px;
`

const StorySource = styled(Typography)`
  margin-bottom: 16px;
  font-size: 14px;
`

const StoryUrl = styled(Typography)`
  margin-bottom: 12px;
  overflow-wrap: break-word;
`

class LandingPage extends React.Component {

  state = {
    stories: null,
    storyPage: 0,
    hasMore: true
  }

  componentWillMount () {
    if (this.state.stories === null) {
      this.getStories(0)
    }
  }

  getStories (page) {
    return apiGet({
      url: HOST+'/v0/stories?page='+page,
      callback: (data) => {

        // out of stuff
        if (data.stories.length == 0) {
          this.setState({hasMore: false})
          return
        }

        this.setState(prevState => {
          return {
            stories: prevState.stories === null ? data.stories : [...prevState.stories, ...data.stories],
            storyPage: page + 1
          }
        })
      },
      error: (err) => {
        console.log(err)
        alert(JSON.stringify(err));
      }
    })
  }

  renderStories () {
    if (this.state.stories === null) {
      return null;
    }

    /* Example of a story
      {
        "id": "b0620bb6-2e14-4bf4-b411-d8696e0da9e2",
        "story_source_id": "68172317-8249-4c8f-8b69-b87dc05f37ea",
        "title": "The bane of my existence right here. Marquees ought to be illegal.",
        "url": "https://i.redd.it/6rg25g0w09s11.png",
        "comment_count": 21,
        "score": 219,
        "id_at_source": "9o8577",
        "story_time": "2018-10-15T01:03:50.000Z",
        "created_at": "2018-10-15T08:12:36.488Z",
        "updated_at": "2018-10-15T08:12:36.488Z",
        "story_source_category_id": "7745b82b-e2f0-4339-9238-319604c550ee",
        "author": "scotscott",
        "story_source": {
          "id": "68172317-8249-4c8f-8b69-b87dc05f37ea",
          "name": "reddit",
          "homepage_url": "https://reddit.com",
          "created_at": "2018-10-11T08:58:47.144Z",
          "updated_at": "2018-10-11T08:58:47.144Z"
        }
      }
    */
    return this.state.stories.map(s => {
      // console.log(JSON.stringify(s))
      return (
        <StoryCard key={'story_'+s.id}>
          <CardContent>
            {/*<StorySource color="textSecondary">
              {s.story_source.name}
            </StorySource>*/}
            <Typography variant="h5">
              <a href={s.url}>
                {s.title}
              </a>
            </Typography>
            <StoryUrl color="textSecondary">
              <a href={s.url}>
                {s.url}
              </a>
            </StoryUrl>
            <Typography component="p">
              {s.comment_count} <a href={s.comments_url}>
                Comments
              </a> on {s.story_source.display_name} {
                s.story_source_category === null ? null : `/r/${s.story_source_category.name}`
              }
              <br />
              By {s.author} at {new Date(s.story_time).toLocaleString()}
            </Typography>
          </CardContent>
        </StoryCard>
      )
    })
  }


  render () {
    const { stories, storyPage, hasMore } = this.state;

    return(
      <JssProvider jss={jss} generateClassName={generateClassName}>
        <Root>
          <InfiniteScroll
          dataLength={stories === null ? 0 : stories.length} //This is important field to render the next data
          next={() => this.getStories(storyPage)}
          hasMore={hasMore}
          loader={<CircularProgress style={{marginTop: 40}}/>}
          endMessage={
            <p style={{textAlign: 'center'}}>
              <b>Yay! You have seen all the stories!</b>
            </p>
          }
          >
            {this.renderStories()}
          </InfiniteScroll>
        </Root>
      </JssProvider>
    )
  }
}
export default LandingPage