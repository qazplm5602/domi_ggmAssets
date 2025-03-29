package com.domi.ggmassetbackend.utils;

import com.domi.ggmassetbackend.data.vo.ApiResponseVO;
import org.json.JSONObject;

import javax.net.ssl.HttpsURLConnection;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;
import java.nio.charset.StandardCharsets;

public class RequestAPI {
    public static ApiResponseVO post(String serverURL, JSONObject body) throws IOException, URISyntaxException {
        URL url = new URI(serverURL).toURL();
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();

        connection.setRequestMethod("POST");
        connection.setDoOutput(true);
        connection.setRequestProperty("Content-Type", "application/json");
        connection.setRequestProperty("Accept", "application/json");
        connection.setUseCaches(false);

        // body 내용 보냄
        try (OutputStream outputStream = connection.getOutputStream()) {
            byte[] input = body.toString().getBytes(StandardCharsets.UTF_8);
            outputStream.write(input, 0, input.length);
        }

        int statusCode = connection.getResponseCode();

        BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
        String inputLine;
        StringBuilder response = new StringBuilder();

        while ((inputLine = bufferedReader.readLine()) != null) {
            response.append(inputLine);
        }
        bufferedReader.close();

        return new ApiResponseVO(statusCode, response.toString());
    }
}
