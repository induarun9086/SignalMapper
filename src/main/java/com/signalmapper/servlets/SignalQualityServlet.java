package com.signalmapper.servlets;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.signalmapper.util.StringUtil;

public class SignalQualityServlet extends HttpServlet {

	private static final long serialVersionUID = 1L;

	@Override
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {

		String numPoints = request.getParameter("numPoints");

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
