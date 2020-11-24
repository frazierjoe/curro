import React from 'react';
import { DiscreteColorLegend } from 'react-vis';

const ALLOWED_ACTIVITIES = ['RUN', 'BIKE', 'SWIM', 'SLEEP', 'CLIMB', 'ALTERG', 'YOGA', 'AQUA_JOG', 'HIKE'];
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

// Takes in a list of activityEnums
const Legend = ({activities}) => {
    let legendItems = [];
    activities.forEach(activityEnum => {
        let entry = {
            title: activityEnum,
            color: colorMap[activityEnum],
            strokeWidth: 1000
        };
        legendItems.push(entry);
    });

    return (
        <DiscreteColorLegend width={300} items={legendItems}/>
    );
}
 
export default Legend;