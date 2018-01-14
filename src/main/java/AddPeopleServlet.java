/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import com.artmaguire.*;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.json.JSONArray;
import org.json.JSONObject;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.ArrayList;

/**
 *
 * @author Eoin
 */
@WebServlet(name = "AddPeopleServlet", urlPatterns = {"/AddPeople"})
public class AddPeopleServlet extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */

    protected void processRequest(HttpServletRequest request, HttpServletResponse response) {
        response.setContentType("text/html;charset=UTF-8");

        String districtData = request.getParameter("districtData");

        JSONObject districtsObj = new JSONObject(districtData);
        System.out.println(districtsObj.toString());

        JSONArray districtsArray = districtsObj.getJSONArray("districts");
        ArrayList<District> districts = new ArrayList<>();

        for(Object obj : districtsArray) {
            JSONObject districtJSON = (JSONObject) obj;

            String districtName = (String) districtJSON.get("name");
            int districtNumber = (int) districtJSON.get("number");
            District district = new District(districtName, districtNumber);
            districts.add(district);

            Gson gson = new GsonBuilder().setPrettyPrinting().create();

            JSONObject femaleJSON = (JSONObject) districtJSON.get("female");
            Person female = gson.fromJson(femaleJSON.toString(), Person.class);
            district.setFemale(female);
            female.setDistrict(district);

            JSONObject maleJSON = (JSONObject) districtJSON.get("male");
            Person male = gson.fromJson(maleJSON.toString(), Person.class);
            district.setMale(male);
            male.setDistrict(district);
        }

        BeginFight fight = new BeginFight();

        for(District d : districts){
            fight.addAlive(d.getFemale());
            fight.addAlive(d.getMale());
        }

        HttpSession session = request.getSession();
        session.setAttribute("fight", fight);

        response.setStatus(HttpServletResponse.SC_OK);
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>
}
