<script setup lang="ts">
import Lane from '@/dataHandling/Lane';
import Ticket from '@/dataHandling/Ticket';
import { getStatusColor } from '@/color/colorTools';
import { ref, defineProps, computed } from 'vue';

const props = defineProps({
    class: {
        type: String,
    },
    ticket: {
        type: Ticket,
        required: true
    },
    lane: {
        type: Lane,
        required: true
    }
});

const ticket = ref(props.ticket);

</script>

<template>
    <div :class="props.class + ' ticket q-pa-lg'">
        <h3 class="headline q-ma-none">{{ ticket.name }}</h3>
        <div v-if="ticket.status">
            <span class="text-h6">Status: </span>
            <q-chip class="text-white" size="md" :label="ticket.status" :color="getStatusColor(ticket.status)"/>
        </div>
        <div>
            <q-btn color="primary" label="Open" />
        </div>
    </div>
</template>

<style scoped>
    .ticket {
        border: 1px solid black;
    }
</style>
