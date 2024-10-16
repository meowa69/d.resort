import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';


const CalendarView = () => {
    const { type } = useParams(); 
    const [events, setEvents] = useState([]);
    const navigate = useNavigate(); 

    const handleGoBack = () => {
        navigate(-1); 
    };

    const handleBookNow = (eventId) => {
        // Implement booking logic here based on eventId
        console.log(`Booking for event ID: ${eventId}`);
    };

    const generateEvents = () => {
        const currentDate = new Date();
        const eventsArray = [];

        
        for (let i = 0; i < 365 * 10; i++) { 
            const eventDate = new Date(currentDate);
            eventDate.setDate(currentDate.getDate() + i); 
            
            eventsArray.push({
                id: `event-${eventDate.toISOString().split('T')[0]}`,
                date: eventDate.toISOString().split('T')[0],
                backgroundColor: 'transparent', 
                borderColor: 'transparent', 
            });
        }

        return eventsArray;
    };

    useEffect(() => {
        const upcomingEvents = generateEvents();
        setEvents(upcomingEvents);
    }, []);

    return (
        <div className="flex-row">
            <button 
                onClick={handleGoBack} 
                className="absolute top-4 left-5"
            >
                <img src="/src/assets/back.png" alt="" className="w-8 h-8"/>
            </button>
            <div className="flex flex-col h-screen p-16">
                <h2 className="text-2xl font-semibold mb-4">Events for {type}</h2>
                <div className="flex-grow overflow-hidden"> 
                    <FullCalendar
                        plugins={[dayGridPlugin]}
                        initialView="dayGridMonth"
                        events={events}
                        headerToolbar={{
                            right: 'prev,next today',
                        }}
                        height="100%"
                        eventContent={(eventInfo) => (
                            
                            <div className="event-content flex justify-end">
                                <div>{eventInfo.event.title}</div>
                                <button 
                                    className="relative top-9 right-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md self-end"
                                    onClick={() => handleBookNow(eventInfo.event.id)}
                                >
                                    Book Now
                                </button>
                            </div>
                        )}
                    />
                </div>
            </div>
        </div>
    );
};

export default CalendarView;
