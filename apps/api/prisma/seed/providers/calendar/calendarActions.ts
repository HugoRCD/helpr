import { prisma } from "../../../seed";

export async function createEventAction(providerId: number) {
  return await prisma.action.create({
    data: {
      title: "Create Event",
      description: "Create an event in Google Calendar",
      endpoint: "calendar",
      name: "create-event",
      providerId: providerId,
      variables: {
        create: [
          {
            title: "Create event calendar ID",
            key: "calendar_event_calendar_id",
            value: "{calendar_event_calendar_id}",
            type: "select",
            required: true,
          },
          {
            title: "Create event summary",
            key: "calendar_event_summary",
            value: "{calendar_event_summary}",
            required: false,
          },
          {
            title: "Create event location",
            key: "calendar_event_location",
            value: "{calendar_event_location}",
            required: false,
          },
          {
            title: "Create event description",
            key: "calendar_event_description",
            value: "{calendar_event_description}",
            type: "textarea",
            required: false,
          },
          {
            title: "Create event end date time",
            key: "calendar_event_end_date_time",
            value: "{calendar_event_end_date_time}",
            type: "date",
            required: true,
          },
          {
            title: "Create event time zone",
            key: "calendar_event_timezone",
            value: "{calendar_event_timezone}",
            type: "date",
            required: true,
          },
          {
            title: "Create event start date time",
            key: "calendar_event_start_date_time",
            value: "{calendar_event_start_date_time}",
            type: "date",
            required: true,
          },
        ],
      },
    },
  });
}

export async function createCalendarAction(providerId: number) {
  return await prisma.action.create({
    data: {
      title: "Create Calendar",
      description: "Create a new calendar in Google Calendar",
      endpoint: "calendar",
      name: "create-calendar",
      providerId: providerId,
      variables: {
        create: [
          {
            title: "Create calendar summary",
            key: "calendar_calendar_summary",
            value: "{calendar_calendar_summary}",
            required: true,
          },
          {
            title: "Create calendar location",
            key: "calendar_calendar_location",
            value: "{calendar_calendar_location}",
            required: false,
          },
          {
            title: "Create calendar description",
            key: "calendar_calendar_description",
            value: "{calendar_calendar_description}",
            type: "textarea",
            required: false,
          },
          {
            title: "Create calendar time Zone",
            key: "calendar_calendar_timezone",
            value: "{calendar_calendar_timezone}",
            required: false,
            type: "date",
          },
        ],
      },
    },
  });
}
