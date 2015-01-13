package com.signalmapper.service;

import org.springframework.stereotype.Component;

import com.signaldata.model.Technology;

@Component
public interface TechnologyService {

	void addTechnology(Technology technology);
}
