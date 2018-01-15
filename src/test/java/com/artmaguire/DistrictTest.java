package com.artmaguire;

import org.junit.Before;
import org.junit.Test;

import static junit.framework.TestCase.assertEquals;

public class DistrictTest {
    private District d;

    @Before
    public void setUp() {
        d = new District("District 1", 1);
    }

    @Test
    public void testGetName() {
        assertEquals("District 1", d.getName());
    }

    @Test
    public void testGetGetNumber() {
        assertEquals(1, d.getNumber());
    }
}
