import React from 'react';
import { Footer } from '../components/Footer';
import Typography from '@material-ui/core/Typography';
import CalendarWrapper from '../components/calendar/CalendarWrapper';


export const Home = () => {
    return (
        <div>
            <Typography variant="h4">Home</Typography>
            <Footer />
        </div>);
}