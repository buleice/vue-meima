<template lang="html">
  <div class='search'>
    <div class='search_input'>
      <input placeholder='想吃什么搜这里，如宝宝蔬菜面'></input>
    </div>
    <div class='search_photo'>
      <img src='../../assets/search_index@2x.png'>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="css" scoped>
	/* 搜索框样式 */
.search{
  width: 100%;
  height: 6.5em;
  background: #ffffff;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: relative;
}
.search_input{
  width: 90%;
  margin: auto;
  /* border: 1em solid black; */
  border-radius: 1.6em;
  height: 3.2em;
  line-height: 3.2em;
  margin: 0 auto;
  background: #f0f0f0;

}
.search_input input{
  outline: none;
  border: .1em solid transparent;
  background: transparent;
  text-align: center;
  width: 80%;
  height: 100%;
  font-size: 1.4em;
}
.search_photo{
  position: absolute;
  left:10%;
  top: 2.3em;
}
.search_photo img{
   width: 2.0em;
   height: 2.0em;
}
</style>
