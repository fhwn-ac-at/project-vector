package at.ac.fhwn.vector.dtos;

import java.util.Date;
import java.util.List;

import lombok.Data;

@Data
public class CreateAppointmentRequestDTO {

    private Date date;

    private List<OfferIdEmployeesDTO> data;

}
