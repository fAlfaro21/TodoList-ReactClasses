import React from "react";
import "./Form.css";

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      update: false,
      finished: false,
      priority: "Baja"
    };
  }

  handleTitle = (event) => this.setState({ title: event.target.value });

  handleNewPost = (event) => {
    event.preventDefault();
    if(!this.state.title) return;
    this.props.addPost(this.state.title, this.state.finished, this.state.priority);
    const btnStatus = false;
    this.props.createNewPost(btnStatus);
  };

  handleModifyPost = () => {
    if (this.props.valuePost && this.props.valuePost.title) {
      this.state.update = true;
    }
  };

  updateTitle = (event) => {
    event.preventDefault();
    this.props.updateTitle(this.state.title, this.props.valuePost.title);
  };  

  goBack = () => {
    this.state.update = false;
    this.props.createNewPost();
  };

  render() {
    this.handleModifyPost();
    return (
      <form>
        Tarea:
        {this.props.btnStatus && !this.state.update ? (
          <input type="text" onChange={this.handleTitle} />
        ) : (
          <input
            type="text"
            onChange={this.handleTitle}
            defaultValue={this.props.valuePost.title}
          />
        )}
        <br />
        {this.props.btnStatus && !this.state.update ? (
          <button onClick={this.handleNewPost}>Crear</button>
        ) : (
          <button onClick={this.updateTitle}>Modificar</button>
        )}
        <button onClick={this.goBack}>Volver</button>
      </form>
    );
  }
}

export default Form;
