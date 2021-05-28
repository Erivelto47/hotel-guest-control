package br.com.guestcontrol.server.checkin;

import br.com.guestcontrol.server.core.crud.CrudServiceImpl;
import br.com.guestcontrol.server.core.exception.ValidationException;
import br.com.guestcontrol.server.guest.Guest;
import br.com.guestcontrol.server.guest.GuestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by erivelto on 27/05/2021
 */

@Service
public class CheckinServiceImpl extends CrudServiceImpl<Checkin, Long> implements CheckinService {

    @Autowired
    private CheckinRepository checkinRepository;

    @Autowired
    private CheckinValueCalculatorService checkinValueCalculatorService;

    @Autowired
    private GuestService guestService;

    @Override
    protected JpaRepository<Checkin, Long> getRepository() {
        return checkinRepository;
    }

    @Override
    public List<Checkin> findAllCheckinsGuestFilter(CheckinFilter filter) {
        Guest guest = this.findGuestToFilter(filter);

        if ("in".equals(filter.getSituation())) {

            return checkinRepository.findAllByGuestAndCheckoutIsNull(guest);
        } else if ("out".equals(filter.getSituation())) {

            return checkinRepository.findAllByGuestAndCheckoutIsNotNull(guest);
        }
        return checkinRepository.findAllByGuest(guest);
    }

    @Override
    protected void preSave(Checkin entity) throws ValidationException {
        entity.setTotal(checkinValueCalculatorService.calculateTotalValue(entity));
        super.preSave(entity);
    }

    private Guest findGuestToFilter(CheckinFilter filter) {

        return guestService.findByNameOrPhoneOrDocument(filter.getName(), filter.getDocument(), filter.getPhone());
    }
}
