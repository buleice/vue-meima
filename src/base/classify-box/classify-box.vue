<template>
<div>
  <div v-if="type===1">
    <div class='classify_box'>
      <div class='classify_title'>
        <img :src="boxData.imgurl"></img>
        <span>{{boxData.name}}</span>
      </div>
    </div>
    <div class='classify_name'>
      <!-- <div > -->
          <span  v-for="item in boxData.texts" class='classify_show'  @click='goToMenuListOne(item)'>{{item.title}}</span>
      <!-- </div> -->
    </div>
  </div>

  <div v-if="type===4">
    <div class='classify_box'>
      <div class='classify_title'>
        <img :src="boxData.imgurl"></img>
        <span>{{boxData.name}}</span>
      </div>
    </div>
    <div class='classify_name'>
      <!-- <div > -->
          <span  v-for="item in boxData.texts" class='classify_show'  @click='goToMenuListFour(item)'>{{item.title}}</span>
      <!-- </div> -->
    </div>
  </div>

  <div v-if="type===5">
    <div class='classify_box'>
      <div class='classify_title'>
        <img :src="boxData.imgurl"></img>
        <span>{{boxData.name}}</span>
      </div>
    </div>
    <div class='classify_name'>
      <!-- <div > -->
          <span  v-for="item in boxData.texts" class='classify_show'  @click='goToMenuListFive(item)'>{{item.title}}</span>
      <!-- </div> -->
    </div>
  </div>
</div>
</div>
</template>

<script>
export default{
  props:{
    boxData:{
      type:Object,
      default:[]
    },
    type:{
      type:Number,
      default:1
    }
  },
  methods:{
    goToMenuListOne(item){
      this.$router.push({name:'menulist' , params: {type:1, id:item.title,title:item.title }})
    },
    goToMenuListFour(item){
      this.$router.push({name:'menulist' , params: {type:4, id:item.title,title:item.title }})
    },
    goToMenuListFive(item){
      this.$router.push({name:'menulist' , params: {type:5, id:item.title,title:item.title }})
    }
  }
}
</script>

<style lang="scss">
.classify_box {
  margin-left: 1.8em;
  margin-right: 1.8em;
  margin-bottom: 1.0em;
  .classify_title {
    margin-top: 1.0em;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    img {
      width: 2.1em;
      height: 2.2em;
      vertical-align: middle;
    }
    span {
      margin-left: .5em;
      font-size: .7em;
    }
  }
}


.classify_name {
  margin-bottom: 2.5em;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  &:last-child{
    margin-right: auto;

  }
  // &:after {
  //   content: "";
  //   flex: auto
  //   align-self: flex-start;
  // }
  .classify_show {
    width: 20%;
    min-width: 4.4em;
    height: 3.2em;
    display: inline-block;
    line-height: 3.1em;
    text-align: center;
    background: #ffffff;
    font-size: 1.4em;
    margin-top: .7em;
  }
}


.classify_show {
  width: 20%;
  height: 3.1em;
  max-width: 12.6em;
  /* min-width: 7.0em; */
  margin: .5em .5em;
  font-size: 1.2em;
  line-height: 3.1em;
  background: #fff;
  span-align: center;
  box-sizing: border-box;
  // width: 74em;
  // height: 32em;
  // display: inline-block;
  // line-height: 31em;
  // text-align: center;
  // background: #ffffff;
  // font-size: 14em;
  // margin-top: 7em;
}
</style>
