package br.com.guestcontrol.server.guest;

import br.com.guestcontrol.server.core.crud.CrudService;

/**
 * Created by erivelto on 27/05/2021
 */

public interface GuestService extends CrudService<Guest, Long> {

    Guest findByNameOrPhoneOrDocument(String name, String document, String phone);
}
