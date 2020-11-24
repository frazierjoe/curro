import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AllActivityStackedBarChart from './AllActivityStackedBarChart';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { ButtonGroup } from '@material-ui/core';
import { startOfDay, subDays } from 'date-fns';
import { addDays } from 'date-fns/esm';
import SingleActivityStats from './SingleActivityStats';

// I created a map from below data. We should centralize.
import { AllowedActivity } from '../../../components/Activity/AllowedActivity';

const useStyles = makeStyles((theme) => ({

}));

// Constants
const ACTIVITY_MAP = {
    'RUN': {
        type: "Run",
        durationAllowed: true,
        distanceAllowed: true,
        equipmentAllowed: "Shoes",
        equipmentName: "SHOE",
        additionalInfoAllowed: true,
        defaultUnit: "mi"
    },
    'BIKE': {
        type: "Bike",
        durationAllowed: true,
        distanceAllowed: true,
        equipmentAllowed: "Bikes",
        equipmentName: "BIKE",
        additionalInfoAllowed: true,
        defaultUnit: "mi"
    },
    'SWIM': {
        type: "Swim",
        durationAllowed: true,
        distanceAllowed: true,
        equipmentAllowed: false,
        additionalInfoAllowed: true,
        defaultUnit: "yds"
    },
    'SLEEP': {
        type: "Sleep",
        durationAllowed: true,
        distanceAllowed: false,
        equipmentAllowed: false,
        additionalInfoAllowed: true
    },
    'CLIMB': {
        type: "Climb",
        durationAllowed: true,
        distanceAllowed: false,
        equipmentAllowed: false,
        additionalInfoAllowed: true
    },
    'ALTERG': {
        durationAllowed: true,
        distanceAllowed: true,
        equipmentAllowed: false,
        additionalInfoAllowed: true,
    },
    'YOGA': {
        type: "Yoga",
        durationAllowed: true,
        distanceAllowed: false,
        equipmentAllowed: false,
        additionalInfoAllowed: false
    },
    'AQUA_JOG': {
        type: "Aqua Jog",
        durationAllowed: true,
        distanceAllowed: false,
        equipmentAllowed: false,
        additionalInfoAllowed: true
    },
    'HIKE': {
        type: "Hike",
        durationAllowed: true,
        distanceAllowed: true,
        equipmentAllowed: "SHOE",
        additionalInfoAllowed: true,
    }
}

