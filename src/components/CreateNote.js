import React, { Component } from 'react'
import axios from 'axios';   
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


export default class CreateNote extends Component {

    state={
        users:[],
        userSelected:'',
        title:'',
        content:'',
        date: new Date()
    }
    componentDidMount(){
        this.getUsers();
    }

    getUsers = async () =>{
        const res = await axios.get('http://localhost:4000/api/users');
        this.setState({
            users: res.data.map(user => user.userName), 
            userSelected: res.data[0].userName
        });
    }

    onSubmit = async (e) =>{
        e.preventDefault();
        const newNote = {
            title: this.state.title,
            content: this.state.content,
            date: this.state.date,
            author: this.state.userSelected
        };
        await axios.post('http://localhost:4000/api/notes', newNote);
        window.location.href="/";
    }

    onInputChange= (e) =>{
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onChangeDate = (date) =>{
        this.setState({date});
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="card card-body">
                        <h4>Create Note</h4>
                        {/**Seleccionar usuarios */}
                        <div className="form-group">
                            <select className="form-control" name="userSelected" onChange={this.onInputChange}>
                                {
                                    this.state.users.map(user => (
                                        <option key={user} value={user}>
                                            {user}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <input type="text" 
                                className="form-control" 
                                onChange={this.onInputChange}
                                placeholder="Title" name="title"
                                required/>
                            </div>
                            <div className="form-group">
                                <textarea name="content" 
                                className="form-control"
                                onChange={this.onInputChange}
                                required placeholder="Content"/>
                            </div>
                            <div className="form-group">
                                <DatePicker className="form-control"
                                selected={this.state.date}
                                onChange={this.onChangeDate} />
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary btn-block">SAVE</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
