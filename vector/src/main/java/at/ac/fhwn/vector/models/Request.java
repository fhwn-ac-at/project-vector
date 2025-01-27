package at.ac.fhwn.vector.models;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import at.ac.fhwn.vector.dtos.OfferIdEmployeesDTO;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "request")
public class Request {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(columnDefinition = "date", nullable = false)
    private Date date;

    @ElementCollection
    private List<OfferIdEmployeesDTO> data;

    private Boolean isProcessed = false;

    private String notificationToken;
}
