package com.aquent.crudapp.dao.person;

import com.aquent.crudapp.model.person.Person;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.BeanPropertySqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Spring JDBC implementation of {@link PersonDao}.
 */
@Component
public class JdbcPersonDao implements PersonDao {

    private static final String SQL_LIST_PEOPLE =
            "SELECT * FROM person " +
                    "ORDER BY first_name, last_name, person_id";

    private static final String SQL_READ_PERSON =
            "SELECT * FROM person " +
                    "WHERE person_id = :personId";

    private static final String SQL_DELETE_PERSON =
            "DELETE FROM person " +
                    "WHERE person_id = :personId";

    private static final String SQL_UPDATE_PERSON =
            "UPDATE person SET " +
                    "(first_name, last_name, email_address, street_address, city, state, zip_code)"
                  + " = (:firstName, :lastName, :emailAddress, :streetAddress, :city, :state, :zipCode)"
                  + " WHERE person_id = :personId";

    private static final String SQL_CREATE_PERSON =
            "INSERT INTO person " +
                    "(first_name, last_name, email_address, street_address, city, state, zip_code)"
                  + " VALUES (:firstName, :lastName, :emailAddress, :streetAddress, :city, :state, :zipCode)";

    private static final String SQL_LIST_CLIENT_CONTACTS =
            "SELECT * FROM person " +
                    "WHERE client_id = :clientId";

    public static final String SQL_LIST_UNASSOCIATED_CLIENTS =
            "SELECT * FROM person " +
                    "WHERE client_id = NULL";

    public static final String SQL_UPDATE_CLIENT_IN_PERSON =
            "UPDATE person " +
                    "SET client_id = :clientId WHERE person_id = :personId";

    public static final String SQL_DELETE_CLIENT_FROM_PERSON=
            "UPDATE person " +
                    "SET client_id = NULL WHERE person_id = :personId";

    private final NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    public JdbcPersonDao(NamedParameterJdbcTemplate namedParameterJdbcTemplate) {
        this.namedParameterJdbcTemplate = namedParameterJdbcTemplate;
    }

    @Override
    @Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
    public List<Person> listPeople() {
        return namedParameterJdbcTemplate.getJdbcOperations().query(SQL_LIST_PEOPLE, new PersonRowMapper());
    }

    @Override
    @Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
    public Person readPerson(Integer personId) {
        return namedParameterJdbcTemplate.queryForObject(SQL_READ_PERSON, Collections.singletonMap("personId", personId), new PersonRowMapper());
    }

    @Override
    @Transactional(propagation = Propagation.SUPPORTS, readOnly = false)
    public void deletePerson(Integer personId) {
        namedParameterJdbcTemplate.update(SQL_DELETE_PERSON, Collections.singletonMap("personId", personId));
    }

    @Override
    @Transactional(propagation = Propagation.SUPPORTS, readOnly = false)
    public void updatePerson(Person person) {
        namedParameterJdbcTemplate.update(SQL_UPDATE_PERSON, new BeanPropertySqlParameterSource(person));
    }

    @Override
    @Transactional(propagation = Propagation.SUPPORTS, readOnly = false)
    public Integer createPerson(Person person) {
        KeyHolder keyHolder = new GeneratedKeyHolder();
        namedParameterJdbcTemplate.update(SQL_CREATE_PERSON, new BeanPropertySqlParameterSource(person), keyHolder);
        return keyHolder.getKey().intValue();
    }

    @Override
    @Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
    public List<Person> listAssociatedContacts(Integer clientId) {
        return namedParameterJdbcTemplate.query(SQL_LIST_CLIENT_CONTACTS, Collections.singletonMap("clientId", clientId), new PersonRowMapper());
    }

    @Override
    @Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
    public List<Person> listUnassociatedContacts() {
        return namedParameterJdbcTemplate.getJdbcOperations().query(SQL_LIST_UNASSOCIATED_CLIENTS, new PersonRowMapper());
    }

    @Override
    @Transactional(propagation = Propagation.SUPPORTS, readOnly = false)
    public int addClientToPerson(Integer personId, Integer clientId) {
        Map mapper = new HashMap();
        mapper.put("personId", personId);
        mapper.put("clientId", clientId);
        return namedParameterJdbcTemplate.update(SQL_UPDATE_CLIENT_IN_PERSON, mapper);
    }

    @Override
    @Transactional(propagation = Propagation.SUPPORTS, readOnly = false)
    public int deleteAssociatedClient(Integer personId) {
        return namedParameterJdbcTemplate.update(SQL_DELETE_CLIENT_FROM_PERSON, Collections.singletonMap("personId", personId));
    }

    /**
     * Row mapper for person records.
     */
    private static final class PersonRowMapper implements RowMapper<Person> {

        @Override
        public Person mapRow(ResultSet rs, int rowNum) throws SQLException {
            Person person = new Person();
            person.setPersonId(rs.getInt("person_id"));
            person.setFirstName(rs.getString("first_name"));
            person.setLastName(rs.getString("last_name"));
            person.setEmailAddress(rs.getString("email_address"));
            person.setStreetAddress(rs.getString("street_address"));
            person.setCity(rs.getString("city"));
            person.setState(rs.getString("state"));
            person.setZipCode(rs.getString("zip_code"));
            return person;
        }
    }
}
