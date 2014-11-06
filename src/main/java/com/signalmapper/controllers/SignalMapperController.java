package com.signalmapper.controllers;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.signalmapper.util.StringUtil;

@RestController
@RequestMapping("/getSignalData")
public class SignalMapperController {

	@RequestMapping(method = RequestMethod.POST)
	public @ResponseBody
	void generateReport(HttpServletRequest request,
			HttpServletResponse response,
			@RequestParam("numPoints") String numPoints) throws IOException {
		
		if (StringUtil.isNullOrEmpty(numPoints)) {
			throw new IOException("The field numPoints cannot be empty or null");
		}

		Random randomGenerator = new Random();

		ObjectMapper mapper = new ObjectMapper();

		List<Integer> list = new ArrayList<Integer>();

		for (int i = 0; i < Integer.valueOf(numPoints); i++) {
			int randomInt = randomGenerator.nextInt(100);
			list.add(randomInt);
		}

		mapper.writeValue(response.getWriter(), list);

	}

}
