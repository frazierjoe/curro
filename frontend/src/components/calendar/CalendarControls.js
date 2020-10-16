import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

const CalendarControls = ({setDate}) => {
    const handlePrevious = () => {
        setDate(prevDate => {
            let copy = new Date(prevDate);
            copy.setMonth(copy.getMonth() - 1);
            return copy;
        });
    }

    const handleNext = () => {
        setDate(prevDate => {
            let copy = new Date(prevDate);
            copy.setMonth(copy.getMonth() + 1);
            return copy;
        });
    }

    const handleToday = () => {
        setDate(new Date());
    }

    return (
        <div>
            <ButtonGroup color="primary" aria-label="outlined primary button group">
                <Button onClick={handlePrevious}>Prev</Button>
                <Button onClick={handleNext}>Next</Button>
            </ButtonGroup>
            <Button color="primary" onClick={handleToday} variant="outlined">Today</Button>
        </div>
    );
}

export default CalendarControls;