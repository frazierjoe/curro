import React, { useState } from 'react';
import startOfDay from 'date-fns/startOfDay';
import { ChartLabel, HorizontalGridLines, VerticalBarSeries, VerticalGridLines, XAxis, XYPlot, YAxis } from 'react-vis';
import Legend from './Legend';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { subDays } from 'date-fns';
import { endOfDay } from 'date-fns/esm';
const useStyles = makeStyles((theme) => ({
    plotFix: {
        position: 'relative'
    }
}));

const SingleActivityStats = ({ 
    leadingDate, 
    activity, 
    durationDataPoints, 
    distanceDataPoints, 
    mode, setMode, 
    ACTIVITY_MAP, ALLOWED_ACTIVITIES, COLOR_MAP, DAYS_TO_DISPLAY }) => {

    const classes = useStyles();
    const [buttonText, setButtonText] = useState("DISTANCE");
    const [yAxisTitle, setYAxisTitle] = useState("Time (min)");
    const [preferredUnit, setPreferredUnit] = useState("KM");
    
    if (activity === 'ALL') {
        return (<div></div>);
    }

    const toggleClick = () => {
        if (mode === "DURATION"){
            setButtonText("DURATION");
            setMode("DISTANCE");
            setYAxisTitle("Distance (km)");
        }else if(mode === "DISTANCE"){
            setButtonText("DISTANCE");
            setMode("DURATION");
            setYAxisTitle("Time (min)");
        }
    }


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

    // Select duration or distance data
    let dataPoints = null;
    let sum = 0;
    if (mode === 'DURATION') {
        dataPoints = durationDataPoints[activity];
        let inRangePoints = dataPoints.filter(point => {
            let date = new Date(point.x);
            return isInRange(date, leadingDate, DAYS_TO_DISPLAY);
        });
        inRangePoints.forEach(point => {
            sum += point.y;
        })
    } else if (mode === 'DISTANCE') {
        dataPoints = distanceDataPoints[activity].slice();
        let multiplier = 1;
        switch (preferredUnit) {
            case 'KM':
                multiplier = 1/1000;
                break;
                
            case 'M':
                multiplier = 1;
                break;

            case 'YDS':
                multiplier = 1.0936;
                break;

            case 'MI':
                multiplier = 0.000621371;
                break;

            default:
                console.error("Unrecognized Unit: ", preferredUnit);
                break;
        }
        dataPoints = dataPoints.map(point => {
            return {x: point.x, y: point.y * multiplier};
        })
        let inRangePoints = dataPoints.filter(point => {
            let date = new Date(point.x);
            return isInRange(date, leadingDate, DAYS_TO_DISPLAY);
        });
        inRangePoints.forEach(point => {
            sum += point.y;
        })

    } else {
        console.error('Unrecognized Mode: ', mode);
    }

    let paddedDataPoints = generateMissingDates(dataPoints);
    let verticalBarComponent = (
        <VerticalBarSeries 
            data={paddedDataPoints} 
            color={COLOR_MAP[activity]} 
            onNearestX={value => {
                let newValue = {
                    y: value.y
                }
            }}
        />
    );
    
    let endDate = startOfDay(leadingDate);
    let beginningDate = subDays(endDate, DAYS_TO_DISPLAY - 1);
    

    return (
        <div>
            {ACTIVITY_MAP[activity].distanceAllowed ? <Button onClick={toggleClick}>Switch to {buttonText}</Button> : ''}
            <XYPlot
                width={300}
                height={300}
                xType='ordinal'
                stackBy="y"
                margin={{ bottom: 50 }}
                style={{ overflow: 'visible' }}
                className={classes.plotFix}
            >
                <VerticalGridLines />
                <HorizontalGridLines />
                <XAxis
                    attr='x'
                    attrAxis="y"
                    orientation="bottom"
                    tickLabelAngle={-45}
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
                    text={yAxisTitle}
                    className="alt-y-label"
                    includeMargin={false}
                    xPercent={-.14}
                    yPercent={0.45}
                    style={{
                        transform: 'rotate(-90)',
                        textAnchor: 'end'
                    }}
                />
                {verticalBarComponent}
            </XYPlot>
            <Legend activities={[activity]} />
            <h3>
                {beginningDate.toLocaleDateString(undefined, {month: 'numeric', day: 'numeric'})} to {endDate.toLocaleDateString(undefined, {month: 'numeric', day: 'numeric'})}:
            </h3>
            <div>
                Total: {Math.floor(sum)}
            </div>
        </div>
    );
}

export default SingleActivityStats;

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