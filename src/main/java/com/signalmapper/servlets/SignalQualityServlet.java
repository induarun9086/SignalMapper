package com.signalmapper.servlets;

import java.io.IOException;
import java.util.Random;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
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
		
		
		//JSONArray jsonArr = new JSONArray();
		/*for (int i = 0; i < Integer.valueOf(numPoints); i++) {
			int randomInt = randomGenerator.nextInt(100);
			jsonArr.put(randomInt);
		}*/
		
		//response.getWriter().write(jsonArr.toString());

	}
}
