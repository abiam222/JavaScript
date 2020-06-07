import React from 'react';
import logo from './logo.svg';
import './App.css';

const user = {
  firstName: 'Harper',
  lastName: 'Perez'
};

const author = {
  firstName:'Abiam',
  text:'Learning React for the first time'
}

//use function or class (or new hooks)
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
/*
//like  this 
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
*/

//guess i don't need 'this' in function
//props are read only (don't modify props directly)
//convert function to class if you want state (need constructor and etc)
function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
          {props.author.firstName} 
      </div>
      <div className="Comment-text">
        {props.author.text}
      </div>
      <TestChild />
    </div>
  );
}

function TestChild() {
  return (
    <p>Hey Child Hey</p>
  )
}

function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}

class CompWithState extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pressed: false,
      name: author.firstName,
      text: author.text
    };

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(state => ({
      pressed: !state.pressed
    }));
  }


  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.name}.</h2>
        <h2>It is {this.state.text}.</h2>
        <button onClick={this.handleClick}>Press!</button>
        {this.state.pressed ? "YES" : "NO" }
      </div>
    );
  }
}



class MyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: '', selected: false};

    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);//connect to functions in class
    //this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  submit(event) {
    //this.selected = true; don't do this, not directly for state variables
    this.setState({selected: true})
    event.preventDefault();
    console.log(this.selected)
  }

  // handleSubmit(event) {
  //   alert('A name was submitted: ' + this.state.value);
  //   event.preventDefault();
  // }

  render() {
    return (
      <form>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <button onClick={this.submit}>Submit</button>
        {this.state.value}
        { this.state.selected ? <Selected selected={this.state.value}/> : null }
      </form>
    );
  }
}

//outside of class. This is its own component but we passed values to this 
function Selected(props) { //fnction just have returns
  console.log('in component selected')
  return (
    <p>I was selected: {props.selected}</p>
  )
}


function App() {
  return (
    <div className="App">
      <h1>
        Hello, {formatName(user)}!
      </h1>
      <Welcome name={user.firstName} />
      <Comment author={author} />
      <CompWithState />
      <MyForm />
    </div>
  );
}


export default App;

