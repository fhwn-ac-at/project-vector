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
            label: "Home",
            icon: "i-heroicons-home",
            to: "/",
        },
        {
            label: "Angebote Verwalten",
            icon: "i-heroicons-chart-bar",
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
            label: "Settings",
            icon: "i-heroicons-cog",
            to: "/",
        },
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

        <div class="p-4 w-full">
            <div>
                <slot />
            </div>
        </div>
    </div>
</template>
