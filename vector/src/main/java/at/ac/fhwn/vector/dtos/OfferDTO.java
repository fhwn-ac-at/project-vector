package at.ac.fhwn.vector.dtos;

import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class OfferDTO {

    private UUID id;

    private String name;

    private Double price;

    private Integer durationInMinutes;
}
