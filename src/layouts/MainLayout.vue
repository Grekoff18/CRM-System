<template>
    <div class="app-main-layout">

        <NavBar @click="isOpen = !isOpen" />

        <SideBar v-model="isOpen"/>

        <!-- Main content section -->
        <main class="app-content" :class="isOpen ? '' : 'full'">
            <div class="app-page">
                <router-view/>
            </div>
        </main>

        <div class="fixed-action-btn">
            <a class="btn-floating btn-large blue" href="#">
                <i class="large material-icons">add</i>
            </a>
        </div>

    </div>    
</template>

<script>
import NavBar from "../components/app/NavBar";
import SideBar from "../components/app/SideBar";

export default {
    name: "main-layout",
    components: {
        NavBar, SideBar
    },
    data () {
        return {
            isOpen: true,    
        }
    }
}
</script>