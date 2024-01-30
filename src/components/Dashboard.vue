<script setup lang="ts">
    import { ref } from 'vue';
    import json from '@/data/data.json';
    import { directions, moveTicket, type Swimlane, type Item } from '@/dataHandling/swimlane';
    
    const data = ref(getData());
    const swimlanes: Swimlane[] | undefined = data?.value?.swimlanes;
    const items: Item[] | undefined = data?.value?.items;

    function getData() {
        // Should change this to fetch data from database.
        // GraphQL? SQL?

        if (json) {
            return json;
        }

        console.error("No data found");
        return null;
    }

    function getTicket(id: number) {
        const item = items?.find((item: Item) => item.id === id);
        if (!item) {
            throw new Error(`No item found with id ${id}`);
        }
        return item;
    }
</script>

<template>
    <section class="overview">
        <div class="swimlane" v-if="swimlanes" v-for="swimlane in swimlanes" :key="swimlane.id">
            <h2>{{ swimlane.name }}</h2>
            <ul class="swimlaneoverview" v-if="swimlane && items" v-for="itemId in swimlane.items">
                <li class="ticket" v-if="itemId" :key="itemId">
                    <span>{{ getTicket(itemId)?.name }}</span>
                    <div class="actions">
                        <button
                            class="btn" 
                            @click="moveTicket(swimlanes, items, itemId, swimlane.id, directions.left)" 
                            aria-label="Move left">&LeftArrow;</button>
                        <button
                            class="btn" 
                            @click="moveTicket(swimlanes, items, itemId, swimlane.id, directions.right)"
                            aria-label="Move right">&RightArrow;</button>
                    </div>
                </li>
            </ul>
        </div>
    </section>
</template>

<style scoped>
    .overview {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        /* 100vh - hader-height - body padding top/bottom - footer */
        height: calc(100vh -(var(--header-height) + var(--footer-height) + 20px));
    }
    .swimlane {
        border: 1px solid #000;
        padding: 15px;
        flex-grow: 1;
        overflow-y: scroll;

        h2 {
            margin-bottom: 15px;
        }

        ul {
            list-style: none;
        }
    }
    .ticket {
        display: flex;
        padding: 5px;
        border: 1px solid var(--ticket-color);
        border-radius: 7.5px;
        margin-bottom: 10px;

        .actions {
            flex-grow: 1;
            display: flex;
            justify-content: flex-end;

            button {
                padding: 2px 5px;
                border: none;
                border-bottom: 2px solid gray;
                margin-right: 2px;
                border-radius: 2px;
            }
        }
    }
</style>