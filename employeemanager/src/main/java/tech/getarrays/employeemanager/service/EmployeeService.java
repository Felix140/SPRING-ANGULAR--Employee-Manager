package tech.getarrays.employeemanager.service;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tech.getarrays.employeemanager.exception.UserNotFoundException;
import tech.getarrays.employeemanager.model.Employee;
import tech.getarrays.employeemanager.repo.EmployeeRepo;

@Service
public class EmployeeService {

    private final EmployeeRepo employeeRepo;

    @Autowired
    public EmployeeService(EmployeeRepo employeeRepo) {
        this.employeeRepo = employeeRepo;
    }

    // questo metodo prende un employee e crearlo nel DB
    public Employee addEmployee(Employee employee) {
        employee.setEmployeeCode(UUID.randomUUID().toString());
        return employeeRepo.save(employee);
    }

    public List<Employee> findAllEmployees() {
        return employeeRepo.findAll(); // metodo preso da JpaRepository>EmployeeRepo
    }

    public Employee updateEmployee(Employee employee) {
        return employeeRepo.save(employee); // metodo preso da JpaRepository>EmployeeRepo
    }

    public Employee findEmployeeById(Long id) {
        return employeeRepo.findEmployeeById(id).orElseThrow(() -> new UserNotFoundException("User by id " + id + "non trovato"));
        // il metodo findEmpployeeById va creato dentro employeeRepo, sarà un metodo astratto
        // va creata quindi anche l'eccezione UserNotFoundException
    }

    public void deleteEmployee(Long id) {
        employeeRepo.deleteEmployeeById(id);
        // il metodo deleteEmployeeById va creato dentro employeeRepo, sarà un metodo astratto
    }
}
