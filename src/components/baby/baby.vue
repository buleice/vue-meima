<template>
<div class='menulist'>
  <scroll class="scroll" :data="listdata">
    <div class="show-box">
      <div v-if="listdata.length>0" class='show' v-for="item in listdata" @click='goToMenuDetail(item)'>
        <img :src="item.img" class="hot-list">
        <div class="show-text">{{item.title}}123 </div>
      </div>
    </div>
  </scroll>
</div>
</template>

<script>
import {
  fetchRequest
} from 'api/fetch.js'
import MenuList from '../../base/menulist/menulist.vue'
import Scroll from '../../base/scroll/scroll.vue'
export default {
  data() {
    return {
      listdata: [],
      menulist: [],
      visibilityStatus: false, //下拉加载
      overStatus: true, //无更多内容
      isHideLoadMore: true,
      // 当前页
      pageNumber: 0,
      //总页数
      totalpage: 1,
      id: "",
      title: "",
      type: ""
    }
  },
  created() {
    fetchRequest('/apis/meima/baby.json', {
      mode: "cors",
      method: 'GET'
    }).then(res => {
      // console.log(res.data.baby.slice(0, 50))
      this.listdata = res.data.baby;
      this.totalpage = res.data.totalpage;
    })
  },
  methods: {
    goToMenuDetail(item) {
      this.$router.push({
        name: 'menudetail',
        params: {
          id: item.id,
          title: item.title
        }
      })
    },
    loadDemo(res) {
      this.pageNumber++;
      // if (this.pageNumber < this.totalpage) {
      //   this.visibilityStatus= true;
      //   this.isHideLoadMore= false;
      //   fetchRequest('/apis/meima/baby.json', {
      //     mode: "cors",
      //     method: 'POST',
      //     body: JSON.stringify({
      //       id: this.id,
      //       title: this.title,
      //       type: this.type,
      //       page: this.pageNumber
      //     })
      //   }).then(res => {
      //     // console.log(res.data.baby.slice(0, 50))
      //     this.listdata = res.data.baby.slice;
      //     this.totalpage = res.data.data.totalpage;
      //   })
      // }
    },
    loadup(res) {
      console.log(res)
    }
  },
  components: {
    MenuList,
    Scroll
  }
}
</script>

<style scoped>
.menulist {
  position: absolute;
  top: 0;
  bottom: 5.1em;
  width: 100%;
  padding: 0 1em;
  box-sizing: border-box;
}

.scroll {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.show-box {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: .8rem;
}

.show {
  width: 48%;
  background: #ffffff;
  margin-top: .8rem;
  text-align: center;
  font-size: 1.4rem;
}

.show img {
  width: 100%;
  height: auto;
}

.show-text {
  font-size: 1rem;
  height: 3.4rem;
  line-height: 3.4rem;
  overflow: hidden;
}
</style>
