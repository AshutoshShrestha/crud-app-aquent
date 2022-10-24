import React, { useEffect } from "react";
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

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

import DialogTitle from "@material-ui/core/DialogTitle";

import ContactService from "../services/ContactService";
import { Button, Divider, IconButton, InputLabel, List, ListItem, ListItemSecondaryAction, ListItemText, TextField } from "@mui/material";
import { MenuItem, Select } from "@material-ui/core";


export default function Contact(){
    const [showContactDetail, setShowContactDetail] = React.useState(false);
    const [contactsList, setcontactsList] = React.useState({});
    const [contactId, setContactId] = React.useState(0);
    const [currentValue, setCurrentValue] = React.useState(0);

    const defaultAddFormValues = {
        firstName: "",
        lastName: "",
        email: "",
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

    const handleAddContactSubmit = (e) =>{
        console.log(addFormValues);
        if(validateAddFormData()){
            ContactService.addContact(addFormValues)
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

    const showAddContactForm = () => {
        setShowAddForm(true);
    };
    
    const hideAddContactForm = () => {
        setShowAddForm(false);
    };

    // edit form code 
    const defaultEditFormValues = {
        firstName: "",
        lastName: "",
        email: "",
        streetAddress: "",
        city: "",
        state: "",
        zip: 0,
        clientId: "",
    };
        
    const [showEditForm, setShowEditForm] = React.useState(false); 

    const [editFormValues, seteditFormValues] = React.useState(defaultEditFormValues);

    const handleEditInputChange = (e) => {
        seteditFormValues({
            ...editFormValues,

        });
    };

    const validateEditFormData = () =>{
        return false;
    }


    const handleEditContactSubmit = ()=>{
        console.log(editFormValues);
        if(validateEditFormData()){
            ContactService.editContact(editFormValues)
            .then((response)=>{
    
    
                            
                console.log(response);
                window.location.reload();
                })
                .catch(error=>{
                
                })
        }
        else{
            return false;
        }  
    }

    const showEditContactForm = (contactIndex) => {
        setContactId(contactIndex);
        setShowEditForm(true);
        };
    
    const hideEditContactForm = () => {
    setShowEditForm(false);
    };

    const showContact = (index) => {
        setContactId(index);
        setShowContactDetail(true);
    };
    
    const hideContact = () => {
        setShowContactDetail(false);
    };
    
    const getClientByContact = () =>{
        return "Windows";
    };

    const getClients = () => {
        return [];
    }

    const deleteContact = (currContactId) =>{
        confirmAlert({
            title: 'Confirm Delete',
            message: 'Are you sure that you want to delete this contact?',
            buttons: [
              {
                label: 'Yes',
                onClick: () => {
                    ContactService.deleteContact(currContactId)
                        .then((response)=>{
                            window.location.reload();
                        })
                        .catch(error=>{
                        
                        })
                  }
                }
              ]
            });
    };

    // [
    //     createContactData(
    //         'Kristen',
    //         'Stewart',
    //         'fake6@aquent.com',
    //         '123 Any St.'
    //     ),
    //     createContactData(
    //         'Harry',
    //         'Weasley',
    //         'fake7@aquent.com',
    //         '123 Any St.'
    //     ),
    //     createContactData(
    //         'Dwyane',
    //         'Cena',
    //         'fake8@aquent.com',
    //         '123 Any St.'
    //     ),
    //     createContactData(
    //         'Tommy',
    //         'Stark',
    //         'fake2@aquent.com',
    //         '123 Any St.'
    //     ),
    //     createContactData(
    //         'Jane',
    //         'Smith',
    //         'fake3@aquent.com',
    //         '123 Any St.'
    //     ),
    //     createContactData(
    //         'Harry',
    //         'Weasley',
    //         'fake7@aquent.com',
    //         '123 Any St.'
    //     ),
    //     createContactData(
    //         'Dwyane',
    //         'Cena',
    //         'fake8@aquent.com',
    //         '123 Any St.'
    //     ),
    //     createContactData(
    //         'Tommy',
    //         'Stark',
    //         'fake2@aquent.com',
    //         '123 Any St.'
    //     ),
    //     createContactData(
    //         'Jane',
    //         'Smith',
    //         'fake3@aquent.com',
    //         '123 Any St.'
    //     ),
    //     createContactData(
    //         'Harry',
    //         'Weasley',
    //         'fake7@aquent.com',
    //         '123 Any St.'
    //     ),
    //     createContactData(
    //         'Dwyane',
    //         'Cena',
    //         'fake8@aquent.com',
    //         '123 Any St.'
    //     ),
    //      createContactData(
    //         'Tommy',
    //         'Stark',
    //         'fake2@aquent.com',
    //         '123 Any St.'
    //     ),
    //     createContactData(
    //         'Jane',
    //         'Smith',
    //         'fake3@aquent.com',
    //         '123 Any St.'
    //     )
    // ];

    useEffect(()=>{
        ContactService.getContactList()
            .then(function (response) {
                setcontactsList(response.data);
                // console.log(contactsList[0]['firstName']);
                // contactsList.map((contact)=>{
                //     console.log(contact);
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
    return(
        <div class="contact-container">            
            <TableContainer component={Paper}>
                <div class="table-title">
                    <h3>Contacts</h3>
                </div>
                <div className="btn-container" style={{textAlign:'right'}}>
                    <Button 
                        color="primary" 
                        variant="contained" 
                        startIcon={<AddIcon />} 
                        onClick={()=>showAddContactForm()}
                    >
                        New Contact
                    </Button>
                </div>
                <Table aria-label="simple table">
                
                <TableHead>
                    <TableRow>
                    <TableCell style={{ width: "5%" }}align="left">S.N.</TableCell>
                    <TableCell style={{ width: "50%" }} align="left">Name</TableCell>
                    <TableCell align="left">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {Object.values(contactsList).map((contact, index) => (
                    <TableRow>
                        <TableCell align="left" component="th" scope="row">
                        {index+1}
                        </TableCell>
                        <TableCell className="contact-name" align="left" onClick={()=> showContact(index)}>{contact['firstName'] + " " + contact['lastName']}</TableCell>
                        <TableCell align="left">
                            <IconButton edge="end" aria-label="delete" onClick={()=>deleteContact(contact['personId'])}>
                                <DeleteIcon />
                            </IconButton>
                            <IconButton edge="end" aria-label="edit" onClick={()=>showEditContactForm()}>
                                <EditIcon />
                        </IconButton>
                        </TableCell>
                    </TableRow>
                ))}
                </TableBody>
                </Table>
            </TableContainer>
            <Dialog open={showContactDetail} onClose={hideContact}>
                <DialogTitle>
                    <div className="contact-title">
                        Contact Detail
                    </div>
                </DialogTitle>
                <Divider/>
                <DialogContent>
                    <DialogContentText>
                        <div className="contact-body">
                            { Object.keys(contactsList).length !== 0? 
                            <div>
                                <h4> First name: {Object.keys(contactsList).length !== 0? contactsList[contactId]['firstName'] : null} </h4>
                                <h4> Last name: {contactsList[contactId]['lastName']} </h4>
                                <h4> Email Address: {contactsList[contactId]['emailAddress']} </h4>
                                <h4> Physical Address: {
                                contactsList[contactId]['streetAddress'] + ", " + 
                                contactsList[contactId]['city'] + ", " + 
                                contactsList[contactId]['state'] + ", " +
                                contactsList[contactId]['zipCode'] 
                                } </h4> 
                                <h4> Company: {getClientByContact(contactsList[contactId]['personId'])}</h4>
                            </div> : null
                        }
                        </div>
                        <Divider/>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {/* <Button 
                        style={{width:'50%', textAlign:'right'}}
                        color="primary"
                        variant="contained" 
                        startIcon={<AddIcon />} 
                        onClick={()=>addContactToClient()}
                    >
                        Add Contact
                    </Button> */}
                    {/* <Button onClick={()=>editContact()} 
                            variant="contained" 
                            color="primary" autoFocus>
                        Edit
                    </Button> */}
                </DialogActions>
            </Dialog>
            <Dialog open={showAddForm} onClose={hideAddContactForm}>
                <DialogTitle>Add New Contact</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    Please enter the details of the new contact.
                </DialogContentText>
                
                <TextField
                    autoFocus
                    margin="dense"
                    name="firstName"
                    label="First Name"
                    type="text"
                    value={addFormValues.firstName}
                    variant="standard"
                    onChange={handleAddInputChange}
                    fullWidth
                />
                <TextField
                    autoFocus
                    margin="dense"
                    name="lastName"
                    label="Last Name"
                    type="text"
                    value={addFormValues.lastName}
                    variant="standard"
                    onChange={handleAddInputChange}
                    fullWidth
                />
                <TextField
                    autoFocus
                    margin="dense"
                    name="email"
                    label="Email Address"
                    type="text"
                    value={addFormValues.email}
                    variant="standard"
                    onChange={handleAddInputChange}
                    fullWidth
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
                <Button onClick={()=>{handleAddContactSubmit()}}>Add</Button>
                <Button onClick={hideAddContactForm}>Cancel</Button>
                </DialogActions>
            </Dialog>
            {/* Edit form */}
            
            <Dialog open={showEditForm} onClose={hideEditContactForm}>
                <DialogTitle>Edit Contact</DialogTitle>
                {Object.keys(contactsList).len!== 0?
                <DialogContent>
                    <DialogContentText>
                        Please add the new details of the contact below.
                    </DialogContentText>
                    
                    <TextField
                        autoFocus
                        margin="dense"
                        name="firstName"
                        label="First Name"
                        type="text"
                        value={editFormValues.firstName}
                        variant="standard"
                        onChange={handleEditInputChange}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        name="lastName"
                        label="Last Name"
                        type="text"
                        value={editFormValues.lastName}
                        variant="standard"
                        onChange={handleEditInputChange}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        name="email"
                        label="Email Address"
                        type="text"
                        value={editFormValues.email}
                        variant="standard"
                        onChange={handleEditInputChange}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        name="streetAddress"
                        label="Street Address"
                        type="text"
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
                        value={editFormValues.zip}
                        variant="standard"
                        onChange={handleEditInputChange}
                        fullWidth
                    /> 
                                 
                    <InputLabel>
                        Edit Client</InputLabel>
                        <Select
                        value={currentValue}
                        // onChange={setRemoveContact()}
                        style={{
                            width: 400,
                        }}
                        onClick={(e)=> {
                            console.log("Contact to be removed")
                            // setCurrentValue(e.target.value)
                        }}
                    >
                    {getClients().map((contact)=>{
                        return (<MenuItem value={contact.personId}
                        >{contact.firstName + " " + contact.lastName}</MenuItem>);
                        })
                    }
                    </Select>
                </DialogContent>:null }
                <DialogActions>
                <Button onClick={()=>{handleEditContactSubmit()}}>Save</Button>
                <Button onClick={hideEditContactForm}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}