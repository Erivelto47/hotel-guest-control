package br.com.guestcontrol.server.guest;

import br.com.guestcontrol.server.core.crud.CrudController;
import br.com.guestcontrol.server.core.crud.CrudService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by erivelto on 27/05/2021
 */

@RestController()
@RequestMapping("guest")
public class GuestController extends CrudController<Guest, Long> {

    @Autowired
    private GuestService guestService;

    @Override
    public CrudService<Guest, Long> getService() {
        return guestService;
    }
}
