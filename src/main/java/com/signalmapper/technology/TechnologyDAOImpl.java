package com.signalmapper.technology;

import java.util.logging.Logger;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;

import com.signalmapper.data.model.Technology;

@Repository
public class TechnologyDAOImpl implements TechnologyDAO {

	private static final Logger log = Logger.getLogger(TechnologyDAOImpl.class
			.getName());

	private EntityManager entityManager;

	@PersistenceContext
	public void setEntityManager(EntityManager entityManager) {
		this.entityManager = entityManager;
	}

	@Override
	public void addTechnology(Technology technology) {
		entityManager.persist(technology);
		log.info("Technology inserted successfully : " + technology.getName());

	}

}
