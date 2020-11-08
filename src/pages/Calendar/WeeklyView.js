import { makeStyles } from '@material-ui/core/styles';
import React, { cloneElement } from 'react';
import WeekColumn from './WeekColumn';

const useStyles = makeStyles((theme) => ({
    gridParent: {
        display: "grid",
        gridTemplateColumns: "repeat(7, 1fr)",
        columnGap: "0em"
    }
}));
const NUMBER_OF_DAYS_IN_WEEK = 7;
const WeeklyView = ({ postList, date, setDate, setView, firstDayOfWeek }) => {
    const classes = useStyles();

    const getFirstDayOfWeekView = () => {
        // Get the first day of the month at the earliest time and get the first Sunday of that week.
        let dayOne = new Date(date);
        dayOne.setHours(0, 0, 0, 0);
        let sunday = new Date(dayOne);
        sunday.setDate(dayOne.getDate() - dayOne.getDay());

        let firstDayOfWeekView = new Date(sunday);
        if (firstDayOfWeek === "Monday") {
            // Edge case: if the first day of a month is sunday, I want to go back a week.  
            if (dayOne.getDay() === 0) {
                firstDayOfWeekView.setDate(firstDayOfWeekView.getDate() - 7);
            }
            firstDayOfWeekView.setDate(firstDayOfWeekView.getDate() + 1);
        }
        return firstDayOfWeekView;
    }

    const getDaysOfWeekView = () => {
        let firstDayOfWeekView = getFirstDayOfWeekView();

        let datesInWeek = [];
        let dayIndex = new Date(firstDayOfWeekView);
        for (let i = 0; i < NUMBER_OF_DAYS_IN_WEEK; i++) {
            let copy = new Date(dayIndex);
            datesInWeek.push(copy);

            dayIndex.setDate(dayIndex.getDate() + 1);
        }
        return datesInWeek;
    }

    const generateNoPostWeekColumns = () => {
        let firstDayOfWeekView = getFirstDayOfWeekView();

        let weekColumns = [];
        for (let i = 0; i < 7; i++) {
            let day = new Date(firstDayOfWeekView);
            weekColumns.push(
                <WeekColumn
                    date={day} 
                    setDate={setDate}
                    setView={setView}
                    key={`-week-column + ${day.toISOString()}`} 
                />
            )
            firstDayOfWeekView.setDate(firstDayOfWeekView.getDate() + 1);
        }
        return weekColumns;
    }


    // Todo: Right now, I'm just linear scanning through all posts. Needs optimization.
    const extractPostsInWeeklyView = () => {
        let earliestDateInWeekView = getFirstDayOfWeekView();
        let latestDateInWeekView = new Date(earliestDateInWeekView);
        latestDateInWeekView.setDate(latestDateInWeekView.getDate() + 7);   // +7 b/c 7 days per week

        let postsInWeeklyView = [];
        for (let i = 0; i < postList.length; i++) {
            const post = postList[i];
            const postDate = new Date(post.postDate);

            let inWeeklyView = (earliestDateInWeekView <= postDate) && (postDate < latestDateInWeekView);
            if (inWeeklyView) postsInWeeklyView.push(post);
        }
        return postsInWeeklyView;
    }

    const paginatePostsByDay = () => {
        let postsInWeeklyView = extractPostsInWeeklyView();
        let daysOfWeekView = getDaysOfWeekView();
        console.log('daysOfWeekView :>> ', daysOfWeekView);

        let postsPaginatedByDay = []
        for (let i = 0; i < NUMBER_OF_DAYS_IN_WEEK; i++) {
            const dayInWeek = daysOfWeekView[i];

            let postsThisDay = [];
            for (let j = 0; j < postsInWeeklyView.length; j++) {
                let post = postsInWeeklyView[j];
                let postDate = new Date(post.postDate);

                let sameYear = dayInWeek.getFullYear() === postDate.getFullYear();
                let sameMonth = dayInWeek.getMonth() === postDate.getMonth();
                let sameDate = dayInWeek.getDate() === postDate.getDate();
                let exactSameDate = sameYear && sameMonth && sameDate;

                if (exactSameDate) {
                    postsThisDay.push(post)
                };
            }
            postsPaginatedByDay.push(postsThisDay);
        }
        return postsPaginatedByDay;
    }

    const injectPostsInWeekColumns = (uninjectedWeekColumns) => {
        let postsInWeeklyView = paginatePostsByDay();
        console.log('postsInWeeklyView :>> ', postsInWeeklyView);

        let injectedWeekColumns = [];
        for (let i = 0; i < NUMBER_OF_DAYS_IN_WEEK; i++) {
            const uninjectedWeekColumn = uninjectedWeekColumns[i];
            const postsOfThisDay = postsInWeeklyView[i];
            
            let injectedWeekColumn = cloneElement(uninjectedWeekColumn, {postsToday: postsOfThisDay});
            injectedWeekColumns.push(injectedWeekColumn);
        }
        return injectedWeekColumns;
    }

    let uninjectedWeekColumns = generateNoPostWeekColumns();
    let weekColumns = injectPostsInWeekColumns(uninjectedWeekColumns);

    return (
        <div className={classes.gridParent}>
            {weekColumns}
        </div>
    );
}

export default WeeklyView;