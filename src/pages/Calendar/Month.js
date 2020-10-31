import React from 'react';
import Week from './Week';

const weeksToDisplay = 6;

const Month = ({ postList, date, setView, firstDayOfWeek }) => {
    const generateWeekComponents = () => {
        // Get the first day of the month and get the first Sunday of that week.
        let dayOne = new Date(date.getFullYear(), date.getMonth());
        let firstSunday = new Date(dayOne);
        firstSunday.setDate(-1 * dayOne.getDay() + 1);

        // Generate the first days of 6 weeks. It will be either all Sundays/Mondays
        let firstDays = [];
        for (let i = 0; i < (weeksToDisplay); i++) {
            let item = new Date(firstSunday);

            if (firstDayOfWeek === "Monday") {
                // Edge case: if the first day of a month is sunday, I want to go back a week.  
                if (dayOne.getDay() === 0) {
                    item.setDate(item.getDate() - 7);
                }
                item.setDate(item.getDate() + 1);
            }

            firstDays.push(item);
            firstSunday.setDate(firstSunday.getDate() + 7);
        }

        // Filter out all posts that occur within the month view.
        // First determine the timeframe of our view.
        let earliest = firstDays[0];
        let latest = new Date(firstDays[weeksToDisplay - 1]);
        latest.setDate(latest.getDate() + 7);

        let postsInMonth = undefined;
        if (postList) {
            postsInMonth = postList.filter(post => {
                let creationTime = parseInt(post.createdAt);
                return (creationTime < latest.getTime()) && (creationTime >= earliest.getTime());
            });
        }


        let weeks = firstDays.map(firstDay => {
            return <Week
                postsInMonth={postsInMonth}

                currentMonth={date.getMonth()}
                firstDay={firstDay}
                setView={setView}
                key={"-week" + firstDay.toISOString()}
            />
        });
        return weeks;
    }
    let weeks = generateWeekComponents();

    // I need to determine which posts are within this month.
    // I'll use linear scan for now; To-Do: Sort + binary search? Not sure if it's pre-sorted


    return (
        <tbody>
            {/* Every <tr> is generated by Week.js */}
            {weeks}
        </tbody>
    );
}

export default Month;