import React, { Component } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/es/Typography/Typography";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import {TextField} from "@material-ui/core";
import axios from 'axios';
import QRcode from 'qrcode.react';

// import logo from "./"; {/*add streetcred logo*/}

axios.defaults.baseURL = 'http://localhost:3002/';
export class App extends Component {
    state = {
            name: "",
            title: "",
            org: "",
            phone: "",
            email: "",

        qr_open: false,
        qr_placeholder: "",
        invite_url: "",
    };

    onIssue = () => {
        const bizCard = {
            name: this.state.name, 
            title: this.state.title,
            org: this.state.org,
            phone: this.state.phone,
            email: this.state.email
        }  
        console.log(bizCard)
        axios.post('/api/issue', bizCard).then((response) => {
            console.log(response);
            this.setState({invite_url: "https://web.cloud.streetcred.id/link/?c_i=" + response.data.invite_url});
        });
        this.setState({
          qr_open: true,
          qr_placeholder: this.state,
        })
    }

    render() {
       const card = this.state
      return (
            <div >
                {/* The AppBar */}
                <AppBar position="static">
                    <Toolbar style={{backgroundColor: '#812bff'}}>
                        <img style={{}}/>
                        <Typography variant="h6"> 
                            Streetcred API Demo
                        </Typography>
                        <div style={{flexGrow: 1}}></div>
                        <Button href="https://www.streetcred.id" style={{color: 'white'}}>
                            Streetcred
                        </Button> 
                    </Toolbar>
                </AppBar>

                 {/* The Paper */}
                 <div style={{display: 'flex', justifyContent: 'center'}}>
                    <Paper style={{display: 'flex', maxWidth: '600px', width: '100%', margin: '40px', padding: 40}}>
                        <div style={{display: 'flex', padding: '24px 24px', flexDirection: 'column', width: '100%'}}>
                            <div style={{display: 'flex', marginBottom: '24px'}}>
                                <Typography variant="h5" style={{flexGrow: 1}}>
                                    Create your Business Card Credential
                                </Typography>
                                
                                
                            </div>
                            
                            <TextField  
                              id="name"
                              label="name"
                              placeholder={"what's your name?"}
                              value={card.name}
                              onChange={(e) => this.setState({name: e.target.value})}
                              style={{marginBottom: '12px'}}
                              />
                            <TextField  
                              id="title"
                              label="title"
                              placeholder={"what's your title?"} 
                              value={card.title}
                              onChange={(e) => this.setState({title: e.target.value})}
                              style={{marginBottom: '12px'}}
                              />
                            <TextField  
                              id="org"
                              label="org"
                              placeholder={"where do you work?"} 
                              value={card.org}
                              onChange={(e) => this.setState({org: e.target.value})}
                              style={{marginBottom: '12px'}}
                              />
                            <TextField  
                              id="phone"
                              label="phone"
                              placeholder={"what's your #?"} 
                              value={card.phone}
                              onChange={(e) => this.setState({phone: e.target.value})}
                              style={{marginBottom: '12px'}}
                              />
                            <TextField  
                              id="email"
                              label="email"
                              placeholder={"what's your email?"} 
                              value={card.email}
                              onChange={(e) => this.setState({email: e.target.value})}
                              style={{marginBottom: '36px'}}
                              />
                            <Button   style={{backgroundColor: '#9b84ff'}}
                                      onClick={() => this.onIssue()}>
                                Issue Credential
                            </Button>
                        </div>
                    </Paper>
                </div>
                <Dialog open={this.state.qr_open} onClose={() => this.setState({qr_open: false})}>
                    <DialogTitle style={{width: "300px"}}>Scan this QR code</DialogTitle>
                    <QRcode size="200" value={this.state.invite_url} style={{margin: "0 auto", padding: "10px"}} />
                </Dialog>
            </div>
        )
    }
}
