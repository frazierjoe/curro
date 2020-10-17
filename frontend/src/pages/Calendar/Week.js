import React from 'react';
import Day from './Day';

const daysInWeek = 7;
const Week = ({sunday, currentMonth}) => {
    // Generate all 7 days using the passed sunday
    let days = [];
    for (let i = 0; i < daysInWeek; i++) {
        let day = new Date(sunday);
        days.push(day);

        sunday.setDate(sunday.getDate() + 1);
    }
    
    days = days.map(dayDate => {
        return <Day currentMonth={currentMonth} dayDate={dayDate} key={"-day" + dayDate.toISOString()}/>
    });

    return (
        <tr>
            {days}
        </tr>
    );
}
 
export default Week;