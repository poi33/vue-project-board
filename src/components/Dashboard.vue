<script setup lang="ts">
    import { ref } from 'vue';
    import Ticket from '@/dataHandling/Ticket';
    import Lane from '@/dataHandling/Lane';
    import { getJsonData } from '@/dataHandling/readfile';
    
    const data = ref(getJsonData());
    const lanes: Map<number, Lane> | undefined = data.value?.lanes;
    const tickets: Map<number, Ticket> | undefined = data.value?.tickets;
</script>

<template>
    <div class="dashboard">
        <section class="overview">
            <div class="ticket" :key="ticketid" v-for="(ticket, ticketid) in tickets">
                <h2 class="headline">{{ ticket[1].name }}</h2>
                <div class="actions">
                    <div class="lane" v-if="lanes" role="select">
                        <div v-if="ticket[1].lane">
                            {{ lanes.get(ticket[1].lane)?.name}}
                        </div>
                        <div v-else>
                            {{ Lane.getDefaultLane().name }}
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
        overflow-x: scroll;
    }
    .overview {
        display: flex;
        align-content: start;
        gap: 5px;
        flex-wrap: wrap;
        flex-direction: column;
        height: 100%;
    }
    .ticket {
        padding: 20px;
        background-color: var(--ticket-color);
        color: var(--ticket-text);
        border-radius: 7.5px;
        width: 300px;

        .headline {
            font-size: 1.2rem;
            margin-bottom: 10px;
        }
    }
</style>