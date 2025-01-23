<template>
    <div class="flex h-screen w-screen">
        <!-- Vertical Navigation -->
        <div class="flex items-center justify-center p-4">
            <UVerticalNavigation
                :ui="{
                    size: 'text-md',
                }"
                :links="links"
            />
        </div>
        <!-- Main Content -->
        <div class="p-4 flex-grow overflow-hidden">
            <div class="h-full w-full overflow-hidden">
                <slot />
            </div>
        </div>
    </div>
</template>

<script setup>
import { useAuthStore } from "~/stores/auth"; // Import the Pinia auth store

const authStore = useAuthStore();

function click() {
    // Check if the clicked item is the logout option
    authStore.logout(); // Trigger logout
}

const links = [
    [
        {
            label: "Willkommen Maxi",
            avatar: {
                alt: "Maximilian Bleier",
                size: "md",
            },
        },
    ],
    [
        {
            label: "Kalender",
            icon: "i-heroicons-calendar",
            to: "/",
        },
        {
            label: "Angebote Verwalten",
            icon: "i-heroicons-shopping-bag",
            to: "/offers",
        },
        {
            label: "Mitarbeiter Verwalten",
            icon: "i-heroicons-user",
            to: "/employee",
        },
    ],
    [
        {
            label: "Logout",
            icon: "i-heroicons-arrow-left-end-on-rectangle",
            click,
        },
    ],
];
</script>
