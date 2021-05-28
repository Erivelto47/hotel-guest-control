package br.com.guestcontrol.server.checkin;

public enum DailyValueEnum {

    WEEKDAY(120),
    WEEKEND(150),
    VEICLEWEEK(15),
    VEICLEWEEKEND(20);

    private final Integer value;

    DailyValueEnum(Integer value) {
        this.value = value;
    }

    public Integer getValue() {
        return value;
    }
}
