package com.signalmapper.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import com.signaldata.model.Technology;
import com.signalmapper.technology.TechnologyDAO;

@Service("technologyService")
@Transactional
public class TechnologyServiceImpl  implements TechnologyService{
	
	@Autowired
	private TechnologyDAO technologyDAO;
	
	
	@Override
	public void addTechnology(Technology technology){
		
		technologyDAO.addTechnology(technology);
		
	}
	
}
