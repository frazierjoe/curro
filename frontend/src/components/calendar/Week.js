import React from 'react';
import Day from './Day';

const daysInWeek = 7;
const Week = ({sunday}) => {
    // Generate all 7 days using the passed sunday
    let days = [];
    for (let i = 0; i < daysInWeek; i++) {
        let day = new Date(sunday);
        days.push(day);

        sunday.setDate(sunday.getDate() + 1);
    }
    
    days = days.map(date => {
        return <Day date={date} key={"-day" + date.toISOString()}/>
    });

    return (
        <tr>
            {days}
        </tr>
    );
}
 
export default Week;