<script setup lang="ts">
import { ref, defineProps, computed } from 'vue';
import TicketItem from './TicketListItem.vue';
import type Ticket from '@/data/Ticket';
import Lane from '@/data/Lane';

const props = defineProps({
    class: {
        type: String
    },
    tickets: {
        type: Array<Ticket>,
        required: true
    },
    lane: {
        type: Lane,
        required: true
    }
});
</script>

<template>
    <div :class="props.class + ' lanetab'" v-if="props.tickets.length > 0" :key="ticket._id" v-for="ticket in props.tickets">
        <TicketItem :ticket="ticket" :lane="lane" />
    </div>
    <div :class="props.class + ' lanetab'" v-else>
        <div class="no-items">
            <h2 class="text-h3">No tickets</h2>
        </div>
    </div>
</template>

<style scoped>
    .lanetab {
        margin-bottom: 15px;
    }
    .no-items {
        padding: 10px;
        text-align: center;
        border: 1px solid black;
    }
</style>