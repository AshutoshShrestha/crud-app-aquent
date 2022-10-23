package com.aquent.crudapp.dao.client;

import com.aquent.crudapp.model.client.Client;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Operations on the "client" table
 */
@Repository
public interface ClientDao {

    /**
     * Retrieves all of the clients record.
     *
     * @return list of client record
     */
    List<Client> listClient();

    /**
     * Creates a new client record
     *
     * @param client the values to save
     * @return the new client ID
     */
    Integer createClient(Client client);

    /**
     * Retrieves a client record by ID.
     *
     * @param clientId the client ID
     */
    Client readClient(Integer clientId);

    /**
     * Updates an existing client record.
     *
     * @param client the new values to save
     */
    void updateClient(Client client);

    /**
     * Deletes a client record by ID
     *
     * @param clientId the client ID
     */
    void deleteClient(Integer clientId);
}