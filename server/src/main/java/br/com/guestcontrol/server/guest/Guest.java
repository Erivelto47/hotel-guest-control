package br.com.guestcontrol.server.guest;

import lombok.Data;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import javax.validation.Valid;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;


/**
 * Created by erivelto on 27/05/2021
 */

@Entity
@Data
public class Guest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column()
    @NotBlank
    @Length(min = 3)
    @Valid
    private String name;

    @Column(unique = true)
    @Valid
    @NotBlank
    @Email(message = "Ivalid Email format")
    private String email;

    @Column(nullable = false, length = 20)
    @Length(max = 20, min = 6)
    @NotBlank
    @Valid
    private String phone;

    @Column
    @Length(max = 20, min = 6)
    @NotBlank
    @Valid
    private String document;

}
