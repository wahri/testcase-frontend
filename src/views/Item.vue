<template>
    <AdminLayout>

        <!--breadcrumb-->
        <div class="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
            <div class="breadcrumb-title pe-3">Master Item</div>
            <div class="ps-3">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb mb-0 p-0">
                        <li class="breadcrumb-item"><a href="javascript:;"><i class="bx bx-home-alt"></i></a>
                        </li>
                        <li class="breadcrumb-item active" aria-current="page">Items</li>
                    </ol>
                </nav>
            </div>
            <div class="ms-auto">
                <div class="btn-group">
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal"
                        data-bs-target="#createModal">Add Item</button>
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
                                        <input v-model="form.company_name" type="text" class="form-control" id="company"
                                            disabled />
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="mb-3">
                                        <label for="item_type" class="form-label">Item Type</label>
                                        <input value="Product" type="text" class="form-control" id="item_type"
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
                                <div class="col-6">
                                    <div class="mb-3">
                                        <label for="label" class="form-label">Label</label>
                                        <input v-model="form.Label" type="text" class="form-control" id="label"
                                            placeholder="Enter label" required />
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="mb-3">
                                        <label for="item_group_id" class="form-label">Item Group</label>
                                        <select v-model="form.ItemGroup" class="form-select" id="item_group_id">
                                            <option value="">Select Item Group</option>
                                            <option v-for="itemGroup in itemGroups" :key="itemGroup.id"
                                                :value="itemGroup.id">
                                                {{ itemGroup.name }}</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="mb-3">
                                        <label for="item_account_group_id" class="form-label">Item Account Group</label>
                                        <select v-model="form.ItemAccountGroup" class="form-select"
                                            id="item_account_group_id">
                                            <option value="">Select Item Account Group</option>
                                            <option v-for="itemAccountGroup in itemAccountGroups"
                                                :key="itemAccountGroup.id" :value="itemAccountGroup.id">
                                                {{ itemAccountGroup.name }}</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <div class="mb-3">
                                        <label for="item_unit_id" class="form-label">Item Unit</label>
                                        <select v-model="form.ItemUnit" class="form-select" id="item_unit_id">
                                            <option value="">Select Item Unit</option>
                                            <option v-for="itemUnit in itemUnits" :key="itemUnit.id"
                                                :value="itemUnit.id">
                                                {{ itemUnit.name }}</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <div class="mb-3">
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" v-model="form.IsActive"
                                                id="is_active">
                                            <label class="form-check-label" for="is_active">Is Active</label>
                                        </div>
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

        <!-- edit modal -->
        <div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="editModalLabel">Edit Item</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form @submit.prevent="handleEdit">
                        <div class="modal-body">
                            <div class="row">
                                <div class="col-6">
                                    <div class="mb-3">
                                        <label for="edit_company" class="form-label">Company</label>
                                        <input v-model="editForm.company_name" type="text" class="form-control"
                                            id="edit_company" disabled />
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="mb-3">
                                        <label for="edit_item_type" class="form-label">Item Type</label>
                                        <input value="Product" type="text" class="form-control" id="edit_item_type"
                                            disabled />
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="mb-3">
                                        <label for="edit_code" class="form-label">Code</label>
                                        <input v-model="editForm.Code" type="text" class="form-control" id="edit_code"
                                            placeholder="Enter Code" required />
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="mb-3">
                                        <label for="edit_label" class="form-label">Label</label>
                                        <input v-model="editForm.Label" type="text" class="form-control" id="edit_label"
                                            placeholder="Enter Label" required />
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="mb-3">
                                        <label for="edit_item_group_id" class="form-label">Item Group</label>
                                        <select v-model="editForm.ItemGroup" class="form-select"
                                            id="edit_item_group_id">
                                            <option value="">Select Item Group</option>
                                            <option v-for="itemGroup in itemGroups" :key="itemGroup.id"
                                                :value="itemGroup.id">
                                                {{ itemGroup.name }}
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="mb-3">
                                        <label for="edit_item_account_group_id" class="form-label">Item Account
                                            Group</label>
                                        <select v-model="editForm.ItemAccountGroup" class="form-select"
                                            id="edit_item_account_group_id">
                                            <option value="">Select Item Account Group</option>
                                            <option v-for="itemAccountGroup in itemAccountGroups"
                                                :key="itemAccountGroup.id" :value="itemAccountGroup.id">
                                                {{ itemAccountGroup.name }}
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <div class="mb-3">
                                        <label for="edit_item_unit_id" class="form-label">Item Unit</label>
                                        <select v-model="editForm.ItemUnit" class="form-select" id="edit_item_unit_id">
                                            <option value="">Select Item Unit</option>
                                            <option v-for="itemUnit in itemUnits" :key="itemUnit.id"
                                                :value="itemUnit.id">
                                                {{ itemUnit.name }}
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <div class="mb-3">
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" v-model="editForm.IsActive"
                                                id="edit_is_active">
                                            <label class="form-check-label" for="edit_is_active">Is Active</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="submit" class="btn btn-primary">Save Changes</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <!--end breadcrumb-->
        <div class="row">
            <div class="col">
                <h6 class="mb-0 text-uppercase">List Item</h6>
                <hr />
                <div class="card">
                    <div class="card-body">
                        <table class="table mb-0">
                            <thead class="table-dark">
                                <tr>
                                    <th scope="col">No</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Company</th>
                                    <th scope="col">Code</th>
                                    <th scope="col">ItemGroup</th>
                                    <th scope="col">Is Active</th>
                                    <th scope="col">Balance</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in items" :key="index">
                                    <th scope="row">{{ index + 1 }}</th>
                                    <td>{{ item.label }}</td>
                                    <td>{{ item.company.name }}</td>
                                    <td>{{ item.code }}</td>
                                    <td>{{ item.item_group.name }}</td>
                                    <td>{{ item.is_active ? 'Yes' : 'No' }}</td>
                                    <td>{{ item.stock_issue_items_sum_quantity ?? 0 }}</td>
                                    <td>
                                        <button class="btn btn-warning btn-sm"
                                            @click="openEditModal(item)">Edit</button>
                                        <button class="btn btn-danger btn-sm ms-1"
                                            @click="handleDelete(item.id)">Delete</button>
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

