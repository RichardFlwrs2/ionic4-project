import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { OptionsInput } from "@fullcalendar/core";

export const calendarOptions: OptionsInput = {
  eventLimit: 4,
  views: {
    agenda: {
      eventLimit: 3 // adjust to 6 only for agendaWeek/agendaDay
    }
  },
  header: {
    left: "prev,next today",
    // center: "title",
    right: "title"
  },
  buttonText: {
    today: "Hoy",
    month: "Mes",
    week: "Semana",
    day: "Día"
  },
  height: "auto",
  locale: "es",
  timeZone: "America/Mexico_City",
  firstDay: 1,
  events: [],
  plugins: [dayGridPlugin, interactionPlugin]
};
