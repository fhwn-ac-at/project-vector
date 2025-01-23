<script setup>
import { UForm, UFormGroup } from "#components";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "~/stores/auth";

// Disable default layout for this page
definePageMeta({
    layout: false,
});

const router = useRouter();
const authStore = useAuthStore();

const state = reactive({
    email: "",
    password: "",
});

const validate = () => {
    console.log("asdf");
    const errors = [];
    if (!state.email) errors.push({ path: "email", message: "Erforderlich" });
    if (!state.password)
        errors.push({ path: "password", message: "Erforderlich" });
    return errors;
};

const onSubmit = () => {
  console.log(state.email);
    if (state.email === "user@example.com" && state.password === "a") {
        authStore.login({ email: state.email });
        router.push("/");
    }
};
</script>

<template>
    <div class="flex items-center justify-center min-h-screen">
        <UCard class="w-full max-w-md">
            <template #header>
                <h1 class="text-xl font-bold text-center">Login</h1>
            </template>

            <div class="space-y-4">
                <UForm
                    :validate="validate"
                    :state="state"
                    class="space-y-4"
                    @submit="onSubmit"
                >
                    <UFormGroup label="E-Mail" name="email">
                        <UInput
                            v-model="state.email"
                            type="email"
                            placeholder="Email"
                        />
                    </UFormGroup>
                    <UFormGroup label="Passwort" name="password">
                        <UInput
                            v-model="state.password"
                            type="password"
                            placeholder="Passwort"
                        />
                    </UFormGroup>
                    <UButton variant="solid" type="submit"> Login </UButton>
                </UForm>
            </div>
        </UCard>
    </div>
</template>
