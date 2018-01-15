package com.artmaguire;

import java.util.Objects;

public class Person implements Comparable<Person> {
    private String firstName;
    private String lastName;
    private int age;
    private Gender gender;
    private String weapon;
    private District district;
    private int kills = 0;

    public enum Gender {
        Female, Male
    }

    public Person(String firstName, String lastName, int age, Gender gender, District district) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.gender = gender;
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

    public Gender getGender() {
        return gender;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
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

    @Override
    public int hashCode() {
        return Objects.hash(firstName, lastName, age, gender, district);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null || getClass() != obj.getClass()) {
            return false;
        }
        final Person other = (Person) obj;
        return Objects.equals(this.firstName, other.firstName)
                && Objects.equals(this.lastName, other.lastName)
                && Objects.equals(this.age, other.age)
                && Objects.equals(this.gender, other.gender)
                && Objects.equals(this.district, other.district);
    }
}