<template>
    <div>
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

        <div class="py-4">
            <div v-if="data == null">Keine Angebote</div>
            <div v-else>
                <div class="flex flex-wrap gap-4">
                    <div v-for="item in data" :key="item">
                        <UCard>
                            <template #header>
                                <div class="flex items-center gap-4">
                                    <h1 class="text-md font-bold">
                                        {{ item["name"] }}
                                    </h1>
                                    <UButton
                                        color="red"
                                        variant="outline"
                                        @click="deleteOffer(item.id)"
                                        >Löschen</UButton
                                    >
                                </div>
                            </template>
                            <div>
                                <h1 class="text-md font-bold mb-2">
                                    Können:
                                </h1>
                                <div class="flex flex-wrap gap-2">
                                    <div
                                        v-for="option in options"
                                        :key="option.name"
                                    >
                                        <UBadge
                                            size="md"
                                            v-if="
                                                option.offerIds.includes(
                                                    item.id
                                                )
                                            "
                                        >
                                            {{ option.name }}
                                        </UBadge>
                                    </div>
                                </div>
                            </div>

                            <template #footer>
                                <div class="flex justify-between gap-2">
                                    <div>
                                        <div class="flex items-center gap-2">
                                            <UIcon
                                                name="i-heroicons-currency-euro"
                                                class="w-5 h-5"
                                            ></UIcon>
                                            <h1>
                                                {{ item["price"] }}
                                                €
                                            </h1>
                                        </div>
                                    </div>
                                    <div>
                                        <div class="flex items-center gap-2">
                                            <UIcon
                                                name="i-heroicons-clock"
                                                class="w-5 h-5"
                                            />
                                            <h1>
                                                {{ item["durationInMinutes"] }}
                                                Min.
                                            </h1>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </UCard>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <UModal v-model="isOpen">
        <UCard
            :ui="{
                ring: '',
                divide: 'divide-y divide-gray-100 dark:divide-gray-800',
            }"
        >
            <template #header>
                <div class="flex items-center justify-between">
                    <h3
                        class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
                    >
                        Angebot hinzufügen
                    </h3>
                    <UButton
                        color="gray"
                        variant="ghost"
                        icon="i-heroicons-x-mark-20-solid"
                        class="-my-1"
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
                    <UInput v-model="state.duration" type="number">
                        <template #trailing>
                            <span
                                class="text-gray-500 dark:text-gray-400 text-xs"
                            >
                                €
                            </span>
                        </template>
                    </UInput>
                </UFormGroup>

                <UFormGroup label="Dauer" name="duration">
                    <UInput v-model="state.price" type="number">
                        <template #trailing>
                            <span
                                class="text-gray-500 dark:text-gray-400 text-xs"
                            >
                                min.
                            </span>
                        </template>
                    </UInput>
                </UFormGroup>
                <div class="py-2" />

                <UDivider></UDivider>
                <div class="py-4">
                    <UButton type="submit"> Erstellen </UButton>
                </div>
            </UForm>
        </UCard>
    </UModal>
</template>

<script setup>
const config = useRuntimeConfig();

const { data, status, refresh } = await useFetch(
    `${config.public.API_URL}/api/offers`
);

const { data: employees } = await useFetch(
    `${config.public.API_URL}/api/employees`
);

const options = ref([]);
if (employees.value) {
    options.value = employees.value.map((employee) => ({
        name: employee.name,
        offerIds: employee.offerIds,
    }));
}

console.log("------------------------");
console.log(status);
console.log(data);
console.log(data.value);
const isOpen = ref(false);

const state = reactive({
    name: undefined,
    duration: undefined,
    price: undefined,
});

const validate = () => {
    const errors = [];
    if (!state.name) errors.push({ path: "name", message: "Erforderlich" });
    if (!state.duration)
        errors.push({ path: "duration", message: "Erforderlich" });
    if (!state.price) errors.push({ path: "price", message: "Erforderlich" });
    return errors;
};

async function deleteOffer(id) {
    console.log(id);
    const res = await $fetch(`${config.public.API_URL}/api/offers/${id}`, {
        method: "DELETE",
    });
    refresh();
}

async function onSubmit() {
    // Do something with data
    const res = await $fetch(`${config.public.API_URL}/api/offers`, {
        method: "POST",
        body: {
            name: state.name,
            durationInMinutes: state.duration,
            price: state.price,
        },
    });
    console.log(res);
    isOpen.value = false;
    refresh();
}
</script>