const MODES = ['DURATION', 'DISTANCE'];
const DAYS_TO_DISPLAY = 7;
const UNITS = ['KM', 'YDS', 'MI', 'M'];
const COLOR_MAP = {  // Hm... Hardcoded Activities will cause issues if we ever change our enum
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

const UserStatsChartWrapper = ({ postList, activity, mode, setMode, ALLOWED_ACTIVITIES }) => {
    const classes = useStyles();

    // VerticalBarChart State
    const [durationDataPoints, setDurationDataPoints] = useState(null);
    const [distanceDataPoints, setDistanceDataPoints] = useState(null);
    const [activityDataMap, setActivityDataMap] = useState(null);
    const [preferredDistanceUnit, setPreferredDistanceUnit] = useState('M');
    const [leadingDate, setLeadingDate] = useState(new Date());

    
    const [isViewingSpecificActivity, setIsViewingSpecificActivity] = useState(false);

    // Toggle Cumulative vs Specific Stats
    useEffect(() => {
        if (ALLOWED_ACTIVITIES.includes(activity)) {
            setIsViewingSpecificActivity(true);
        } else {
            setIsViewingSpecificActivity(false);
        }
    }, [activity, ALLOWED_ACTIVITIES]);


    // Breakdown Duration API Data into usable data
    useEffect(() => {
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

            return activityDurationDataPoints;
        }
        let newDurationDataPoints = convertPostListToDurationDataPoints(postList);
        setDurationDataPoints(newDurationDataPoints);
    }, [postList, ALLOWED_ACTIVITIES]);


    // Breakdown Distance API Data into usable data
    useEffect(() => {
        // Iterate through every single post and extract the distance and units of each activity.
        // Just convert everything to meters for now.
        // If a person does the same activity multiple times in one day, combine them.

        function distanceObjectToMeters(distanceObject) {
            let value = distanceObject.value;
            let unit = distanceObject.unit;

            switch (unit) {
                case 'KM':
                    value *= 1000;
                    break;

                case 'YDS':
                    value *= .9144;
                    break;

                case 'MI':
                    value *= 1609.34;
                    break;

                case 'M':
                    break;

                default:
                    console.error("Unrecognized unit type: ", unit);
                    break;
            }

            return value;
        }

        let sortedPostList = postList.slice().sort(
            (a, b) => {
                const timeStampA = new Date(a.postDate).getTime();
                const timeStampB = new Date(b.postDate).getTime();
                return timeStampA - timeStampB;
            }
        );
        
        // Hash Map to hold all of the extracted data. 
        // activity: [{x: timeStamp, y: distanceInMeters}]
        let distanceMap = {};
        for (const activityEnum in ACTIVITY_MAP) {
            if (ACTIVITY_MAP[activityEnum].distanceAllowed) {
                distanceMap[activityEnum] = [];
            }
        }

        // Extract all of the data
        sortedPostList.forEach(post => {
            // Normalize Post Date
            let postDate = new Date(post.postDate);
            postDate = startOfDay(postDate);

            for (let i = 0; i < post.activityList.length; i++) {
                const activity = post.activityList[i];
                if (ACTIVITY_MAP[activity.type].distanceAllowed) {
                    let dist = distanceObjectToMeters(activity.distance);
                    distanceMap[activity.type].push({x: postDate.getTime(), y: dist});
                }
            }
        });

        // Merge duplicate timestamps for each array within the hash map
        for (const activityEnum in distanceMap) {
            const dataPointList = distanceMap[activityEnum];

            // This reducer is from 
            // https://stackoverflow.com/questions/38294781/how-to-merge-duplicates-in-an-array-of-objects-and-sum-a-specific-property
            distanceMap[activityEnum] = dataPointList.reduce(function (accumulator, cur) {
                let x = cur.x, found = accumulator.find(function (elem) {
                    return elem.x === x;
                });
                if (found) found.y += cur.y;
                else accumulator.push(cur);
                return accumulator;
            }, []);
        }
        console.log('distanceMap :>> ', distanceMap);
        setDistanceDataPoints(distanceMap);
    }, [postList, ALLOWED_ACTIVITIES])

    // Event Handlers
    const handlePrev = () => {
        let newDate = new Date(leadingDate);
        newDate = subDays(newDate, DAYS_TO_DISPLAY);
        setLeadingDate(newDate);
    }

    const handleNext = () => {
        let newDate = new Date(leadingDate);
        newDate = addDays(newDate, DAYS_TO_DISPLAY);
        setLeadingDate(newDate);
    }

    return (
        <div>
            {/* Go back/forwards 7 days */}
            <div>
                <ButtonGroup>
                    <IconButton onClick={handlePrev} aria-label="Go back  days">
                        <ChevronLeftIcon />
                    </IconButton>
                    <IconButton onClick={handleNext} aria-label="Go forward 7 days">
                        <ChevronRightIcon />
                    </IconButton>
                </ButtonGroup>

            </div>
            {isViewingSpecificActivity ?
                <SingleActivityStats
                    mode = {mode}
                    setMode={setMode}
                    leadingDate={leadingDate}
                    activity={activity}
                    ACTIVITY_MAP={ACTIVITY_MAP}
                    durationDataPoints={durationDataPoints}
                    distanceDataPoints={distanceDataPoints}
                    ALLOWED_ACTIVITIES={ALLOWED_ACTIVITIES}
                    COLOR_MAP={COLOR_MAP}
                    DAYS_TO_DISPLAY={DAYS_TO_DISPLAY}
                />
                :
                <AllActivityStackedBarChart
                    durationDataPoints={durationDataPoints}
                    leadingDate={leadingDate}
                    DAYS_TO_DISPLAY={DAYS_TO_DISPLAY}
                    ALLOWED_ACTIVITIES={ALLOWED_ACTIVITIES}
                    COLOR_MAP={COLOR_MAP}
                />}
        </div>
    );
}

export default UserStatsChartWrapper;