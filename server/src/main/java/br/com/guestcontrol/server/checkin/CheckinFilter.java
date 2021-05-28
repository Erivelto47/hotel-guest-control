package br.com.guestcontrol.server.checkin;

import lombok.Data;

@Data
public class CheckinFilter {
    private String document;
    private String name;
    private String phone;
    private String situation;
}
