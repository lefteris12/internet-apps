package com.lefteris.beaches.backend;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.sql.*;
import java.util.ArrayList;

@RestController
public class BeachController {
    @GetMapping("/nearBeaches")
    public ArrayList<Beach> beach(@RequestParam(value = "lon") double lon, @RequestParam(value = "lat") double lat, @RequestParam(value = "maxDistance", defaultValue = "10") int maxDistance) throws SQLException {
        ArrayList<Beach> beaches = new ArrayList<>();

        Connection c =  DBDriver.connectToDatabase();

        // Find nearest points
        // https://ourcodeworld.com/articles/read/1019/how-to-find-nearest-locations-from-a-collection-of-coordinates-latitude-and-longitude-with-php-mysql
        String query = "SELECT * FROM (\n" +
                "    SELECT *, \n" +
                "        (\n" +
                "            (\n" +
                "                (\n" +
                "                    acos(\n" +
                "                        sin(( " + lat + " * pi() / 180)) \n" +
                "                        *\n" +
                "                        sin(( lat * pi() / 180)) + cos(( " + lat + " * pi() /180 ))\n" +
                "                        *\n" +
                "                        cos(( lat * pi() / 180)) * cos((( " + lon + " - lon) * pi()/180)))\n" +
                "                ) * 180/pi()\n" +
                "            ) * 60 * 1.1515 * 1.609344\n" +
                "        )\n" +
                "    as distance FROM beaches\n" +
                ") beaches\n" +
                "WHERE distance <= " + maxDistance + " \n" +
                "ORDER BY distance\n" +
                "LIMIT 10;";

        Statement stm = c.createStatement();
        ResultSet rs = stm.executeQuery(query);
        while (rs.next()) {
            Beach b = new Beach(rs.getString("bwid"), rs.getString("name"), rs.getString("name_gr"), rs.getString("description"), rs.getDouble("lon"), rs.getDouble("lat"), rs.getInt("category"), rs.getDouble("distance"));
            beaches.add(b);
        }
        return beaches;
    }
}
