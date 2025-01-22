<script setup lang="ts">
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
            to: "/",
        },
    ],
];
</script>

<template>
    <div class="flex h-screen w-screen">
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
