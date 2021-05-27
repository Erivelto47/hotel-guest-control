package br.com.erivelto.crudFuncionario.core.validation;


import br.com.erivelto.crudFuncionario.core.exception.ValidationException;

/**
 * Create by erivelto on 05/02/19
 */
public interface Validator<T> {

    void valida(T o) throws ValidationException;
}
