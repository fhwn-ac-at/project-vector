package at.ac.fhwn.vector.services;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import at.ac.fhwn.vector.dtos.CreateEmployeeDTO;
import at.ac.fhwn.vector.models.Employee;
import at.ac.fhwn.vector.models.Offer;
import at.ac.fhwn.vector.repositories.EmployeeRepository;
import at.ac.fhwn.vector.repositories.OfferRepository;
import jakarta.transaction.Transactional;

@Service
public class EmployeeService {

    Logger logger = LoggerFactory.getLogger(EmployeeService.class);

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private OfferRepository offerRepository;

    public List<Employee> getAllEmployees() {
        return this.employeeRepository.findAll();
    }

    public Employee getEmployeeById(UUID employeeId) {
        Optional<Employee> optional = this.employeeRepository.findById(employeeId);
        if (optional.isPresent())
            return optional.get();

        return null;
    }

    @Transactional
    public Employee addEmployee(CreateEmployeeDTO createEmployeeDTO) {
        Employee employee = new Employee();

        employee.setName(createEmployeeDTO.getName());

        Set<Offer> offers = new HashSet<>();
        if (createEmployeeDTO.getOfferIds() != null && !createEmployeeDTO.getOfferIds().isEmpty()) {
            for (UUID offerId : createEmployeeDTO.getOfferIds()) {
                Optional<Offer> optional = this.offerRepository.findById(offerId);
                if (optional.isPresent()) {
                    Offer offer = optional.get();
                    offer.getEmployees().add(employee);
                    offers.add(optional.get());
                }
            }
        }

        employee.setOffers(offers);

        return this.employeeRepository.saveAndFlush(employee);
    }

    public void deleteEmployeeById(UUID employeeId) {
        logger.info(String.format("Deleting employee with id %s.", employeeId.toString()));

        Optional<Employee> optional = this.employeeRepository.findById(employeeId);

        if (optional.isPresent())
            this.employeeRepository.delete(optional.get());
    }
}
