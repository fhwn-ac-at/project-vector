package at.ac.fhwn.vector.services;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.Message;

import at.ac.fhwn.vector.dtos.AppointmentDTO;
import at.ac.fhwn.vector.dtos.AppointmentOfferEmployeeDTO;
import at.ac.fhwn.vector.dtos.CreateAppointmentRequestDTO;
import at.ac.fhwn.vector.dtos.EmployeeDTO;
import at.ac.fhwn.vector.dtos.OfferIdEmployeesDTO;
import at.ac.fhwn.vector.dtos.RequestDTO;
import at.ac.fhwn.vector.mappers.EmployeeMapper;
import at.ac.fhwn.vector.mappers.OfferMapper;
import at.ac.fhwn.vector.models.Appointment;
import at.ac.fhwn.vector.models.Offer;
import at.ac.fhwn.vector.models.Request;
import at.ac.fhwn.vector.repositories.AppointmentRepository;
import at.ac.fhwn.vector.repositories.EmployeeRepository;
import at.ac.fhwn.vector.repositories.OfferRepository;
import at.ac.fhwn.vector.repositories.RequestRepository;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class RequestService {

    @Autowired
    private RequestRepository requestRepository;

    @Autowired
    private RabbitTemplate rabbitTemplate;

    @Autowired
    private OfferRepository offerRepository;

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    public void addRequestToQueue(CreateAppointmentRequestDTO createAppointmentRequestDTO) {
        Request req = new Request();
        req.setDate(createAppointmentRequestDTO.getDate());
        req.setData(createAppointmentRequestDTO.getData());
        req.setNotificationToken(createAppointmentRequestDTO.getNotificationToken());

        rabbitTemplate.convertAndSend("appointment-exchange", "appointment.key", req);
    }

    public Request saveRequest(Request request) {
        return this.requestRepository.save(request);
    }

    public List<Request> getAllRequests(Date date) {
        return this.requestRepository.findByDate(date);
    }

    public List<AppointmentDTO> getAppointments(Date date) {
        List<AppointmentDTO> result = new ArrayList<>();
        List<Appointment> appointments = this.appointmentRepository.findByDate(date);

        for (Appointment appointment : appointments) {
            Request request = appointment.getRequest();
            List<AppointmentOfferEmployeeDTO> requestData = new ArrayList<>();
            for (OfferIdEmployeesDTO data : request.getData()) {
                Optional<Offer> optional = this.offerRepository.findById(data.getOfferId());
                if (optional.isPresent()) {

                    List<EmployeeDTO> employeeDTOs = new ArrayList<>();
                    for (UUID employeeId : data.getEmployeeIds()) {
                        employeeDTOs.add(EmployeeMapper.toDto(this.employeeRepository.findById(employeeId).get()));
                    }
                    requestData.add(new AppointmentOfferEmployeeDTO(OfferMapper.toDto(optional.get()), employeeDTOs));
                }
            }

            result.add(new AppointmentDTO(appointment.getId(),
                    new RequestDTO(appointment.getRequest().getId(), appointment.getRequest().getDate(),
                            requestData),
                    appointment.getStartTime(),
                    appointment.getEndTime()));
        }

        return result;

    }

    public List<AppointmentDTO> generatePlan(Date date) {
        List<AppointmentDTO> result = new ArrayList<>();
        List<Request> requests = this.requestRepository.findByDateAndIsProcessed(date, false);

        Calendar tmpCal = Calendar.getInstance();
        tmpCal.set(Calendar.HOUR_OF_DAY, 9);
        tmpCal.set(Calendar.MINUTE, 0);
        tmpCal.set(Calendar.SECOND, 0);
        tmpCal.set(Calendar.MILLISECOND, 0);

        for (Request request : requests) {
            Appointment appointment = new Appointment();
            List<AppointmentOfferEmployeeDTO> requestData = new ArrayList<>();
            appointment.setDate(date);
            appointment.setRequest(request);
            appointment.setStartTime(tmpCal.getTime());
            for (OfferIdEmployeesDTO data : request.getData()) {
                Optional<Offer> optional = this.offerRepository.findById(data.getOfferId());
                if (optional.isPresent()) {
                    tmpCal.add(Calendar.MINUTE, optional.get().getDurationInMinutes());

                    List<EmployeeDTO> employeeDTOs = new ArrayList<>();
                    for (UUID employeeId : data.getEmployeeIds()) {
                        employeeDTOs.add(EmployeeMapper.toDto(this.employeeRepository.findById(employeeId).get()));
                    }
                    requestData.add(new AppointmentOfferEmployeeDTO(OfferMapper.toDto(optional.get()), employeeDTOs));
                }

            }
            request.setIsProcessed(true);
            this.requestRepository.save(request);
            appointment.setEndTime(tmpCal.getTime());
            appointment = this.appointmentRepository.save(appointment);
            result.add(new AppointmentDTO(appointment.getId(),
                    new RequestDTO(appointment.getRequest().getId(), appointment.getRequest().getDate(),
                            requestData),
                    appointment.getStartTime(),
                    appointment.getEndTime()));
            Message message = Message.builder().putData("startTime", appointment.getStartTime().toString())
                    .putData("endTime", appointment.getEndTime().toString()).setToken(request.getNotificationToken())
                    .build();

            try {
                FirebaseMessaging.getInstance().send(message);
            } catch (FirebaseMessagingException e) {
                log.error("Push notification could not be sent.", e);
            }
        }

        return result;
    }

}
