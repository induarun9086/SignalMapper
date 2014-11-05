package com.signalmapper.data.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity(name = "Location")
public class Location {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "LocationID")
	private Long locationID;

	@Column(name = "Latitude")
	private double latitude;

	@Column(name = "Longitude")
	private double longitude;
	
	@ManyToOne
	@JoinColumn(name="CountryID")
	private Country country;

	public Long getLocationID() {
		return locationID;
	}

	public void setLocationID(Long locationID) {
		this.locationID = locationID;
	}

	public double getLatitude() {
		return latitude;
	}

	public void setLatitude(double latitude) {
		this.latitude = latitude;
	}

	public double getLongitude() {
		return longitude;
	}

	public void setLongitude(double longitude) {
		this.longitude = longitude;
	}
	
	public Country getCountry() {
		return country;
	}

	public void setCountry(Country country) {
		this.country = country;
	}

}
