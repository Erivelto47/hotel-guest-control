package br.com.guestcontrol.server.checkin;

import br.com.guestcontrol.server.core.crud.CrudService;
import br.com.guestcontrol.server.guest.Guest;

import java.util.List;

/**
 * Created by erivelto on 27/05/2021
 */

public interface CheckinService extends CrudService<Checkin, Long> {

    List<Checkin> findAllCheckinsGuestFilter(CheckinFilter filter);
}
