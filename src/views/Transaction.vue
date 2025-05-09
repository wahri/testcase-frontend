<template>
    <AdminLayout>

        <!--breadcrumb-->
        <div class="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
            <div class="breadcrumb-title pe-3">Transaction Items</div>
            <div class="ps-3">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb mb-0 p-0">
                        <li class="breadcrumb-item"><a href="javascript:;"><i class="bx bx-home-alt"></i></a>
                        </li>
                        <li class="breadcrumb-item active" aria-current="page">Transactions</li>
                    </ol>
                </nav>
            </div>
            <div class="ms-auto">
                <div class="btn-group">
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal"
                        data-bs-target="#createModal">Add Transaction</button>
                </div>
            </div>
        </div>

        <!-- add modal -->
        <div class="modal fade" id="createModal" tabindex="-1" aria-labelledby="createModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="createModalLabel">Create Item</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form @submit.prevent="handleSubmit">
                        <div class="modal-body">
                            <div class="row">
                                <div class="col-6">
                                    <div class="mb-3">
                                        <label for="company" class="form-label">Company</label>
                                        <input v-model="form.CompanyName" type="text" class="form-control" id="company"
                                            disabled />
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="mb-3">
                                        <label for="code" class="form-label">Code</label>
                                        <input v-model="form.Code" type="text" class="form-control" id="code"
                                            placeholder="Enter Code" required />
                                    </div>
                                </div>
                                <div class="col-12">
                                    <div class="mb-3">
                                        <label for="date" class="form-label">Date</label>
                                        <input v-model="form.Date" type="date" class="form-control" id="date"
                                            placeholder="Enter Date" required />
                                    </div>
                                </div>
                                <div class="col-12">
                                    <div class="mb-3">
                                        <label for="account" class="form-label">Account</label>
                                        <select v-model="form.Account" class="form-select" id="account">
                                            <option value="">Select Item Group</option>
                                            <option v-for="account in accounts" :key="account.id" :value="account.id">
                                                {{ account.name }}</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <div class="mb-3">
                                        <label for="note" class="form-label">Note</label>
                                        <textarea v-model="form.Note" class="form-control" id="note"
                                            placeholder="Enter Note" required></textarea>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="submit" class="btn btn-primary">Add</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <!--end breadcrumb-->
        <div class="row">
            <div class="col">
                <h6 class="mb-0 text-uppercase">List Transactions</h6>
                <hr />
                <div class="card">
                    <div class="card-body">
                        <table class="table mb-0">
                            <thead class="table-dark">
                                <tr>
                                    <th scope="col">No</th>
                                    <th scope="col">Company</th>
                                    <th scope="col">Code</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Account</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(transaction, index) in transactions" :key="index">
                                    <th scope="row">{{ index + 1 }}</th>
                                    <td>{{ transaction.company.name }}</td>
                                    <td>{{ transaction.code }}</td>
                                    <td>{{ transaction.date }}</td>
                                    <td>{{ transaction.account.name }}</td>
                                    <td>{{ transaction.status }}</td>
                                    <td>
                                        <router-link :to="`/transaction/detail/item/${transaction.id}`"
                                            class="btn btn-primary btn-sm">Edit</router-link>
                                        <button class="btn btn-danger btn-sm ms-1"
                                            @click="handleDelete(transaction.id)">Delete</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <!--end row-->
    </AdminLayout>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import Swal from 'sweetalert2'
import api from '@/lib/axios'
import AdminLayout from '@/layouts/AdminLayout.vue'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'

const router = useRouter()

const userStore = useUserStore()
const accounts = ref([])
const transactions = ref([])

const form = reactive({
    CompanyName: userStore.user.company.name,
    Company: userStore.user.company.id,
    Code: '<<AutoGenerate>>',
    Date: '',
    Account: '',
    Note: ''
})



const fetchTransactions = async () => {
    const res = await api.get('/stockissue/list')
    transactions.value = res.data.data
}

const getAccounts = async () => {
    const res = await api.get('/account/list')
    accounts.value = res.data
}

const handleSubmit = async () => {
    try {
        const res = await api.post('/stockissue', form)
        if (res.status === 200) {
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: res.data.message,
            })

            const modal = document.getElementById('createModal')
            const modalInstance = bootstrap.Modal.getInstance(modal)
            modalInstance.hide()
            router.push(`/transaction/detail/item/${res.data.data.id}`)
        }
    } catch (error) {
        console.error('Error creating item:', error)
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to create item. Please try again.',
        })
    }
}

const handleDelete = async (id) => {
    try {
        const confirmation = await Swal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        })

        if (confirmation.isConfirmed) {
            const res = await api.delete(`/stockissue/${id}`)

            if (res.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Deleted!',
                    text: res.data.message,
                })
                fetchTransactions()
            }
        }
    } catch (error) {
        console.error('Error deleting item:', error)
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to delete item. Please try again.',
        })
    }
}

onMounted(() => {
    fetchTransactions()
    getAccounts()
})
</script>
