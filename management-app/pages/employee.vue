<template>
    <div>
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

        <div class="py-4">
            <div v-if="data == null">Keine Mitarbeiter</div>
            <div v-else>
                <div
                    v-for="item in data"
                    :key="item"
                    class="flex justify-between gap-2"
                >
                    <UCard>
                        <template #header>
                            <h1 class="text-md font-bold">
                                {{ item["name"] }}
                            </h1>
                        </template>
                        <div>
                            Mitarbeiter:
                            <ul>
                                <li>Max Mustermann</li>
                                <li>Max Mustermann</li>
                                <li>Max Mustermann</li>
                            </ul>
                        </div>

                        <template #footer>
                            <UButton
                                color="red"
                                variant="outline"
                                @click="deleteEmployee(item.id)"
                                >Löschen</UButton
                            >
                        </template>
                    </UCard>
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
                        Mitarbeiter hinzufügen
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
                <UFormGroup label="Angebote" name="offers">
                    <USelectMenu
                        multiple
                        :options="options"
                        v-model="state.selected"
                        placeholder="Wähle Angebote aus"
                    />
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

<script setup lang="js">
const { data, refresh } = await useFetch(
    "http://192.168.0.45:8080/api/employees"
);

const { data: offers } = await useFetch("http://192.168.0.45:8080/api/offers");


const options = ref([]);
if (offers.value) {
  options.value = offers.value.map((offer) => ({
    label: offer.name,
    value: offer.id,
  }));
}


const isOpen = ref(false);


const state = reactive({
    name: undefined,
    selected: [],
});

const validate = () => {
    const errors = [];
    if (!state.name) errors.push({ path: "name", message: "Erforderlich" });
    return errors;
};

async function deleteEmployee(id) {
    console.log(id);
    const res = await $fetch(`http://192.168.0.45:8080/api/employees/${id}`,{
        method: "DELETE",
    });
    refresh();
}

async function onSubmit() {
    // Do something with data

    const res = await $fetch("http://192.168.0.45:8080/api/employees", {
        method: "POST",
        body: {
            name: state.name,
            offerIds: state.selected.map((item) => item.value),
        },
    });
    console.log(res);
    isOpen.value = false;
    refresh();
}
</script>
