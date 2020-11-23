import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import UserStatsVerticalBarChart from './UserStatsVerticalBarChart';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { ButtonGroup } from '@material-ui/core';
import { subDays } from 'date-fns';
import { addDays } from 'date-fns/esm';

const useStyles = makeStyles((theme) => ({

}));

// Hm... Hardcoded Activities will cause issues if we ever change our enum
const ALLOWED_ACTIVITIES = ['RUN', 'BIKE', 'SWIM', 'SLEEP', 'CLIMB', 'ALTERG', 'YOGA', 'AQUA_JOG', 'HIKE'];
const colors = ['purple', 'green', 'red', 'yellow', 'orange', 'grey', 'black', 'blue', 'pink'];

const ONE_DAY = 86400000;
const DAYS_TO_DISPLAY = 14;

const UserStatsChartWrapper = ({ postList }) => {
    const classes = useStyles();
 
    // VerticalBarChart State
    const [durationDataPoints, setDurationDataPoints] = useState(null);
    const [leadingDate, setLeadingDate] = useState(new Date());

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
            <UserStatsVerticalBarChart
                durationDataPoints={durationDataPoints}
                setDurationDataPoints={setDurationDataPoints}
                leadingDate={leadingDate}
                postList={postList}
                DAYS_TO_DISPLAY={DAYS_TO_DISPLAY}
                ALLOWED_ACTIVITIES = {ALLOWED_ACTIVITIES}
            />
        </div>
    );
}

export default UserStatsChartWrapper;