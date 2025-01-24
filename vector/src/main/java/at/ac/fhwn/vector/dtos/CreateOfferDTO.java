package at.ac.fhwn.vector.dtos;

import java.util.List;
import java.util.UUID;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class CreateOfferDTO {

    @NotEmpty
    private String name;

    @Positive
    private Double price;

    @Positive
    private Integer durationInMinutes;

    private List<UUID> employeeIds;
}
