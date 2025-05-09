<template>
    <div class="sidebar-wrapper" data-simplebar="true">
        <div class="sidebar-header">
            <div>
                <img src="/assets/images/logo-icon.png" class="logo-icon" alt="logo icon" />
            </div>
            <div>
                <h4 class="logo-text">ELSOFT</h4>
            </div>
            <div class="toggle-icon ms-auto"><i class="bx bx-first-page"></i></div>
        </div>
        <!--navigation-->
        <ul class="metismenu" id="menu">
            <li>
                <router-link to="/dashboard" class="">
                    <div class="parent-icon"><i class="bx bx-home"></i></div>
                    <div class="menu-title">Dashboard</div>
                </router-link>
            </li>
            <li>
                <router-link to="/item" class="">
                    <div class="parent-icon"><i class="bx bx-home"></i></div>
                    <div class="menu-title">Master Item</div>
                </router-link>
            </li>
            <li>
                <router-link to="/transaction" class="">
                    <div class="parent-icon"><i class="bx bx-home"></i></div>
                    <div class="menu-title">Transaction Item</div>
                </router-link>
            </li>

        </ul>
        <!--end navigation-->
    </div>
</template>

<script setup></script>

<style scoped></style>
