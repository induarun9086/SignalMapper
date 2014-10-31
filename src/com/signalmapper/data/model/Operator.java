package com.signalmapper.data.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;

import com.google.appengine.api.datastore.Key;

@Entity
public class Operator {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "OperatorID")
	private Key operatorID;

	@Column(name = "CountryID")
	private Key countryID;
	
	@ManyToMany
	private Country country;

	public Key getOperatorID() {
		return operatorID;
	}

	public void setOperatorID(Key operatorID) {
		this.operatorID = operatorID;
	}

	public Key getCountryID() {
		return countryID;
	}

	public void setCountryID(Key countryID) {
		this.countryID = countryID;
	}

	public Country getCountry() {
		return country;
	}

	public void setCountry(Country country) {
		this.country = country;
	}

}
