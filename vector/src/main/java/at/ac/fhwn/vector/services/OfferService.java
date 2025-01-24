package at.ac.fhwn.vector.services;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import at.ac.fhwn.vector.dtos.CreateOfferDTO;
import at.ac.fhwn.vector.models.Employee;
import at.ac.fhwn.vector.models.Offer;
import at.ac.fhwn.vector.repositories.EmployeeRepository;
import at.ac.fhwn.vector.repositories.OfferRepository;

@Service
public class OfferService {

    Logger logger = LoggerFactory.getLogger(OfferService.class);

    @Autowired
    private OfferRepository offerRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    public List<Offer> getAllOffers() {
        return this.offerRepository.findAll();
    }

    public Offer getOfferById(UUID offerId) {
        Optional<Offer> optional = this.offerRepository.findById(offerId);

        if (optional.isPresent())
            return optional.get();

        return null;
    }

    public Offer addOffer(CreateOfferDTO createOfferDTO) {
        logger.info("Creating offer");
        Offer offer = new Offer();
        offer.setName(createOfferDTO.getName());
        offer.setPrice(createOfferDTO.getPrice());
        offer.setDurationInMinutes(createOfferDTO.getDurationInMinutes());

        Set<Employee> employees = new HashSet<>();
        if (createOfferDTO.getEmployeeIds() != null && !createOfferDTO.getEmployeeIds().isEmpty()) {
            for (UUID employeeId : createOfferDTO.getEmployeeIds()) {
                Optional<Employee> optional = this.employeeRepository.findById(employeeId);
                if (optional.isPresent())
                    employees.add(optional.get());
            }
        }

        offer.setEmployees(employees);

        return this.offerRepository.save(offer);
    }

    public void deleteOfferById(UUID offerId) {
        logger.info(String.format("Deleting offer with id %s.", offerId.toString()));

        Optional<Offer> optional = this.offerRepository.findById(offerId);

        if (optional.isPresent())
            this.offerRepository.delete(optional.get());
    }
}
