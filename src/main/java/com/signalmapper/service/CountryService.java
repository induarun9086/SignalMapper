package com.signalmapper.service;

import org.springframework.stereotype.Component;

import com.signalmapper.data.model.Country;


@Component
public interface CountryService {
	
	void addCountry(Country country);

}
