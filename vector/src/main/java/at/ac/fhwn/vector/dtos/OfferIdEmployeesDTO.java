package at.ac.fhwn.vector.dtos;

import java.util.List;
import java.util.UUID;

import jakarta.persistence.Embeddable;
import lombok.Data;

@Embeddable
@Data
public class OfferIdEmployeesDTO {

    private UUID offerId;

    private List<UUID> employeeIds;

}
