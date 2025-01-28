<script setup>
import { ScheduleXCalendar } from "@schedule-x/vue";
import { createEventsServicePlugin } from "@schedule-x/events-service";
import { createCalendarControlsPlugin } from "@schedule-x/calendar-controls";

import {
    createCalendar,
    createViewDay,
    createViewMonthAgenda,
    createViewWeek,
} from "@schedule-x/calendar";
import { createEventModalPlugin } from "@schedule-x/event-modal";

import "@schedule-x/theme-default/dist/index.css";
import { useAuthStore } from "~/stores/auth";

const eventsServicePlugin = createEventsServicePlugin();
const eventModal = createEventModalPlugin();
const calendarControls = createCalendarControlsPlugin();

let calendarApp = null;
const appointmentCount = ref(0);
// Format: Friday, 24 January 2025
const formatter = new Intl.DateTimeFormat("de-DE", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
});

const viewSelectedDate = ref(formatter.format(new Date()));
const selectedDate = ref(new Date().toISOString().split("T")[0]);

const config = useRuntimeConfig();
const authStore = useAuthStore();

async function getAppoinmentCount() {
    try {
        const { data } = await useFetch(
            `${config.public.API_URL}/api/appointments/requests`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authStore.accessToken.accessToken}`,
                },
                query: {
                    date: selectedDate.value,
                },
            }
        );
        if (data.value) {
            appointmentCount.value = data.value.length;
        } else {
            console.error("No appointments count fetched.");
        }
    } catch (error) {
        console.error("Failed to fetch appointments count:", error);
    }
}

// Fetch events and add them to the calendar
async function fetchEvents() {
    console.log("Fetching events...");
    try {
        const { data } = await useFetch(
            `${config.public.API_URL}/api/appointments/generate`,
            {
                method: "POST",
                query: {
                    date: selectedDate.value,
                },
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authStore.accessToken.accessToken}`,
                },
            }
        );
        console.log("Checking data");
        if (data.value) {
            console.log("Data fetched");
            console.log(data.value);
            data.value.forEach((event) => {
                const date = new Date(event.startTime);
                const endDate = new Date(event.endTime);

                // Format the date
                const formattedDateStart = `${date.getUTCFullYear()}-${String(
                    date.getUTCMonth() + 1
                ).padStart(2, "0")}-${String(date.getUTCDate()).padStart(
                    2,
                    "0"
                )} ${String(date.getUTCHours()).padStart(2, "0")}:${String(
                    date.getUTCMinutes()
                ).padStart(2, "0")}`;

                const formattedDateEnd = `${endDate.getUTCFullYear()}-${String(
                    endDate.getUTCMonth() + 1
                ).padStart(2, "0")}-${String(endDate.getUTCDate()).padStart(
                    2,
                    "0"
                )} ${String(endDate.getUTCHours()).padStart(2, "0")}:${String(
                    endDate.getUTCMinutes()
                ).padStart(2, "0")}`;
                console.log("formattedDateStart");
                let eventName = "";
                let employeeName = "";
                event.request.data.forEach(
                    (data) => (eventName += data["offer"].name)
                );

                event.request.data.forEach((data) =>
                    data["employees"].forEach((emp) => {
                        employeeName += emp.name;
                    })
                );

                console.log(eventName);
                let newEvent = {
                    id: event.id,
                    title: eventName,
                    people: [employeeName],
                    start: formattedDateStart,
                    end: formattedDateEnd,
                };

                let addEvent = true;
                eventsServicePlugin.getAll().forEach((event) => {
                    if (event.id === newEvent.id) {
                        addEvent = false;
                    }
                });
                if (addEvent) {
                    console.log("Adding event", newEvent);
                    calendarApp.eventsService.add(newEvent);
                }
                else {
                    console.log("Event already exists");
                }
            });
        } else {
            console.error("No events fetched.");
        }
    } catch (error) {
        console.error("Failed to fetch events:", error);
    }
}

