import { gql, useQuery } from '@apollo/client';
import { Avatar, CircularProgress, Grid, Hidden, makeStyles, Paper, Typography } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { endOfDay, startOfDay, subDays } from 'date-fns';
import { addDays } from 'date-fns/esm';
import React from 'react';

import { POST_FRAGMENT } from '../../utils/graphql';
import TeamPostCard from './TeamPostCard';

const useStyles = makeStyles((theme) => ({
    paperRoot: {
        width: "100%",
    },
    gridContainer: {
        padding: "1em"
    },
    table: {

    },
    postWrapper: {
        display: "flex",
        flexDirection: "column"
    },
    avatarWrapper: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center"
    }

}));

const GET_TEAM_POSTS = gql`
    ${POST_FRAGMENT}
    query getTeamPosts($id: ID!){
        team(id: $id) {
            memberCount
            owner {
                id
                first
                last
                profilePictureURL
                postList{
                    ...FeedPagePost
                }
            }
            adminList {
                id
                first
                last
                profilePictureURL
                postList{
                    ...FeedPagePost
                }
            }
            memberList {
                id
                first
                last
                profilePictureURL
                postList {
                ...FeedPagePost
                    
                }
            }
        }
    }
`;


const TeamPostView = ({ selectedTeamId, date, numDaysToDisplayInTeamView }) => {
    const classes = useStyles();

    const { data, loading, error } = useQuery(GET_TEAM_POSTS, { variables: { id: selectedTeamId } });
    if (error) { return <div>Error!</div> }
    if (loading) { return <CircularProgress color="primary"></CircularProgress> }
    console.log('data :>> ', data);

    function TeamPostTableHead({ date, numDaysToDisplayInTeamView }) {
        const cells = [];
        let startingDate = startOfDay(subDays(new Date(date), numDaysToDisplayInTeamView - 1));
        let endingDate = startOfDay(addDays(date, 1));
        let currentIndex = startingDate;

        while (currentIndex.getTime() !== endingDate.getTime()) {
            cells.push((
                <TableCell align="center" key={`-teamPostTableHead-${currentIndex}`}>
                    {currentIndex.toLocaleDateString(undefined, { month: "numeric", day: "numeric" })}
                </TableCell>
            ))
            currentIndex = startOfDay(addDays(currentIndex, 1));
        }

        return (
            <TableHead>
                <TableRow>
                    <TableCell align="center">Name</TableCell>
                    {cells}
                </TableRow>
            </TableHead>
        )
    }

    function TeamPostTableBody({ data, rows, date, numDaysToDisplayInTeamView }) {
        let combinedPostsMap = {};

        // Iterate through all admins and members to grab their posts
        data.team.adminList.forEach(user => {
            combinedPostsMap[user.id] = {
                name: `${user.first} ${user.last}`,
                postList: user.postList,
                profilePictureURL: user.profilePictureURL
            }
        })
        data.team.memberList.forEach(user => {
            combinedPostsMap[user.id] = {
                name: `${user.first} ${user.last}`,
                postList: user.postList,
                profilePictureURL: user.profilePictureURL
            }
        })

        // Now filter out only the posts in our date range
        let filteredPostsMap = {};
        for (const userid in combinedPostsMap) {
            let userData = combinedPostsMap[userid];
            let { name, postList, profilePictureURL } = userData;
            postList = postList.filter(post => {
                let postDate = new Date(post.postDate);
                let earlierBound = startOfDay(subDays(date, numDaysToDisplayInTeamView - 1));
                let laterBound = endOfDay(date);
                return (earlierBound.getTime() <= postDate.getTime() && postDate.getTime() <= laterBound.getTime())
            })
            filteredPostsMap[userid] = { name, postList, profilePictureURL };
        }
        console.log('filteredPostsMap :>> ', filteredPostsMap);

        // Iterate through every single user. One row is created per user.
        let tableRows = [];
        for (const userid in filteredPostsMap) {
            const userData = filteredPostsMap[userid];
            const { name, postList, profilePictureURL } = userData;

            let tableCells = [];
            tableCells.push(<TableCell>
                <div className={classes.avatarWrapper}>
                    <Avatar
                        aria-label="User Picture"
                        // onClick={navigateToUserProfile}      Clicking the image doesn't take you to the team page, not sure how rn
                        alt="User Profile Picture"
                        src={profilePictureURL}
                    />
                    <Typography>{name}</Typography>
                </div>

            </TableCell>);

            // Iterate through all the days we are covering and filter out sameDayPosts
            let startingDate = startOfDay(subDays(date, numDaysToDisplayInTeamView - 1));
            let endingDate = startOfDay(addDays(date, 1));
            let currentIndex = startingDate;
            while (currentIndex.getTime() !== endingDate.getTime()) {

                // Filter all posts in this user's postList that occur the same day as currentIndex.
                // May have more than one post in a day.
                let sameDayPosts = [];
                for (let i = 0; i < postList.length; i++) {
                    const post = postList[i];
                    let postDate = startOfDay(new Date(post.postDate));
                    if (postDate.getTime() === currentIndex.getTime()) {
                        sameDayPosts.push(post);
                    }
                }

                // Create a table cell based off posts in the day
                tableCells.push((
                    <TableCell align="center" key={`-teamCell-${userid}-${currentIndex}`}>
                        {/* Display notes in a column format */}
                        <div className={classes.postWrapper}>
                            {sameDayPosts.map(post => {
                                return (
                                    <TeamPostCard post={post} key={`-teamCellCard-${post.id}-${post.title}`} />
                                )
                            })}
                        </div>
                    </TableCell>
                ))

                currentIndex = startOfDay(addDays(currentIndex, 1));
            }

            tableRows.push(
                <TableRow key={`-teamPostView-${userid}`}>
                    {tableCells}
                </TableRow>
            )
        }

        console.log('combinedPosts :>> ', combinedPostsMap);
        return (
            <TableBody>
                {tableRows}
            </TableBody>
        )
    }

    let tableHead = <TeamPostTableHead date={date} numDaysToDisplayInTeamView={numDaysToDisplayInTeamView} />;
    let tableBody = <TeamPostTableBody data={data} date={date} numDaysToDisplayInTeamView={numDaysToDisplayInTeamView} />

    return (
        <Grid container>
            <Grid item xs={12}>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <colgroup>
                            <col style={{ width: '10%' }} />
                            <col style={{ width: '30%' }} />
                            <col style={{ width: '30%' }} />
                            <col style={{ width: '30%' }} />
                        </colgroup>
                        {tableHead}
                        {tableBody}
                    </Table>
                </TableContainer>
            </Grid>

        </Grid>
    );
}

export default TeamPostView;