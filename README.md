[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/vtde1l2O)

# Booking System
The main concept of the booking system project is the possibility for a user to book an appointment at a shop which offers several services. 

A user should be able to choose multiple services and select a desired employee for each. After this step, the order can be completed and the user will receive a notification regarding the date and time of the appointment.

A shop owner should be able to manage available services, employees and view appointments in a dashbord.

## Structure
This project consists of two platforms and one shared backend. 
- The *booking platform* is a web application for a user to book services and get an appointment at a shop. The related code is located in *booking-app*.
- The *shop platform* is a web application for a shop owner to manage available services, employees and view appointments. The related code is located in *management-app*.
- The *shared interface* describes the shared backend infrastructure, which contains all data and necessary API routes to use both platforms. The related code is located in *vector*.

![Context diagram](images/context_diagram.png)
*Context diagram*

![Container diagram](images/container_diagram.png)
*Container diagram*