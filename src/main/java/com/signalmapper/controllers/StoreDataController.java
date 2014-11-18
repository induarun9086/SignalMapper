package com.signalmapper.controllers;

import java.io.IOException;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.signalmapper.data.model.Technology;
import com.signalmapper.input.SignalStrengthData;
import com.signalmapper.service.TechnologyService;

@Controller
public class StoreDataController {

	@Resource
	private TechnologyService technologyService;
	
	@RequestMapping(value = "/signalstrength", method = RequestMethod.POST)
	public @ResponseBody
	void recordSignalStrength(@RequestBody SignalStrengthData signalStrengthData)
			throws IOException {

		
		try {
			
			Technology technology = new Technology();
			technology.setName(signalStrengthData.getTechnology());
			
			technologyService.addTechnology(technology);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		

	}
}
