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
    ChartLabel
} from 'react-vis';


const useStyles = makeStyles((theme) => ({

}));

// Hm... Hardcoded Activities will cause issues if we ever change our enum
const ALLOWED_ACTIVITIES = ['RUN', 'BIKE', 'SWIM', 'SLEEP', 'CLIMB', 'ALTERG', 'YOGA', 'AQUA_JOG', 'HIKE'];
const colors = ['purple', 'green', 'red', 'yellow', 'orange', 'grey', 'black', 'blue', 'pink'];

const ONE_DAY = 86400000;

const UserStatsChart = ({ postList }) => {
    const classes = useStyles();

    const [durationDataPoints, setDurationDataPoints] = useState(null);

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

        for (const activityEnum in activityDurationDataPoints) {
            const dataPointsList = activityDurationDataPoints[activityEnum];
            activityDurationDataPoints[activityEnum] = addPaddingDataPoints(dataPointsList, 7);
        }

        return activityDurationDataPoints;
    }


    function addPaddingDataPoints(dataPointsList, numberOfDaysInThePast) {
        let today = startOfDay(new Date());

        let paddedData = [];
        let dataIndex = 0;


        let timeIndex = new Date(today);
        timeIndex.setDate(timeIndex.getDate() - numberOfDaysInThePast + 1);
        timeIndex = startOfDay(timeIndex);

        while ((dataIndex < dataPointsList.length) && (startOfDay(dataPointsList[dataIndex].x) < timeIndex)) {
            dataIndex += 1;
        }

        for (let i = 0; i < numberOfDaysInThePast; i++) {
            // Normalize Post Time
            let normalizedPostDate = startOfDay(new Date(dataPointsList[dataIndex].x));
            if ((dataIndex < dataPointsList.length) && (normalizedPostDate.getTime() === timeIndex.getTime())) {
                paddedData.push(dataPointsList[dataIndex]);
                dataIndex++;
            } else {
                paddedData.push({ x: timeIndex.getTime(), y: 0 });
            }

            timeIndex.setDate(timeIndex.getDate() + 1);
            timeIndex = startOfDay(timeIndex);
        }
        return paddedData;
    }

    // If postList changes, recalculate the user stats
    useEffect(() => {
        let newDurationDataPoints = convertPostListToDurationDataPoints(postList);
        setDurationDataPoints(newDurationDataPoints);
    }, [postList]);

    // Use our duration data points to construct Vertical Bar Series
    let verticalBarComponents = [];
    let counter = 0;
    for (const activityEnum in durationDataPoints) {

        let dataPoints = durationDataPoints[activityEnum];
        let verticalBarComponent = (
            <VerticalBarSeries key={`--activityChart-${activityEnum}`} data={dataPoints} color={colors[counter]} />
        )
        verticalBarComponents.push(verticalBarComponent);
        counter++;
    }

    return (
        <div>
            <XYPlot
                width={1000} height={300}
                xType='ordinal'
                stackBy="y"
                style={{overflow: 'visible'}}
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
        </div>
    );
}

export default UserStatsChart;