<template>
  <div class="common-layout">
    <el-container>
      <el-header><SibylHeader/></el-header>
      <el-container>
        <el-aside width="200px"><el-scrollbar><SibylAside/></el-scrollbar></el-aside>
        <el-main><el-scrollbar><router-view/></el-scrollbar></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import SibylHeader from "./components/SibylHeader.vue";
import SibylAside from "./components/SibylAside.vue"
export default {
  name: 'App',
  components: {SibylHeader, SibylAside},
  created() {
    if (this.$store.state.token == undefined)
      this.$router.push('/login')
  }
}
</script>