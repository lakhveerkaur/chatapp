import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
class UserList extends Component {
constructor(props) {
    super(props);
    this.state={
      value:''
    }
  }

  changeHandler(event) {

    var value = event.target.value;
    this.setState({ value:value });
  }

  submitHandler(e) {
      e.preventDefault();
       this.props.newMessage(this.state.value);
      
  }

   render() {
    const style=
    {
      width:300,
      padding:20,
      marginTop:20
    }
    const Conversation={
      width:400,
       marginTop:20,
      padding:20
    }
var userlist=this.props.users.map((user,i) =>{
 return(
  <li key={i}>
    {user}
  </li>);
});
var messagelist = this.props.messages.map((data,i)=>{
  console.log(data,'datamsg');
  return(
    <div key={i}>
   
   <strong> {data.user}:</strong> 
     {data.msg}
    </div>
  );
});
    return ( 
     <div>
      <Paper style={style}>
      <h3>Online users </h3>
       {userlist}
     
       </Paper>
       <Paper style={Conversation}>
       <h3>Conversation</h3>
     
       {messagelist}
      
        <TextField
      hintText="Send Message"
      floatingLabelText="Message"
       onChange={this.changeHandler.bind(this)}/>
      <RaisedButton label="Send" primary={true} onClick={this.submitHandler.bind(this)} />
    </Paper>
      
    
      </div> 
      
    );
  }
}

export default UserList;