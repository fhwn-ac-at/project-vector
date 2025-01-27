<template>
    <div class="flex items-center justify-center min-h-screen">
        <UCard class="w-full max-w-md">
            <template #header>
                <h1 class="text-xl font-bold text-center">Login</h1>
            </template>

            <div class="space-y-4">
                <UForm class="space-y-4" @submit="onSubmit" :validate="validate" :state="state">
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

const { $firebaseAuth } = useNuxtApp();
const user = ref(null);

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
async function onSubmit() {
    const errors = validate();

    // If there are validation errors, display them
    if (errors.length > 0) {
        console.log("Validation Errors:", errors);
        return;
    }

    try {
        const auth = $firebaseAuth;
        const { signInWithEmailAndPassword } = await import("firebase/auth");
        const result = await signInWithEmailAndPassword(
            auth,
            state.email,
            state.password
        );
        user.value = result.user;
        console.log("Logged in:", user.value);
        authStore.login({ accessToken: user.value.accessToken });
        router.push("/");
    } catch (error) {
        console.error("Login failed:", error);
    }
}
</script>
