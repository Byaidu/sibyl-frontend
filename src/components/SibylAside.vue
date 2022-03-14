<template>
  <el-menu mode="vertical" router>
    <el-menu-item v-show="this.$store.state.token" :index="initPath">
      <el-icon><mostly-cloudy /></el-icon>
      <span>文件管理</span>
    </el-menu-item>
    <el-menu-item v-show="this.$store.state.token" index="/share">
      <el-icon><unlock /></el-icon>
      <span>权限管理</span>
    </el-menu-item>
    <el-menu-item v-show="this.$store.state.token" index="/">
      <el-icon><user /></el-icon>
      <span>个人信息</span>
    </el-menu-item>
    <el-menu-item index="/login">
      <el-icon><key /></el-icon>
      <span>登录账号</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
import { User, Unlock, MostlyCloudy, Key } from '@element-plus/icons-vue'
export default {
    name: "SibylAside",
    components: {User, Unlock, MostlyCloudy, Key},
    computed: {
      initPath: function() {
        if (this.$store.state.profile == undefined || this.$store.state.user == 'admin')
            return '/drive/'
        else
            return `/drive/${this.$store.state.user}/`
      }
    }
}
</script>