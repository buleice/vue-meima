<template>
<div>
<div v-if="type===1">
  <div  class='title-box title-box-2'>
    <div class='title-item-left'>
      <img :src='someList.iconUrl' class='icon'>
      <span class='title-span'>{{someList.title}}</span>
    </div>
    <a class='more' @click='goToMenuList(someList.title,7)'>{{someList.button}}</a>
  </div>
  <div class='flex-box'>
    <div class='item-box' v-for="item in hots">
      <router-link :to="{ name: 'menudetail', params: { id: item.id }}" class="router-link">
        <img :src='item.img'>
        <span> {{item.title}} </span>
      </router-link>
    </div>
  </div>
</div>

<div v-if="type===2">
  <div class='title-box title-box-2'>
    <div class='title-item-left'>
      <img :src='someList.iconUrl' class='icon'>
      <span class='title-span'>{{someList.title}}</span>
    </div>
    <a class='more' @click='goToMenuClassifyList(someList.title,8)'>{{someList.button}}</a>
  </div>
  <div class='flex-box'>
    <div class='item-box' v-for="item in hots">
      <router-link :to="{ name: 'menulist', params: {type:3, id:item.id,title:item.title }}" class="router-link">
        <img :src='item.img'>
        <span> {{item.title}} </span>
      </router-link>
    </div>
  </div>
</div>
</div>
</template>

<script>
export default {
  props: {
    someList: {
      type: Object,
      default: {}
    },
    hots: {
      type: Array,
      default: []
    },
    type:{
      type:Number,
      default:-1
    }
  },
  created() {

  },
  methods:{
    goToMenuList(title,type){
      this.$router.push({name:'menulist' , params: {type:type,title:title }})
    },
    goToMenuClassifyList(title,type){
      this.$router.push({name:'subjectlist' , params: {type:type,title:title }})
    },
  }
}
</script>

<style>
/* pages/components/theHots/thehots.wxss */

.title-item-left {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.title-text {
  display: block;
  line-height: 2.5em;
  margin-left: 1.1em;
}

.router-link {
  text-decoration: none;
  display: block;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content:space-between;
  color: black;
}
</style>
