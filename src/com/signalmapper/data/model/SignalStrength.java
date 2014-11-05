package com.signalmapper.data.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class SignalStrength {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "SignalStrengthID")
	private Long signalStrengthID;

	@ManyToOne
	@JoinColumn(name = "OperatorID")
	private Operator operator;

	@ManyToOne
	@JoinColumn(name = "TechnologyID")
	private Technology technology;

	@ManyToOne
	@JoinColumn(name = "LocationID")
	private Location location;

	@Column(name = "SignalStrengthValue")
	private int signalStrengthValue;

	public Long getSignalStrengthID() {
		return signalStrengthID;
	}

	public void setSignalStrengthID(Long signalStrengthID) {
		this.signalStrengthID = signalStrengthID;
	}

	public Operator getOperator() {
		return operator;
	}

	public void setOperator(Operator operator) {
		this.operator = operator;
	}

	public Technology getTechnology() {
		return technology;
	}

	public void setTechnology(Technology technology) {
		this.technology = technology;
	}

	public int getSignalStrengthValue() {
		return signalStrengthValue;
	}

	public void setSignalStrengthValue(int signalStrengthValue) {
		this.signalStrengthValue = signalStrengthValue;
	}

	public Location getLocation() {
		return location;
	}

	public void setLocation(Location location) {
		this.location = location;
	}

}
