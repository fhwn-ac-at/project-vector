<template>
    <div>
        <!-- Header Section -->
        <div class="flex justify-between items-center">
            <h1 class="text-2xl font-bold py-4">Mitarbeiter Verwalten</h1>
            <UButton
                icon="i-heroicons-plus"
                variant="solid"
                label="Mitarbeiter hinzufügen"
                @click="isOpen = true"
            />
        </div>
        <UDivider />

        <!-- Employee List Section -->
        <div class="py-4">
            <div v-if="!data || data.length === 0">Keine Mitarbeiter</div>
            <div v-else>
                <div class="flex flex-wrap gap-4">
                    <UCard
                        v-for="item in data"
                        :key="item.id"
                        class="justify-between gap-2"
                    >
                        <template #header>
                            <div
                                class="flex gap-8 items-center justify-between"
                            >
                                <div class="flex gap-2 items-center">
                                    <UIcon
                                        name="heroicons-user"
                                        class="w-5 h-5"
                                    />
                                    <h1 class="text-md font-bold">
                                        {{ item.name }}
                                    </h1>
                                </div>
                                <UButton
                                    color="red"
                                    variant="outline"
                                    @click="deleteEmployee(item.id)"
                                >
                                    Löschen
                                </UButton>
                            </div>
                        </template>
                        <h1 class="text-md font-bold mb-2">Kann:</h1>
                        <div class="flex flex-wrap gap-2">
                            <UBadge
                                v-for="offer in relatedOffers(item)"
                                :key="offer.id"
                                size="md"
                            >
                                {{ offer.name }}
                            </UBadge>
                        </div>
                    </UCard>
                </div>
            </div>
        </div>

        <!-- Add Employee Modal -->
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
                            Mitarbeiter hinzufügen
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
                    <UFormGroup label="Angebote" name="offers">
                        <USelectMenu
                            multiple
                            :options="options"
                            v-model="state.selected"
                            placeholder="Wähle Angebote aus"
                        />
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

// Fetch data
const { data, refresh } = await useFetch(
    `${config.public.API_URL}/api/employees`
);
const { data: offers } = await useFetch(`${config.public.API_URL}/api/offers`);

// Modal state
const isOpen = ref(false);

// Form state
const state = reactive({
    name: "",
    selected: [],
});

// Offer options for select menu
const options = computed(() =>
    offers.value
        ? offers.value.map((offer) => ({
              label: offer.name,
              value: offer.id,
          }))
        : []
);

// Get offers related to an employee
const relatedOffers = (employee) =>
    offers.value?.filter((offer) => employee.offerIds.includes(offer.id)) || [];

// Form validation
const validate = () => {
    const errors = [];
    if (!state.name) errors.push({ path: "name", message: "Erforderlich" });
    return errors;
};

// Delete employee
async function deleteEmployee(id) {
    await $fetch(`${config.public.API_URL}/api/employees/${id}`, {
        method: "DELETE",
    });
    refresh();
}

// Submit form
async function onSubmit() {
    await $fetch(`${config.public.API_URL}/api/employees`, {
        method: "POST",
        body: {
            name: state.name,
            offerIds: state.selected.map((item) => item.value),
        },
    });
    state.name = "";
    state.selected = [];
    isOpen.value = false;
    refresh();
}
</script>
