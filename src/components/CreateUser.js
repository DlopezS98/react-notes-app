import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUser extends Component {

    //creando el estado de la app
    state ={
        users:[], //arreglo para almacenar los usuarios recibidos desde el servidor
        userName:'' //variable para almacenar un usuario
    }

    async componentDidMount(){
        this.getUsers(); //obteniendo usuarios
    }

    //haciendo la peticion post a nuestro servidor
    getUsers = async () =>{
        const res =  await axios.get('http://localhost:4000/api/users'); //haciendo la peticion get
        this.setState({users:res.data}); //añadiendo el resultado de la peticion en el arreglo del estado de la app
    }

    //actualizando el estado de la app (userName) desde el textbox    
    onChangeUserName = (e) =>{
        this.setState({
            userName:e.target.value //agregando el valor del textbox
        });
    }

    //creando el evento submit para agregar un usuario. (peticion post)
    onSubmit = async (e) =>{
        e.preventDefault(); //evitando que se recargue a pag..
        await axios.post('http://localhost:4000/api/users',{
            userName: this.state.userName //enviando el valor del estado de userName
        });
        this.setState({userName:''}); //limpiando el textbox
        this.getUsers(); // actualizando la tabla de usuarios
    }

    //eliminando un usuario
    deleteUser = async (id) =>{
        await axios.delete('http://localhost:4000/api/users/' + id);
        this.getUsers();
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-4">
                    {/* Creando el formulario para añadir un usuario */}
                    <div className="card card-body">
                        <h3>Create New User</h3>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <input type="text" className="form-control my-2" 
                                placeholder="user name" 
                                onChange={this.onChangeUserName} 
                                value={this.state.userName} name="" id=""/>
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary btn-block">SAVE</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="col-md-8">
                    {/*Listando todos los usuarios*/}
                    <ul className="list-group">
                        {
                            //recorriendo todos los usaurios de la coleccion
                            this.state.users.map(user => 
                            <li className="list-group-item list-group-item-action" 
                                key={user._id}
                                onDoubleClick={() => this.deleteUser(user._id)}>
                                {user.userName}
                            </li>)
                        }
                    </ul>
                </div>
            </div>
        )
    }
}
