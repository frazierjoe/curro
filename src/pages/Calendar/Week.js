import React, { cloneElement } from 'react';
import Day from './Day';

const NUM_DAYS_IN_WEEK = 7;
const Week = ({ posts, firstDay, currentMonth, setDate, setView }) => {
    const generateNoPostsDayComponents = () => {
        // Generate the 7 days in a week using the passed firstDay
        let firstDayOfWeek = new Date(firstDay);
        let days = [];
        for (let i = 0; i < NUM_DAYS_IN_WEEK; i++) {
            let day = new Date(firstDayOfWeek);
            days.push(day);

            firstDayOfWeek.setDate(firstDayOfWeek.getDate() + 1);
        }

        days = days.map(dayDate => {
            return (
                <Day currentMonth={currentMonth}
                    dayDate={dayDate}
                    setView={setView}
                    setDate={setDate}
                    key={"-day" + dayDate.toISOString()}
                />
            )
        });
        return days;
    }


    const paginatePostsByDate = () => {
        // Construct array of all dates in this week
        let firstDayOfWeek = new Date(firstDay);

        let datesInWeek = [];
        let dayIndex = new Date(firstDayOfWeek);
        for (let i = 0; i < NUM_DAYS_IN_WEEK; i++) {
            let copy = new Date(dayIndex);
            datesInWeek.push(copy);

            dayIndex.setDate(dayIndex.getDate() + 1);
        }

        // Todo: Kind of inefficient. O(7n) time rn
        // Now dump posts into each slot of datesInWeek
        let postsPaginatedByDays = [];


        for (let i = 0; i < NUM_DAYS_IN_WEEK; i++) {
            const dayInWeek = datesInWeek[i];

            let postsThisDay = [];
            for (let j = 0; j < posts.length; j++) {
                let post = posts[j];
                let postCreationTime = new Date(post.postDate);
                
                let sameYear = dayInWeek.getFullYear() === postCreationTime.getFullYear();
                let sameMonth = dayInWeek.getMonth() === postCreationTime.getMonth();
                let sameDate = dayInWeek.getDate() === postCreationTime.getDate();
                let exactSameDate = sameYear && sameMonth && sameDate;

                if (exactSameDate) {
                    // console.log("START---");
                    // console.log('post :>> ', post);
                    // console.log('dayInWeek :>> ', dayInWeek);
                    // console.log('postCreationTime :>> ', postCreationTime);
                    // console.log("\n");
                    postsThisDay.push(post)
                };
            }
            postsPaginatedByDays.push(postsThisDay);
        }
        return postsPaginatedByDays;
    }

    const injectPostsInDayComponents = (dayComponents) => {
        let postsPaginatedByDays = paginatePostsByDate();

        // console.log('postsPaginatedByDays :>> ', postsPaginatedByDays);
        let injectedDayComponents = [];
        for (let i = 0; i < NUM_DAYS_IN_WEEK; i++) {
            let dayComponent = dayComponents[i];
            let postsInThisDay = postsPaginatedByDays[i];
            injectedDayComponents.push(cloneElement(dayComponent, {postsToday: postsInThisDay}));
        }

        return injectedDayComponents;
    }

    let uninjectedDays = generateNoPostsDayComponents();
    let days = injectPostsInDayComponents(uninjectedDays);

    return (
        <tr>
            {days}
        </tr>
    );
}

export default Week;