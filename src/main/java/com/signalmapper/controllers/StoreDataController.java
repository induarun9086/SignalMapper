package com.signalmapper.controllers;

import java.io.IOException;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.signalmapper.data.model.Technology;
import com.signalmapper.input.SignalStrengthData;

@RestController
public class StoreDataController {
	
	@RequestMapping(value="/signalstrength",method = RequestMethod.POST)
	
	public @ResponseBody
	void recordSignalStrength(@RequestBody SignalStrengthData signalStrengthData)  throws IOException {
		EntityManagerFactory entityManagerFactory =  Persistence
	            .createEntityManagerFactory("transactions-optional");
		EntityManager entityManager = entityManagerFactory.createEntityManager();
		entityManager.getTransaction().begin();
		Technology technology = new Technology();
		technology.setName(signalStrengthData.getTechnology());
		entityManager.getTransaction().commit();
		entityManager.close();		
	}

}
