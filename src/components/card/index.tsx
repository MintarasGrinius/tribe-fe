//@flow
import * as React from 'react'
import { CardMedia, makeStyles } from '@material-ui/core'
import { generateDisplayableImage } from '../../utils'
import AccessTimeIcon from '@material-ui/icons/AccessTime'
import CardModal from './CardModal'

export type PlannedEvent = {
  age_group: {
    from: number
    to: number
  }
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

const useStyles = makeStyles({
  container: {
    cursor: 'pointer',
    margin: '2.5rem 0 1rem',
    width: '320px',
    height: '320px',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    backgroundColor: '#fff',
    padding: '0 1rem 1rem',
    borderRadius: '0.75rem',
    boxShadow:
      'rgb(0 0 0 / 10%) 0rem 0.25rem 0.375rem -0.0625rem, rgb(0 0 0 / 6%) 0rem 0.125rem 0.25rem -0.0625rem',
    overflow: 'visible',
    transition: 'all 0.5s',
    '& img': {
      transition: 'all 0.5s',
    },
    '&:hover': {
      transition: 'all 0.5s',
      boxShadow:
        'rgb(0 0 0 / 30%) 0rem 0.25rem 1.375rem -0.0625rem, rgb(0 0 0 / 6%) 0rem 0.125rem 0.25rem -0.0625rem',
      '& img': {
        width: '290px',
        bottom: '1.3rem',
        height: '210px',
        transition: 'all 0.5s',
      },
    },
  },
  media: {
    width: '280px',
    height: '200px',
    borderRadius: '0.5rem',
    margin: '0 auto',
    position: 'relative',
    bottom: '1.3rem',
    boxShadow:
      'rgb(0 0 0 / 14%) 0rem 0.25rem 1.25rem 0rem, rgb(0 187 212 / 40%) 0rem 0.4375rem 0.625rem -0.3125rem',
  },
  contentContainer: {
    padding: '0.5rem',
    marginTop: '-1.5rem',
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontSize: '1rem',
    fontWeight: 700,
    color: 'rgb(52, 71, 103)',
    marginBottom: '0.2rem',
  },
  subtitle: {
    fontSize: '0.875rem',
    lineHeight: '1.5',
    letterSpacing: '0.02857em',
    opacity: '1',
    textTransform: 'none',
    verticalAlign: 'unset',
    textDecoration: 'none',
    color: 'rgb(123, 128, 154)',
    fontWeight: 300,
  },
  time: {
    fontSize: '0.875rem',
    lineHeight: '1.5',
    letterSpacing: '0.02857em',
    opacity: '1',
    textTransform: 'none',
    verticalAlign: 'unset',
    textDecoration: 'none',
    color: 'rgb(123, 128, 154)',
    fontWeight: 300,
    marginTop: 'auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    fontSize: '14px',
    margin: '1.2px 4px 0px 0px',
  },
})

const EventCard = ({ event }: Props) => {
  const classes = useStyles()
  const data = new Date(event.time)
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <div onClick={() => setOpen(true)} className={classes.container}>
        <CardMedia
          classes={{ root: classes.media }}
          component="img"
          height="140"
          image={generateDisplayableImage(event.photos?.[0])}
          alt="green iguana"
        />
        <div className={classes.contentContainer}>
          <div className={classes.title}>{event.title}</div>
          <div className={classes.subtitle}>{event.description}</div>
          <div className={classes.time}>
            <div>
              <AccessTimeIcon classes={{ root: classes.icon }} />
              {data.toDateString()}
            </div>
            <div>{data.toLocaleTimeString()}</div>
          </div>
        </div>
      </div>
      <CardModal open={open} setOpen={setOpen} event={event} />
    </>
  )
}

export default EventCard
