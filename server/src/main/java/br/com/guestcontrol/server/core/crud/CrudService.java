package br.com.erivelto.crudFuncionario.core.crud;

import java.io.Serializable;
import java.util.List;

/**
 * Create by erivelto on 01/02/19
 */
public interface CrudService<T, ID extends Serializable> {

    List<T> findAll();//qualquer metodo na interface é publico, no java 11 aceita privados, mas com implementação

    T findById(ID id);

    T save(T entity) throws Exception;

    void delete(ID id);

    void delete(T entity);


}
