import Layout from '@/components/layout'
import { UserContext } from '@/components/user'
import { authHeaders, backURL } from '@/components/user/env'
import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import DashboardIcon from '@material-ui/icons/Dashboard'
import { makeStyles } from '@material-ui/core'
import Sidebar from '@/components/sidebar'
import EventCard, { PlannedEvent } from '@/components/card'

const useStyles = makeStyles({
  container: {
    height: '100vh',
    width: '100vw',
    padding: '1rem',
    display: 'flex',
    backgroundColor: 'rgb(240, 242, 245)',
  },
  sidebar: {
    height: '100%',
    width: '250px',
    background: 'linear-gradient(195deg, rgb(66, 66, 74), rgb(25, 25, 25))',
    boxShadow: 'rgb(0 0 0 / 50%) 0rem 0 1.6875rem 0rem',
    borderRadius: '12px',
  },
  head: {
    padding: '24px 32px 10px',
    textAlign: 'center',
    opacity: '1',
    background: 'transparent',
    boxShadow: 'none',
    fontSize: '20px',
    color: 'white',
    borderBottom: '1px solid rgb(255, 255, 255, 0.1)',
  },
  menu: {
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
    '& a': {
      padding: '0.8rem 1rem',
      display: 'flex',
      gap: '1rem',
      alignItems: 'center',
      color: '#fff',
      borderRadius: '0.375rem',
      transition:
        'box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, background-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    },
    '& a:hover': {
      background: 'rgb(255, 255, 255, 0.1)',
    },
    '& a.active': {
      background:
        'linear-gradient(195deg, rgb(73, 163, 241), rgb(26, 115, 232))',
      boxShadow:
        'rgb(0 0 0 / 10%) 0rem 0.25rem 0.375rem -0.0625rem, rgb(0 0 0 / 6%) 0rem 0.125rem 0.25rem -0.0625rem',
    },
  },
  innerContainer: {
    paddingLeft: '1rem',
    flex: 1,
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0 1.5rem',
    overflow: 'auto',
    marginBottom: '-1rem',
    margin: '-1rem 0',
  },
})

const Dashboard = () => {
  const classes = useStyles()
  const user = useContext(UserContext)
  const [events, setEvents] = React.useState<PlannedEvent[]>([])

  const applyToAttend = async (eventId) => {
    const auth = await authHeaders()
    await axios
      .post(
        backURL(`api/v1/events/${eventId}/like`),
        {},
        {
          headers: { ...auth },
        }
      )
      .then((response) => {
        getEvents()
        console.log(response)
      })
      .catch((error) => console.log(error))
  }

  const dislike = async (eventId) => {
    const auth = await authHeaders()
    await axios
      .post(
        backURL(`api/v1/events/${eventId}/dislike`),
        {},
        {
          headers: { ...auth },
        }
      )
      .then((response) => {
        getEvents()
        console.log(response)
      })
      .catch((error) => console.log(error))
  }

  const getEvents = async (): Promise<void> => {
    console.log('getting events')
    const authHeader = await authHeaders()

    axios
      .get(backURL('api/v1/events'), {
        headers: { ...authHeader },
      })
      .then(({ data }) => {
        console.log(data)
        setEvents(data)
      })
  }

  useEffect(() => {
    getEvents()
  }, [])

  return (
    <Layout description={'Descriptions page'} title={'Descriptions'}>
      <div className={classes.container}>
        <Sidebar />
        <div className={classes.innerContainer}>
          {events.map((a) => (
            <EventCard
              applyToAttend={() => applyToAttend(a.event_id)}
              dislike={() => dislike(a.event_id)}
              event={a}
            />
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default Dashboard
