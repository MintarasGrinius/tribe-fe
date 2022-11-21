import Layout from '@/components/layout'
import GeneralLayout from '@/components/layout/general-layout'
import { UserContext } from '@/components/user'
import { authHeaders, backURL } from '@/components/user/env'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  makeStyles,
  Typography,
} from '@material-ui/core'
import axios from 'axios'
import React, { useContext, useEffect } from 'react'

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

const useStyles = makeStyles({
  container: {
    padding: '5rem',
  },
})
const Dashboard = () => {
  const classes = useStyles()
  const user = useContext(UserContext)
  console.log('Dashboard user', user)

  const getEvents = async (): Promise<void> => {
    const authHeader = await authHeaders()

    axios
      .get(backURL('api/v1/events'), {
        headers: { ...authHeader },
      })
      .then(({ data }) => console.log(data))
  }

  useEffect(() => {
    getEvents()
  }, [])

  return (
    <Layout description={'Descriptions page'} title={'Descriptions'}>
      <div className={classes.container}>
        <Card>
          <CardMedia
            component="img"
            height="140"
            image="/static/images/cards/contemplative-reptile.jpg"
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Lizard
            </Typography>
            <Typography variant="body2">
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Share</Button>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      </div>
    </Layout>
  )
}

export default Dashboard
