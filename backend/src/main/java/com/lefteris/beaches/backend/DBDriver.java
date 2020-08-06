package com.lefteris.beaches.backend;

import java.sql.Connection;
import java.sql.DriverManager;

public class DBDriver {
    public static Connection connectToDatabase () {
        Connection c = null;
        try {
            Class.forName("org.postgresql.Driver");
            c = DriverManager
                    .getConnection("jdbc:postgresql://localhost:5432/internet-apps",
                            "postgres", "postgres");
            System.out.println("Opened database successfully");
            return c;
        } catch (Exception e) {
            e.printStackTrace();
            System.err.println(e.getClass().getName()+": "+e.getMessage());
            System.exit(0);
        }
        return null;
    }
}
