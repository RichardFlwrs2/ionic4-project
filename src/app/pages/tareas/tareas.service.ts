import { Injectable } from "@angular/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

@Injectable({ providedIn: "root" })
export class TareasService {
  constructor() {
    // console.log("Init");
  }

  // ---------------------------------------------------------------------------------------------------------------- //
  // * ---| GET CALENDAR OPTIONS
  // ---------------------------------------------------------------------------------------------------------------- //
  getCalendarOptions(data: any[]) {
    //

    const initialLocale = "es";

    return {
      // editable: true,
      eventLimit: 2,
      views: {
        agenda: {
          eventLimit: 6 // adjust to 6 only for agendaWeek/agendaDay
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
      height: 500,
      aspectRatio: 1,
      handleWindowResize: true,
      locale: initialLocale,
      firstDay: 1,
      events: data,
      plugins: [dayGridPlugin, interactionPlugin]
    };

    //
  }
}
