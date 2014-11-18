package com.signalmapper.country;

import java.util.logging.Logger;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import com.signalmapper.data.model.Country;

public class CountryDAOImpl implements CountryDAO {
	private static final Logger log = Logger.getLogger(CountryDAOImpl.class
			.getName());

	
	private EntityManager entityManager;
	
	@PersistenceContext
	public void setEntityManager(EntityManager entityManager)
	{
		this.entityManager = entityManager;
	}

	@Override
	public void addCountry(Country country) {

		try {
			entityManager.persist(country);
			log.info("Country inserted successfully : " + country.getName());

		} catch (Exception e) {
			log.severe("Error occurred while inserting the country record : "
					+ country.getName());
		} finally {
			entityManager.close();
		}

	}

}
