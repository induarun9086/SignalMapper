package com.signaldata.model;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;

@Entity
public class Operator {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "OperatorID")
	private Long operatorID;

	@Column(name = "Name")
	private String name;

	@ManyToMany
	@JoinTable(name = "OperatorCountryTable", 
	           joinColumns = @JoinColumn(name = "OperatorID"), 
	           inverseJoinColumns = @JoinColumn(name = "CountryID"))
	private List<Country> countries;

	public Long getOperatorID() {
		return operatorID;
	}

	public void setOperatorID(Long operatorID) {
		this.operatorID = operatorID;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public List<Country> getCountries() {
		return countries;
	}

	public void setCountries(List<Country> countries) {
		this.countries = countries;
	}

}
