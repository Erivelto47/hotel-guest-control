package br.com.guestcontrol.server.checkin;

import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.temporal.ChronoUnit;

/**
 * Created by erivelto on 27/05/2021
 */

@Service
public class CheckinValueCalculatorServiceImpl implements CheckinValueCalculatorService {

    @Override
    public BigDecimal calculateTotalValue(Checkin checkin) {

        if (checkin.getCheckout() == null) {
            return BigDecimal.ZERO;
        }

        return this.calculate(checkin);
    }

    private BigDecimal calculate(Checkin checkin) {

        final DayOfWeek startW = checkin.getCheckin().getDayOfWeek();
        final DayOfWeek endW = checkin.getCheckin().getDayOfWeek();

        final long days = ChronoUnit.DAYS.between(checkin.getCheckin(), checkin.getCheckout());
        final long daysWeekends = 2 * ((days + startW.getValue())/7);

        long daysWithoutWeekends = days - daysWeekends;

        daysWithoutWeekends += (startW == DayOfWeek.SUNDAY ? 1 : 0) + (endW == DayOfWeek.SUNDAY ? 1 : 0);

        long stayWeekTotal = daysWithoutWeekends * DailyValueEnum.WEEKDAY.getValue();
        long stayWeekendTotal = daysWeekends * DailyValueEnum.WEEKEND.getValue();

        if (checkin.getHasCar() == Boolean.TRUE) {

            stayWeekTotal += daysWithoutWeekends * DailyValueEnum.VEICLEWEEK.getValue();
            stayWeekTotal += daysWeekends * DailyValueEnum.VEICLEWEEKEND.getValue();
        }

        final long extra = checkHourCheckout(checkin.getCheckout());

        return BigDecimal.valueOf(stayWeekendTotal + stayWeekTotal + extra);
    }

    private long checkHourCheckout(LocalDateTime checkout) {

        long extraValue = 0;
        LocalDateTime compareTo = LocalDateTime.of(checkout.toLocalDate(),
                LocalTime.of(16, 30));

        if (checkout.isAfter(compareTo)) {
            if (checkout.getDayOfWeek().equals(DayOfWeek.SUNDAY)) {
                extraValue = DailyValueEnum.WEEKEND.getValue();
            } else {
                extraValue = DailyValueEnum.WEEKDAY.getValue();
            }
        }
        return extraValue;
    }
}
