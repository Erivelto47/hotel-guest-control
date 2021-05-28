package br.com.guestcontrol.server.checkin;

import br.com.guestcontrol.server.core.crud.CrudController;
import br.com.guestcontrol.server.core.crud.CrudService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by erivelto on 27/05/2021
 */

@RestController
@RequestMapping("checkin")
public class CheckinController extends CrudController<Checkin, Long> {

    @Autowired
    private CheckinService checkinService;

    @Override
    public CrudService<Checkin, Long> getService() {
        return checkinService;
    }

    @PostMapping("filter")
    public List<Checkin> findAllCheckinsGuestFilter(@RequestBody CheckinFilter filter){
        return checkinService.findAllCheckinsGuestFilter(filter);
    }
}
