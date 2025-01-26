package at.ac.fhwn.vector.dtos;

import java.util.List;
import java.util.UUID;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class CreateEmployeeDTO {

    @NotEmpty
    private String name;

    private List<UUID> offerIds;
}
