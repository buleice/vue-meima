<template>
<div class="index" ref="index">
  <scroll class="scroll" :data="[hotMenus.hotmenu,hotSubject.hottopic,hotMaterial,hotClassify]">
    <div>
      <div class="slider-wrapper" ref="sliderWrapper">
        <slider>
          <div v-for='item in list'>
            <router-link :to="{ name: 'menudetail', params: {id:item.id} }" class="router-link">
              <img :src="item.img" alt="item.title">
              <div class="banner">
                <span>{{item.title}}</span>
              </div>
            </router-link>
          </div>
        </slider>
      </div>
      <search/>

      <div>
        <div class='title-box'>
          <img src='../../assets/hotClassify@3x.png' class='icon'>
          <span class='title-span'>热门分类</span>
        </div>
        <div class='flex-box' v-if="hotClassify.length">
            <div class='classify-box' v-for="item in hotClassify" @click='goToMenuList(item)'>
              <span> {{item.title}}</span>
            </div>
        </div>
      </div>

      <div>
        <div class='title-box'>
          <img src='../../assets/hotMaterial@3x.png' class='icon'>
          <span class='title-text'>热门食材</span>
        </div>
        <div class='flex-box flex-box-p'>
          <div class='material-box' v-for="item in hotMaterial"  @click='goToMenuListTytwo(item)'>
            <img :src='item.img'></img>
            <span> {{item.title}} </span>
          </div>
          <!-- <div class='material-box'>
          </div> -->
        </div>
      </div>
      <hot-template :type=1 :someList="hotMenus" :hots="hotMenus.hotmenu"></hot-template>
      <hot-template :type=2 :someList="hotSubject" :hots="hotSubject.hottopic"></hot-template>
    </div>
  </scroll>
  <router-view></router-view>
</div>
</template>

<script>
import Slider from '../../base/slider/slider.vue'
import Scroll from '../../base/scroll/scroll.vue'
import Search from '../../base/search-box/search-box'
import HotTemplate from '../../base/menusubject/menusubject.vue'
import {
  fetchRequest
} from 'api/fetch.js'
export default {
  name: 'index',
  data() {
    return {
      list: [],
      hotClassify: [],
      hotMaterial: [],
      hotMenus: {
        title: "热门菜谱",
        button: "更多菜谱",
        iconUrl: require("../../assets/hotMenu@3x.png"),
        hotmenu: []
      },
      hotSubject: {
        title: "热门专题",
        button: "更多专题",
        iconUrl: require("../../assets/hotSubject@3x.png"),
        hottopic: []
      }
    }
  },
  created() {
    fetchRequest('/apis/meima/homepage.json', {
      mode: "cors",
      method: 'GET'
    }).then(res => {
      this.list = res.data.focus;
      this.hotClassify = res.data.foodCls
      this.hotMaterial = res.data.foodstuff
      this.hotMenus.hotmenu = res.data.hotmenu
      this.hotSubject.hottopic = res.data.hottopic
    })
  },
  methods:{
    goToMenuList(item){
      this.$router.push({name:'menulist' , params: {type:1, id:"menu",title:item.title }})
    },
    goToMenuListTytwo(item){
      this.$router.push({name:'menulist' , params: {type:2, id:"menu",title:item.title }})
    }
  },
  components: {
    Slider,
    Scroll,
    Search,
    HotTemplate
  }
}
</script>

<style>
.banner{
position: absolute;
width: 100%;
height: 4em;
line-height: 4em;
left: 0;
bottom: 0;
background:rgba(35, 39, 18, 0.2);
text-align: left;
/* line-height: 4em; */
color: white;
padding: 0 1.25em;
box-shadow: 0 -0.1em 0.1em inset;
}
.router-link {
  position: relative;
  text-decoration: none;
  display: block;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content:space-between;
  color: black;
}
.router-link img{
  width: 100%;
  height: 100%;
}
.index {
  position: fixed;
  top: 0em;
  left: 0em;
  bottom: 5.1em;
  width: 100%;
}

.scroll {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.slider-wrapper {
  width: 100%;
  position: relative;
  overflow: hidden;
}

.title-box {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  color: #666;
  padding: 1.5em 1.5em;
}

.title-box-2 {
  justify-content: space-between;
}


.title-item-left {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.icon {
  width: 2.5em;
  height: 2.5em;
}

.title-span {
  line-height: 2.5em;
  margin-left: 1.1em;
}

.more {
  justify-content: flex-end;
}

.flex-box {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0 1.5em;
}


.flex-box-p:after {
    content: "";
    max-width: 24.0em;
    width: 30%;
 }
.material-box {
  max-width: 24.0em;
  width: 30%;
  height: 5.8em;
  margin: .5em 0em;
  /* padding: 5em 0em; */
  background: #fff;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  border-radius: .2em;
}

.material-box img {
  width: 3.8em;
  height: 3.8em;
}




.item-box {
  background: #fff;
  width: 48%;
  max-width: 30em;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border-radius: 0.1em;
  border-radius: 0.2em;
  margin: .8em 0;
}

.item-box img {
  width: 100%;
  height: 8.1em;
}

.item-box span {
  display: inline-block;
  width: 100%;
  text-align: center;
  text-overflow:ellipsis;
  overflow: hidden;
  height: 3em;
  line-height: 3em;
}

.classify-box {
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

}
</style>
