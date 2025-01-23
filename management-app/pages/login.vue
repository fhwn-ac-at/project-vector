<template>
    <div class="flex items-center justify-center min-h-screen">
        <UCard class="w-full max-w-md">
            <template #header>
                <h1 class="text-xl font-bold text-center">Login</h1>
            </template>

            <div class="space-y-4">
                <UForm class="space-y-4" @submit="onSubmit" :validate="validate">
                    <!-- Email Input -->
                    <UFormGroup label="E-Mail" name="email">
                        <UInput
                            v-model="state.email"
                            type="email"
                            placeholder="E-Mail Adresse"
                        />
                    </UFormGroup>

                    <!-- Password Input -->
                    <UFormGroup label="Passwort" name="password">
                        <UInput
                            v-model="state.password"
                            type="password"
                            placeholder="Passwort"
                        />
                    </UFormGroup>

                    <!-- Submit Button -->
                    <div class="flex justify-end">
                        <UButton variant="solid" type="submit">
                            Einloggen
                        </UButton>
                    </div>
                </UForm>
            </div>
        </UCard>
    </div>
</template>

<script setup>
import { useAuthStore } from "~/stores/auth";

// Disable default layout for this page
definePageMeta({
    layout: false,
});

// Router and Auth Store
const router = useRouter();
const authStore = useAuthStore();

// Reactive State for Form
const state = reactive({
    email: "",
    password: "",
});

// Validation Function
const validate = () => {
    const errors = [];
    if (!state.email)
        errors.push({ path: "email", message: "E-Mail ist erforderlich" });
    if (!state.password)
        errors.push({ path: "password", message: "Passwort ist erforderlich" });
    return errors;
};

// Form Submission Handler
const onSubmit = () => {
    const errors = validate();

    // If there are validation errors, display them
    if (errors.length > 0) {
        console.log("Validation Errors:", errors);
        return;
    }

    // Simulated login logic
    if (state.email === "user@example.com" && state.password === "a") {
        authStore.login({ email: state.email }); // Save user data to store
        router.push("/"); // Redirect to the home page
    } else {
        console.error("Invalid credentials");
    }
};
</script>
