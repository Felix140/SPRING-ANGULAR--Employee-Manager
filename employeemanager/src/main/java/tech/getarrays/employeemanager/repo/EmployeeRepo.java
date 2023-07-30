package tech.getarrays.employeemanager.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import tech.getarrays.employeemanager.model.Employee;

import java.util.Optional;

// Utiliziamo qui la JPA repository, dipendenza implementata all'inizio, ci da la possibilità di richiamare una serie di metodi
// bisogna passare tra le angolari la classe e il tipo di dato della PRIMARY KEY, quindi LONG
public interface EmployeeRepo extends JpaRepository<Employee, Long> {
    void deleteEmployeeById(Long id);
    Optional<Employee> findEmployeeById(Long id); // chiamato QUERY METHOD in spring
}
