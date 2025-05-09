<template>
    <header>
        <div class="topbar d-flex align-items-center">
            <nav class="navbar navbar-expand gap-3">
                <div class="mobile-toggle-menu"><i class="bx bx-menu"></i></div>
                <div class="top-menu-left d-none d-lg-block">
                    <ul class="nav">
                        <li class="nav-item">
                            <a class="nav-link" href="app-emailbox.html"><i class="bx bx-envelope"></i></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="app-chat-box.html"><i class="bx bx-message"></i></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="app-fullcalender.html"><i class="bx bx-calendar"></i></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="app-to-do.html"><i class="bx bx-check-square"></i></a>
                        </li>
                    </ul>
                </div>
                <div class="search-bar flex-grow-1">
                    <div class="position-relative search-bar-box">
                        <form>
                            <input type="text" class="form-control search-control" autofocus
                                placeholder="Type to search..." />
                            <span class="position-absolute top-50 search-show translate-middle-y"><i
                                    class="bx bx-search"></i></span>
                            <span class="position-absolute top-50 search-close translate-middle-y"><i
                                    class="bx bx-x"></i></span>
                        </form>
                    </div>
                </div>
                <div class="top-menu ms-auto">
                    <ul class="navbar-nav align-items-center gap-1">
                        <li class="nav-item mobile-search-icon">
                            <a class="nav-link" href="javascript:;"><i class="bx bx-search"></i> </a>
                        </li>
                        <li class="nav-item dark-mode d-none d-sm-flex">
                            <a class="nav-link dark-mode-icon" href="javascript:;"><i class="bx bx-moon"></i> </a>
                        </li>
                    </ul>
                </div>
                <div class="user-box dropdown px-3">
                    <a class="d-flex align-items-center nav-link dropdown-toggle dropdown-toggle-nocaret" href="#"
                        role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src="/assets/images/avatars/user.png" class="user-img" alt="user avatar" />
                        <div class="user-info ps-3">
                            <p class="user-name mb-0">{{ userStore.user?.name }}</p>
                        </div>
                    </a>
                    <ul class="dropdown-menu dropdown-menu-end">
                        <li>
                            <a class="dropdown-item" href="javascript:;" @click="handleLogout"><i
                                    class="bx bx-log-out-circle"></i><span>Logout</span></a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    </header>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()

function handleLogout() {
    userStore.logout()
    router.push('/login')
}
</script>


<style scoped></style>
