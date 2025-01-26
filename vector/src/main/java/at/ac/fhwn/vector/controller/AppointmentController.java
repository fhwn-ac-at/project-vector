package at.ac.fhwn.vector.controller;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import at.ac.fhwn.vector.dtos.AppointmentDTO;
import at.ac.fhwn.vector.dtos.CreateAppointmentRequestDTO;
import at.ac.fhwn.vector.models.Appointment;
import at.ac.fhwn.vector.models.Request;
import at.ac.fhwn.vector.services.RequestService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/appointments")
public class AppointmentController {

    @Autowired
    private RequestService requestService;

    @CrossOrigin
    @PostMapping("requests")
    public void addRequestToQueue(@Valid @RequestBody CreateAppointmentRequestDTO createAppointmentRequestDTO) {
        this.requestService.addRequestToQueue(createAppointmentRequestDTO);
    }

    @CrossOrigin
    @GetMapping("requests")
    public List<Request> getRequest(@RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date date) {
        return this.requestService.getAllRequests(date);
    }

    @CrossOrigin
    @PostMapping("generate")
    public List<AppointmentDTO> generatePlan(@RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date date) {
        return this.requestService.generatePlan(date);
    }

    @CrossOrigin
    @GetMapping()
    public List<AppointmentDTO> getAppointments(@RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date date) {
        return this.requestService.getAppointments(date);
    }

}
