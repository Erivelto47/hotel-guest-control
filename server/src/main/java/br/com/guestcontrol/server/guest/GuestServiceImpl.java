package br.com.guestcontrol.server.guest;

import br.com.guestcontrol.server.core.crud.CrudServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

/**
 * Created by erivelto on 27/05/2021
 */

@Service
public class GuestServiceImpl extends CrudServiceImpl<Guest, Long> implements GuestService {

    @Autowired
    private GuestRepository guestRepository;

    @Override
    protected JpaRepository<Guest, Long> getRepository() {
        return guestRepository;
    }

    @Override
    public Guest findByNameOrPhoneOrDocument(String name, String document, String phone) {
        return guestRepository.findGuestByNameOrDocumentOrPhone(name, document, phone);
    }
}
