<script setup lang="ts">
    import { ref } from 'vue';
    import json from '@/data/data.json';
    import { Ticket, getLane, type Swimlane } from '@/dataHandling/ticket';
    
    const data = ref(getData());
    const lanes: Swimlane[] | undefined = data.value?.lanes;
    const tickets: Ticket[] | undefined = data.value?.tickets;

    function getData() {
        // Should change this to fetch data from database.
        // GraphQL? SQL?
        // For now, we will use a json file.

        if (json.tickets && json.lanes) {
            const tickets = json.tickets.map((el: any) => {
                    return new Ticket(
                        el.id,
                        el.name,
                        el.lane,
                        el.description,
                        el.status);
            });
            const lanes = json.lanes.map((el: any) => {
                return el;
            });

            return { tickets, lanes };
        }

        console.error("No data found");
        return null;
    }
</script>

<template>
    <div class="dashboard">
        <section class="overview" v-if="tickets">
            <div class="ticket" :key="ticket.id" v-for="ticket in tickets">
                <h2 class="headline">{{ ticket.name }}</h2>
                <div class="actions">
                    <div class="lane" v-if="lanes" role="select">
                        <div v-if="ticket.lane">
                            {{ getLane(lanes, ticket.id).name }}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<style scoped>
    .dashboard {
        /* 100vh - hader-height - body padding top/bottom - footer */
        height: calc(100vh -(var(--header-height) + var(--footer-height) + 20px));
    }
    .overview {
        display: flex;
        align-items: start;
        gap: 5px;
        flex-wrap: wrap;
        flex-direction: row;
    }
    .ticket {
        display: inline-block;
        padding: 10px;
        border: 1px solid var(--ticket-color);
        border-radius: 7.5px;
        flex-grow: 1;
        min-width: 200px;

        .headline {
            font-size: 1.2rem;
            margin-bottom: 10px;
        }
    }
</style>