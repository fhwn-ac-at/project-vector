package at.ac.fhwn.vector.dtos;

import java.util.List;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class EmployeeOfferDTO {
    private UUID id;

    private String name;

    private List<OfferDTO> offers;
}
