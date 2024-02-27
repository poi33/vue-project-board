<script setup lang="ts">
import { ref } from 'vue';
import Ticket from '@/data/Ticket';
import Lane from '@/data/Lane';
import { getData } from '@/data/dataFromApi';
import LaneTab from '@/components/LaneTab.vue';

const data = await ref(getData()).value;
const lanes: Map<String, Lane> | undefined = data?.lanes;
const tickets: Map<String, Ticket> | undefined = data?.tickets;
const ticketByLane = orderByLane(tickets || new Map<String, Ticket>());
const laneTab = ref(Lane.getDefaultLane().name);

function orderByLane(tickets: Map<String, Ticket>) {
    const orderedTickets: Map<String, Ticket[]> = new Map<String, Ticket[]>();
    for (const [ticketid, ticket] of tickets) {
        const laneid = ticket.lane || Lane.getDefaultLane()._id;
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
@/dataHandling/DataBaseConnect