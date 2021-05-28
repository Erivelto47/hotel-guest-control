package br.com.guestcontrol.server.checkin;

import java.math.BigDecimal;

/**
 * Created by erivelto on 27/05/2021
 */

public interface CheckinValueCalculatorService {

    BigDecimal calculateTotalValue(Checkin checkin);
}
