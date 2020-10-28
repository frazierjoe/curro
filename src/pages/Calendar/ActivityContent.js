import { CardContent } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import PoolIcon from '@material-ui/icons/Pool';
import React from 'react';

const ActivityContent = () => {
    return (
        <CardContent>
            <h3>Activities</h3>
            <List>
                <ListItem>
                    <ListItemIcon>
                        <DirectionsRunIcon />
                    </ListItemIcon>
                    <ListItemText primary="3 miles" secondary="3 hr 20 min"/>
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