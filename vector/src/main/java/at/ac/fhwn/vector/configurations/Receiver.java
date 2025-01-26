package at.ac.fhwn.vector.configurations;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import at.ac.fhwn.vector.models.Request;
import at.ac.fhwn.vector.services.RequestService;
import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class Receiver {

    @Autowired
    private RequestService requestService;

    @RabbitListener(queues = "appointment")
    public void receiveMessage(Request request) {

        // TODO: check if offerid and employeeIds exist

        log.info("Handling request from queue.");

        requestService.saveRequest(request);
    }

}