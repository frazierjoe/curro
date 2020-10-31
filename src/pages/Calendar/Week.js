import React from 'react';
import Day from './Day';

const daysInWeek = 7;
const Week = ({firstDay, currentMonth, setView, postsInMonth}) => {
    // Linear Scan through all postsInMonth to see if it's within the week.
    // Todo: Not efficient. 
    let earliest = firstDay.getTime();
    let latest = new Date(firstDay.getDate() + 7);
    latest = latest.getTime();

    let postsInWeek = undefined;
    if (postsInMonth){
        postsInWeek = postsInMonth.filter(post => {
            let creationTime = parseInt(post.createdAt);
            return (creationTime < latest.getTime()) && (creationTime >= earliest.getTime());
        });
    }
    

    // Generate all 7 days using the passed sunday
    let days = [];
    for (let i = 0; i < daysInWeek; i++) {
        let day = new Date(firstDay);
        days.push(day);

        firstDay.setDate(firstDay.getDate() + 1);
    }
    
    days = days.map(dayDate => {
        return <Day currentMonth={currentMonth}
                    dayDate={dayDate}
                    setView={setView}
                    key={"-day" + dayDate.toISOString()}

                    postsInWeek={postsInWeek}
                />
    });

    return (
        <tr>
            {days}
        </tr>
    );
}
 
export default Week;