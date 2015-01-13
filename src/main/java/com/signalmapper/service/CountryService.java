package com.signalmapper.service;

import org.springframework.stereotype.Component;

import com.signaldata.model.Country;


@Component
public interface CountryService {
	
	void addCountry(Country country);

}
