//@flow
import * as React from 'react'
import { Box, Icon, makeStyles, Modal } from '@material-ui/core'
import { generateDisplayableImage } from '../../utils'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper'
import { PlannedEvent } from './index'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import LocationOn from '@material-ui/icons/LocationOn'
import AccessTime from '@material-ui/icons/AccessTime'
import Close from '@material-ui/icons/Close'
import { authHeaders, backURL } from '../user/env'
import axios from 'axios'

interface Props {
  event: PlannedEvent
  open: boolean
  setOpen: (open: boolean) => void
}

const useStyles = makeStyles({
  modalBax: {
    overflow: 'hidden',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
    height: '60%',
    backgroundColor: 'rgb(18, 18, 18)',
    boxShadow:
      'rgb(0 0 0 / 20%) 0px 11px 15px -7px, rgb(0 0 0 / 14%) 0px 24px 38px 3px, rgb(0 0 0 / 12%) 0px 9px 46px 8px',
    color: '#fff',
    borderRadius: '12px',
    '& div.swiper-button-prev, div.swiper-button-next': {
      '&::before': {
        background: 'none',
      },
      '&::after': {
        fontSize: '2rem',
        color: '#fff',
      },
    },
  },
  imageContainer: {
    height: '50%',
    position: 'relative',
    minHeight: '250px',
  },
  contentContainer: {
    padding: '32px',
    height: '230px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: 700,
    color: 'rgb(52, 71, 103)',
    marginBottom: '0.2rem',
  },
  titleContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  description: {
    color: 'rgb(52, 71, 103)',
    marginBottom: '1rem',
  },
  age: {
    fontSize: '0.875rem',
  },
  doubleDetailsContainer: {
    display: 'flex',
    fontSize: '0.875rem',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationAndTimeContainer: {
    fontSize: '0.875rem',
    '& > div': {
      display: 'flex',
      alignItems: 'center',
    },
  },
  bottomDescription: {
    // display: 'contents',
  },
  time: {
    marginLeft: '0.5rem',
  },
  apply: {
    border: 'none',
    background: 'linear-gradient(195deg, rgb(236, 64, 122), rgb(216, 27, 96))',
    color: 'rgb(255, 255, 255)',
    borderRadius: '0.75rem',
    boxShadow:
      'rgb(0 0 0 / 14%) 0rem 0.25rem 1.25rem 0rem, rgb(233 30 98 / 40%) 0rem 0.4375rem 0.625rem -0.3125rem',
    position: 'absolute',
    width: 'max-content',
    zIndex: 10000,
    padding: '0.5rem 1rem',
    top: '50%',
    left: '50%',
    transform: 'translate(calc(-50% + 170px), calc(-50% + 240px))',
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
      boxShadow:
        'rgb(0 0 0 / 14%) 0rem 0.25rem 1.25rem 0rem, rgb(233 30 98 / 60%) 0rem 0.4375rem 1rem -0.3125rem',
      padding: '0.52rem 1.02rem',
      fontSize: '1.02rem',
      transition: 'all 0.2s ease-in-out',
    },
  },
})

const CardModal = ({
  event: {
    age_group,
    capacity,
    category,
    description,
    dress_code,
    event_id,
    id,
    liked,
    location,
    own_drinks,
    time,
    title,
    photos,
  },
  open,
  setOpen,
}: Props) => {
  const classes = useStyles()
  const data = new Date(time)

  const swipeRight = async (index: number) => {
    const auth = await authHeaders()
    console.log('right', auth)
    await axios
      .post(
        backURL(`api/v1/events/${index}/like`),
        {},
        {
          headers: { ...auth },
        }
      )
      .then((response) => {
        console.log(response)
      })
      .catch((error) => console.log(error))
  }

  return (
    <>
      {open && !liked && (
        <button onClick={() => swipeRight(event_id)} className={classes.apply}>
          {'I wish to attend this event!'}
        </button>
      )}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={classes.modalBax}>
          <Swiper
            spaceBetween={50}
            slidesPerView={1}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
            modules={[Navigation]}
            navigation
            pagination={{ clickable: true }}
          >
            {photos?.map((photo) => (
              <SwiperSlide className={classes.imageContainer}>
                <Image
                  src={generateDisplayableImage(photo)}
                  layout="fill"
                  objectFit="cover"
                  objectPosition={'center'}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className={classes.contentContainer}>
            <div>
              <div className={classes.titleContainer}>
                <div className={classes.title}>{title}</div>
                <div className={classes.locationAndTimeContainer}>
                  <div>
                    <LocationOn fontSize={'inherit'} /> {location}
                  </div>
                  <div>
                    <AccessTime fontSize={'inherit'} />
                    {data.toDateString()}
                    <div className={classes.time}>
                      {data.toLocaleTimeString().slice(0, 5)}
                    </div>
                  </div>
                </div>
              </div>
              <div className={classes.description}>{description}</div>
            </div>
            <div className={classes.bottomDescription}>
              <div className={classes.doubleDetailsContainer}>
                <div className={classes.age}>
                  {`Age allowed from ${age_group.from} to ${age_group.to}`}
                </div>
                <div>{`Capacity: ${capacity}`}</div>
              </div>
              <div className={classes.doubleDetailsContainer}>
                <div>{`Party category: ${category}`}</div>
                <div>{`Own drinks are ${
                  own_drinks ? '' : 'not'
                } allowed.`}</div>
                <div>{`Dress Code: ${dress_code}`}</div>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  )
}

export default CardModal
