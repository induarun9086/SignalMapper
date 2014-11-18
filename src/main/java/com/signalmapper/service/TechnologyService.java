package com.signalmapper.service;

import org.springframework.stereotype.Component;

import com.signalmapper.data.model.Technology;

@Component
public interface TechnologyService {

	void addTechnology(Technology technology);
}
