<template lang="html">
  <div class="">
    <div class='search'>
      <div class='search_input'>
        <input placeholder='想吃什么搜这里，如宝宝蔬菜面' v-model="value"></input>
        <img src="../../assets/delete.svg" alt="" class="icon" @click='clearInput'>
      </div>
      <div class='search_photo' @click='search'>
        <img src='../../assets/search_index@2x.png'>
      </div>
    </div>
    <div v-if="searchStatus">
   <div class='hotSearch'>
      <span>热门搜索</span>
      <div class='history_content'>
         <div v-for=" item in menulist" class='history_msg'  data-span='item.tagname'>{{item.tagname}}</div>
      </div>
   </div>

   <div class='history'>
      <div class='history_title'>
         <span>历史记录</span>
         <span bindtap='clearMsg'>清空历史记录</span>
      </div>
      <div class='history_content'>
         <div v-for="item in historyList" class='history_msg'  data-span='item'>{{item}}</div>
      </div>
   </div>
</div>


<!-- 搜索结果 -->
   <!-- <scroll class="scroll" > -->
     <div class="scroll-out" v-if="contentStatus">
      <menu-list-component :menulistData='{}'></menu-list-component>
      <div v-if='errStatus' class='err'>抱歉，没有找到与content相符合的内容</div>
      <div class='more' v-if="visibilityStatus">下拉加载更多</div>
      <div class="weui-loadmore" v-if="isHideLoadMore">
         <div class="weui-loading"></div>
         <div class="weui-loadmore__tips">正在加载</div>
      </div>
      <div class='over' v-if="overStatus">已经到底部啦</div>
       </div>
   <!-- </scroll> -->
  </div>

  <!-- <div class="">
    <span>hello</span>
    <div class='search'>
      <div class='search_input'>
        <input placeholder='想吃什么搜这里，如宝宝蔬菜面'></input>
      </div>
      <div class='search_photo'>
        <img src='../../assets/search_index@2x.png'>
      </div>
    </div>
  </div> -->

</template>

<script>
import MenuListComponent from 'base/menulist-component/menulist-component'
import Search from 'base/search-box/search-box'
import axios from 'axios'
import Scroll from 'base/scroll/scroll'
export default {
  data() {
    return {
      searchlist: [],
      contentStatus: true, //内容
      searchStatus: true, //热门内容
      visibilityStatus: false, //下拉加载
      overStatus: false, //无更多内容
      isHideLoadMore: false,
      errStatus: false, //搜索为空
      deleteStatus: false, //清除图标
      value: '',
      historyList: [],
      menulist: [],
      // 当前页
      pageNumber: 0,
      //总页数
      totalpage: 1,
      content: ""
    }
  },
  created() {
    axios.get('apis/common/menu_list.json', {
      params: {
        type: 6,
        title: 'search'
      }
    }).then((res) => {
      this.menulist = res.data.data.menulist;
    })
  },
  mounted() {},
  methods: {
    search() {
      axios.get('apis//meima/search.json', {
        params: {
          keyword: this.value,
          page: this.vale,
          type: this.value
        }
      }).then((res) => {
        this.searchlist = res.data.data.searchlist
      })
    },
    scrollendGetMore(){
      console.log("滚到底部了")
    },
    clearInput(){
      this.value=''
    }
  },
  components: {
  MenuListComponent,
    Search,
    Scroll
  },
  watch:{
searchlist(){
  if(this.searchlist.length>0){
    this.contentStatus=true;
    this.searchStatus=false;
  }else{
    this.errStatus=true;
  }
}
  }
}
</script>

<style lang="css" scoped>
.scroll-out {
  position: absolute;
  width: 100%;
  top: 6.5em;
  bottom: 0px;
  overflow: hidden;
}
	/* 搜索框样式 */
.search{
  width: 100%;
  height: 6.5em;
  background: #ffffff;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
.search_input{
  width: 85%;
  margin: auto;
  /* border: 1em solid black; */
  border-radius: 1.6em;
  height: 3.2em;
  line-height: 3.2em;
  margin: 0 auto;
  background: #f0f0f0;
  display: flex;
  justify-content: space-around;
  align-items: center;

}
.search_input input{
  padding-left: 1.2em;
  outline: none;
  border: .1em solid transparent;
  background: transparent;
  span-align: left;
  width: 80%;
  height: 100%;
  font-size: 1.4em;
}
.search_input img{
  width: 2em;
  height: 2em;
}
.search_photo{
margin-right: 5px;
}
.search_photo img{
   width: 2.0em;
   height: 2.0em;
}


/* pages/search/search.wxss */

.clear {
  clear: both;
}

.more {
  height: 45px;
  font-size: 1.4rem;
  span-align: center;
  margin-left: 15px;
  margin-right: 15px;
  color: #ccc;
}

.history,.hotSearch {
  margin-top:10px;
}

.history_title {
  display: flex;
  margin-left: 15px;
  margin-right: 15px;
  justify-content: space-between;
}

.hotSearch span{
   margin-left: 15px;
}
.history_content{
  display: flex;
  justify-content: initial;
  flex-wrap: wrap;
  /* margin-left: 18px;
  margin-right: 18px; */
}
.history_msg{
height:34px;
display:inline-block;
line-height:34px;
span-align:center;
background:#ffffff;
font-size:1.4rem;
margin-top:7px;
margin-left:14px;
padding:0 12px;
border-radius: 3px;
}
.weui-loading {
  margin: 0 5px;
  width: 10px;
  height: 10px;
  display: inline-block;
  vertical-align: middle;
  -webkit-animation: weuiLoading 1s steps(12, end) infinite;
  animation: weuiLoading 1s steps(12, end) infinite;
  background: transparent url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCI+PHBhdGggZmlsbD0ibm9uZSIgZD0iTTAgMGgxMDB2MTAwSDB6Ii8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjRTlFOUU5IiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgLTMwKSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iIzk4OTY5NyIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgzMCAxMDUuOTggNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjOUI5OTlBIiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKDYwIDc1Ljk4IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0EzQTFBMiIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSg5MCA2NSA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNBQkE5QUEiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoMTIwIDU4LjY2IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0IyQjJCMiIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgxNTAgNTQuMDIgNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjQkFCOEI5IiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKDE4MCA1MCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNDMkMwQzEiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTE1MCA0NS45OCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNDQkNCQ0IiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTEyMCA0MS4zNCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNEMkQyRDIiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTkwIDM1IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0RBREFEQSIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgtNjAgMjQuMDIgNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjRTJFMkUyIiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKC0zMCAtNS45OCA2NSkiLz48L3N2Zz4=) no-repeat;
  background-size: 100%;
}

.weui-loadmore {
  width: 65%;
  margin: 1.5em auto;
  line-height: 1.6em;
  font-size: 7px;
  span-align: center;
  color:#ccc;
}

.weui-loadmore__tips {
  display: inline-block;
  vertical-align: middle;
}

.over,.err {
  span-align: center;
  font-size: 7px;
  margin-bottom:20px;
  color: #ccc;
}

.i-recommend{
   width: 100%;
   height:250px;
   margin: 25px 0;
   span-align: center;
}
.i-title{
   font-size: 16px;
}
.i-search{
   margin: 15px 0;
}
.i-image{
   width: 150px;
}
</style>
