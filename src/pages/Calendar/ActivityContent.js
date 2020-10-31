import { CardContent } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import PoolIcon from '@material-ui/icons/Pool';
import React from 'react';

const ActivityContent = ({ activityList }) => {
    function getActivityTypeIcon(activityEnum){
        let icon = null;
        switch (activityEnum) {
            case 'RUN':
                icon = <DirectionsRunIcon />;
                break;
            case 'BIKE':
                icon = <DirectionsRunIcon />;
                break;
            case 'SWIM':
                icon = <DirectionsRunIcon />;
                break;
            case 'SLEEP':
                icon = <DirectionsRunIcon />;
                break;
            case 'CLIMB':
                icon = <DirectionsRunIcon />;
                break;
            case 'ALTERG':
                icon = <DirectionsRunIcon />;
                break;
            case 'YOGA':
                icon = <DirectionsRunIcon />;
                break;
            case 'AQUA_JOG':
                icon = <DirectionsRunIcon />;
                break;
            case 'HIKE':
                icon = <DirectionsRunIcon />;
                break;
            default:
                break;
        }

        return (
            <ListItemIcon>
                {icon}
            </ListItemIcon>
        )
    }

    console.log('activityList :>> ', activityList);
    let activityComponents = activityList.map(activity => {
        const id = activity.id;
        const activityType = activity.type;
        const duration = activity.duration;
        const equipment = activity.equipment;
        const additionalInfo = activity.additionalInfo;

        

        return (
            <ListItem>
                <ListItemIcon>
                    <DirectionsRunIcon />
                </ListItemIcon>
                <ListItemText primary="3 miles" secondary="3 hr 20 min" />
            </ListItem>
        )
    });
    return (
        <CardContent>
            <h3>Activities</h3>
            <List>
                <ListItem>
                    <ListItemIcon>
                        <DirectionsRunIcon />
                    </ListItemIcon>
                    <ListItemText primary="3 miles" secondary="3 hr 20 min" />
                </ListItem>
                <ListItem>
                    <ListItemIcon>
                        <PoolIcon />
                    </ListItemIcon>
                    <ListItemText primary="800m" secondary="9 min" />
                </ListItem>
            </List>
        </CardContent>
    );
}

export default ActivityContent;