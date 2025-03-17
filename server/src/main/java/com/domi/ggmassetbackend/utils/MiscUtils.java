package com.domi.ggmassetbackend.utils;

import java.security.SecureRandom;

public class MiscUtils {
    public static String generateRandomStr(int length, boolean isUpperCase) {
        String alphabet = "abcdefghijklmnopqrstuvwxyz";
        SecureRandom secureRandom = new SecureRandom();
        StringBuilder sb = new StringBuilder(length);
        for (int i = 0; i < length; i++) {
            sb.append(alphabet.charAt(secureRandom.nextInt(alphabet.length())));
        }
        return isUpperCase ? sb.toString().toUpperCase() : sb.toString().toLowerCase();
    }
}
