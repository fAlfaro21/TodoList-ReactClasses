import React from 'react';
import './Post.css';
import { LoginContextConsumer } from "../../contexts/LoginContext";

class Post extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillUnmount() {
    //...
  }

  handleUpdatePost = () => {
    this.props.updatePost(this.props.data.id, true)
  }

  finished = () => {
    // event.preventDefault();
    this.props.finishedPost(this.props.data.title)
  }

  getStyle = () => {
    return {
      textDecoration: this.props.data.finished ? "line-through" : "none",
      color: this.props.data.priority === "Alta" ? "green" : "red"
  }
  }

  handleChange= (event) => {
    this.props.priority(event.target.value, this.props.data.title);
  }

  
  render() {
    //console.log(this.props.data);
    return (
    <LoginContextConsumer>
    {context => (
      <article>
        <h2 style={this.getStyle()}>{this.props.data.title}</h2>

        {context.logStatus === "LogOut" ?
        <>
        <button onClick={this.handleUpdatePost} >Modificar</button>
        <button onClick={ () => this.props.data.removePost(this.props.data.title) }>Borrar</button>
        <select value={this.props.data.priority} onChange={this.handleChange}>
          <option value="Baja">Baja</option>
          <option value="Alta">Alta</option>
        </select>
        <input type="checkbox" checked={this.props.data.finished} onChange={this.finished}/>
        </> : ""
        }

      </article>
      
    )}
    </LoginContextConsumer>

    )
  }
}

export default Post;