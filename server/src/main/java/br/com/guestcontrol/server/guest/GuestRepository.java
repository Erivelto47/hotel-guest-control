package br.com.guestcontrol.server.guest;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by erivelto on 27/05/2021
 */

@Repository
public interface GuestRepository extends JpaRepository<Guest, Long> {

    Guest findGuestByNameOrDocumentOrPhone(String name, String document, String phone);
}
