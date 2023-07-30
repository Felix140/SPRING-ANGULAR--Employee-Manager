package tech.getarrays.employeemanager.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import tech.getarrays.employeemanager.model.Employee;

// Utiliziamo qui la JPA repository, dipendenza implementata all'inizio, ci da la possibilità di richiamare una serie di metodi
// bisogna passare tra le angolari la classe e il tipo di dato della PRIMARY KEY, quindi LONG
public interface EmployeeRepo extends JpaRepository<Employee, Long> {


}
