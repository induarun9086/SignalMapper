package com.signalmapper.data.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.google.appengine.api.datastore.Key;

@Entity
public class Location {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "LocationID")
	private Key locationID;

	@Column(name = "Latitude")
	private double latitude;

	@Column(name = "Longitude")
	private double longitude;

	@Column(name = "SignalStrengthID")
	private int signalStrengthID;
	

	public Key getLocationID() {
		return locationID;
	}

	public void setLocationID(Key locationID) {
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

	public int getSignalStrengthID() {
		return signalStrengthID;
	}

	public void setSignalStrengthID(int signalStrengthID) {
		this.signalStrengthID = signalStrengthID;
	}

}
