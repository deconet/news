import { apiGet } from '../utils/api'
import { HOST } from '../../settings'

import React from 'react';
import styled, { css } from 'react-emotion'

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

const Root = styled('div')`
  max-width: 1024px;
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
`

class LandingPage extends React.Component {

  state = {
    stories: null
  }

  componentWillMount () {
    if (this.state.stories === null) {
      this.getStories()
    }
  }

  getStories () {
    return apiGet({
      url: HOST+'/v0/stories',
      callback: (data) => {
        this.setState({
          stories: data.stories
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
      return (<CircularProgress/>)
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
            <StorySource color="textSecondary">
              {s.story_source.name}
            </StorySource>
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
              </a>
              <br />
              By {s.author} at {new Date(s.story_time).toLocaleString()}
            </Typography>
          </CardContent>
        </StoryCard>
      )
    })
  }


  render () {
    return(
      <Root>
        {this.renderStories()}
      </Root>
    )
  }
}
export default LandingPage