package br.com.guestcontrol.server.checkin;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

class CheckinValueCalculatorServiceTest {

    @Test
    @DisplayName("Testing for guest hosted")
    void calculateTotalValue_test01() {
        final Checkin checkin = new Checkin();
        checkin.setCheckin(LocalDateTime.of(2021, 5, 28, 12, 20));
        checkin.setCheckout(null);
        checkin.setHasCar(true);

        final var checkinCalculator = new CheckinValueCalculatorServiceImpl();

        final BigDecimal total = checkinCalculator.calculateTotalValue(checkin);

        assertEquals(BigDecimal.ZERO, total);
    }

    @Test
    @DisplayName("Test for one day in hotel")
    void calculateTotalValue_test02() {
        final Checkin checkin = new Checkin();
        checkin.setCheckin(LocalDateTime.of(2021, 5, 28, 12, 20));
        checkin.setCheckout(LocalDateTime.of(2021, 5, 29, 12, 20));
        checkin.setHasCar(true);

        final var checkinCalculator = new CheckinValueCalculatorServiceImpl();

        final BigDecimal total = checkinCalculator.calculateTotalValue(checkin);

        assertEquals(new BigDecimal(135), total);
    }

    @Test
    @DisplayName("Test for extra daily")
    void calculateTotalValue_test03() {
        final Checkin checkin = new Checkin();
        checkin.setCheckin(LocalDateTime.of(2021, 5, 28, 12, 20));
        checkin.setCheckout(LocalDateTime.of(2021, 5, 29, 16, 31));
        checkin.setHasCar(true);

        final var checkinCalculator = new CheckinValueCalculatorServiceImpl();

        final BigDecimal total = checkinCalculator.calculateTotalValue(checkin);

        assertEquals(new BigDecimal(255), total);
    }

}