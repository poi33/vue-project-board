<script setup lang="ts">
import { ref } from 'vue';
import Ticket from '@/dataHandling/Ticket';
import Lane from '@/dataHandling/Lane';
import { getJsonData } from '@/dataHandling/readfile';
import LaneTab from '@/components/LaneTab.vue';

const data = ref(getJsonData());
const lanes: Map<number, Lane> = data.value?.lanes || new Map<number, Lane>();
const tickets: Map<number, Ticket> = data.value?.tickets || new Map<number, Ticket>();
const ticketByLane = orderByLane(tickets);
const laneTab = ref(Lane.getDefaultLane().name);

function orderByLane(tickets: Map<number, Ticket>) {
    const orderedTickets: Map<number, Ticket[]> = new Map<number, Ticket[]>();
    for (const [ticketid, ticket] of tickets) {
        const laneid = ticket.lane || Lane.getDefaultLane().id;
        if (orderedTickets.has(laneid)) {
            orderedTickets.get(laneid)?.push(ticket);
        } else {
            orderedTickets.set(laneid, [ticket]);
        }
    }
    return orderedTickets;
}

</script>

<template>
    <q-page>
        <div>
            <q-tabs outside-arrows v-model="laneTab">
                <template :key="laneid" v-for="[laneid, lane] in lanes">
                    <q-tab :name="lane.name" :label="lane.name" />
                </template>
            </q-tabs>
        </div>
        <div class="row justify-center">
            <q-tab-panels class="col-12 col-md-6" v-model="laneTab" animated swipeable>
                <template :key="laneid" v-for="[laneid, lane] in lanes">
                    <q-tab-panel :name="lane.name">
                        <LaneTab :tickets="ticketByLane.get(laneid) || []" :lane="lane"/>
                    </q-tab-panel>
                </template>
            </q-tab-panels>
        </div>
    </q-page>
</template>
