<template>
<div class="classify">
	<scroll class="scroll" :data="classifyList">
		<div class="classify-scroll">
		<classify-box :type=1 :boxData="classifyList[0]"></classify-box>
		<classify-box :type=4 :boxData="classifyList[1]"></classify-box>
		<classify-box :type=5 :boxData="classifyList[2]"></classify-box>
		</div>
	</scroll>
</div>
</template>

<script>
import {
  fetchRequest
} from 'api/fetch.js'
import ClassifyBox from '../../base/classify-box/classify-box.vue'
import Scroll from '../../base/scroll/scroll.vue'
export default {
  data() {
    return {
      classifyList: [{
          imgurl: require('../../assets/classify1.png'),
          name: "热门分类",
          texts: []
        },
        {
          imgurl:  require('../../assets/classify2.png'),
          name: "人群分类 ",
          texts: []
        },
        {
          imgurl:  require('../../assets/classify3.png'),
          name: "功效分类",
          texts: []
        }
      ]
    }
  },
  created() {
    fetchRequest('/apis/meima/sort.json', {
      mode: "cors",
      method: 'GET'
    }).then(res => {
      this.classifyList[0].texts = res.data.class;
			this.classifyList[2].texts = res.data.effect;
			this.classifyList[1].texts = res.data.forpeople;
    })
  },
	components:{
		ClassifyBox,
		Scroll
	}
}
</script>

<style scoped>
/* pages/classify/classify.wxss */
.classify{
	padding:0 1.0em;
	position: fixed;
	top: 0em;
	bottom: 5.1em;
}
.classify-scroll{
	padding-bottom: 1.0em;
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

</style>
