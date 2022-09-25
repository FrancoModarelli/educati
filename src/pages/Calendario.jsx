import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import '../css/calendario.css'

const Calendar = () => {

    return (
        <div>
            <div className="header">
                <h1>Calendario</h1>
            </div>

            <FullCalendar
            plugins={[dayGridPlugin]}
            locale='es'
            firstDay={1}
            />
        </div>
        
    );
}

export default Calendar;