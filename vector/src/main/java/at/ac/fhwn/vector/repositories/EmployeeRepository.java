package at.ac.fhwn.vector.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import at.ac.fhwn.vector.models.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, UUID> {

}
