<template>
  <el-form label-position="left" label-width="80px" style="max-width: 500px">
    <el-form-item label="个人信息">
      <el-input
        v-model="info"
        :autosize="{ minRows: 4 }"
        type="textarea"
        placeholder="请输入"
      >
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="setInfo">确定</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { ElNotification } from 'element-plus'
export default {
    name: "SibylHome",
    data() {
        return {
            info: ''
        }
    },
    created() {
        this.getInfo()
    },
    methods: {
        getInfo: async function(){
            let self = this
            let url = 'http://localhost:7000/user'
            this.$axios.get(url,{
                headers: {'X-Auth-Token': this.$store.state.token}
            }).then(function (response) {
                self.info = response.data.result
            }).catch(function (error) {
                ElNotification({
                    title: error.response.status.toString(),
                    message: error.response.data,
                    position: 'bottom-right',
                    type: 'error'
                })
            })
        },
        setInfo: async function(){
            let url = 'http://localhost:7000/user'
            await this.$axios.post(url,{
                info: this.info
            }, {
                headers: {'X-Auth-Token': this.$store.state.token}
            }).catch(function (error) {
                ElNotification({
                    title: error.response.status.toString(),
                    message: error.response.data,
                    position: 'bottom-right',
                    type: 'error'
                })
            })
            this.getInfo()
        }
    }
}
</script>