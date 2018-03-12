import moment from 'moment';
import React from 'react';

const ReminderList =(props) =>{
    const deleteReminderClick=function(id){
        props.reminderData.dispatchDeleteReminder(id);
    }
     const { reminders } = props.reminderData;
        return(
            <ul className="list-group">
                {
                    reminders.map(reminder => {
                        return(
                            <li key={reminder.id} className="list-group-item">
                                <div className="list-item">
                                    <div>{reminder.text}</div>
                                    <div><em>{moment(new Date(reminder.dueDate)).fromNow()}</em></div>
                                </div>
                                 <div onClick={() => deleteReminderClick(reminder.id)} className="list-item delete-button">&#x2715;</div>
                            </li>
                        )
                    })
                }
            </ul>
        )
};

export default ReminderList;