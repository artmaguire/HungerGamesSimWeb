package com.artmaguire;

import java.util.Objects;

public class FightAction {
    private int district;
    private Person.Gender gender; //district and gender act as primary key
    private final Action action;

    public FightAction(Action action) {
        this.action = action;
    }

    public enum Action {
        AddKill, Kill, EndGame
    }

    public FightAction(int district, Person.Gender gender, Action action) {
        this.district = district;
        this.gender = gender;
        this.action = action;
    }

    public int getDistrict() {
        return district;
    }

    public Person.Gender getGender() {
        return gender;
    }

    public Action getAction() {
        return action;
    }

    @Override
    public int hashCode() {
        return Objects.hash(district, gender, action);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null || getClass() != obj.getClass()) {
            return false;
        }
        final FightAction other = (FightAction) obj;
        return Objects.equals(this.district, other.district)
                && Objects.equals(this.gender, other.gender)
                && Objects.equals(this.action, other.action);
    }
}
