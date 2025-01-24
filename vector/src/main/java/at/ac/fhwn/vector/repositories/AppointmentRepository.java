package at.ac.fhwn.vector.repositories;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import at.ac.fhwn.vector.models.Appointment;

public interface AppointmentRepository extends JpaRepository<Appointment, UUID> {

    List<Appointment> findByDate(Date date);
}
