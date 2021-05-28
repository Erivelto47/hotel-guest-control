package br.com.guestcontrol.server.checkin;

import br.com.guestcontrol.server.guest.Guest;
import lombok.Data;
import org.springframework.format.annotation.NumberFormat;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * Created by erivelto on 27/05/2021
 */

@Entity
@Data
public class Checkin {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private LocalDateTime checkin;

    @Column
    private LocalDateTime checkout;

    @Column
    private Boolean hasCar;

    @Column
    @NumberFormat(pattern = "#.00", style = NumberFormat.Style.CURRENCY)
    private BigDecimal total;

    @ManyToOne(optional = false)
    @JoinColumn(name = "guest_id", nullable = false)
    private Guest guest;
}
