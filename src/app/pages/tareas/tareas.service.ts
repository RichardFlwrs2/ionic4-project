import { Injectable } from "@angular/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { OptionsInput } from "@fullcalendar/core";

@Injectable({ providedIn: "root" })
export class TareasService {
  constructor() {
    // console.log("Init");
  }

  // ---------------------------------------------------------------------------------------------------------------- //
  // * ---| GET CALENDAR OPTIONS
  // ---------------------------------------------------------------------------------------------------------------- //
  getCalendarOptions(data: any[]): OptionsInput {
    //

    const initialLocale = "es";

    return {
      // editable: true,
      eventLimit: 2,
      views: {
        agenda: {
          eventLimit: 3 // adjust to 6 only for agendaWeek/agendaDay
        }
      },
      header: {
        left: "prev,next today",
        center: "title",
        right: "month,agendaWeek,agendaDay"
      },
      buttonText: {
        today: "hoy",
        month: "mes",
        week: "semana",
        day: "día"
      },
      height: "auto",
      locale: initialLocale,
      timeZone: "America/Mexico_City",
      firstDay: 1,
      events: [],
      plugins: [dayGridPlugin, interactionPlugin]
      // handleWindowResize: true,
    };

    //
  }
}
