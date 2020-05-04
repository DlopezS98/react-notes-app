import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default class CreateNote extends Component {
  state = {
    title: '',
    content: '',
    date: new Date(),
    userSelected: '',
    users: [],
    editing: false,
    _id: ''
  };

  async componentDidMount() {
    const res = await axios.get('http://localhost:4000/api/users');
    if (res.data.length > 0) {
        this.setState({
        users: res.data.map((user) => user.userName),
        userSelected: res.data[0].userName,
        });
    }

    if (this.props.match.params.id) {
      const res = await axios.get(
        'http://localhost:4000/api/notes/' + this.props.match.params.id
      );
      this.setState({
        title: res.data.title,
        content: res.data.content,
        date: new Date(res.data.date),
        userSelected: res.data.author,
        _id: res.data._id,
        editing: true
      });
    }
  }

  onSubmit = async (e) => {
    e.preventDefault();
    if (this.state.editing) {
      const updatedNote = {
            title: this.state.title,
            content: this.state.content,
            date: this.state.date,
            author: this.state.userSelected,
          };
      await axios.put(
        'http://localhost:4000/api/notes/' + this.state._id, updatedNote);
    } else {
      const newNote = {
            title: this.state.title,
            content: this.state.content,
            date: this.state.date,
            author: this.state.userSelected,
          };  
      await axios.post('http://localhost:4000/api/notes', newNote);
    }
    window.location.href = '/';
  };

  onInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onChangeDate = date => {
    this.setState({ date });
  };

  render() {
    return (
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card card-body">
            <h4>Create Note</h4>
            {/**Seleccionar usuarios */}
              <div className="form-group">
                <select
                  className="form-control"
                  name="userSelected"
                  onChange={this.onInputChange}
                  value={this.state.userSelected}
                >
                  {this.state.users.map((user) => (
                    <option key={user} value={user}>
                      {user}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  onChange={this.onInputChange}
                  placeholder="Title"
                  name="title"
                  value={this.state.title}
                  required
                />
              </div>

              <div className="form-group">
                <textarea
                  name="content"
                  className="form-control"
                  onChange={this.onInputChange}
                  value={this.state.content}
                  required
                  placeholder="Content"
                />
              </div>

              <div className="form-group">
                <DatePicker
                  className="form-control"
                  selected={this.state.date}
                  onChange={this.onChangeDate}
                  value={this.state.date}
                />
              </div>
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary btn-block">
                    SAVE
                    </button>
                </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
