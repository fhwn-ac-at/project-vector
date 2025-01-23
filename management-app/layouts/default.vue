<script setup>
import { useAuthStore } from '~/stores/auth'; // Import the Pinia auth store


function click(){
    useAuthStore().logout();
}
const links = [
    [
        {
            label: "Profile",
            avatar: {
                src: "https://avatars.githubusercontent.com/u/739984?v=4",
            },
            badge: 100,
        },
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
            click, // Define the action for logout
        },
    ],
];
</script>

<template>
    <div class="flex h-screen w-screen">
        <!-- Vertical Navigation -->
        <div class="flex items-center justify-center p-4">
            <UVerticalNavigation
                :ui="{
                    size: 'text-md',
                }"
                :links="links"
                @click="handleClick"
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
