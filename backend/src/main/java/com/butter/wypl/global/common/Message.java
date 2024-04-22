package com.butter.wypl.global.common;

import lombok.Data;

@Data
public class Message {
    private String message;
    private Object body;

    Message(){
        this.message = null;
        this.body = null;
    }

    //메세지만 있는 경우
    Message(String message){
        this.message = message;
        this.body = null;
    }

    //메세지와 데이터 모두 있는 경우
    Message(String message, Object body){
        this.message = message;
        this.body = body;
    }
}
