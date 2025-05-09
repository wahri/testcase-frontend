<template>
    <AdminLayout>
        <div class="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
            <div class="breadcrumb-title pe-3">Transaction Detail</div>
            <div class="ps-3">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb mb-0 p-0">
                        <li class="breadcrumb-item">
                            <a href="javascript:;"><i class="bx bx-home-alt"></i></a>
                        </li>
                        <li class="breadcrumb-item">
                            <a href="/transaction">Transactions</a>
                        </li>
                        <li class="breadcrumb-item active" aria-current="page">Transaction Detail</li>
                    </ol>
                </nav>
            </div>
        </div>

        <div class="row">
            <div class="col">
                <div class="card">
                    <div class="card-body">
                        <div class="row mb-3">
                            <div class="col-4">
                                <label for="company" class="form-label">Company</label>
                                <input v-model="form.CompanyName" type="text" class="form-control" id="company"
                                    disabled />
                            </div>
                            <div class="col-4">
                                <label for="code" class="form-label">Code</label>
                                <input v-model="form.Code" type="text" class="form-control" id="code"
                                    :disabled="!isEdit" />
                            </div>
                            <div class="col-4">
                                <label for="date" class="form-label">Date</label>
                                <input v-model="form.Date" type="date" class="form-control" id="date"
                                    :disabled="!isEdit" />
                            </div>
                        </div>
                        <div class="row mb-3">
                            <div class="col-8">
                                <label for="account" class="form-label">Account</label>
                                <select v-model="form.Account" class="form-select" id="account" :disabled="!isEdit">
                                    <option value="">Select Item Group</option>
                                    <option v-for="account in accounts" :key="account.id" :value="account.id">
                                        {{ account.name }}</option>
                                </select>
                            </div>
                            <div class="col-4">
                                <label for="status" class="form-label">Status</label>
                                <input v-model="form.Status" type="text" class="form-control" id="status" disabled />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <label for="note" class="form-label">Note</label>
                                <textarea v-model="form.Note" class="form-control" id="note" placeholder="Enter Note"
                                    :disabled="!isEdit"></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer">
                        <router-link to="/transaction" class="btn btn-secondary">Back</router-link>
                        <button type="button" class="btn btn-secondary ms-1" @click="isEdit = !isEdit"
                            v-show="isEdit">Cancel</button>
                        <button type="button" class="btn btn-warning ms-1" @click="isEdit = !isEdit"
                            v-show="!isEdit">Edit</button>
                        <button type="button" class="btn btn-primary ms-1" v-show="isEdit"
                            @click="handleEdit">Save</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col">
                <div class="card">
                    <div class="card-body">
                        <div class="d-flex justify-content-between">
                            <h5 class="card-title">Transaction Items</h5>

                            <button type="button" class="btn btn-success" data-bs-toggle="modal"
                                data-bs-target="#createModal">Add Item</button>
                        </div>
                        <hr>
                        <table class="table mb-0">
                            <thead class="table-dark">
                                <tr>
                                    <th scope="col">No</th>
                                    <th scope="col">Item</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Item Unit</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(transactionItem, index) in transactionItems" :key="index">
                                    <th scope="row">{{ index + 1 }}</th>
                                    <td>{{ transactionItem.item_name }}</td>
                                    <td>{{ transactionItem.quantity }}</td>
                                    <td>{{ transactionItem.item_unit_name }}</td>
                                    <td>
                                        <button class="btn btn-primary btn-sm"
                                            @click="openEditTransactionItemModal(transactionItem)">Edit</button>
                                        <button class="btn btn-danger btn-sm ms-1"
                                            @click="handleDeleteItem(transactionItem.id)">Delete</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
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
                    <form @submit.prevent="handleSubmitItem">
                        <div class="modal-body">
                            <div class="row">
                                <div class="mb-3 col-12">
                                    <label for="item" class="form-label">Item</label>
                                    <select v-model="formItem.Item" class="form-select" id="item">
                                        <option value="">Select Item</option>
                                        <option v-for="item in items" :key="item.id" :value="item.id">
                                            {{ item.label }}</option>
                                    </select>
                                </div>
                                <div class="mb-3 col-6">
                                    <label for="quantity" class="form-label">Quantity</label>
                                    <input v-model="formItem.Quantity" type="number" class="form-control" id="quantity"
                                        placeholder="0" required />
                                </div>
                                <div class="mb-3 col-6">
                                    <label for="item_unit_id" class="form-label">Item Unit</label>
                                    <select v-model="formItem.ItemUnit" class="form-select" id="item_unit_id">
                                        <option value="">Select Item Unit</option>
                                        <option v-for="itemUnit in itemUnits" :key="itemUnit.id" :value="itemUnit.id">
                                            {{ itemUnit.name }}</option>
                                    </select>
                                </div>
                                <div class="mb-3 col-12">
                                    <label for="note" class="form-label">Note</label>
                                    <textarea v-model="formItem.Note" class="form-control" id="note"
                                        placeholder="Enter Note" required></textarea>
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

        <!-- Edit Transaction Modal -->
        <div class="modal fade" id="editTransactionItemModal" tabindex="-1"
            aria-labelledby="editTransactionItemModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="editTransactionItemModalLabel">Edit Transaction</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form @submit.prevent="handleEditItem">
                        <div class="modal-body">
                            <div class="row">
                                <div class="mb-3 col-12">
                                    <label for="item" class="form-label">Item</label>
                                    <select v-model="formEditItem.Item" class="form-select" id="item">
                                        <option value="">Select Item</option>
                                        <option v-for="item in items" :key="item.id" :value="item.id">
                                            {{ item.label }}</option>
                                    </select>
                                </div>
                                <div class="mb-3 col-6">
                                    <label for="quantity" class="form-label">Quantity</label>
                                    <input v-model="formEditItem.Quantity" type="number" class="form-control"
                                        id="quantity" placeholder="0" required />
                                </div>
                                <div class="mb-3 col-6">
                                    <label for="item_unit_id" class="form-label">Item Unit</label>
                                    <select v-model="formEditItem.ItemUnit" class="form-select" id="item_unit_id">
                                        <option value="">Select Item Unit</option>
                                        <option v-for="itemUnit in itemUnits" :key="itemUnit.id" :value="itemUnit.id">
                                            {{ itemUnit.name }}</option>
                                    </select>
                                </div>
                                <div class="mb-3 col-12">
                                    <label for="note" class="form-label">Note</label>
                                    <textarea v-model="formEditItem.Note" class="form-control" id="note"
                                        placeholder="Enter Note" required></textarea>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit" class="btn btn-primary">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </AdminLayout>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Swal from 'sweetalert2'
