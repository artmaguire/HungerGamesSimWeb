package com.artmaguire;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.json.JSONArray;
import org.json.JSONObject;
import org.junit.Before;
import org.junit.Test;

import java.util.ArrayList;

import static org.junit.Assert.assertEquals;

public class FightEventTest {
    private FightEvent e;
    private FightAction a1, a2;

    @Before
    public void setUp() throws Exception {
        e = new FightEvent("Event String");
        a1 = new FightAction(1, Person.Gender.Male, FightAction.Action.Kill);
        a2 = new FightAction(2, Person.Gender.Female, FightAction.Action.AddKill);
    }

    @Test
    public void testGetActions() {
        e.addAction(a1);
        ArrayList<FightAction> actions1 = new ArrayList<>();
        actions1.add(a1);
        assertEquals(actions1, e.getActions());

        e.addAction(a2);
        ArrayList<FightAction> actions2 = new ArrayList<>();
        actions2.add(a1);
        actions2.add(a2);
        assertEquals(actions2, e.getActions());
    }

    @Test
    public void testJSON() {
        Gson gson = new GsonBuilder().create();

        JSONObject jo = new JSONObject();
        jo.put("eventString", "Event String");

        JSONArray ja = new JSONArray();

        JSONObject joA1 = new JSONObject();
        joA1.put("district", 1);
        joA1.put("gender", "Male");
        joA1.put("action", "Kill");
        ja.put(joA1);

        JSONObject joA2 = new JSONObject();
        joA2.put("district", 2);
        joA2.put("gender", "Female");
        joA2.put("action", "AddKill");
        ja.put(joA2);

        jo.put("actions", ja);

        e.addAction(a1);
        e.addAction(a2);
        assertEquals(jo.toString(), new JSONObject(gson.toJson(e)).toString());
    }
}