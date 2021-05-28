package br.com.guestcontrol.server.core.crud;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.io.Serializable;
import java.util.List;

public abstract class CrudController<T, ID extends Serializable> {

    public abstract CrudService<T, ID> getService();

    @DeleteMapping
    public void delete(@RequestBody T entity){
        getService().delete(entity);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable ID id){
        getService().delete(id);
    }

    @GetMapping("{id}")
    public ResponseEntity<T> findById(@PathVariable ID id){
        T entity = getService().findById(id);
        return entity != null ? ResponseEntity.ok(entity) : ResponseEntity.badRequest().build();
    }

    @GetMapping
    public List<T> findAll(){
        return getService().findAll();
    }

    @PostMapping
    public ResponseEntity<T> save(@Valid @RequestBody T entity) throws Exception {
        return postSave(getService().save(entity));
    }

    public ResponseEntity<T> postSave(T entity) {
        return ResponseEntity.ok(entity);
    }



}
