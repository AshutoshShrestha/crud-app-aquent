import axios from 'axios';

const baseURL = "http://localhost:8081/"

// Contact serivce API URLs
const GET_CLIENT_LIST = baseURL + 'client/list';
const ADD_CLIENT = baseURL + 'client/create';
const EDIT_CLIENT = baseURL + 'client/edit';
const DELETE_CLIENT = baseURL + 'client/delete';
const ADD_CONTACT_TO_CLIENT = baseURL + 'client/add-contact';
const DELETE_CONTACT_FROM_CLIENT = baseURL + 'client/delete-contact'

class ClientService {

    getClientList(){
        return axios.get(GET_CLIENT_LIST);
    }

    addClient(data){
        return axios.post(ADD_CLIENT,{
            name: data.name,
            phone: data.phone,
            companyURI: data.website,
            streetAddress: data.streetAddress,
            city: data.city,
            state: data.state,
            zipCode: data.zip
        });
    }

    editClient(data, clientId){
        return axios.put(EDIT_CLIENT, {
            clientId: clientId,
            name: data.name,
            phone: data.phone,
            companyURI: data.website,
            streetAddress: data.streetAddress,
            city: data.city,
            state: data.state,
            zipCode: data.zip
        });
    }

    deleteClient(clientId){
        return axios.delete(DELETE_CLIENT + "?clientId=" + clientId);
    }

    addContactToClient(clientId, contactId){
        return axios.post(ADD_CONTACT_TO_CLIENT);
    }

    deleteContactFromClient(clientId, contactId){
        return axios.post(DELETE_CONTACT_FROM_CLIENT);
    }
    
}

export default new ClientService();