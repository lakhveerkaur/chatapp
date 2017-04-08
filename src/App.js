import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import UserList from './UserList';
import RaisedButton from 'material-ui/RaisedButton';
import io from 'socket.io-client';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { username: '',users:[],messages:[],display:null,socket:io('http://localhost:8080') };
    this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
    this.usernameSubmitHandler = this.usernameSubmitHandler.bind(this);

  }
  componentDidMount() {

      this.state.socket.on('get users',this.userLogin.bind(this));
      this.state.socket.on('new message',this.addMessage.bind(this));
      // this.state.socket.on('user Joined',this.userJoined.bind(this));
      // this.state.socket.on('user left',this.userLeft.bind(this));

  }
  addMessage(data){
      console.log(data,'data in addMessage');
      var arr = this.state.messages;
       arr.push(data);
       console.log(arr);
       this.setState({messages:arr});
  }
  userLogin(data){
           var arr = [];
           data.forEach((item)=>{
               arr.push(item);
           });
           //console.log(arr);
           this.setState({users:arr,display:true});

  }
  newMessage(val){

      this.state.socket.emit('send message', val);
  }

  usernameChangeHandler(event) {

    var value = event.target.value;
    this.setState({ username:value });
  }

  usernameSubmitHandler() {
    console.log(this.state.username)
       this.state.socket.emit('new user', this.state.username);
  
  }

  render() {
    const style=
    {
      width:300,
      padding:20,
      margin:'auto',
      marginTop:20
    }
    const styles = {
  margin: 12,
}
var displaydata= {
  display:this.state.display ? 'none':'block'
}

    return (
      <div>
      <AppBar
      title="Bob"
      iconClassNameRight="muidocs-icon-navigation-expand-more"
      />
      <div style={displaydata}>
      <Paper style={style}>
      
        <h1>Login</h1>
        
      <TextField
      hintText="Enter username"
      floatingLabelText="Username"
       onChange={this.usernameChangeHandler}/>
      <RaisedButton label="Login" primary={true} style={styles} onClick={this.usernameSubmitHandler} />
         
       </Paper>
       </div>
       <UserList  users={this.state.users} newMessage={this.newMessage.bind(this)} messages={this.state.messages} />
      </div>
    );
  }
}

export default App;
