package at.ac.fhwn.vector.dtos;

import java.util.List;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;

@Embeddable
@Data
@AllArgsConstructor
public class AppointmentOfferEmployeeDTO {

    private OfferDTO offer;

    private List<EmployeeDTO> employees;
}
