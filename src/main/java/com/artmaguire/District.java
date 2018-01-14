package com.artmaguire;

//import java.util.ArrayList;

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
}
