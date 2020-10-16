import React from 'react';

const cellStyling = {
    border: "1px solid black",
    height: "50px"
}

const dayWrapperStyling = {
    display: "flex",
    flexDirection: "column",
    height: "100%"
}

const Day = ({date}) => {
    return (
        <td style={cellStyling}>
            <div style={dayWrapperStyling}>
                {date.getDate()}
            </div>
        </td>
    );
}
 
export default Day;