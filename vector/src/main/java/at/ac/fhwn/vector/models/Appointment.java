package at.ac.fhwn.vector.models;

import java.util.Date;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "appointment")
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @OneToOne
    private Request request;

    @Column(columnDefinition = "date", nullable = false)
    private Date date;

    @Column(columnDefinition = "timestamptz", nullable = false)
    private Date startTime;

    @Column(columnDefinition = "timestamptz", nullable = false)
    private Date endTime;
}
