import axios from 'axios';

const baseURL = "http://localhost:8081/"

// Contact serivce API URLs
const GET_CONTACT_LIST = baseURL + 'person/list';
const ADD_CONTACT = baseURL + 'person/create';
const EDIT_CONTACT = baseURL + 'person/edit';
const DELETE_CONTACT = baseURL + 'person/delete';


class ContactSerivce {

    getContactList(){
        return axios.get(GET_CONTACT_LIST);
    }

    addContact(data){
        return axios.post(ADD_CONTACT,{
            firstName: data.firstName,
            lastName: data.lastName,
            emailAddress: data.email,
            streetAddress: data.streetAddress,
            city: data.city,
            state: data.state,
            zipCode: data.zip
        });
    }

    editContact(data){
        return axios.put(EDIT_CONTACT, {
            firstName: data.firstName,
            lastName: data.lastName,
            emailAddress: data.email,
            streetAddress: data.streetAddress,
            city: data.city,
            state: data.state,
            zipCode: data.zip
        });
    }

    deleteContact(contactId){
        return axios.delete(DELETE_CONTACT + "?personId=" + contactId);
    }



}

export default new ContactSerivce();