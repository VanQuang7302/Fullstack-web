import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import {getAllUsers,createNewUserService,deleteUserService,editUserService} from '../../services/userService';
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';

class UserManage extends Component {

    constructor(props){
        super(props);
        this.state ={
            arrUsers:[],
            isOpenModalUser: false,
            isOpenModalEditUser: false,
            userEdit:{

            }
        }
    }

    async componentDidMount() {
        await this.getAllUsersFromReact();
    }

    handleAddNewUser=async()=>{
        this.setState({
            isOpenModalUser:true,
            arrUsers: [],
        })
        await this.getAllUsersFromReact();
    }

    toggleUserModal =()=>{
        this.setState({
            isOpenModalUser:!this.state.isOpenModalUser,
        })
    }
    
    toggleUserEditModal =()=>{
        this.setState({
            isOpenModalEditUser:!this.state.isOpenModalEditUser,
        })
    }

    getAllUsersFromReact= async()=>{
        let response = await getAllUsers('all');
        if(response && response.errCode === 0){
            this.setState({
                arrUsers: response.users
            })
        }
    }

    createNewUser =async(data)=>{
        try {
            let response= await createNewUserService(data);
            if(response && response.errCode !==0){
                alert(response.errMessage)
            }else{
                await this.getAllUsersFromReact();
                this.setState({
                    isOpenModalUser:false,
                    arrUsers: [],
                })
            }
        } catch (e) {
            console.log(e)
        }
    }

    handleDeleteUser =async(user)=>{
        try {
            let res = await deleteUserService(user.id);
            if(res && res.errCode ===0){
                await this.getAllUsersFromReact();
            }
            else{
                alert(res.errMessage)
            }
        } catch (e) {
            console.log(e);
        }
    }

    handleEditUser =async(user)=>{
        console.log('check edit user-pen',user);
        this.setState({
            isOpenModalEditUser: true,
            userEdit: user
        })
    }

    doEditUser =async(user)=>{
       try {
            let res = await editUserService(user);
            if(res && res.errCode ===0){
                this.setState({
                    isOpenModalEditUser:false
                })
                await this.getAllUsersFromReact();
            }
            else{
                alert(res.errMessage)
            }
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        let arrUsers = this.state.arrUsers;
        return (
            <div className="users-center">
                <ModalUser
                    isOpen={this.state.isOpenModalUser}
                    toggleFormParent={this.toggleUserModal}
                    createNewUser={this.createNewUser}
                />
                {
                    this.state.isOpenModalEditUser &&
                    <ModalEditUser
                        isOpen={this.state.isOpenModalEditUser}
                        toggleFormParent={this.toggleUserEditModal}
                        currentUser={this.state.userEdit}
                        editUser={this.doEditUser}
                    />
                }
                
                <div className="title text-center">Manage users quangbeo</div>
                <div className='mx-1'>
                    <button className='btn btn-primary px-3'
                    onClick={()=>this.handleAddNewUser()}
                    
                    >Add New</button>

                </div>
                <div className='user-table mt-3 mx-1'>
                <table id="customers">
                    <tr>
                        <th>Email</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Address</th>
                        <th>Actions</th>
                    </tr>
                   
                        {
                            arrUsers && arrUsers.map((item,index)=>{
                                console.log(item,index)
                                return(
                                    <tr className='divClass'>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <button className='btn-edit' onClick={()=>this.handleEditUser(item)}><i class="fas fa-pencil-alt"></i></button>
                                            <button className='btn-delete' onClick={()=>this.handleDeleteUser(item)}><i class="fas fa-trash"></i></button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    
                    </table>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
