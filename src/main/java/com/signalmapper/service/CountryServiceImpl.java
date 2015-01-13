package com.signalmapper.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.signalmapper.country.CountryDAO;
import com.signaldata.model.Country;

@Service("countryService")
@Transactional
public class CountryServiceImpl implements CountryService {

	@Autowired
	private CountryDAO countryDAO;

	@Override
	public void addCountry(Country country) {
		countryDAO.addCountry(country);
	}

}
