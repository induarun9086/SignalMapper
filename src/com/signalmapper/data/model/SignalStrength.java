package com.signalmapper.data.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import com.google.appengine.api.datastore.Key;

@Entity
public class SignalStrength {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "SignalStrengthID")
	private Key signalStrengthID;
	
	@Column(name = "2G")
	private int twoG;
	
	@Column(name = "3G")
	private int threeG;
	
	@Column(name = "WIFI")
	private int wifi;
	
	@ManyToOne
	private Operator operator;
	

	public Key getSignalStrengthID() {
		return signalStrengthID;
	}

	public void setSignalStrengthID(Key signalStrengthID) {
		this.signalStrengthID = signalStrengthID;
	}

	public int getTwoG() {
		return twoG;
	}

	public void setTwoG(int twoG) {
		this.twoG = twoG;
	}

	public int getThreeG() {
		return threeG;
	}

	public void setThreeG(int threeG) {
		this.threeG = threeG;
	}

	public int getWifi() {
		return wifi;
	}

	public void setWifi(int wifi) {
		this.wifi = wifi;
	}

	public Operator getOperator() {
		return operator;
	}

	public void setOperator(Operator operator) {
		this.operator = operator;
	}


}
