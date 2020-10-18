import React from 'react';
import ReactDOM from 'react-dom';
import rules from './rules.jsx';
import lang from './lang.jsx';
import axios from 'axios';

import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import './index.css';

import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Dialog } from 'primereact/dialog';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Message } from 'primereact/message';


class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            usernameValue:'',
            usernameError:false,
            usernameMessage:'',
            passwordValue:'',
            passwordHidden:true,
            passwordError:false,
            passwordMessage:'',
            visible:false,
            displayErrorMessage:'none',
            errorMessage:''
        }

        this.passwordButton=this.passwordButton.bind(this);
        this.validate=this.validate.bind(this);
        this.send=this.send.bind(this);
    }

    componentDidMount(){
        document.title = lang.title;
    }


    passwordButton(){
        this.setState({
            passwordHidden:!this.state.passwordHidden
        })
    }

    validate(item){

        let props={};

        props[item.target.id+'Error']=!new RegExp(rules[item.target.id].pattern).test(item.target.value);

        props[item.target.id+'Value']=item.target.value.trim();

        this.setState(props);
    }

    async send(){

        if(this.state.usernameValue.length===0){

            await this.setState({
                'usernameError':true
            });
        }

        if(this.state.passwordValue.length===0){
            await this.setState({
                'passwordError':true
            });
        }

        if(this.state.usernameError || this.state.passwordError) return;

        await this.setState({
            visible:true,
            displayErrorMessage:'none'
        })

        axios.post('')
            .then(response=>{
                this.setState({
                    visible:false
                });
            })
            .catch(error=>{
                this.setState({
                    visible:false,
                    displayErrorMessage:'block',
                    errorMessage:error.message
                });
            })
    }

    render() {
        return (
            <>
                <Dialog
                    visible={this.state.visible}
                    showHeader={false}
                    position={'top'}
                    style={{transition:'none'}}
                    className='dialogContent'
                    modal={true}
                    closable={false}
                    onHide={()=>{}}>
                    <ProgressSpinner style={{width: '50px', height: '50px'}} strokeWidth="8" fill="#EEEEEE" animationDuration=".5s"/>
                </Dialog>
                <Card style={{width:'400px',background:'#fafafa',margin:'50px auto 0 auto'}}>
                    <div style={{marginBottom:'20px',textAlign:'center'}}>Logo</div>
                    <Message
                        severity="error"
                        text={this.state.errorMessage}
                        style={{
                            width:'100%',
                            display:this.state.displayErrorMessage,
                            marginBottom:'15px'
                        }}
                    />
                    <div className="p-grid p-fluid">
                        <div className="p-col-12 p-mt-3">
                            <div className="p-inputgroup">
                                <span className="p-inputgroup-addon">
                                    <i className="pi pi-user" />
                                </span>
                                <span className="p-float-label">
                                    <InputText
                                        id="username"
                                        className={this.state.usernameError ? 'p-invalid':''}
                                        value={this.state.usernameValue}
                                        onChange={this.validate}
                                        autoFocus/>
                                    <label htmlFor="username">{lang.input_korisnicko_ime}</label>
                                </span>
                            </div>
                            {
                                this.state.usernameError ?
                                    <small className="p-invalid">{rules.username.message}</small>:
                                    ''
                            }
                        </div>
                        <div className="p-col-12 p-mt-3">
                            <div className="p-inputgroup">
                                <span className="p-inputgroup-addon">
                                    <i className="pi pi-lock" />
                                </span>
                                <span className="p-float-label">
                                    <InputText
                                        id="password"
                                        className={this.state.passwordError ? 'p-invalid':''}
                                        type={this.state.passwordHidden ? 'password':'text'}
                                        value={this.state.passwordValue}
                                        onChange={this.validate}/>
                                    <label htmlFor="password">{lang.input_lozinka}</label>
                                </span>
                                <Button
                                    icon={'pi ' + (this.state.passwordHidden ? 'pi-eye-slash':'pi-eye')}
                                    className="p-button-secondary"
                                    onClick={this.passwordButton}
                                />
                            </div>
                            {
                                this.state.passwordError ?
                                    <small className="p-invalid">{rules.password.message}</small>:
                                    ''
                            }
                        </div>
                        <div className="p-col-12 p-mt-3">
                            <Button label="Prijavi se" className="p-button-secondary" onClick={this.send} />
                        </div>
                    </div>
                </Card>
                <div className="footer">&#169;{new Date().getFullYear()}</div>
            </>
        )
    }
}

ReactDOM.render(<LoginForm />, document.getElementById('root'));