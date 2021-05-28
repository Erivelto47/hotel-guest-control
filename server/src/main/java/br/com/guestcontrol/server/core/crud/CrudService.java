package br.com.guestcontrol.server.core.crud;

import java.io.Serializable;
import java.util.List;

public interface CrudService<T, ID extends Serializable> {

    List<T> findAll();

    T findById(ID id);

    T save(T entity) throws Exception;

    void delete(ID id);

    void delete(T entity);


}
