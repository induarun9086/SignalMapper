package com.signalmapper.country;

import java.util.logging.Logger;

import com.signalmapper.dao.GenericDaoJpaImpl;
import com.signaldata.model.Country;

import org.springframework.stereotype.Repository; 

@Repository public class CountryDAOImpl extends GenericDaoJpaImpl<Country, Long>
                            implements CountryDAO {
	private static final Logger log = Logger.getLogger(CountryDAOImpl.class
			.getName());


	@Override
	public void addCountry(Country country) {

		try {
			
			create(country);
			log.info("Country inserted successfully : " + country.getName());

		} catch (Exception e) {
			log.severe("Error occurred while inserting the country record : "
					+ country.getName());
		} finally {
			entityManager.close();
		}

	}

}
