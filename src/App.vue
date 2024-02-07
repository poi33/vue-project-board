<script setup lang="ts">
import { ref } from 'vue';
import MainDashboard from '@/components/MainDashboard.vue';

const leftMenu = ref(false);
const menu = [
    {
        name: "Dashboard",
        icon: "dashboard",
    },
    {
        name: "Settings",
        icon: "settings",
    }
];

function newTicket() {
    //Open new ticket modal
    console.log("new ticket");
}

function toggleLeftMenu() {
    leftMenu.value = !leftMenu.value;
}

</script>

<template>
    <main>
        <q-layout view="lHh LpR lFf">
            <q-header>
                <q-toolbar>
                    <q-btn 
                        flat round dense icon="menu"
                        @click="toggleLeftMenu"
                    />
                    <q-space />
                </q-toolbar>
            </q-header>
            <q-page-container>
                <MainDashboard/>
            </q-page-container>
            <q-footer>
                Created by <a href="github.com/poi33">Poi33</a>
            </q-footer>
            <q-drawer
                v-model="leftMenu">
                <template v-for="item in menu">
                    <q-list>
                        <q-item clickable>
                            <q-item-section avatar>
                                <q-icon :name="item.icon" />
                            </q-item-section>
                            <q-item-section>
                                <q-item-label >{{item.name}}</q-item-label>
                            </q-item-section>
                        </q-item>
                        <q-separator />
                    </q-list>
                </template>
            </q-drawer>
        </q-layout>
    </main>
</template>

<style scoped></style>
