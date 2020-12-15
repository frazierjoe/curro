import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useState } from 'react';
import CumulativeBarChart from './CumulativeBarChart';
import SingleActivitySelect from './SingleActivitySelect';
import SingleActivityTable from './SingleActivityTable';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      width: 120,
    },
}));

const SingleActivityStats = ({ activityDataMap }) => {
    const classes = useStyles();
    const [displayedActivity, setDisplayedActivity] = useState('RUN');

    const handleChange = (e) => {
        setDisplayedActivity(e.target.value);
    }

    return (
        <div>
            <SingleActivitySelect 
                displayedActivity={displayedActivity}
                handleChange={handleChange}
            />

            <SingleActivityTable 
                displayedActivity={displayedActivity} 
                activityDataMap={activityDataMap}
            />
        </div>
    );
}

export default SingleActivityStats;