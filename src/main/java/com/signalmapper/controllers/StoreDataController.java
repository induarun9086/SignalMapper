package com.signalmapper.controllers;

import java.io.IOException;

import javax.persistence.EntityManager;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.signalmapper.data.model.Technology;
import com.signalmapper.input.SignalStrengthData;
import com.signalmapper.util.EMFService;

@RestController
public class StoreDataController {

	@RequestMapping(value = "/signalstrength", method = RequestMethod.POST)
	public @ResponseBody
	void recordSignalStrength(@RequestBody SignalStrengthData signalStrengthData)
			throws IOException {

		EntityManager em = EMFService.get().createEntityManager();
		Technology technology = new Technology();
		technology.setName(signalStrengthData.getTechnology());
		em.persist(technology);
		System.out.println("Entry inserted successfully");
	}

}
