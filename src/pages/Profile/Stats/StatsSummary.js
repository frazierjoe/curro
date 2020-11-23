import { startOfDay, subDays } from 'date-fns';
import { endOfDay } from 'date-fns/esm';
import React from 'react';

const StatsSummary = ({ leadingDate, durationDataPoints, DAYS_TO_DISPLAY, ALLOWED_ACTIVITIES }) => {
    // Iterate through postList, filter our the days within the range.
    let inRangePointsMap = extractActivitiesWithinRange(durationDataPoints, leadingDate, DAYS_TO_DISPLAY, ALLOWED_ACTIVITIES);
    let totalTime = getTotalTime(inRangePointsMap);
    let totalTimeMap = accumulateActivityMap(inRangePointsMap);
    console.log('totalTime :>> ', totalTime);
    console.log('totalTimeMap :>> ', totalTimeMap);
    return (
        <div>
            Total Time: {totalTime}
        </div>
    );
}

export default StatsSummary;

// Returns an object of enum: {x: date, y: minutes}
function extractActivitiesWithinRange(durationDataPoints, leadingDate, DAYS_TO_DISPLAY, ALLOWED_ACTIVITIES) {
    let activityMap = {};
    ALLOWED_ACTIVITIES.forEach(activityEnum => {
        activityMap[activityEnum] = [];
    });

    for (const activityEnum in durationDataPoints) {
        const points = durationDataPoints[activityEnum];
        let inRangePoints = points.filter(point => {
            let postDate = new Date(point.x);
            let inRange = isInRange(postDate, leadingDate, DAYS_TO_DISPLAY);
            return inRange;
        })
        activityMap[activityEnum] = inRangePoints;
    }

    return activityMap;
}

// Checks if date is within the range leadingDate - DAYS_TO_DISPLAY
function isInRange(date, leadingDate, DAYS_TO_DISPLAY) {
    let earliestBound = new Date(leadingDate);
    earliestBound = startOfDay(earliestBound);
    earliestBound = subDays(earliestBound, DAYS_TO_DISPLAY - 1);
    let latestBound = new Date(leadingDate);
    latestBound = endOfDay(latestBound);

    let isInRange = (earliestBound <= date) && (date <= latestBound);
    return isInRange;
}

function getTotalTime(inRangePointsMap){
    let totalMinutes = 0;
    for (const activityEnum in inRangePointsMap) {
        const points = inRangePointsMap[activityEnum];
            
        for (let i = 0; i < points.length; i++) {
            const point = points[i];
            totalMinutes += point.y;
        }
    }

    return totalMinutes;
}

function accumulateActivityMap(activityPointMap){
    let accumulatedMap = {};
    for (const activityEnum in activityPointMap) {
        const points = activityPointMap[activityEnum];
        
        let totalActivityTime = 0;
        points.forEach(point => {
            totalActivityTime += point.y;
        })
        accumulatedMap[activityEnum] = totalActivityTime;
    }
    return accumulatedMap;
}
