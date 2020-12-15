import { Button, ButtonGroup, IconButton, makeStyles } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import { addDays, endOfDay, startOfDay, subDays } from 'date-fns/esm';
import React, { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { ACTIVITY_MAP } from './ActivityConstants';
import SingleActivityHistorySelect from './SingleActivityHistorySelect';

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        justifyContent: "center"
    },
    buttonWrapper: {
        display: "flex",
        justifyContent: "center",
        width: "50%",
        alignItems: "center"
    },
    timeButtonsWrapper: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    modeButtons: {
        height: 42
    }
}));

// Filters out data within a date range and formats for use in the bar chart
function extractStackedDataByMode(leadingDate, numDaysAgo, activityDataMap, modeInput) {
    let mode = modeInput.toUpperCase();
    let activityConstKey = "";
    let activityDataObjectKey = "";

    if (mode === "DURATION") {
        activityConstKey = "durationAllowed";
        activityDataObjectKey = "duration";
    } else if (mode === "DISTANCE") {
        activityConstKey = "distanceAllowed";
        activityDataObjectKey = "distance";
    } else {
        activityConstKey = "UNRECOGNIZED";
        activityDataObjectKey = "UNRECOGNIZED";
    }

    let laterBound = endOfDay(leadingDate);
    let earlierBound = startOfDay(subDays(laterBound, numDaysAgo - 1));

    // Initialize our padded Activity Map
    let paddedActivityDataMap = {};
    for (const activityEnum in ACTIVITY_MAP) {
        if (ACTIVITY_MAP[activityEnum][activityConstKey]) {
            paddedActivityDataMap[activityEnum] = [];
        }
    }

    for (const activityEnum in activityDataMap) {
        if (ACTIVITY_MAP[activityEnum][activityConstKey]) {
            let activityObjects = activityDataMap[activityEnum];
            let activityObjectsInDateRange = activityObjects.filter(dataObject => {
                return isInDateRange(dataObject.date, earlierBound, laterBound);
            })
            // Pad our filter data by inserting objects with values 0 for days not accounted for
            paddedActivityDataMap[activityEnum] = padActivityObjects(activityObjectsInDateRange, leadingDate, numDaysAgo);
        }
    }


    // Now, every array of paddedActivityDataMap has the same length. Go through them parallely
    // to construct the data objects to be directly used by our chart
    let barDurationDataArray = [];
    for (let i = 0; i < numDaysAgo; i++) {
        let barDurationData = {};
        // Grab the name from the 'RUN' array arbitrarily
        barDurationData['name'] = paddedActivityDataMap['RUN'][i].date.toLocaleDateString(undefined, { month: "numeric", day: "numeric" });

        // Append the i'th
        for (const activityEnum in paddedActivityDataMap) {
            let dataValue = paddedActivityDataMap[activityEnum][i][activityDataObjectKey];
            barDurationData[ACTIVITY_MAP[activityEnum].type] = dataValue;
        }
        barDurationDataArray.push(barDurationData);
    }
    return barDurationDataArray;
}

// If there is no data associated with a specific day, we have to add a zero-initialized data object
// in order for the chart to display properly.
function padActivityObjects(activityObjects, leadingDate, numDaysAgo) {
    let paddedActivityObjects = [];

    // Check day by day whether we need to add padding or not.
    let i = 0;
    let currentIndex = startOfDay(subDays(leadingDate, numDaysAgo - 1));
    let endCondition = startOfDay(addDays(leadingDate, 1));
    while (i < activityObjects.length) {
        let dataObject = activityObjects[i];
        if (dataObject.date.getTime() === currentIndex.getTime()) {
            paddedActivityObjects.push(activityObjects[i]);
            i++;
        } else {
            // Add padded object
            let paddingObject = {
                distance: 0,
                duration: 0,
                date: currentIndex,
                additionalInfo: {}
            }
            paddedActivityObjects.push(paddingObject);
        }
        currentIndex = startOfDay(addDays(currentIndex, 1));
    }

    // If we exhaust the array, add padding to the end
    while (currentIndex.getTime() !== endCondition.getTime()) {
        // Add padded object
        let paddingObject = {
            distance: 0,
            duration: 0,
            date: currentIndex,
            additionalInfo: {}
        }
        paddedActivityObjects.push(paddingObject);
        currentIndex = startOfDay(addDays(currentIndex, 1));
    }
    return paddedActivityObjects;
}

function isInDateRange(date, earlierDate, laterDate) {
    return (earlierDate.getTime() <= date.getTime()) && (date.getTime() <= laterDate.getTime());
}

