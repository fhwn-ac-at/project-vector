package at.ac.fhwn.vector.controller;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import at.ac.fhwn.vector.dtos.CreateOfferDTO;
import at.ac.fhwn.vector.dtos.OfferDTO;
import at.ac.fhwn.vector.dtos.OfferEmployeeDTO;
import at.ac.fhwn.vector.mappers.OfferMapper;
import at.ac.fhwn.vector.services.OfferService;
import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/offers")
public class OfferController {

    @Autowired
    private OfferService offerService;

    @CrossOrigin
    @GetMapping()
    public List<OfferEmployeeDTO> getAllOffers() {
        return this.offerService.getAllOffers().stream().map(OfferMapper::toOfferEmployeeDto)
                .collect(Collectors.toList());
    }

    @CrossOrigin
    @PostMapping()
    public OfferDTO addOffer(@Valid @RequestBody CreateOfferDTO offerDTO) {
        return OfferMapper.toDto(this.offerService.addOffer(offerDTO));
    }

    @CrossOrigin
    @DeleteMapping("{offerId}")
    public void deleteOfferById(@PathVariable("offerId") UUID offerId) {
        this.offerService.deleteOfferById(offerId);
    }

}
