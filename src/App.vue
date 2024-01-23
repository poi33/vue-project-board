<script setup lang="ts">
import Dashboard from './components/dashboard.vue'

function newTicket() {
    //Open new ticket modal
    console.log("new ticket");
}
</script>

<template>
    <main>
        <header>
            <div class="title">
                <h1>Dashboard</h1>
            </div>
            <div class="actions">
                <button @click="newTicket" class="ticket-btn">New ticket</button>
            </div>
        </header>
        <Dashboard />
        <footer>
            Created by <a href="github.com/poi33">Poi33</a>
        </footer>
    </main>
</template>

<style>
main {
    background-color: var(--color-bg);
    color: #fff;
}
header {
    display: grid;
    grid-template-columns: minmax(100px, 1fr) 1fr;
    height: 75px;

    h1 {
        margin-bottom: 5px;
    }
    .actions {
        .ticket-btn {
            background-color: var(--ticket-color);
            box-shadow: 0 2px 0 0 var(--ticket-color-active);
            border: none;
            border-radius: 5px;
            padding: 5px 10px;
            color: #fff;
            font-size: 1rem;
            font-weight: bold;
            cursor: pointer;

            &:active {
                margin-top: 2px;
                background-color: var(--ticket-color-active);
            }
        }
    }
}
footer {
    height: var(--footer-height);

    font-size: 0.8rem;
}
</style>
