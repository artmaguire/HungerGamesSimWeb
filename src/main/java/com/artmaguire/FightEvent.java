package com.artmaguire;

import java.util.ArrayList;

public class FightEvent {
    private final String eventString;
    private ArrayList<FightAction> actions = new ArrayList<>();

    public FightEvent(String eventString) {
        this.eventString = eventString;
    }

    public String getEventString() {
        return eventString;
    }

    public ArrayList<FightAction> getActions() {
        return actions;
    }

    public void addAction(FightAction action) {
        this.actions.add(action);
    }
}
