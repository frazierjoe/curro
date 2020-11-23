import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import '../../../node_modules/react-vis/dist/style.css';
import startOfDay from 'date-fns/startOfDay';
import {
    XYPlot,
    XAxis,
    YAxis,
    VerticalGridLines,
    HorizontalGridLines,
    VerticalBarSeries,
    ChartLabel,
    DiscreteColorLegend
} from 'react-vis';
import Legend from './Legend';
import StatsSummary from './StatsSummary';


const useStyles = makeStyles((theme) => ({

}));

// Hm... Hardcoded Activities will cause issues if we ever change our enum
const colorMap = {
    'RUN': 'purple',
    'BIKE': 'green',
    'SWIM': 'red',
    'SLEEP': 'yellow',
    'CLIMB': 'orange',
    'ALTERG': 'grey',
    'YOGA': 'black',
    'AQUA_JOG': 'blue',
    'HIKE': 'pink'
}

const ONE_DAY = 86400000;

const UserStatsVerticalBarChart = ({ durationDataPoints, setDurationDataPoints, leadingDate, postList, DAYS_TO_DISPLAY, ALLOWED_ACTIVITIES }) => {
    const classes = useStyles();

    function msToFlooredMin(ms) {
        return Math.floor(ms / 1000 / 60);
    }

    // Extract Duration for a single activity and update the passed in object postActicity.
    function addDurationDataFromActivity(activity, postActivityDurations) {
        const activityType = activity.type;
        const activityDuration = activity.duration; // in milliseconds

        postActivityDurations[activityType] += activityDuration;
        return;
    }

    // Return an object with allowedActivites as properties. The values are for a single post.
    function extractDurationDataFromPost(post) {
        // The object that stores the total duration of each activity. Keys are the activityEnums.
        let postActivityDurations = {};
        ALLOWED_ACTIVITIES.forEach(activityEnum => {
            postActivityDurations[activityEnum] = 0;
        })

        post.activityList.forEach(activity => addDurationDataFromActivity(activity, postActivityDurations));

        // Round each duration to milliseconds
        for (const activityEnum in postActivityDurations) {
            let activityDuration = postActivityDurations[activityEnum];
            postActivityDurations[activityEnum] = msToFlooredMin(activityDuration);
        }
        return postActivityDurations;
    }

    function convertPostListToDurationDataPoints(postList) {
        let sortedPostList = postList.slice().sort(
            (a, b) => {
                const timeStampA = new Date(a.postDate).getTime();
                const timeStampB = new Date(b.postDate).getTime();
                return timeStampA - timeStampB;
            }
        );

        let activityDurationDataPoints = {};
        ALLOWED_ACTIVITIES.forEach(activityEnum => {
            activityDurationDataPoints[activityEnum] = [];
        });

        // Convert data from each post into data points. If multiple posts are in the same day, sum them.
        sortedPostList.forEach(post => {
            let postDate = new Date(post.postDate);
            postDate.setHours(0, 0, 0, 0);

            let singlePostDataObject = extractDurationDataFromPost(post, activityDurationDataPoints);
            for (const activityEnum in singlePostDataObject) {
                const activityDuration = singlePostDataObject[activityEnum];

                const dataPoint = { x: postDate.getTime(), y: activityDuration };
                activityDurationDataPoints[activityEnum].push(dataPoint);
            }
        });

        // Merge duplicate timestamps for each array
        for (const activityEnum in activityDurationDataPoints) {
            const dataPointList = activityDurationDataPoints[activityEnum];

            // This reducer is from 
            // https://stackoverflow.com/questions/38294781/how-to-merge-duplicates-in-an-array-of-objects-and-sum-a-specific-property
            activityDurationDataPoints[activityEnum] = dataPointList.reduce(function (accumulator, cur) {
                let x = cur.x, found = accumulator.find(function (elem) {
                    return elem.x === x
                });
                if (found) found.y += cur.y;
                else accumulator.push(cur);
                return accumulator;
            }, []);
        }

        // for (const activityEnum in activityDurationDataPoints) {
        //     const dataPointsList = activityDurationDataPoints[activityEnum];
        //     activityDurationDataPoints[activityEnum] = addPaddingDataPoints(dataPointsList, 7);
        // }

        return activityDurationDataPoints;
    }


    // Users don't post everyday, but our graph needs a data point for those days.
    const generateMissingDates = (dataPointsList) => {

        let mostRecentDate = startOfDay(leadingDate);
        let paddedData = [];
        for (let i = 0; i < DAYS_TO_DISPLAY; i++) {

            // Not efficient, O(n^2)
            let found = false;
            let j = 0;
            for (j = 0; j < dataPointsList.length; j++) {
                const point = dataPointsList[j];
                if (startOfDay(new Date(point.x)).getTime() === mostRecentDate.getTime()) {
                    found = true;
                    break;
                }
            }

            if (found) {
                paddedData.push(dataPointsList[j]);
            } else {
                paddedData.push({ x: startOfDay(mostRecentDate).getTime(), y: 0 });
            }

            mostRecentDate.setDate(mostRecentDate.getDate() - 1);
        }
        return paddedData.reverse();
    }


    // If postList changes, recalculate the data points
    useEffect(() => {
        let newDurationDataPoints = convertPostListToDurationDataPoints(postList);
        setDurationDataPoints(newDurationDataPoints);
    }, [postList]);



    // Use our duration data points to construct Vertical Bar Series
    let verticalBarComponents = [];
    for (const activityEnum in durationDataPoints) {

        let dataPoints = durationDataPoints[activityEnum];
        let paddedDataPoints = generateMissingDates(dataPoints);
        let verticalBarComponent = (
            <VerticalBarSeries key={`--activityChart-${activityEnum}`} data={paddedDataPoints} color={colorMap[activityEnum]} />
        )
        verticalBarComponents.push(verticalBarComponent);
    }

    console.log('durationDataPoints :>> ', durationDataPoints);
    return (
        <div>
            <XYPlot
                width={1000} height={300}
                xType='ordinal'
                stackBy="y"
                style={{ overflow: 'visible' }}
            >
                <VerticalGridLines />
                <HorizontalGridLines />
                <XAxis
                    attr='x'
                    attrAxis="y"
                    orientation="bottom"
                    tickFormat={function tickFormat(d) {
                        let newDate = new Date(parseInt(d));
                        return newDate.toLocaleDateString(undefined, { month: 'numeric', day: 'numeric' })
                    }}
                />
                <YAxis
                    attr="y"
                    attrAxis="x"
                    orientation="left"
                />
                <ChartLabel
                    text="Date"
                    className="alt-x-label"
                    includeMargin={true}
                    xPercent={0.5}
                    yPercent={0.86}
                />
                <ChartLabel
                    text="Time (min)"
                    className="alt-y-label"
                    includeMargin={false}
                    xPercent={-.04}
                    yPercent={0.45}
                    style={{
                        transform: 'rotate(-90)',
                        textAnchor: 'end'
                    }}
                />
                {/* <VerticalBarSeries data={[{ x: 1603947600000, y: 44 }]} color='pink'/> */}
                {verticalBarComponents}

            </XYPlot>
            <Legend />

            {durationDataPoints ?
                <StatsSummary
                    leadingDate={leadingDate}
                    durationDataPoints={durationDataPoints}
                    DAYS_TO_DISPLAY={DAYS_TO_DISPLAY}
                    ALLOWED_ACTIVITIES={ALLOWED_ACTIVITIES}
                />
                :
                ''
            }
        </div>
    );
}

export default UserStatsVerticalBarChart;