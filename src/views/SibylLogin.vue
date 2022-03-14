<template>
  <el-form label-position="left" label-width="80px" style="max-width: 280px">
    <el-form-item label="用户名">
      <el-input v-model="username"></el-input>
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="password"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="getScopedToken">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { ElNotification } from 'element-plus'
export default {
    name: "SibylLogin",
    data() {
        return {
            username: 'nova',
            password: 'nova'
        }
    },
    computed: {
      initPath: function() {
        if (this.$store.state.profile == undefined || this.$store.state.user == 'admin')
            return '/drive/'
        else
            return `/drive/${this.$store.state.user}/`
      }
    },
    methods: {
        getScopedToken: async function() {
            let self = this
            let url = 'http://localhost:5000/v3/auth/tokens'
            await this.$axios.post(url, {
                "auth": {
                    "identity": {
                        "methods": ["password"],
                        "password": {
                            "user": {
                                "name": this.username,
                                "domain": { "id": "default" },
                                "password": this.password
                            }
                        }
                    },
                    "scope": {
                        "project": {
                            "name": this.username,
                            "domain": { "id": "default" }
                        }
                    }
                }
            }).then(function (response) {
                self.$store.state.token = response.headers['x-subject-token']
                console.log(self.$store.state.token)
                self.$store.state.profile = response.data.token
                self.$store.state.project = self.$store.state.profile.project.name
                self.$store.state.user = self.$store.state.profile.user.name
            }).catch(function (error) {
                ElNotification({
                    title: error.response.status.toString(),
                    message: error.response.data,
                    position: 'bottom-right',
                    type: 'error'
                })
            })
            this.$router.push(this.initPath)
        }
    }
}
</script>