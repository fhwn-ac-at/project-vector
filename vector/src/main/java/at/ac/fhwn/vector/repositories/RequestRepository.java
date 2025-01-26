package at.ac.fhwn.vector.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import at.ac.fhwn.vector.models.Request;
import java.util.List;
import java.util.Date;

public interface RequestRepository extends JpaRepository<Request, UUID> {
    List<Request> findByDate(Date date);

    List<Request> findByDateAndIsProcessed(Date date, Boolean isProcessed);
}