import api from '@/lib/axios'
import AdminLayout from '@/layouts/AdminLayout.vue'

const route = useRoute()
const transactionId = route.params.id
const isEdit = ref(false)
const accounts = ref([])
const items = ref([])
const itemUnits = ref([])
const transactionItems = ref([])
const editTransactionId = ref(null)

const form = reactive({
    CompanyName: '',
    Company: '',
    Code: '',
    Date: '',
    Account: '',
    AccountName: '',
    Status: '',
    Note: ''
})

const formItem = reactive({
    Item: '',
    Quantity: '',
    ItemUnit: '',
    Note: ''
})

const editItemId = ref(null)
const formEditItem = reactive({
    Item: '',
    Quantity: '',
    ItemUnit: '',
    Note: ''
})

const getAccounts = async () => {
    const res = await api.get('/account/list')
    accounts.value = res.data
}
const getItems = async () => {
    const res = await api.get('/item/list')
    items.value = res.data.items
}
const getItemUnits = async () => {
    const res = await api.get('/itemUnit/list')
    itemUnits.value = res.data
}

const fetchTransaction = async () => {
    try {
        const res = await api.get(`/stockissue/detail/${transactionId}`)
        form.CompanyName = res.data.data.company_name
        form.Company = res.data.data.company_id
        form.Code = res.data.data.code
        form.Date = res.data.data.date
        form.Account = res.data.data.account_id
        form.AccountName = res.data.data.account_name
        form.Status = res.data.data.status
        form.Note = res.data.data.note
        transactionItems.value = res.data.data.stock_issue_items

        console.log(res.data)

    } catch (error) {
        console.error('Error fetching transaction details:', error)
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to fetch transaction details. Please try again.',
        })
    }
}

const handleEdit = async () => {
    try {
        const res = await api.post(`/stockissue/${transactionId}`, form) // Use PUT for updates
        if (res.status === 200) {
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: res.data.message,
            })
            fetchTransaction()
            isEdit.value = false
        }
    } catch (error) {
        console.error('Error updating transaction:', error)
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to update transaction. Please try again.',
        })
    }
}

const handleSubmitItem = async () => {
    try {
        const res = await api.post(`/stockissue/detail/${transactionId}`, formItem) // Use PUT for updates
        if (res.status === 200) {
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: res.data.message,
            })
            fetchTransaction()

            // Reset form
            formItem.Item = ''
            formItem.Quantity = ''
            formItem.ItemUnit = ''
            formItem.Note = ''

            // Close the modal
            const modal = document.getElementById('createModal')
            const modalInstance = bootstrap.Modal.getInstance(modal)
            modalInstance.hide()
        }
    } catch (error) {
        console.error('Error updating transaction:', error)
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to update transaction. Please try again.',
        })
    }
}

const handleEditItem = async (id) => {
    try {
        const res = await api.post(`/stockissue/detail/${transactionId}/${editItemId.value}`, formEditItem) // Use PUT for updates
        if (res.status === 200) {
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: res.data.message,
            })
            fetchTransaction()

            // Close the modal
            const modal = document.getElementById('editTransactionItemModal')
            const modalInstance = bootstrap.Modal.getInstance(modal)
            modalInstance.hide()
        }
    } catch (error) {
        console.error('Error updating item:', error)
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to update item. Please try again.',
        })
    }
}

const handleDeleteItem = async (id) => {
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
            const res = await api.delete(`/stockissue/detail/${transactionId}/${id}`)

            if (res.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Deleted!',
                    text: res.data.message,
                })
                fetchTransaction()
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


const openEditTransactionItemModal = (item) => {
    editItemId.value = item.id
    formEditItem.Item = item.item_id
    formEditItem.Quantity = item.quantity
    formEditItem.ItemUnit = item.item_unit_id
    formEditItem.Note = item.note

    const modal = new bootstrap.Modal(document.getElementById('editTransactionItemModal'))
    modal.show()
}

onMounted(() => {
    fetchTransaction()
    getAccounts()
    getItems()
    getItemUnits()
})
</script>
