<script setup lang="ts">
    import { ref } from 'vue';
    import Ticket from '@/dataHandling/Ticket';
    import Lane from '@/dataHandling/Lane';
    import { getJsonData } from '@/dataHandling/readfile';
    import TicketItem from '@/components/TicketItem.vue';
    
    const data = ref(getJsonData());
    const lanes: Map<number, Lane> = data.value?.lanes || new Map<number, Lane>();
    const tickets: Map<number, Ticket> | undefined = data.value?.tickets;
</script>

<template>
    <q-page class="row wrap justify-start items-start">
        <template v-for="[ticketid, ticket] in tickets" :key="ticketid" >
            <TicketItem :ticket="ticket" :lanes="lanes"/>
        </template>
    </q-page>
</template>
