import { Prisma } from '@prisma/client'
import { prisma } from './prisma.server'

const createEventAndEventDetails = (
  description: string,
  location: string,
  time: string,
  title: string,
  userId: string
) => {
  return Prisma.validator<Prisma.EventCreateInput>()({
    organizer: {
      connect: {
        id: userId,
      },
    },
    eventDetails: {
      create: {
        description: description,
        location: location,
        time: time,
        title: title,
      },
    },
  })
}

export const createEvent = async (userId: string, body: any) => {
  return await prisma.event.create({
    data: createEventAndEventDetails(
      body.description,
      body.location,
      body.time,
      body.title,
      userId
    ),
  })
}

export const getEvents = async () => {
  return await prisma.eventDetail.findMany({
    select: {
      description: true,
      time: true,
      title: true,
      event: {
        select: {
          organizer: {
            select: {
              profile: {
                select: {
                  firstName: true,
                  lastName: true,
                },
              },
            },
          },
        },
      },
    },
    // include: {
    //   event: true,
    // },
  })
}
