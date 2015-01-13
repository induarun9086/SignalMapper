package com.signalmapper.technology;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

import com.signaldata.model.Technology;

public class TechnologyUtil {

	public static boolean validateTechnology(EntityManager entityManager,
			String name) {

		CriteriaBuilder queryBuilder = entityManager.getCriteriaBuilder();
		CriteriaQuery<Technology> qdef = queryBuilder.createQuery(Technology.class);
		Root<Technology> technology = qdef.from(Technology.class);
		//qdef.select(technology);
		//qdef.where(queryBuilder.equal(technology.get(Technology_.name), name));
		TypedQuery<Technology> typedQuery = entityManager.createQuery(qdef);
		//String query = "Select t from Technology t WHERE t.Name = '" + name
				//+ "'";
		System.out.println(typedQuery.getResultList());
		//Technology technology = (Technology) entityManager.createQuery(query)
				//.getSingleResult();

		//System.out.println(technology.getName());
		return false;

	}

}
