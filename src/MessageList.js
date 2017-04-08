import React, { Component } from 'react';

import Paper from 'material-ui/Paper';
class MessageList extends Component {
   render() {
    const style=
    {
      width:300,
      padding:20,
      marginTop:20
    }
var username=this.props.conversation.map((data,i) =>{
 return(
  <li key={i}>
    user={data.users}
    text={data.messages}
  </li>);
});


    return (   
     <div>
      <Paper style={style}>
      <h3>Online users </h3>
   {username}   
        
       </Paper>
      </div> 
      
    );
  }
}

export default MessageList;