const SingleBarChart = ({ activityDataMap }) => {
    const classes = useStyles();
    const [durationData, setDurationData] = useState(null);
    const [distanceData, setDistanceData] = useState(null);
    const [leadingDate, setLeadingDate] = useState(new Date());
    const [numDaysToDisplay, setNumDaysToDisplay] = useState(14);
    const [displayedActivity, setDisplayedActivity] = useState('RUN');
    const [mode, setMode] = useState("DURATION");

    // Don't process data every render. Only do it when we need to.
    useEffect(() => {
        let newDurationData = extractStackedDataByMode(leadingDate, numDaysToDisplay, activityDataMap, "DURATION");
        let newDistanceData = extractStackedDataByMode(leadingDate, numDaysToDisplay, activityDataMap, "DISTANCE");
        setDurationData(newDurationData);
        setDistanceData(newDistanceData);
    }, [activityDataMap, leadingDate, numDaysToDisplay])

    function metersToUnit(meters, unitInput) {
        let unit = unitInput.toUpperCase();
        let value = meters;
        switch (unit) {
            case 'KM':
                value /= 1000;
                break;

            case 'YDS':
                value *= .9144;
                break;

            case 'MI':
                value *= .000621371;
                break;

            case 'M':
                break;

            default:
                console.error("Unrecognized unit type: ", unit);
                break;
        }
        return value;
    }
    const formatDistanceToolTip = (value, name, props) => {
        return metersToUnit(value, defaultUnit).toFixed(1);
    }

    const formatYAxis = (tickItem) => {
        return Math.round(tickItem / 1000 / 60);
    }
    const formatDistanceYAxis = (tickItem) => {
        return Math.round(metersToUnit(tickItem, defaultUnit));
    }
    const formatToolTip = (value, name, props) => {
        return Math.round(value / 1000 / 60);
    }
    const handleDurationClick = () => {
        setMode("DURATION");
    }
    const handleDistanceClick = () => {
        setMode("DISTANCE");
    }
    const handleTodayClick = () => {
        setLeadingDate(new Date());
    }
    const handlePrevDateRange = () => {
        let newDate = subDays(leadingDate, numDaysToDisplay);
        setLeadingDate(newDate);
    }
    const handleNextDateRange = () => {
        let newDate = addDays(leadingDate, numDaysToDisplay);
        setLeadingDate(newDate);
    }
    const handleChange = (e) => {
        setMode("DURATION");
        setDisplayedActivity(e.target.value);
    }


    function generateBarComponents(modeStr) {
        let mode = modeStr.toUpperCase();
        let key = "";
        if (mode === "DURATION") {
            key = "durationAllowed";
        } else if (modeStr === "DISTANCE") {
            key = "distanceAllowed";
        } else {
            key = "Invalid Mode"
        }

        let barComponents = [];
        let activityConstantData = ACTIVITY_MAP[displayedActivity];
        if (activityConstantData[key]) {
            barComponents.push(
                <Bar
                    dataKey={activityConstantData.type}
                    stackId="a"
                    fill={activityConstantData.color}
                    key={`-singleBar-${modeStr}-${displayedActivity}`}
                />
            )
        }

        return barComponents;
    }
    let defaultUnit = ACTIVITY_MAP[displayedActivity]?.defaultUnit;

    let chart = null;
    let barComponents = generateBarComponents(mode);
    if (mode === "DURATION") {
        chart = (
            <ResponsiveContainer width="100%" height={300}>
                <BarChart width={600} height={300} data={durationData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 'dataMax']} unit={'min'} tickFormatter={formatYAxis} />
                    <Tooltip formatter={formatToolTip} />
                    <Legend />
                    {barComponents}
                </BarChart>
            </ResponsiveContainer>
        )
    } else if (mode === "DISTANCE") {
        chart = (
            <ResponsiveContainer width="100%" height={300}>
                <BarChart width={600} height={300} data={distanceData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 'dataMax']} unit={defaultUnit} tickFormatter={formatDistanceYAxis} />
                    <Tooltip formatter={formatDistanceToolTip} />
                    <Legend />
                    {barComponents}
                </BarChart>
            </ResponsiveContainer>
        )
    }

    return (
        <>
            {
                durationData && distanceData &&
                (
                    <>
                        <SingleActivityHistorySelect displayedActivity={displayedActivity} handleChange={handleChange}/>
                        {chart}
                        <div className={classes.root}>
                            <div className={classes.timeButtonsWrapper}>
                                <ButtonGroup className={classes.buttonWrapper}>
                                    <IconButton onClick={handlePrevDateRange}>
                                        <ChevronLeftIcon />
                                    </IconButton>
                                    <IconButton onClick={handleNextDateRange}>
                                        <ChevronRightIcon />
                                    </IconButton>
                                </ButtonGroup>
                                <Button onClick={handleTodayClick}>Today</Button>
                            </div>

                            <ButtonGroup className={classes.buttonWrapper}>
                                {ACTIVITY_MAP[displayedActivity].durationAllowed 
                                ? <Button className={classes.modeButtons} onClick={handleDurationClick}>Duration</Button>
                                : <Button disabled className={classes.modeButtons} onClick={handleDurationClick}>Duration</Button>}
                                {ACTIVITY_MAP[displayedActivity].distanceAllowed 
                                ? <Button className={classes.modeButtons} onClick={handleDistanceClick}>Distance</Button>
                                : <Button disabled className={classes.modeButtons} onClick={handleDistanceClick}>Distance</Button>
                                }
                                
                            </ButtonGroup>
                        </div>
                    </>
                )
            }
        </>
    );
}

export default SingleBarChart;