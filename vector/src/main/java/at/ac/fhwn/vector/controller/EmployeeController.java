package at.ac.fhwn.vector.controller;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import at.ac.fhwn.vector.dtos.CreateEmployeeDTO;
import at.ac.fhwn.vector.dtos.EmployeeDTO;
import at.ac.fhwn.vector.dtos.EmployeeOfferDTO;
import at.ac.fhwn.vector.mappers.EmployeeMapper;
import at.ac.fhwn.vector.services.EmployeeService;
import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/employees")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @CrossOrigin
    @GetMapping()
    public List<EmployeeOfferDTO> getAllEmployees() {
        return this.employeeService.getAllEmployees().stream().map(EmployeeMapper::toEmployeeOfferDTO)
                .collect(Collectors.toList());
    }

    @CrossOrigin
    @PostMapping()
    public EmployeeDTO addEmployee(@Valid @RequestBody CreateEmployeeDTO createEmployeeDTO) {
        return EmployeeMapper.toDto(this.employeeService.addEmployee(createEmployeeDTO));
    }

    @CrossOrigin
    @DeleteMapping("{employeeId}")
    public void deleteEmployeeById(@PathVariable("employeeId") UUID employeeId) {
        this.employeeService.deleteEmployeeById(employeeId);
    }

}
