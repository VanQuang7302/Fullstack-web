import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import _ from 'lodash';
class ModalEditUser extends Component {

    constructor(props){
        super(props);
        this.state ={
            id:'',
            email:'',
            password:'',
            firstName:'',
            lastName:'',
            address:''
        }
    }

    componentDidMount() {
        let user = this.props.currentUser;
        if(user && !_.isEmpty(user)) {
            this.setState({
                id: user.id,
                email: user.email,
                password:'hashcode',
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address    

            })
        }
        console.log('check did mount',this.props.currentUser)
    }
    toggle=()=>{
        this.props.toggleFormParent();
    }
    handleOnchangeInput=(event, id)=>{
        let copyState = {...this.state};
        copyState[id] = event.target.value;

        this.setState({
            ...copyState
        })
    }
    checkValideInput=()=>{
        let isValid =true;
        let arrInput =['email','password','firstName','lastName','address'];
        for(let i=0 ;i< arrInput.length;i++){
            if(!this.state[arrInput[i]]){
                isValid = false;
                alert('Missing parameter' +arrInput[i]);
                break;
            }
        }
        return isValid;
    }
    handleSaveUser =()=>{
        let isValid = this.checkValideInput();
        if(isValid ===true){
            this.props.editUser(this.state);
        }
    }

    render() {
        console.log('check edit',this.props)
        return (
            <Modal isOpen={this.props.isOpen} 
            toggle={()=>{this.toggle()}} 
            className={'modal-user-container'}
            size='lg'
            >
        <ModalHeader toggle={()=>{this.toggle()}}>Edit a new user</ModalHeader>
        <ModalBody>
          
                <div className='modal-user-body'>
                    <div className='input-container'>
                        <lable>Email</lable>
                        <input type='text' 
                        onChange={(event)=>{this.handleOnchangeInput(event,"email")}} 
                        value={this.state.email}
                        disabled
                        />
                    </div>
                    <div className='input-container'>
                        <lable>Password</lable>
                        <input type='password' 
                        onChange={(event)=>{this.handleOnchangeInput(event,"password")}}
                        value={this.state.password}
                        disabled
                        />
                    </div>
                    <div className='input-container'>
                        <lable>FirstName</lable>
                        <input type='text' 
                        onChange={(event)=>{this.handleOnchangeInput(event,"firstName")}}
                        value={this.state.firstName}
                        />
                    </div>
                    <div className='input-container'>
                        <lable>LastName</lable>
                        <input type='text' 
                        onChange={(event)=>{this.handleOnchangeInput(event,"lastName")}}
                        value={this.state.lastName}
                        />
                    </div>
                    <div className='input-container max-with-input'>
                        <lable>Address</lable>
                        <input type='text' 
                        onChange={(event)=>{this.handleOnchangeInput(event,"address")}}
                        value={this.state.address}
                        />
                    </div>
                </div>
          
        </ModalBody>
        <ModalFooter>
          <Button color="primary" className='px-3' onClick={()=>{this.handleSaveUser()}}>
            Save
          </Button>
          <Button color="secondary" className='px-3' onClick={()=>{this.toggle()}}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
