import React, { useState } from 'react';
import CalendarControls from './CalendarControls';
import Month from './Month';
/**
 * Wrapper component that contains all of the calendar control buttons
 * such as prev/next month
 */

const tableStyling = {
    borderCollapse: "collapse",
    border: "1px solid black",
    width: "100%",
    height: "100%"
}

const wrapperStyling = {
    height: "100%"
}

const CalendarWrapper = () => {
    const [date, setDate] = useState(new Date());
    return (
        <div style={wrapperStyling}>
            <div className='container' style={{display: "flex", justifyContent: 'space-between'}}>
                <div>
                    {`${dateObjMonthToString(date)} ${date.getFullYear()}`}
                </div>
                {/* Buttons that control the calendar */}
                <CalendarControls setDate={setDate}/>
            </div>
            <table style={tableStyling}>
                <thead>
                    <tr>
                        <th>SUN</th>
                        <th>MON</th>
                        <th>TUE</th>
                        <th>WED</th>
                        <th>THU</th>
                        <th>FRI</th>
                        <th>SAT</th>
                    </tr>
                </thead>
                {/* The Month component generates TBody */}
                <Month date={date}/>
            </table>
        </div>
    );
}


 
export default CalendarWrapper;

/**
 * Takes in a date object and spits out a string corresponding to its month
 * @param {*} date 
 */
function dateObjMonthToString(date){
    let monthNum = date.getMonth();
    let month = '';
    switch (monthNum){
        case 0:
            month = "January"
            break;
        case 1:
            month = "February"
            break;
        case 2:
            month = "March"
            break;
        case 3:
            month = "April"
            break;
        case 4:
            month = "May"
            break;
        case 5:
            month = "June"
            break;
        case 6:
            month = "July"
            break;
        case 7:
            month = "August"
            break;
        case 8:
            month = "September"
            break;
        case 9:
            month = "October"
            break;
        case 10:
            month = "November"
            break;
        case 11:
            month = "December"
            break;
    }
    return month;
}