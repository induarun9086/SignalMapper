package com.signaldata.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Technology {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "TechnologyID")
	private Long technologyID;
	
	@Column(name = "Name")
	private String name;

	public Long getTechnologyID() {
		return technologyID;
	}

	public void setTechnologyID(Long technologyID) {
		this.technologyID = technologyID;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	
}
