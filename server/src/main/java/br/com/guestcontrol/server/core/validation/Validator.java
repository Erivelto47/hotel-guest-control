package br.com.guestcontrol.server.core.validation;

import br.com.guestcontrol.server.core.exception.ValidationException;

public interface Validator<T> {

    void valida(T o) throws ValidationException;
}
