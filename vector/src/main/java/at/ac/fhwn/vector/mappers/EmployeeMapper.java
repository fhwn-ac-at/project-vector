package at.ac.fhwn.vector.mappers;

import at.ac.fhwn.vector.dtos.EmployeeDTO;
import at.ac.fhwn.vector.dtos.EmployeeOfferDTO;
import at.ac.fhwn.vector.models.Employee;

public class EmployeeMapper {

    public static EmployeeDTO toDto(Employee employee) {
        if (employee == null)
            return null;

        return new EmployeeDTO(employee.getId(), employee.getName());
    }

    public static EmployeeOfferDTO toEmployeeOfferDTO(Employee employee) {
        if (employee == null)
            return null;

        return new EmployeeOfferDTO(employee.getId(), employee.getName(),
                employee.getOffers().stream().map(OfferMapper::toDto).toList());
    }
}
