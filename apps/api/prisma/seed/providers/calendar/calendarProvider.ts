import { prisma } from '../../../seed'
import { createEventAction, createCalendarAction } from './calendarActions'

export async function createCalendarProvider() {
  const provider = await prisma.provider.create({
    data: {
      name: 'Calendar',
      description: 'Create a new calendar or events in Google Calendar.',
      logo: 'calendar-logo',
    },
  })
  // Action
  await createEventAction(provider.id)
  await createCalendarAction(provider.id)
}
