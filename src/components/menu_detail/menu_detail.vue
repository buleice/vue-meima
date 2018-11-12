<template lang="html">

<div id="menudetail">
		<scroll class="scroll" :data="[...menuData]">

	<div>
  <!-- 头部图片 -->
  <div>
    <img class='menudetail-img' :src='menuData.menu_img' data-src='menuData.menu_img'></img>
  </div>
  <!-- 标题栏 -->
  <div class='title-box'>
    <div>{{menuData.title}}</div>
    <div>{{menuData.view_count}} 人浏览 /{{menuData.collection_count}} 人收藏</div>
    <!-- {{favoriateStaus}} -->
  </div>
  <div class='the-body'>
    <!-- 原料调料营养 -->
    <div  class='three-boxes'>
      <div class='three'>原料</div>
      <div v-if="menuData.material!=''" class="box-underline">
       <div class="step-text">
        <span>{{menuData.material}}</span>
       </div>
      </div>

      <div class='three'>调料</div>
      <div v-if="menuData.nutrition!=''" class="box-underline">
       <div class="step-text">
        <span>{{menuData.nutrition}}</span>
       </div>
      </div>

      <div class='three'>营养</div>

      <div v-if="menuData.seasoning!=''" class="box-underline">
       <div class="step-text">
        <span>{{menuData.seasoning}}</span>
       </div>
      </div>
    </div>

    <!-- 步骤们 -->

    <div v-for="item,index in menuData.step">
      <div class='step-title'>步骤 {{index+1}}</div>
          <div v-if="item.step_img!=null">
          <img :src='item.step_img' class='menudetail-img' v-if="item.step_img" :data-src='item.step_img'></img>
          </div>
        <div  style='margin-top: 0.5rem' class="step-text">
          <span>{{item.step_desc}}</span>
        </div>
<!--      <template is="steps" data="{{...item}}" />-->
    </div>
  </div>
  </div>
	</scroll>
</div>


</template>

<script>
import Scroll from 'base/scroll/scroll'
import {
  fetchRequest
} from 'api/fetch.js'
export default {

  data() {
    return {
      id: "01",
      menuData: {},
      favoriateUrl: require('../../assets/17@3x.png'),
      shareUrl: require("../../assets/16@3x.png"),
      color: "#302121",
      favoriateStaus: false,
      openTypeStatus: 0,
    }
  },
  created() {


  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.id = to.params.id;
      vm.fetchData();
    })
  },
  // 路由改变前，组件就已经渲染完了
  // 逻辑稍稍不同
  //   beforeRouteUpdate(to, from, next) {
  // console.log(111);
  // next()
  //   },
  // watch: {
  //   // 如果路由有变化，会再次执行该方法
  //   '$route': 'fetchData'
  // },
  methods: {
    fetchData() {
      fetchRequest(`/apis/common/menu_detail.json?id=${this.id}`, {
        mode: "cors",
        method: 'POST',
      }).then(res => {
        this.menuData = res.data
      })
    },
    setData(err, post) {
      if (err) {
        this.error = err.toString()
      } else {
        this.post = post
      }
    }
  },
  components: {
    Scroll
  }
}
</script>

<style lang="css" scoped>
#menudetail{
	position: absolute;
	width: 100%;
	top: 0;
	bottom: 5.1em;
}
.scroll {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

/* <!-- 头部图片 --> */
.menudetail-img{
  width: 100%;
  height: auto;
}

.the-body {
  padding: 0 1rem;
  background: #fff;
  padding-bottom: 3.5rem;
}

/* <!-- 标题栏 --> */

.title-box {
  height: 5.5rem;
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 0.75rem;
}

 .title-box div:first-child {
  font-size: 2rem;
}

/* <!-- 原料调料营养 --> */
.box-underline{
  border-bottom: 0.05rem solid #e6e6e6;
  padding-bottom: 2rem;
}
/* .three-boxes {
  padding: 2rem 0;
} */
.three{
  text-align: left;
  font-size: 1.5rem;
  padding: 1.5rem 0;
  color: #f4770d
}

/* <!-- 步骤们 --> */

.step-title {
   width: 6rem;
   height: 3.7rem;
   border-radius:0.04rem  1.4rem;
   /* padding-left: 10rem;  */
   background-color: #f4770d;
    margin: 2.3rem 0;
   text-align: center;
   line-height: 3.7rem;
   color: white;
   font-size: 1.5rem;
  font-weight: bold;

}

.step-text {
  text-align: left;
	line-height:150%;
	font-size: 1rem;
 /* word-spacing: 5rpx; */
 letter-spacing:2px;
  word-spacing: 0.5rem;
}

/* <!-- 固定按钮栏 --> */

.tabbar {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 5rem;
  background: #fff;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0px -1px 1px #e6e6e6;
}

.tabbar img {
  width: 2.3rem;
  height: 2.1rem;
}

/* .tabbar , button {
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

} */

.shareButton {
  outline: none;
  border: none;
  background: transparent;
}

.shareButton::after {
  border: 0;
}

</style>
