package jsom;

import org.json.simple.JSONObject;

import java.io.FileWriter;
import java.io.IOException;

public class Test {
    public static void main(String[] args) throws IOException {
        JSONObject obj = new JSONObject();
        obj.put("name", "Sergey");
        obj.put("address", "Kozlova");
        obj.put("phone", "8574066");
        obj.put("email", "beda67");

        System.out.println(obj.toString());
        FileWriter file = new FileWriter("e://myfiles.json");
        obj.writeJSONString(file);
        file.flush();
        file.close();
    }
}
