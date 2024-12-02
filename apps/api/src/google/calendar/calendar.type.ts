export type createCalendarInput = {
  calendar_calendar_summary: string;
  calendar_calendar_location: string;
  calendar_calendar_description: string;
  calendar_calendar_timezone: string;
};

export type createEventInput = {
  calendar_event_calendar_id: string;
  calendar_event_summary: string;
  calendar_event_location: string;
  calendar_event_description: string;
  calendar_event_end_date_time: string;
  calendar_event_timezone: string;
  calendar_event_start_date_time: string;
};
