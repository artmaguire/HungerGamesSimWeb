package com.artmaguire;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;

public class BeginFight {
    private static String weapons [] = {"Axe", "Blow Gun", "Bow and Arrow", "Crossbow", "Dagger", "Ezio Hidden Assassin Blade", "Knife", "Mace", "Machete", "Rocks", "Sickle", "Scythe", "Spear",
            "Sword", "Throwing axe", "Throwing knives", "Trident", "Whip"};

    private ArrayList<Person> alive = new ArrayList<>();
    private ArrayList<Person> dead = new ArrayList<>();

    private StringBuilder log = new StringBuilder();
    StringBuilder dayLog = new StringBuilder();

    public BeginFight() {
    }

    public void addAlive(Person p) {
        this.alive.add(p);
    }

    public String start() {
        logInfo("\n\n---------------------------------");
        logInfo("Announcer: 'Welcome To Today's Match!'");
        Date date = new java.util.Date();
        logInfo(date.toString());
        logInfo("\n");
        for(Person p : alive){
            p.setWeapon(weapons[randPos(weapons.length)]);
            logInfo(p.getName() + " got: " + p.getWeapon());
        }
        logInfo("---------------------------------");

        return log.toString();
    }

    public String nextDay() {
        dayLog = new StringBuilder();
        int i = 0;

        while (alive.size() > 1){
            if (i == 5) return dayLog.toString();
            int p1Pos = randPos(alive.size()); //Choose Random person p1
            int p2Pos;

            do {
                p2Pos = randPos(alive.size()); //Choose Random person p2
            } while(p1Pos == p2Pos); //if p1 is the same as p2, choose different p2
            Person p1 = alive.get(p1Pos);
            Person p2 = alive.get(p2Pos);
            if(Math.random() < 0.5){ //p1 Wins
                processKill(p1, p2, p2Pos);
            } else { //p2 Wins
                processKill(p2, p1, p1Pos);
            }
            logInfo("");
            i++;
        }

        String endLog = end();
        logInfo(endLog);

        return dayLog.toString();
    }

    private String end() {
        StringBuilder endLog = new StringBuilder();
        endLog.append("\n==========================\n");
        endLog.append(alive.get(0).getName()).append(" from District ").append(alive.get(0).getDistrict().getNumber()).append(" Wins!!!\n");
        endLog.append("==========================\n");

        dead.add(alive.get(0));
        Collections.sort(dead);

        endLog.append("\nThe Top 3 Killers Were:\n");
        for(int i = 0; i < 3; i++) {
            endLog.append(dead.get(i).getName()).append(" With: ").append(dead.get(i).getKills()).append("\n");
        }

        return endLog.toString();
    }

    private void processKill(Person killer, Person killed, int killedPos) {
        killer.addKill();
        logInfo(killer.getName() + " kills " + killed.getName() + " with " + killer.getWeapon());
        String killNumber = killer.getFirstName() + " Now Has " + killer.getKills();
        if(killer.getKills() == 1) killNumber += " Kill!";
        else killNumber += " Kills!";
        logInfo(killNumber);
        alive.remove(killedPos);
        dead.add(killed);
    }

    private int randPos(int size){
        double n = Math.random() * size;
        int r = (int)Math.floor(n);
        return r;
    }

    private void logInfo(String info) {
        log.append(info).append("\n");
        dayLog.append(info).append("\n");
        System.out.println(info);
    }
}

