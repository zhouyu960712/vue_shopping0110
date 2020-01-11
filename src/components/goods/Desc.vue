<template>
  <div class="goodsDesc">
    <h3 class="title">{{info.title}}</h3>
    <hr />
    <div class="content" v-html="info.content"></div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      //图文信息
      info:{}
    }
  },
  created(){
    this.getGoodsDesc()
  },
  methods:{
    async getGoodsDesc(){
      const{data:res} = await this.$http.get('/api/goods/getdesc/'+this.$route.params.id)
      if(res.status !== 0){
        this.$message.error('获取数据失败!')
      }
      this.info = res.message[0]
    }
  }
}
</script>

<style lang="less" scoped>
.goodsDesc{
  padding: 4px;
  h3{
    font-size: 16px;
    color: #226aff;
    text-align: center;
    margin: 15px 0;
  }
  .content{
    font-size: 16px;
    img{
      width: 100%;
    }
  }
}

</style>