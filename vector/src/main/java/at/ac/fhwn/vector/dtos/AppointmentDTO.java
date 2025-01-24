package at.ac.fhwn.vector.dtos;

import java.util.Date;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AppointmentDTO {
    private UUID id;
    private RequestDTO request;
    private Date startTime;
    private Date endTime;
}
