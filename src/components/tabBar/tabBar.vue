<template>
  <div class="tab">
    <router-link tag="div" class="tab-item" to="/index">
      <div class=""  @click="changeTabBar('index')">
          <img :src="iconUrls.index[0]" v-if="!tabBarStatus.index" alt="">
          <img :src="iconUrls.index[1]" v-if="tabBarStatus.index" alt="">
        <span class="tab-link">首页</span>
      </div>
    </router-link>
    <router-link tag="div" class="tab-item" to="/classify" >
      <div class=""  @click="changeTabBar('classify')">
        <img :src="iconUrls.classify[0]" v-if="!tabBarStatus.classify" alt="">
        <img :src="iconUrls.classify[1]" v-if="tabBarStatus.classify" alt="">

        <span class="tab-link">分类</span>
      </div>
    </router-link>
    <router-link tag="div" class="tab-item" to="/baby" >
      <div class=""  @click="changeTabBar('baby')">
        <img :src="iconUrls.baby[0]" v-if="!tabBarStatus.baby" alt="" >
        <img :src="iconUrls.baby[1]" v-if="tabBarStatus.baby" alt="" >
        <span class="tab-link">宝宝</span>
      </div>
    </router-link>
    <router-link tag="div" class="tab-item" to="/mine">
      <div class=""  @click="changeTabBar('mine')">
        <img :src="iconUrls.mine[0]" v-if="!tabBarStatus.mine" alt="">
        <img :src="iconUrls.mine[1]" v-if="tabBarStatus.mine" alt="">
        <span class="tab-link">我的</span>
      </div>
    </router-link>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    name:'TabBar',
    data(){
      return{
        iconUrls:{
          index:[require('../../assets/index@3x.png'),require('../../assets/index_active@3x.png')],
          classify:[require("../../assets/classify@3x.png"),require("../../assets/classify_active@3x.png")],
          baby:[require("../../assets/baby@3x.png"),require("../../assets/baby_active@3x.png")],
          mine:[require("../../assets/mine@3x.png"),require("../../assets/mine_active@3x.png")],
        },
        tabBarStatus:{
          index:true,
          classify:false,
          baby:false,
          mine:false,
        }
      }
    },
    methods:{
      changeTabBar(e){
        for(let i in this.iconUrls){
          if(i!=e){
             this.tabBarStatus[i]=false;
          }else if(i===e){
            this.tabBarStatus[i]=true;
          }
        }
      }
    }
  }
</script>
<style scoped lang="scss">
  @import "../../common/style/common";
.tab{
  position: fixed;
  bottom: 0em;
  width: 100%;
  height: 5.0em;
  background-color: #ffffff;
  box-shadow: 0em -0.1em .1em #e6e6e6;
  @include row-spaceAround;
  .tab-item{
    @include column-spaceAround;
    @include flex-align-center;
    height: 100%;
    div{
      @include column-spaceAround;
      @include flex-align-center;
      height: 100%;
    }
    img{
      width:30%;
      height: auto;
    }
    span{
      font-size: 1.4em;
    }
    .tab-link{
      color:navajowhite;
    }
    &.router-link-active{
      .tab-link{
        color: #f4770d;
        // border-bottom: 2em solid red;
      }
    }
  }
}
</style>
