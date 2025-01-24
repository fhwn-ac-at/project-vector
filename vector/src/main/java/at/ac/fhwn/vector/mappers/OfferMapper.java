package at.ac.fhwn.vector.mappers;

import at.ac.fhwn.vector.dtos.OfferDTO;
import at.ac.fhwn.vector.dtos.OfferEmployeeDTO;
import at.ac.fhwn.vector.models.Offer;

public class OfferMapper {

    public static OfferDTO toDto(Offer offer) {
        if (offer == null)
            return null;

        return new OfferDTO(offer.getId(), offer.getName(), offer.getPrice(), offer.getDurationInMinutes());
    }

    public static OfferEmployeeDTO toOfferEmployeeDto(Offer offer) {
        if (offer == null)
            return null;

        return new OfferEmployeeDTO(offer.getId(), offer.getName(), offer.getPrice(), offer.getDurationInMinutes(),
                offer.getEmployees().stream().map(EmployeeMapper::toDto).toList());
    }
}
