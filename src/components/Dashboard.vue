<script setup lang="ts">
    import { ref } from 'vue';
    
    const swimList = ref(getData());

    function getData() {
        // Preferably fetch data from database

        return [
            {
                id: 1,
                name: 'Unassigned',
                items: [
                    {
                        id: 1,
                        name: 'Task 1'
                    },
                    {
                        id: 2,
                        name: 'Task 2'
                    },
                    {
                        id: 3,
                        name: 'Task 3'
                    }
                ]
            },
            {
                id: 2,
                name: 'Backlog',
                items: [
                    {
                        id: 4,
                        name: 'Task 4'
                    },
                    {
                        id: 5,
                        name: 'Task 5'
                    },
                    {
                        id: 6,
                        name: 'Task 6'
                    }
                ]
            },
            {
                name: 'In progress'
            },
            {
                name: 'Done'
            }
        ]   
    }
</script>

<template>
    <section class="overview">
        <div class="swimlane" v-for="swimlane in swimList" :key="swimlane.id">
            <h2>{{ swimlane.name }}</h2>
            <ul class="swimlaneoverview" v-for="item in swimlane.items" :key="item.id">
                <li class="ticket">{{ item.name }}</li>
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
        padding: 5px;
        border: 1px solid var(--ticket-color);
        border-radius: 7.5px;
        margin-bottom: 10px;
        cursor: grab;
    }
</style>