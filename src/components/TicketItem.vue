<script setup lang="ts">
import Lane from '@/dataHandling/Lane';
import Ticket from '@/dataHandling/Ticket';
import { ref, defineProps, computed } from 'vue';

const props = defineProps({
    ticket: {
        type: Ticket,
        required: true
    },
    lanes: {
        type: Map<number, Lane>,
        required: true
    }
});

const model = ref(getLane(props.ticket));
const changeModel = computed({
    get: () => model.value,
    set: (value: Lane) => {
        model.value = value;
    }
});

function changeLane(lane: Lane) {
    // TODO
    // Update ticket on server
    const name = lane.name;
    if (name) {
        console.log("Change lane to: ", lane.name);
        changeModel.value = lane;
    }
}

function getLane(ticket: Ticket) {
    if (ticket.lane) {
        const lane = props.lanes.get(ticket.lane);
        if (lane) {
            return lane;
        } else {
            throw new Error("Data error: Lane should be defined");
        }
    } else {
        return Lane.getDefaultLane();
    }
}
</script>

<template >
    <q-card class="col-auto q-ma-md">
        <q-card-section v-if="ticket">
            <h3 class="headline">{{ ticket.name }}</h3>
            <q-btn-dropdown
                :color="model?.color || 'primary'"
                :label="model.name || 'Error no name found'">
                <q-list>
                    <q-item
                        clickable
                        @click="changeLane(lane)"
                        v-close-popup
                        :key="laneId"
                        v-for="[laneId, lane] in lanes">
                        <q-item-section>
                            <q-item-label>{{ lane.name }}</q-item-label>
                        </q-item-section>
                    </q-item>
                </q-list>
            </q-btn-dropdown>
        </q-card-section>
        <q-card-actions>
            <q-btn color="primary" label="Edit" />
            <q-btn flat label="Delete" />
        </q-card-actions>
    </q-card>
</template>
