<template>
    <LoginLayout>
        <div class="authentication-header"></div>
        <div class="section-authentication-signin d-flex align-items-center justify-content-center my-5 my-lg-0">
            <div class="container">
                <div class="row row-cols-1 row-cols-lg-2 row-cols-xl-3">
                    <div class="col mx-auto">
                        <div class="mb-4 text-center">
                            <img src="/assets/images/logo-img.png" width="180" alt="Logo" />
                        </div>
                        <div class="card rounded-4">
                            <div class="card-body">
                                <div class="p-4 rounded">
                                    <div class="text-center">
                                        <h3>LOGIN</h3>
                                    </div>
                                    <form @submit.prevent="handleLogin" class="row g-3">
                                        <div class="col-12">
                                            <label for="username" class="form-label">Username</label>
                                            <input v-model="username" type="text" class="form-control" id="username"
                                                placeholder="Enter Username" required />
                                        </div>
                                        <div class="col-12">
                                            <label for="password" class="form-label">Enter Password</label>
                                            <div class="input-group">
                                                <input :type="showPassword ? 'text' : 'password'" v-model="password"
                                                    class="form-control border-end-0" id="password"
                                                    placeholder="Enter Password" required />
                                                <span class="input-group-text bg-transparent" style="cursor:pointer"
                                                    @click="togglePassword">
                                                    <i :class="showPassword ? 'bx bx-show' : 'bx bx-hide'"></i>
                                                </span>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="d-grid">
                                                <button type="submit" class="btn btn-primary">
                                                    <i class="bx bxs-lock-open"></i>Sign in
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> <!-- end row -->
            </div>
        </div>
    </LoginLayout>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import LoginLayout from '@/layouts/LoginLayout.vue'
import api from '@/lib/axios'
import { useUserStore } from '@/stores/user'

const username = ref('')
const password = ref('')
const showPassword = ref(false)
const router = useRouter()
const userStore = useUserStore()

function togglePassword() {
    showPassword.value = !showPassword.value
}

const handleLogin = async () => {
    try {
        const res = await api.post('/login', {
            username: username.value,
            password: password.value
        })

        const { access_token, refresh_token, user, company } = res.data

        userStore.setToken(access_token)
        userStore.setUser(user)

        localStorage.setItem('access_token', access_token)
        localStorage.setItem('refresh_token', refresh_token)
        localStorage.setItem('company', JSON.stringify(company))

        router.push('/dashboard')
    } catch (error) {
        console.error('Login error:', error)
        alert(error.response?.data?.message || 'Login gagal')
    }
}
</script>
