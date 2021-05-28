package br.com.guestcontrol.server.checkin;

import br.com.guestcontrol.server.guest.Guest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by erivelto on 27/05/2021
 */

@Repository
public interface CheckinRepository extends JpaRepository<Checkin, Long> {

    List<Checkin> findAllByGuestAndCheckoutIsNull(Guest guest);

    List<Checkin> findAllByGuestAndCheckoutIsNotNull(Guest guest);

    List<Checkin> findAllByGuest(Guest guest);
}
