package com.signalmapper.input;

import java.io.Serializable;

public class SignalStrengthData implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private double latitude;
	
	private double longitude;
	
	private String technology;
	
	private String operator;
	
	private String countryCode;
	
	private int signalStrengthValue;

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

	public String getTechnology() {
		return technology;
	}

	public void setTechnology(String technology) {
		this.technology = technology;
	}

	public String getOperator() {
		return operator;
	}

	public void setOperator(String operator) {
		this.operator = operator;
	}

	public String getCountryCode() {
		return countryCode;
	}

	public void setCountryCode(String countryCode) {
		this.countryCode = countryCode;
	}

	public int getSignalStrengthValue() {
		return signalStrengthValue;
	}

	public void setSignalStrengthValue(int signalStrengthValue) {
		this.signalStrengthValue = signalStrengthValue;
	}
	
	
}
