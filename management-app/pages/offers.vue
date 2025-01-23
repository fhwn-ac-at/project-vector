<template>
    <div>
        <!-- Header Section -->
        <div class="flex justify-between items-center">
            <h1 class="text-2xl font-bold py-4">Angebote Verwalten</h1>
            <UButton
                icon="i-heroicons-plus"
                variant="solid"
                label="Angebot hinzufügen"
                @click="isOpen = true"
            />
        </div>
        <UDivider />

        <!-- Offer List Section -->
        <div class="py-4">
            <div v-if="!data || data.length === 0">Keine Angebote</div>
            <div v-else>
                <div class="flex flex-wrap gap-4">
                    <UCard
                        v-for="item in data"
                        :key="item.id"
                        class="justify-between gap-2"
                    >
                        <template #header>
                            <div class="flex items-center gap-4">
                                <h1 class="text-md font-bold">
                                    {{ item.name }}
                                </h1>
                                <UButton
                                    color="red"
                                    variant="outline"
                                    @click="deleteOffer(item.id)"
                                >
                                    Löschen
                                </UButton>
                            </div>
                        </template>
                        <div>
                            <h1 class="text-md font-bold mb-2">Können:</h1>
                            <div class="flex flex-wrap gap-2">
                                <UBadge
                                    v-for="option in relatedEmployees(item)"
                                    :key="option.name"
                                    size="md"
                                >
                                    {{ option.name }}
                                </UBadge>
                            </div>
                        </div>
                        <template #footer>
                            <div class="flex justify-between gap-2">
                                <div class="flex items-center gap-2">
                                    <UIcon
                                        name="i-heroicons-currency-euro"
                                        class="w-5 h-5"
                                    />
                                    <h1>{{ item.price }} €</h1>
                                </div>
                                <div class="flex items-center gap-2">
                                    <UIcon
                                        name="i-heroicons-clock"
                                        class="w-5 h-5"
                                    />
                                    <h1>{{ item.durationInMinutes }} Min.</h1>
                                </div>
                            </div>
                        </template>
                    </UCard>
                </div>
            </div>
        </div>

        <!-- Add Offer Modal -->
        <UModal v-model="isOpen">
            <UCard
                :ui="{
                    ring: '',
                    divide: 'divide-y divide-gray-100 dark:divide-gray-800',
                }"
            >
                <template #header>
                    <div class="flex items-center justify-between">
                        <h3 class="text-base font-semibold leading-6">
                            Angebot hinzufügen
                        </h3>
                        <UButton
                            color="gray"
                            variant="ghost"
                            icon="i-heroicons-x-mark-20-solid"
                            @click="isOpen = false"
                        />
                    </div>
                </template>
                <UForm
                    :validate="validate"
                    :state="state"
                    class="space-y-4"
                    @submit="onSubmit"
                >
                    <UFormGroup label="Name" name="name">
                        <UInput v-model="state.name" />
                    </UFormGroup>
                    <UFormGroup label="Preis" name="price">
                        <UInput v-model="state.price" type="number">
                            <template #trailing>
                                <span
                                    class="text-gray-500 dark:text-gray-400 text-xs"
                                    >€</span
                                >
                            </template>
                        </UInput>
                    </UFormGroup>
                    <UFormGroup label="Dauer" name="duration">
                        <UInput v-model="state.duration" type="number">
                            <template #trailing>
                                <span
                                    class="text-gray-500 dark:text-gray-400 text-xs"
                                    >min.</span
                                >
                            </template>
                        </UInput>
                    </UFormGroup>
                    <UDivider />
                    <div class="py-4">
                        <UButton type="submit">Erstellen</UButton>
                    </div>
                </UForm>
            </UCard>
        </UModal>
    </div>
</template>

<script setup>
const config = useRuntimeConfig();

// Fetch offers and employees
const { data, refresh } = await useFetch(`${config.public.API_URL}/api/offers`);
const { data: employees } = await useFetch(
    `${config.public.API_URL}/api/employees`
);

const isOpen = ref(false);

const state = reactive({
    name: "",
    price: null,
    duration: null,
});

// Map employees for offer-related badges
const options = computed(() =>
    employees.value
        ? employees.value.map((employee) => ({
              name: employee.name,
              offerIds: employee.offerIds,
          }))
        : []
);

// Get employees related to an offer
const relatedEmployees = (offer) =>
    options.value.filter((employee) => employee.offerIds.includes(offer.id));

// Form validation
const validate = () => {
    const errors = [];
    if (!state.name) errors.push({ path: "name", message: "Erforderlich" });
    if (!state.price) errors.push({ path: "price", message: "Erforderlich" });
    if (!state.duration)
        errors.push({ path: "duration", message: "Erforderlich" });
    return errors;
};

// Delete an offer
async function deleteOffer(id) {
    await $fetch(`${config.public.API_URL}/api/offers/${id}`, {
        method: "DELETE",
    });
    refresh();
}

// Submit new offer
async function onSubmit() {
    await $fetch(`${config.public.API_URL}/api/offers`, {
        method: "POST",
        body: {
            name: state.name,
            price: state.price,
            durationInMinutes: state.duration,
        },
    });
    state.name = "";
    state.price = null;
    state.duration = null;
    isOpen.value = false;
    refresh();
}
</script>
