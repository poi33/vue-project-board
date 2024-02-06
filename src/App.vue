<script setup lang="ts">
    import Dashboard from './components/Dashboard.vue';

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
    padding: 10px;
    background-color: var(--color-bg);
    color: var(--color-text);
}
header {
    display: grid;
    grid-template-columns: 1fr 1fr;
    height: 75px;
    align-items: center;

    h1 {
        margin-bottom: 5px;
    }

    .actions {
        justify-self: end;

        .ticket-btn {
            background-color: var(--btn-bg);
            border: none;
            border-radius: 30px;
            padding: 10px 15px;
            font-size: 1rem;
            color: var(--btn-text);

            &:active {
                margin-top: 2px;
                box-shadow: none;
            }
        }
    }
}
footer {
    height: var(--footer-height);

    font-size: 0.8rem;
}
</style>
