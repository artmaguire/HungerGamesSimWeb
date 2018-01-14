package com.artmaguire;

public class Person implements Comparable<Person> {
    private String firstName;
    private String lastName;
    private int age;
    private String weapon;
    private District district;
    private int kills = 0;

    public Person(String firstName, String lastName, int age, District district) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.district = district;
    }

    public String getName() {
        return firstName + " " + lastName;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public District getDistrict() {
        return district;
    }

    public void setDistrict(District district) {
        this.district = district;
    }

    public String getWeapon() {
        return weapon;
    }

    public void setWeapon(String weapon) {
        this.weapon = weapon;
    }

    public int getKills() {
        return kills;
    }

    public void addKill() {
        this.kills++;
    }

    public void printInfo() {
        System.out.println("Player Name: " + getName());
        System.out.println("Player Age: " + age);
        System.out.println("Player District: " + district);
    }

    @Override
    public int compareTo(Person o) {
        return o.getKills() - this.kills;
    }
}