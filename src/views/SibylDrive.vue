<template>
  <el-container direction="horizontal">
    <el-page-header @back="goBack" style="line-height: 32px" />
    <el-input v-model="inputPath" @change="changePath" placeholder="Please input" />
  </el-container>
  <el-divider></el-divider>
  <el-table v-loading="loading" :data="dir" style="width: 100%" @row-click="enterDir">
    <el-table-column prop="name" label="目录 | 点击进入"/>
    <el-table-column prop="size" label="大小"/>
    <el-table-column prop="time" label="日期" :formatter="dateFormatter"/>
  </el-table>
  <div v-show="this.$route.params.project">
    <br>
    <el-form :inline="true">
      <el-form-item label="新建文件夹">
      <el-input v-model="dirname" placeholder="文件夹名称"></el-input>
      </el-form-item>
      <el-form-item>
      <el-button type="primary" @click="makeDir">新建</el-button>
      </el-form-item>
    </el-form>
    <el-table v-loading="loading" :data="file" style="width: 100%" @row-click="getFile">
      <el-table-column prop="name" label="文件 | 点击下载"/>
      <el-table-column prop="size" label="大小"/>
      <el-table-column prop="time" label="日期" :formatter="dateFormatter"/>
    </el-table>
    <br>
    <el-upload
      drag
      :action="'http://localhost:7000' + this.$route.path"
      :headers="{'X-Auth-Token': this.$store.state.token}"
      :on-success="dirList"
      :on-error="uploadError"
      multiple
    >
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">
      拖拽或 <em>点击上传文件</em>
      </div>
    </el-upload>
  </div>
</template>

<script>
import { UploadFilled } from '@element-plus/icons-vue'
import { ElNotification } from 'element-plus'
export default {
    name: "SibylDrive",
    props: ['project', 'path'],
    components: {UploadFilled},
    data() {
        return {
            dirname: '',
            loading: false,
            inputPath: '',
            dir: [],
            file: []
        }
    },
    created() {
      this.$watch(
        () => this.$route.params,
        () => {
            if (this.$route.path.startsWith('/drive/')) {
                this.inputPath = this.$route.path
                this.dirList()
            }
        },
        { immediate: true }
      )
    },
    methods: {
        dirList: async function() {
            this.loading = true
            if (this.$route.params.project == undefined) {
                if (this.$store.state.project != 'admin')
                    await this.changeScopedToken('admin')
            } else {
                if (this.$route.params.project != this.$store.state.project)
                    await this.changeScopedToken(this.$route.params.project)
            }
            let self = this
            let url = 'http://localhost:7000' + this.$route.path
            await this.$axios.get(url, {
                headers: {'X-Auth-Token': this.$store.state.token}
            }).then(function (response) {
                self.dir = response.data.result.dir
                self.file = response.data.result.file
            }).catch(function (error) {
                ElNotification({
                    title: error.response.status.toString(),
                    message: error.response.data,
                    position: 'bottom-right',
                    type: 'error'
                })
                self.goBack()
            })
            this.loading = false
        },
        dateFormatter: function(row, column, cellValue) {
            let date = new Date(cellValue*1000)
            return date.toLocaleString()
        },
        enterDir: function(row) {
            this.$router.push({path: `${row.name}/`})
        },
        getFile: function(row) {
            let url = 'http://localhost:7000' + this.$route.path + row.name
            this.$axios.get(url, {
                headers: {'X-Auth-Token': this.$store.state.token},
                responseType: 'blob'
            }).then(function (response) {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', row.name);
                document.body.appendChild(link);
                link.click();
            }).catch(function (error) {
                ElNotification({
                    title: error.response.status.toString(),
                    message: error.response.data,
                    position: 'bottom-right',
                    type: 'error'
                })
            })
        },
        makeDir: function(){
            let self = this
            let url = 'http://localhost:7000' + this.$route.path
            this.$axios.post(url,{
                dir: this.dirname
            }, {
                headers: {'X-Auth-Token': this.$store.state.token}
            }).then(function () {
                self.dirList()
            }).catch(function (error) {
                ElNotification({
                    title: error.response.status.toString(),
                    message: error.response.data,
                    position: 'bottom-right',
                    type: 'error'
                })
            })
        },
        uploadError: function(error) {
            ElNotification({
                title: error.status.toString(),
                message: error.message,
                position: 'bottom-right',
                type: 'error'
            })
        },
        goBack: function() {
            this.$router.go(-1)
        },
        changePath: function() {
            this.$router.push(this.inputPath)
        },
        testToken: function() {
            let url = 'http://localhost:5000/v3/auth/tokens'
            this.$axios.get(url, {
                headers: {
                    'X-Auth-Token': this.$store.state.token,
                    "X-Subject-Token": this.$store.state.token
                }
            }).catch(function (error) {
                ElNotification({
                    title: error.response.status.toString(),
                    message: error.response.data,
                    position: 'bottom-right',
                    type: 'error'
                })
            })
        },
        changeScopedToken: async function(project) {
            let self = this
            let url = 'http://localhost:5000/v3/auth/tokens'
            await this.$axios.post(url, {
                "auth": {
                    "identity": {
                        "methods": ["token"],
                        "token": {
                            "id": this.$store.state.token
                        }
                    },
                    "scope": {
                        "project": {
                            "domain": { "id": "default" },
                            "name": project
                        }
                    }
                }
            }).then(function (response) {
                self.$store.state.token = response.headers['x-subject-token']
                console.log(self.$store.state.token)
                self.$store.state.project = project
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