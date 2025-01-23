<script setup>
import { ScheduleXCalendar } from "@schedule-x/vue";
import { createEventsServicePlugin } from "@schedule-x/events-service";
import {
    createCalendar,
    createViewDay,
    createViewMonthAgenda,
    createViewWeek,
} from "@schedule-x/calendar";
import { createEventModalPlugin } from "@schedule-x/event-modal";

import "@schedule-x/theme-default/dist/index.css";

const eventsServicePlugin = createEventsServicePlugin();
const eventModal = createEventModalPlugin();

let calendarApp = null;

const config = useRuntimeConfig();

// Fetch events and add them to the calendar
async function fetchEvents(calendar) {
    try {
        const { data } = await useFetch(`${config.public.API_URL}/api/events`);
        if (data.value) {
            data.value.forEach((event) => {
                console.log("Adding event:", event);
                calendar.eventsService.add(event);
            });
        } else {
            console.error("No events fetched.");
        }
    } catch (error) {
        console.error("Failed to fetch events:", error);
    }
}

// Initialize calendar on mounted lifecycle
onBeforeMount(() => {
    calendarApp = createCalendar({
        locale: "de-DE",
        views: [createViewDay(), createViewWeek(), createViewMonthAgenda()],
        events: [], // Start with an empty events list
        plugins: [eventModal, eventsServicePlugin],
    });

    // Fetch events after initializing the calendar
});

onMounted(() => {
    setTimeout(() => {
        fetchEvents(calendarApp);
    }, 1);
});
</script>

<template>
    <div v-if="calendarApp" class="rounded-lg">
        <ScheduleXCalendar :calendar-app="calendarApp" />
    </div>
    <div v-else>Loading...</div>
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
