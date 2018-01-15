package com.artmaguire;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.json.JSONObject;
import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.*;

public class PersonTest {
    private District d;
    private Person p;

    @Before
    public void setUp() {
        d = new District("District 1", 1);
        p = new Person("Joe", "Bloggs", 18, Person.Gender.Male, d);
    }

    @Test
    public void testGetName() {
        assertEquals("Joe Bloggs", p.getName());
    }

    @Test
    public void testGetGender() {
        assertEquals("Male", p.getGender().toString());
    }

    @Test
    public void testGetKills() {
        assertEquals(0, p.getKills());

        p.addKill();
        p.addKill();

        assertEquals(2, p.getKills());
    }

    @Test
    public void testGetDistrict() {
        assertEquals(d, p.getDistrict());
    }

    @Test
    public void testNotEqualPerson() {
        District d2 = new District("District 2", 2);
        Person otherMale = new Person("Joe", "Bloggs", 18, Person.Gender.Male, d2); //Exact same details but from a different District
        assertNotEquals(otherMale, p);

        Person otherFemale = new Person("Joe", "Bloggs", 18, Person.Gender.Female, d); //Exact same details but different gender
        assertNotEquals(otherFemale, p);
    }

    @Test
    public void testJSON() {
        JSONObject jo = new JSONObject();
        jo.put("firstName", "Joe");
        jo.put("lastName", "Bloggs");
        jo.put("age", 18);
        jo.put("gender", "Male");

        Gson gson = new GsonBuilder().create();
        Person jPerson = gson.fromJson(jo.toString(), Person.class);
        jPerson.setDistrict(d);

        assertEquals(jPerson, p);
    }
}