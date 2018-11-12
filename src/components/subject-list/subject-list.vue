<template>
<div class='menulist'>
	<scroll class="scroll" :data="menuData"
    @pulldown="loadDemo"
    @scrollToEnd="loadup">
		<div class="show-box">
			<div v-if="menuData.length>0" class='show' v-for="item in menuData" @click='goToMenuList(item)'>
				<img :src="item.img" class="hot-list">
				<div class="show-text">{{item.title}}123 </div>
			</div>
		</div>
</scroll>
</div>
</template>
<script>
import Scroll from 'base/scroll/scroll'
import axios from 'axios'

export default {
	props:{
    boxData:{
      type:Array,
      default(){
				return[]
			}
    },
  },
	data(){
		return{
			id:'',
			type:1,
			title:'',
			menuData:[]
		}
	},
	beforeRouteEnter (to, from, next) {
	  next(vm => {
			vm.id=to.params.id,
			vm.type=to.params.type,
			vm.title=to.params.title
			axios.get('/apis/common/menu_list.json',{
				params:{
					id:vm.id,
					type:vm.type,
					title:vm.title
				}
			}).then((res)=>{
				vm.menuData=res.data.data.menulist
			}).catch((err)=>{
			})
    // 通过 `vm` 访问组件实例
	  })
	},
	methods:{
		goToMenuList(item){
			  this.$router.push({name:'menulist' , params: {type:3, id:item.id,title:item.title  }})
		},
		scrollend(){
			this.$emit('scrollend')
		},
		loadDemo(){
      this.list = []
      //下拉刷新重新初始化
      this.$refs.pullrefresh.$emit('pullrefresh.finishLoad');
      // this._getDataInfo(1)
    },
    loadup(){
      if(!this.page) return
      this.page ++
      //上拉加载重新初始化
      this.$refs.pullrefresh.$emit('infinitescroll.reInit');
      // this._getDataInfo(this.page)
    },
    _getDataInfo(page){
      notice(page).then((res) => {
        if(res.list.length >= 10){
          this.list = [...this.list, ...res.list]
          //单次请求数据加载完毕后
          this.$refs.pullrefresh.$emit('infinitescroll.finishLoad');
        }else{
          //把page设置成false 数据已经加载完毕了 不用在加载了
          this.page = false
          //所有数据加载完毕后
          this.$refs.pullrefresh.$emit('infinitescroll.loadedDone');
        }
      })
    }

	},
	components:{
		Scroll
	}

}
</script>

<style scoped>
.menulist{
	position: absolute;
	top: 0;
	bottom: 5.1em;
	width: 100%;
	padding:0 1em;
	box-sizing: border-box;
}
.scroll {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.show-box{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: .8rem;
}
.show{
	width: 48%;
  background: #ffffff;
  margin-top: .8rem;
  text-align: center;
  font-size: 1.4rem;
}
.show img{
 width:100%;
 height:auto;
}
.show-text{
	font-size: 1rem;
  height: 3.4rem;
  line-height: 3.4rem;
	overflow: hidden;
}
</style>
