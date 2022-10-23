package com.aquent.crudapp.service.client;

import com.aquent.crudapp.dao.client.ClientDao;
import com.aquent.crudapp.model.client.Client;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import javax.validation.ConstraintViolation;
import javax.validation.Validator;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Set;

/**
 * Default implementations of {@link ClientService}
 */
@Component
public class DefaultClientService implements ClientService {

    private final ClientDao clientDao;
    private final Validator validator;

    public DefaultClientService(ClientDao clientDao, Validator validator) {
        this.clientDao = clientDao;
        this.validator = validator;
    }

    @Override
    @Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
    public List<Client> listClient() {
        return clientDao.listClient();
    }


    @Override
    @Transactional(propagation = Propagation.SUPPORTS, readOnly = false)
    public Integer createClient(Client client) {
        return clientDao.createClient(client);
    }

    @Override
    @Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
    public Client readClient(Integer clientId) {
        return clientDao.readClient(clientId);
    }

    @Override
    @Transactional(propagation = Propagation.SUPPORTS, readOnly = false)
    public void updateClient(Client client) {
        clientDao.updateClient(client);
    }

    @Override
    @Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
    public void deleteClient(Integer clientId) {
        clientDao.deleteClient(clientId);
    }

    @Override
    public List<String> validateClient(Client client) {
        Set<ConstraintViolation<Client>> violations = validator.validate(client);
        List<String> errors = new ArrayList<String>(violations.size());
        for (ConstraintViolation<Client> violation : violations) {
            errors.add(violation.getMessage());
        }
        Collections.sort(errors);
        return errors;
    }
}