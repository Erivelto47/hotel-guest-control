package br.com.erivelto.crudFuncionario.core.crud;

import br.com.erivelto.crudFuncionario.core.exception.ValidationException;
import br.com.erivelto.crudFuncionario.core.validation.Validator;
import org.springframework.data.jpa.repository.JpaRepository;

import java.io.Serializable;
import java.util.List;

/**
 * Create by erivelto on 01/02/19
 */
public abstract class CrudServiceImpl<T, ID extends Serializable> implements CrudService<T, ID> {

    protected abstract JpaRepository<T, ID> getRepository();

    @Override
    public List<T> findAll() {
        return getRepository().findAll();
    }

    @Override
    public T findById(ID id){
        //return getRepository().findById(id).orElseThrow(NoResultException::new);//lança uma exceção de que não encontrou resultdados
        return getRepository().findById(id).orElse(null); //dessa forma rerna null
    }

    @Override
    public T save(T entity) throws ValidationException {
      try{
          preSave(entity);
      } catch (ValidationException e){
          throw new ValidationException(e.getMessage());
      }
      return postSave(getRepository().save(entity));
    }

    protected T postSave(T save) {
        return save;
    }

    protected void preSave(T entity) throws ValidationException {
    }

    @Override
    public void delete(ID id) {
        getRepository().deleteById(id);
    }

    @Override
    public void delete(T entity) {
        getRepository().delete(entity);
    }


    protected  <T> void valida(Validator<T> validator, T obj) throws ValidationException {
        try {
            validator.valida(obj);
        }catch (ValidationException e) {
            System.err.println(e.getMessage());
            throw new ValidationException(e.getMessage());
        }
    }
}
