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
  console.log(own_drinks)
  return (
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
                  {`${data.toDateString()} ${data.toLocaleTimeString()}`}
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
              <div>{`Own drinks are ${!own_drinks && 'not'} allowed.`}</div>
              <div>{`Dress Code: ${dress_code}`}</div>
            </div>
          </div>
        </div>
      </Box>
    </Modal>
  )
}

export default CardModal
