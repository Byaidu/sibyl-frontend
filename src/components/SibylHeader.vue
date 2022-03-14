<template>
  <el-menu id="logo" mode="horizontal" default-active="home">
    <el-menu-item index="home">
        <div>
        <el-image
            style="width: 50px; height: 50px" 
            :src="require('../assets/logo.png')" 
            fit="cover">
        </el-image>
        <span>Sibyl File System</span>
        </div>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
    name: "SibylHeader"
}
</script>

<style>
#logo img {
  vertical-align: text-bottom;
}
</style>