async function getGeneratedAppointments() {
    console.log("Fetching generated events...");
    try {
        const { data } = await useFetch(
            `${config.public.API_URL}/api/appointments`,
            {
                method: "GET",
                query: {
                    date: selectedDate.value,
                },
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authStore.accessToken.accessToken}`,
                },
            }
        );
        console.log("Checking data");
        if (data.value) {
            console.log("Data fetched");
            console.log(data.value);
            data.value.forEach((event) => {
                const date = new Date(event.startTime);
                const endDate = new Date(event.endTime);

                // Format the date
                const formattedDateStart = `${date.getUTCFullYear()}-${String(
                    date.getUTCMonth() + 1
                ).padStart(2, "0")}-${String(date.getUTCDate()).padStart(
                    2,
                    "0"
                )} ${String(date.getUTCHours()).padStart(2, "0")}:${String(
                    date.getUTCMinutes()
                ).padStart(2, "0")}`;

                const formattedDateEnd = `${endDate.getUTCFullYear()}-${String(
                    endDate.getUTCMonth() + 1
                ).padStart(2, "0")}-${String(endDate.getUTCDate()).padStart(
                    2,
                    "0"
                )} ${String(endDate.getUTCHours()).padStart(2, "0")}:${String(
                    endDate.getUTCMinutes()
                ).padStart(2, "0")}`;
                console.log("formattedDateStart");
                let eventName = "";
                let employeeName = "";
                event.request.data.forEach(
                    (data) => (eventName += data["offer"].name)
                );

                event.request.data.forEach((data) =>
                    data["employees"].forEach((emp) => {
                        employeeName += emp.name;
                    })
                );

                console.log(eventName);
                let newEvent = {
                    id: event.id,
                    title: eventName,
                    people: [employeeName],
                    start: formattedDateStart,
                    end: formattedDateEnd,
                };

                let addEvent = true;
                eventsServicePlugin.getAll().forEach((event) => {
                    if (event.id === newEvent.id) {
                        addEvent = false;
                    }
                });
                if (addEvent) {
                    calendarApp.eventsService.add(newEvent);
                }
            });
        } else {
            console.error("No generatied events fetched.");
        }
    } catch (error) {
        console.error("Failed to fetch events:", error);
    }
}

// Initialize calendar on mounted lifecycle
onBeforeMount(() => {
    getAppoinmentCount();
    calendarApp = createCalendar({
        callbacks: {
            onSelectedDateUpdate(date) {
                selectedDate.value = date;
                viewSelectedDate.value = formatter.format(new Date(date));
                getAppoinmentCount();
                getGeneratedAppointments();
            },
        },
        locale: "de-DE",
        views: [createViewDay(), createViewWeek(), createViewMonthAgenda()],
        events: [], // Start with an empty events list
        plugins: [eventModal, eventsServicePlugin, calendarControls],
    });

    // Fetch events after initializing the calendar
});

onMounted(() => {
    setTimeout(() => {
        getAppoinmentCount();
        getGeneratedAppointments();
    }, 500);
});
</script>

<template>
    <div class="flex w-full justify-between mb-6">
        <div class="flex gap-2">
            <h1 class="text-4xl font-bold">
                Termine am {{ viewSelectedDate.valueOf() }}:
            </h1>
            <h1 class="text-4xl font-bold text-lime-300">
                {{ appointmentCount.valueOf() }}
            </h1>
        </div>
        <UButton @click="fetchEvents" size="lg">Termine generieren</UButton>
    </div>
    <div v-if="calendarApp" class="rounded-lg">
        <ScheduleXCalendar :calendar-app="calendarApp" />
    </div>
</template>

<style>
/* Custom Styles */
.sx-vue-calendar-wrapper {
    height: 96.5vh;
}

.sx__event-modal,
.sx__date-picker-popup {
    overflow: hidden;
}

/* Custom Scrollbar for the Calendar View */
.sx__view-container::-webkit-scrollbar {
    margin: 2px;
    width: 6px;
    height: 12px;
}

.sx__view-container::-webkit-scrollbar-thumb {
    background: #121212;
    border-radius: 6px;
}

.sx__view-container::-webkit-scrollbar-thumb:hover {
    background: #1e1e1e;
}

:root {
    --sx-color-primary: #a2e638;
    --sx-color-primary-container: #edfcd4;
    --sx-color-on-primary-container: #121212;
}
</style>
