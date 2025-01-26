package at.ac.fhwn.vector.dtos;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class RequestDTO {
    private UUID id;

    private Date date;

    private List<AppointmentOfferEmployeeDTO> data;
}
