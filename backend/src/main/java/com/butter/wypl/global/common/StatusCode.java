package com.butter.wypl.global.common;

import lombok.Data;

@Data
public class StatusCode {
    public static int OK = 200;
    public static int CREATED = 201;
    public static int BAD_REQUEST = 400;
    public static int UNAUTHORIZED = 401;
    public static int INTERNAL_SERVER_ERROR = 500;
}
