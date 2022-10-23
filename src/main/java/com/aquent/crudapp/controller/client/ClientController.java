package com.aquent.crudapp.controller.client;

import com.aquent.crudapp.model.client.Client;
import com.aquent.crudapp.service.client.ClientService;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

/**
 * Controller for handling basic client management operations
 */
@RestController
@RequestMapping("client")
@CrossOrigin
public class ClientController {

    private final ClientService clientService;

    public ClientController(ClientService clientService) {
        this.clientService = clientService;
    }

    /**
     * Sends all lists of clients
     *
     * @return list of clients
     */
    @GetMapping(value = "list")
    public List<Client> list() {
        return clientService.listClient();
    }

    /**
     * Validates and saves a new client.
     * On success, the client name is sent.
     * On failure, the validation errors are sent.
     *
     * @param client - a populated bean for client
     * @return client name as single-element list to check in frontend.
     */
    @PostMapping(value= "create")
    public List<String> create(@RequestBody Client client) {
        List<String> errors = clientService.validateClient(client);
        if(errors.isEmpty()) {
            clientService.createClient(client);
            List<String> successList = new ArrayList<>();
            successList.add(client.toString());
            return successList;
        }
        return errors;
    }

    /**
     * Validates and saves an edited client.
     * On success, the client name is sent.
     * On failure, the validation errors are sent.
     *
     * @param client - a populated bean for client
     * @return client name as single-element list to check in frontend.
     */
    @PutMapping(value = "edit")
    public List<String> edit(@RequestBody Client client) {
        List<String> errors = clientService.validateClient(client);
        if(errors.isEmpty()) {
            clientService.updateClient(client);
            List<String> successList = new ArrayList<>();
            successList.add(client.toString());
            return successList;
        }
        return errors;
    }

    /**
     * Handles client deletion
     *
     * @param clientId - ID of the client to be deleted
     * @return true if success, else false
     */
    @DeleteMapping(value = "delete")
    public boolean delete(@RequestParam Integer clientId) {
        try {
            clientService.deleteClient(clientId);
            return true;
        }
        catch(NoSuchElementException exp) {
            return false;
        }
    }
}

