package com.signalmapper.technology;

import java.io.Serializable;
import java.util.logging.Logger;

import org.springframework.stereotype.Repository;

import com.signalmapper.dao.GenericDaoJpaImpl;
import com.signaldata.model.Technology;

@Repository
public class TechnologyDAOImpl extends GenericDaoJpaImpl<Technology, Serializable> implements TechnologyDAO {

	private static final Logger log = Logger.getLogger(TechnologyDAOImpl.class
			.getName());


	@Override
	public void addTechnology(Technology technology) {
		String technologyName = technology.getName();
		TechnologyUtil.validateTechnology(entityManager, technologyName);
		create(technology);
		System.out.println(technology.getTechnologyID());
		log.info("Technology inserted successfully : " + technologyName);

	}

}
