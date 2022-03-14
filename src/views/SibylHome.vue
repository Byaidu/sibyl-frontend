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
export default {
    name: "SibylHome",
    data() {
        return {
            info: '欢迎使用 Sibyl 系统'
        }
    },
    methods: {
        setInfo: function(){
            // TODO
        }
    }
}
</script>