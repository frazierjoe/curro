import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, CardHeader, Snackbar } from '@material-ui/core';
import UserStatsActivitySelect from './UserStatsActivitySelect';
import UserStatsChartWrapper from './UserStatsChartWrapper';
import { gql, useQuery } from '@apollo/client';
import CircularProgress from '@material-ui/core/CircularProgress';
import MuiAlert from '@material-ui/lab/Alert';
import ErrorSnackbar from './ErrorSnackbar';

const useStyles = makeStyles((theme) => ({
    spinnerWrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        height: '100%'
    }
}));

// Hm... Hardcoded Activities will cause issues if we ever change our enum
const ALLOWED_ACTIVITIES = ['RUN', 'BIKE', 'SWIM', 'SLEEP', 'CLIMB', 'ALTERG', 'YOGA', 'AQUA_JOG' ,'HIKE'];

// API Calls
const GET_ALL_ACTIVITIES = gql`
  query getPostList{
    me {
        postList{
            id
            postDate
            activityList {
                id
                type
                duration
                distance {
                    value
                    unit
                }
                equipment {
                    id
                    type
                    name
                }
                additionalInfo {
                    averageHeartRate
                    elevationGain
                    calories
                }
            }
            # likeList
            # commentList
        }
    }
}
`;

const UserStats = () => {
    const classes = useStyles();
    const [activity, setActivity] = React.useState('ALL');
    const [mode, setMode] = useState('DURATION');
    const { data, loading, error } = useQuery(GET_ALL_ACTIVITIES);

    if (error) {
        console.error(error);
        return (
            <>
                <ErrorSnackbar/>
                <div>
                    An error was encountered retrieving your stats :(
                </div>
            </>
        )
    }

    if (!loading) {
        console.log('data :>> ', data);
    }

    return (
        <Card>
            <CardHeader
                title="Stats"
            />
            <CardContent>
                <UserStatsActivitySelect mode={mode} setMode={setMode} activity={activity} setActivity={setActivity} ALLOWED_ACTIVITIES={ALLOWED_ACTIVITIES}/>
                {loading ? 
                    (<div className={classes.spinnerWrapper}>
                        <CircularProgress color="primary" />
                    </div>)
                    : <UserStatsChartWrapper mode={mode} setMode={setMode} activity={activity} postList={data.me.postList} ALLOWED_ACTIVITIES={ALLOWED_ACTIVITIES}/>
                }
            </CardContent>
        </Card>
    );
}

export default UserStats;