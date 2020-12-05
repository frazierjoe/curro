import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import startOfDay from 'date-fns/startOfDay';
import {
    XYPlot,
    XAxis,
    YAxis,
    VerticalGridLines,
    HorizontalGridLines,
    VerticalBarSeries,
    ChartLabel,
} from 'react-vis';
import Legend from './Legend';
import StatsSummary from './StatsSummary';


const useStyles = makeStyles((theme) => ({

}));

const AllActivityStackedBarChart = ({ durationDataPoints, leadingDate, DAYS_TO_DISPLAY, ALLOWED_ACTIVITIES, COLOR_MAP }) => {
    const classes = useStyles();

    // Users don't post everyday, but our graph needs a data point for those days. Fill in the gaps
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

    // Use our duration data points to construct Vertical Bar Series
    let verticalBarComponents = [];
    for (const activityEnum in durationDataPoints) {

        let dataPoints = durationDataPoints[activityEnum];
        let paddedDataPoints = generateMissingDates(dataPoints);
        let verticalBarComponent = (
            <VerticalBarSeries key={`--activityChart-${activityEnum}`} data={paddedDataPoints} color={COLOR_MAP[activityEnum]} />
        )
        verticalBarComponents.push(verticalBarComponent);
    }

    console.log('durationDataPoints :>> ', durationDataPoints);
    return (
        <div>
            <XYPlot
                width={300} height={300}
                xType='ordinal'
                stackBy="y"
                style={{ overflow: 'visible' }}
                margin={{bottom: 50}}
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
                    tickLabelAngle={-45}
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
                    xPercent={-.14}
                    yPercent={0.45}
                    style={{
                        transform: 'rotate(-90)',
                        textAnchor: 'end'
                    }}
                />
                {/* <VerticalBarSeries data={[{ x: 1603947600000, y: 44 }]} color='pink'/> */}
                {verticalBarComponents}

            </XYPlot>
            <Legend activities={ALLOWED_ACTIVITIES}/>
            <hr></hr>
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

export default AllActivityStackedBarChart;