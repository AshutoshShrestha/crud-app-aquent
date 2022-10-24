import React, { useEffect } from "react";
import {useNavigate} from "react-router-dom"

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';


import { Divider, IconButton, List, ListItem, InputLabel, ListItemSecondaryAction, ListItemText, MenuItem, Select, TextField } from "@mui/material";
import { Box } from "@mui/system";
import ClientService from "../services/ClientService";

export default function Client(){
    const [showDetail, setShowDetail] = React.useState(false);
    const [clientIndex, setclientIndex] = React.useState(0);
    const [clientsList, setclientsList] = React.useState({});

    // add form code
    const defaultAddFormValues = {
        name: "",
        website: "",
        phone: 0,
        streetAddress: "",
        city: "",
        state: "",
        zip: 0
      };

    const [showAddForm, setShowAddForm] = React.useState(false);
    const [addFormValues, setaddFormValues] = React.useState(defaultAddFormValues);

    const handleAddInputChange = (e) => {
        setaddFormValues({
            ...addFormValues,
            // Trimming any whitespace

            [e.target.name]: e.target.value.trim(),
		});
    };

    const validateAddFormData = () =>{
        return true;
    }

    const handleAddClientSubmit = (e) =>{
        console.log(addFormValues);
        if(validateAddFormData()){
            ClientService.addClient(addFormValues)
            .then((response)=>{
    
                // client has been added alert
                window.location.reload();

                console.log(response);
              })
              .catch(error=>{
                // something went wrong alert
              })
        }
        else{
           return false;
        }
    }

    const showAddClientForm = () => {
      setShowAddForm(true);
    };
  
    const hideAddClientForm = () => {
      setShowAddForm(false);
    };

    // edit form code 
    const defaultEditFormValues = {
        name: "",
        website: "",
        phone: 0,
        streetAddress: "",
        city: "",
        state: "",
        zip: 0
    };
      
    const [showEditForm, setShowEditForm] = React.useState(false); 

    const [editFormValues, seteditFormValues] = React.useState(defaultEditFormValues);

    const handleEditInputChange = (e) => {
        seteditFormValues({
            ...editFormValues,

			// Trimming any whitespace

			[e.target.name]: e.target.value.trim(),
		});
    };

    const validateEditFormData = () =>{
        return true;
    }


    const handleEditClientSubmit = ()=>{
        console.log(editFormValues);
        if(validateEditFormData()){
            ClientService.editClient(editFormValues)
            .then((response)=>{
    
                // client has been updated alert
                            
                console.log(response);
              })
              .catch(error=>{
                // something went wrong alert
              })
        }
        else{
           return false;
        }  
    }

    const showEditClientForm = (clientIndex) => {
        setclientIndex(clientIndex);
        setShowEditForm(true);
      };
    
    const hideEditClientForm = () => {
    setShowEditForm(false);
    };

    // show client detail code
    const showClient = (clientIndex) => {
        setclientIndex(clientIndex);
        setShowDetail(true);
    };
    
    const hideClientDetail = () => {
        setShowDetail(false);
    };

    const addContactToClient = () => {

    }

    const deleteClient = (clientId) =>{
        confirmAlert({
            title: 'Confirm Delete',
            message: 'Are you sure that you want to delete this client?',
            buttons: [
              {
                label: 'Yes',
                onClick: () => {
                  ClientService.deleteClient(clientId)
                    .then((response)=>{ 
                        window.location.reload();
                    })
                    .catch(error=>{
                        // add something went wrong alert
                    })
                  }
                }
              ]
            });
    };

    const getAssociatedContacts = () =>{
        return [];
    }

    const getUnassociatedContacts = () =>{
        return [];
    }

    const deleteContactFromClient = (clientId, index) =>{
        
        // console.log(clientsList[clientIndex]['contactList'][index].firstname + "\'s contact deleted.")
    }

    useEffect(()=>{
        ClientService.getClientList()
            .then(function (response) {
                setclientsList(response.data);
                // console.log(contactsList[0]['firstName']);
                // response.data.map((object)=>{
                //     console.log(Object.keys(object));
                // })
                // console.log("All people: " + response.data);
            })  
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
                // always executed
            }); 
    },[])
    const [currentValue, setCurrentValue] = React.useState(0);
    return(
        <div class="client-container">            
            <TableContainer component={Paper}>
                <div className="table-title">
                    <h3>Clients</h3>
                </div>
                <div className="btn-container" style={{textAlign:'right'}}>
                    <Button 
                        color="primary" 
                        variant="contained" 
                        startIcon={<AddIcon />} 
                        onClick={()=>showAddClientForm()}
                    >
                        New Client
                    </Button>
                </div>
                <Table aria-label="simple table">        
                <TableHead>
                    <TableRow>
                    <TableCell style={{ width: "25%" }} align="left">S.N.</TableCell>
                    <TableCell style={{ width: "60%" }} align="left">Company Name</TableCell>
                    <TableCell align="left">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {Object.keys(clientsList).length !== 0? 
                    Object.values(clientsList).map((client, index) => {
                     return (<TableRow >
                        <TableCell align="left" component="th" scope="row">
                        {index+1}
                        </TableCell>
                        <TableCell align="left">
                            <Box className='client-name-box'
                            onClick={()=> showClient(index)}
                            sx={{
                                display: 'flex',
                                '& > :not(style)': {
                                m: 2,
                                width: 200,
                                height: 50,
                                },
                            }}>
                                <div className="client-name">
                                    {client.name}
                                </div>
                            </Box>
                        </TableCell>
                        <TableCell align="left">
                            <IconButton edge="end" aria-label="delete" className="icon-btn" onClick={()=>deleteClient(client.clientId)}>
                                <DeleteIcon />
                            </IconButton>
                            <IconButton edge="end" aria-label="edit" className="icon-btn" onClick={()=>showEditClientForm(index)}>
                                <EditIcon />
                        </IconButton>
                        </TableCell>
                    </TableRow>)
                    }): null}
                </TableBody>
                </Table>
            </TableContainer>
            <Dialog open={showDetail} onClose={hideClientDetail}>
                <DialogTitle>
                    <div className="client-title">
                        {Object.keys(clientsList).length !== 0? clientsList[clientIndex]['name'] : null}
                    </div>
                </DialogTitle>
                <Divider/>
                <DialogContent>
                    <DialogContentText>
                        <div className="client-body">
                            <h4> Website: {Object.keys(clientsList).length !== 0? clientsList[clientIndex]['companyURI']:null} </h4>
                            <h4> Phone: {Object.keys(clientsList).length !== 0? clientsList[clientIndex]['phone']:null} </h4>
                            <h4> Shipping Address: {Object.keys(clientsList).length !== 0? clientsList[clientIndex]['streetAddress'] + ", " 
                                + clientsList[clientIndex]['city'] + ", " 
                                + clientsList[clientIndex]['state'] + ", " 
                                + clientsList[clientIndex]['zipCode']:null} </h4>
                        </div>
                        <Divider/>
                        <div className="client-contacts">
                            <div className="contacts-title">
                                <h4> Contacts </h4>
                                
                            </div>
                            <Paper style={{maxHeight: 200, overflow: 'auto'}}>
                                <List dense={true} >
                                    {

                                        // clientsList[clientIndex]['contactList'].map((contact, index) => {
                                        //     return (
                                        //     <>
                                        //         <ListItem
                                        //             key = {index}
                                        //             >
                                        //             <ListItemText primary={contact.firstname + " " + contact.lastname}/>
                                        //             <ListItemSecondaryAction>
                                        //                 <IconButton edge="end" aria-label="delete" onClick={()=>deleteContactFromClient(clientIndex, index)}>
                                        //                     <DeleteIcon />
                                        //                 </IconButton>
                                        //             </ListItemSecondaryAction>
                                        //         </ListItem>
                                        //         <Divider/>
                                        //     </>);
                                        // })
                                    }                               
                                </List>
                            </Paper>
                        <div>
                       </div>  
                        </div>    
                    </DialogContentText>
                </DialogContent>
            </Dialog>

{/* Add form */}

            <Dialog open={showAddForm} onClose={hideAddClientForm}>
                <DialogTitle>Add New Client</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    Please enter the details of the client.
                </DialogContentText>
                
                <TextField
                    autoFocus
                    margin="dense"
                    name="name"
                    label="Company Name"
                    type="text"
                    value={addFormValues.name}
                    variant="standard"
                    onChange={handleAddInputChange}
                    fullWidth
                />
                <TextField
                    autoFocus
                    margin="dense"
                    name="website"
                    label="Website URI"
                    type="text"
                    value={addFormValues.website}
                    variant="standard"
                    onChange={handleAddInputChange}
                    fullWidth
                />
                <TextField
                    autoFocus
                    margin="dense"
                    name="phone"
                    label="Phone Number"
                    type="number"
                    value={addFormValues.phone}
                    variant="standard"
                    onChange={handleAddInputChange}
                    
                />
                <TextField
                    autoFocus
                    margin="dense"
                    name="streetAddress"
                    label="Street Address"
                    type="text"
                    value={addFormValues.streetAddress}
                    variant="standard"
                    onChange={handleAddInputChange}
                    fullWidth
                /> 
                <TextField
                    autoFocus
                    margin="dense"
                    name="city"
                    label="City"
                    type="text"
                    value={addFormValues.city}
                    variant="standard"
                    onChange={handleAddInputChange}
                /> 
                <TextField
                    autoFocus
                    margin="dense"
                    name="state"
                    label="State"
                    type="text"
                    value={addFormValues.state}
                    variant="standard"
                    onChange={handleAddInputChange}
                /> 
                <TextField
                    autoFocus
                    margin="dense"
                    name="zip"
                    label="ZIP"
                    type="number"
                    value={addFormValues.zip}
                    variant="standard"
                    onChange={handleAddInputChange}
                    fullWidth
                /> 
                </DialogContent>
                <DialogActions>
                <Button onClick={()=>{handleAddClientSubmit()}}>Add</Button>
                <Button onClick={hideAddClientForm}>Cancel</Button>
                </DialogActions>
            </Dialog>

{/* Edit form */}
            
            <Dialog open={showEditForm} onClose={hideEditClientForm}>
                <DialogTitle>Edit Client</DialogTitle>
                {Object.keys(clientsList).len!== 0?
                <DialogContent>
                    <DialogContentText>
                        Please add the new details of the client below.
                    </DialogContentText>
                    
                
                    <TextField
                        autoFocus
                        margin="dense"
                        name="name"
                        label="Company Name"
                        type="text"
                        // placeholder={clientsList[clientIndex]['name']}
                        value={editFormValues.name}
                        variant="standard"
                        onChange={handleEditInputChange}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        name="website"
                        label="Website URI"
                        type="text"
                        // placeholder={clientsList[clientIndex]['companyURI']}
                        value={editFormValues.website}
                        variant="standard"
                        onChange={handleEditInputChange}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        name="phone"
                        label="Phone"
                        type="number"
                        // placeholder={typeof (clientsList[clientIndex]['phone']) !== 'undefined'? clientsList[clientIndex]['phone']:''}
                        value={editFormValues.phone}
                        variant="standard"
                        onChange={handleEditInputChange}
                        
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        name="streetAddress"
                        label="Street Address"
                        type="text"
                        // placeholder={Object.keys(clientsList).len !== 0? clientsList[clientIndex]['streetAddress']:null}
                        value={editFormValues.streetAddress}
                        variant="standard"
                        onChange={handleEditInputChange}
                        fullWidth
                    /> 
                    <TextField
                        autoFocus
                        margin="dense"
                        name="city"
                        label="City"
                        type="text"
                        // placeholder={Object.keys(clientsList).len !== 0? clientsList[clientIndex]['city']:null}
                        value={editFormValues.city}
                        variant="standard"
                        onChange={handleEditInputChange}
                    /> 
                    <TextField
                        autoFocus
                        margin="dense"
                        name="state"
                        label="State"
                        type="text"
                        // placeholder={Object.keys(clientsList).len !== 0? clientsList[clientIndex]['state']:null}
                        value={editFormValues.state}
                        variant="standard"
                        onChange={handleEditInputChange}
                    /> 
                    <TextField
                        autoFocus
                        margin="dense"
                        name="zip"
                        label="ZIP"
                        type="number"
                        // placeholder={Object.keys(clientsList).len !== 0? clientsList[clientIndex]['zipCode']:null}
                        value={editFormValues.zip}
                        variant="standard"
                        onChange={handleEditInputChange}
                        fullWidth
                    /> 
                    <InputLabel>
                        Add Contact</InputLabel>
                    <Select
                        style={{
                            width: 400,
                        }}
                        onClick={(e)=> {
                            console.log("Client to be added")
                            setCurrentValue(e.target.value)
                        }}
                    >
                    {getAssociatedContacts().map((contact)=>{
                        <MenuItem value={contact.personId}
                        >{contact.firstName + " " + contact.lastName}</MenuItem>
                        })
                    }
                    </Select>
                                 
                    <InputLabel>
                        Remove Contact</InputLabel>
                        <Select
                        name="remove-client"
                        // onChange={setRemoveClient()}
                        style={{
                            width: 400,
                        }}
                        onClick={(e)=> {
                            console.log("Client to be removed")
                            setCurrentValue(e.target.value)
                        }}
                    >
                    {getUnassociatedContacts().map((contact)=>{
                        return (<MenuItem value={contact.personId}
                        >{contact.firstName + " " + contact.lastName}</MenuItem>);
                        })
                    }
                    </Select>
                </DialogContent>:null }
                <DialogActions>
                <Button onClick={()=>{handleEditClientSubmit()}}>Save</Button>
                <Button onClick={hideEditClientForm}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}