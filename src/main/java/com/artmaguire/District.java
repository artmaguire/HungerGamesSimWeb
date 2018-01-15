package com.artmaguire;

//import java.util.ArrayList;

import java.util.Objects;

public class District {
    private String name;
    private int number;
    private Person male;
    private Person female;

    public District(String name, int number) {
        this.name = name;
        this.number = number;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }

    public Person getMale() {
        return male;
    }

    public void setMale(Person male) {
        this.male = male;
    }

    public Person getFemale() {
        return female;
    }

    public void setFemale(Person female) {
        this.female = female;
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, number);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null || getClass() != obj.getClass()) {
            return false;
        }
        final District other = (District) obj;
        return Objects.equals(this.name, other.name)
                && Objects.equals(this.number, other.number);
    }
}