const userStore = useUserStore()
const itemGroups = ref([])
const itemAccountGroups = ref([])
const itemUnits = ref([])
const items = ref([])
const form = reactive({
    company_name: userStore.user.company.name,
    Company: userStore.user.company.id,
    ItemType: '',
    Code: '<<Auto>>',
    Label: '',
    ItemGroup: '',
    ItemAccountGroup: '',
    ItemUnit: '',
    IsActive: true
})

const editId = ref(null)
const editForm = reactive({
    company_name: userStore.user.company.name,
    Company: userStore.user.company.id,
    ItemType: '',
    Code: '',
    Label: '',
    ItemGroup: '',
    ItemAccountGroup: '',
    ItemUnit: '',
    IsActive: true
})


const fetchItems = async () => {
    const res = await api.get('/item/list')
    items.value = res.data.items
}

const getItemType = async () => {
    try {
        const res = await api.get('/itemType/getTypeByName/Product')
        console.log(res.data)
        if (res.data) {
            form.ItemType = res.data.id
        }
    } catch (error) {
        console.error('Error fetching item type:', error)
    }
}

const getItemGroup = async () => {
    const res = await api.get('/itemGroup/list')
    itemGroups.value = res.data
}

const getItemAccountGroup = async () => {
    const res = await api.get('/itemAccountGroup/list')
    itemAccountGroups.value = res.data
}

const getItemUnit = async () => {
    const res = await api.get('/itemUnit/list')
    itemUnits.value = res.data
}

const handleSubmit = async () => {
    try {
        const res = await api.post('/item', form)
        if (res.status === 200) {
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: res.data.message,
            })
            fetchItems() // Refresh the item list

            // Reset the form
            form.Code = '<<Auto>>'
            form.Label = ''
            form.ItemGroup = ''
            form.ItemAccountGroup = ''
            form.ItemUnit = ''
            form.IsActive = true

            // Close the modal
            const modal = document.getElementById('createModal')
            const modalInstance = bootstrap.Modal.getInstance(modal)
            modalInstance.hide()
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

const handleEdit = async () => {
    try {
        const res = await api.post(`/item/save`, editForm, {
            params: {
                Oid: editId.value
            }
        })

        if (res.status === 200) {
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: res.data.message,
            })
            fetchItems() // Refresh the item list

            // Close the modal
            const modal = document.getElementById('editModal')
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
            cancelButtonText: 'Cancel',
        })

        if (confirmation.isConfirmed) {
            const res = await api.delete(`/item/delete`, {
                params: { Oid: id },
            })

            if (res.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Deleted!',
                    text: res.data.message,
                })
                fetchItems() // Refresh the item list
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

const openEditModal = (item) => {
    editId.value = item.id
    editForm.Code = item.code
    editForm.ItemType = item.item_type_id
    editForm.Label = item.label
    editForm.ItemGroup = item.item_group_id
    editForm.ItemAccountGroup = item.item_account_group_id
    editForm.ItemUnit = item.item_unit_id
    editForm.IsActive = item.is_active

    const modal = new bootstrap.Modal(document.getElementById('editModal'))
    modal.show()
}

onMounted(() => {
    fetchItems()
    getItemType()
    getItemGroup()
    getItemAccountGroup()
    getItemUnit()
})
</script>
