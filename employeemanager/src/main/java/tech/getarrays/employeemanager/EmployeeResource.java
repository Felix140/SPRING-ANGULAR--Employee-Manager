package tech.getarrays.employeemanager;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import tech.getarrays.employeemanager.model.Employee;
import tech.getarrays.employeemanager.service.EmployeeService;

@RestController // aggiungo questa annotation perchè la classe è una REST SERVICE
@RequestMapping("/employee") // metto questo endpoint per accedere, come URL di default
public class EmployeeResource {

    private final EmployeeService employeeService; // iniettiamo questo campo nel costruttore

    public EmployeeResource(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    // creaimo quindi un metodo che ritorni tutti gli EMPLOYEE dell'applicazione
    @GetMapping("/all") // sara infatti una richiesta GET che ritorna tutte le info
    public ResponseEntity<List<Employee>> getAllEmployee () {
        List<Employee> employees = employeeService.findAllEmployees();
        return new ResponseEntity<>(employees, HttpStatus.OK);
    }
    //questo metodo ritornerà un HTTP RESPONSE

    // ripetiamo lo stesso procedimento:

    //* GET
    @GetMapping("/find/{id}")
    public ResponseEntity<Employee> getEmployeeById (@PathVariable("id") Long id) { // questo "id" deve corrispondere all'id dentro @GetMapping("/find/{id}")
        Employee employee = employeeService.findEmployeeById(id);
        return new ResponseEntity<>(employee, HttpStatus.OK);
    }

    // creamo ora un metodo per AGGIUNGERE un Employee

    //* POST
    @PostMapping("/add") // utilizziamo questa annotation perchè dobbiamo AGGIUNGERE info nel backend
    public ResponseEntity<Employee> addEmployee(@RequestBody Employee employee) {
        Employee newEmployee = employeeService.addEmployee(employee);
        return new ResponseEntity<>(newEmployee, HttpStatus.CREATED); // CREATED lo usiamo quindi proprio per creare una nuova informazione
    }

    //* PUT
    @PutMapping("/update") // utilizziamo questa annotation perchè dobbiamo MODIFICARE il backend
    public ResponseEntity<Employee> updateEmployee(@RequestBody Employee employee) {
        Employee updateEmployee = employeeService.updateEmployee(employee);
        return new ResponseEntity<>(updateEmployee, HttpStatus.OK); //
    }

    //* DELETE
    @DeleteMapping("/delete/{id}") // utilizziamo questa annotation perchè dobbiamo ELIMINARE il backend
    public ResponseEntity<?> deleteEmployee(@PathVariable("id") Long id) { // aggiungo il <?> perchè il metodo non ritorna nulla
        employeeService.deleteEmployee(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
