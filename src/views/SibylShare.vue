<template>
  <el-table v-loading="loading" :data="assignments" style="width: 100%">
    <el-table-column prop="user.name" label="用户"/>
    <el-table-column prop="role.name" label="权限"/>
  </el-table>
  <br>
  <el-form :inline="true">
      <el-form-item label="修改可读权限">
      <el-input v-model="username" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item>
      <el-button type="primary" @click="addAssignments">添加</el-button>
      <el-button type="danger" @click="delAssignments">删除</el-button>
      </el-form-item>
  </el-form>
</template>

<script>
import { ElNotification } from 'element-plus'
export default {
    name: "SibylShare",
    data() {
        return {
            assignments: [],
            roles: [],
            users: [],
            username: '',
            loading: false
        }
    },
    created() {
        this.getAssignments()
    },
    methods: {
        getAssignments: async function() {
            this.loading = true
            let self = this
            let url = 'http://localhost:5000/v3/role_assignments'
            await this.$axios.get(url, {
                params: {
                    'scope.project.id': this.$store.state.profile.project.id,
                    'include_names': 1,
                    'effective': 1
                },
                headers: {
                    'X-Auth-Token': this.$store.state.token
                }
            }).then(function (response) {
                self.assignments = response.data.role_assignments
            }).catch(function (error) {
                ElNotification({
                    title: error.response.status.toString(),
                    message: error.response.data,
                    position: 'bottom-right',
                    type: 'error'
                })
            })
            this.loading = false
        },
        addAssignments: async function() {
            if (this.roles.length == 0)
                await this.listRoles()
            if (this.users.length == 0)
                await this.listUsers()
            let project_id = this.$store.state.profile.project.id
            let user_id = this.users.filter(user => user.name == this.username)[0].id
            let role_id = this.roles.filter(role => role.name == 'reader')[0].id
            let url = `http://localhost:5000/v3/projects/${project_id}/users/${user_id}/roles/${role_id}`
            await this.$axios.put(url, {}, {
                headers: {
                    'X-Auth-Token': this.$store.state.token
                }
            }).catch(function (error) {
                ElNotification({
                    title: error.response.status.toString(),
                    message: error.response.data,
                    position: 'bottom-right',
                    type: 'error'
                })
            })
            this.getAssignments()
        },
        delAssignments: async function() {
            if (this.roles.length == 0)
                await this.listRoles()
            if (this.users.length == 0)
                await this.listUsers()
            let project_id = this.$store.state.profile.project.id
            let user_id = this.users.filter(user => user.name == this.username)[0].id
            let role_id = this.roles.filter(role => role.name == 'reader')[0].id
            let url = `http://localhost:5000/v3/projects/${project_id}/users/${user_id}/roles/${role_id}`
            await this.$axios.delete(url, {
                headers: {
                    'X-Auth-Token': this.$store.state.token
                }
            }).catch(function (error) {
                ElNotification({
                    title: error.response.status.toString(),
                    message: error.response.data,
                    position: 'bottom-right',
                    type: 'error'
                })
            })
            this.getAssignments()
        },
        listUsers: async function() {
            let self = this
            let url = 'http://localhost:5000/v3/users'
            await this.$axios.get(url, {
                headers: {
                    'X-Auth-Token': this.$store.state.token
                }
            }).then(function (response) {
                self.users = response.data.users
            }).catch(function (error) {
                ElNotification({
                    title: error.response.status.toString(),
                    message: error.response.data,
                    position: 'bottom-right',
                    type: 'error'
                })
            })
        },
        listRoles: async function() {
            let self = this
            let url = 'http://localhost:5000/v3/roles'
            await this.$axios.get(url, {
                headers: {
                    'X-Auth-Token': this.$store.state.token
                }
            }).then(function (response) {
                self.roles = response.data.roles
            }).catch(function (error) {
                ElNotification({
                    title: error.response.status.toString(),
                    message: error.response.data,
                    position: 'bottom-right',
                    type: 'error'
                })
            })
        }
    }
}
</script>