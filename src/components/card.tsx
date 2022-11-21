//@flow
import * as React from 'react'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  makeStyles,
  Typography,
} from '@material-ui/core'
import { generateDisplayableImage } from '../utils'

export type PlannedEvent = {
  age_group: string
  capacity: number
  category: string
  description: string
  dress_code: string
  event_id: number
  id: number
  location: string
  own_drinks: boolean
  time: string
  title: string
  photos: string[]
}

interface Props {
  event: PlannedEvent
}

const card = ({ event }: Props) => {
  return (
    <Card>
      <>
        <CardMedia
          component="img"
          height="140"
          image={generateDisplayableImage(event.photos?.[0])}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Lizard
          </Typography>
          <Typography variant="body2">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions>
      </>
    </Card>
  )
}

export default card
