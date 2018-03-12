import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addReminder, deleteReminder, clearReminders } from "../actions/action";
import ReminderList from "./ReminderList";


class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            text: '',
            dueDate: '',
            displayErrorMsg:false
        }
        this.fieldChange.bind(this);
    }

    addReminder(){
        if(this.state.text==='' || this.state.dueDate===''){
            this.setState({displayErrorMsg:true});
            return null;
        }
        this.props.dispatchNewReminder(this.state.text, this.state.dueDate);
        this.setState({text:'',dueDate:''});  
    }

    fieldChange = e =>{
        const value = e.target.value;
        const name = e.target.name;
        this.setState({[name]: value,displayErrorMsg:false});
      }

    render(){
        const errormessage=this.state.displayErrorMsg===true ? <div className="alert alert-danger">Please enter the reminder and time</div> : null;
        return(
            <div className="App container">
                <div className="panel panel-info">
                    <div className="title panel-heading">
                        Set Reminder
                    </div>
                    <div className="form-inline panel-body">
                        <div className="form-group">
                            <input className="form-control" placeholder="I have to..." name="text" onChange={this.fieldChange.bind(this)} value={this.state.text}/>
                            <input className="form-control" type="datetime-local" name="dueDate" onChange={this.fieldChange.bind(this)} value={this.state.dueDate}/>
                            <button type="button" className="btn btn-success" onClick={() => this.addReminder()}>
                                Add reminder
                            </button>   
                            {errormessage}                     
                            <ReminderList reminderData={this.props}/>
                            <button className="btn btn-danger" onClick={()=> this.props.dispatchClearReminders()}>
                                Clear Reminders
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


function mapDispatchToProps(dispatch) {
    return {
        dispatchNewReminder:(text,date)=>{
            dispatch(addReminder(text,date));
        },
        dispatchDeleteReminder:(id)=>{
            dispatch(deleteReminder(id));
        },
        dispatchClearReminders:()=>{
            dispatch(clearReminders());
        }
    }
}


function mapStateToProps(state) {
    return{
        reminders: state
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);