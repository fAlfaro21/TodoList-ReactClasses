import React from "react";
import "./Main.css";
//import spinner from './spinner.gif';
import Post from "../Post/Post";
import Form from "../Form/Form";
import { LoginContextConsumer } from "../../contexts/LoginContext";

import getPosts from "../../data/dataProvider";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [ ],
      user: this.props.user || "",
      limit: 10,
      btnStatus: false,
      btnSearch: false,
      selected: "",
      searchPost:""
    };
  }

  async componentDidMount() {
    const newPosts = await getPosts();
    this.setState({ posts: [...this.state.posts, ...newPosts] });
    localStorage.setItem("Posts", JSON.stringify(this.state.posts));
  }

  componentDidUpdate() {
    if (!this.state.btnSearch)
    {localStorage.setItem("Posts", JSON.stringify(this.state.posts))};
  }

  drawPosts = () => {
    if (this.state.posts.length > 0) {
      return this.state.posts.map((item, index) => {
        const newPost = {
          id: index,
          title: item.title,
          finished: item.finished,
          priority: item.priority,
          removePost: this.removePost,
          updatePost: this.updatePost
        };
        return <Post data={newPost} key={index} updatePost={this.updatePost} finishedPost={this.finishedPost} priority={this.priority}/>;
      });
    }
    return <h4>Ya está todo hecho.</h4>;
  };

  handleTitle = (event) => this.setState({ searchPost: event.target.value });

  removePost = (titulo) => {
    let tasks = this.state.posts.filter((data) => data.title !== titulo);
    this.setState({ posts: tasks });
  };

  addPost = (title, finished, priority) => {    
    this.setState({
      posts: [...this.state.posts, { title, finished, priority }]
    });
  };

  createNewPost = (boolean) => {
    this.setState({
      btnStatus: boolean,
    });
  };

  updatePost = (id, boolean) => {
    this.setState({
      btnStatus: boolean,
      selected: id,
    });
  };

  updateTitle = (updateTitle, originalTitle) => {
   const newArrayPost = this.state.posts.map((item) => {
     
      if (item.title === originalTitle) {
        item.title = updateTitle;
      };
      return item
    })
    this.setState({posts: newArrayPost, btnStatus: false, selected:""})
  }
 
  finishedPost = (title) => {
    const newArrayPost = this.state.posts.map((item) => {

        if (item.title === title) {
          item.finished = !item.finished;
          };
          return item
      })
      this.setState({posts: newArrayPost})
    }

    priority = (value, title) => {

      const newArrayPost = this.state.posts.map((item) => {

          if (item.title === title) {
            item.priority = value;
          }
          else
          {
            if (item.priority === "Alta") item.priority = "Baja";
          }
          return item
        })
        this.setState({posts: newArrayPost})
      }

    searchPost = () => {
      if(this.state.searchPost == "") return;
      let showPosts = this.state.posts.filter(item =>item.title.includes(this.state.searchPost))

      this.setState({posts: showPosts, btnSearch: true, searchPost: ""});   
      this.searchInput.value = "";
  }

    reset = () => {
      let showPosts = JSON.parse(localStorage.getItem("Posts"));
      this.setState({posts: showPosts, btnStatus: false, btnSearch: false});       
    };

  render() {
    return (
      <main>
        <LoginContextConsumer>
        {context => (
          <>
          <h1>
            Hola {this.state.user ? this.state.user : "chicos,"} quedan un montón de cosas por hacer.
          </h1>     
          {this.state.btnStatus ? (
            ""
          ) : (
            <>
            <input type="text" onChange={this.handleTitle} ref={(ref) => this.searchInput= ref}></input>
            <button onClick={this.searchPost}>Buscar</button>
            {!this.state.btnSearch ? (
            ""
            ) : (
            <>
              <button onClick={this.reset}>Volver</button>
              
            </>
            )}
            <br></br>
            {context.logStatus === "LogOut" ?
              <button onClick={this.createNewPost}>Crear nueva tarea</button> : ""
            }
              <button onClick={context.toggleLog} className="button">
              {context.logStatus}
              </button>
            </>
          )}
          {this.state.btnStatus ? (
            <Form
              addPost={this.addPost}
              createNewPost={this.createNewPost}
              btnStatus={this.state.btnStatus}
              valuePost={this.state.posts[this.state.selected]}
              updateTitle={this.updateTitle}
            />
          ) : (
            this.drawPosts()
          )}

        </>
        )}
        </LoginContextConsumer>
      </main>
    );
  }
}

export default Main;
