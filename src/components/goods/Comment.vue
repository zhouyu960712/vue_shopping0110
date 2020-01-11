<template>
  <div class="comment1">
    <h3>发表评论</h3>
    <hr />
    <textarea v-model="msg" rows="5" placeholder="请输入留言" maxlength="120"></textarea>
    <van-button type="info" size="large" @click="setComment">发布评论</van-button>
    <div>
      <ul>
        <li v-for="(item,index) in comments" :key="index">
          <p class="aaa">
            第{{index+1}}楼&nbsp;&nbsp;用户:{{item.user_name}}&nbsp;&nbsp;发表时间:{{item.add_time | dateFormat}}
          </p>
          <p>{{item.content}}</p>
        </li>
      </ul>
    </div>

    <van-button type="danger" size="large" @click="getMore">加载更多</van-button>
  </div>
</template>

<script>

export default {
  data() {
    return {
      comments:[],
      pageindex:1,
      id:this.$route.params.id,
      msg:""
    }
  },
  created(){
    this.getComment();
  },
  methods: {
    async getComment(){
     const {data:res} = await this.$http.get('/api/getcomments/'+this.id+'?pageindex='+this.pageindex)
     if(res.status !== 0){
       this.$message.error('获取评论失败!')
     }
     this.comments =this.comments.concat(res.message)
     console.log(res)
    },
    getMore(){
      this.pageindex++;
      this.getComment()
    },
    async setComment(){
      if(this.msg.trim()===0){
        return Toast('评论内容不能为空')
      }
      const {data:res}= await this.$http.post('/api/postcomment/'+this.$route.params.id,'content='+this.msg.trim())
      if(res.status !== 0){
         this.$toast("评论失败")
      }
      this.$toast("评论成功")
      location.reload()
    }
  }
}
</script>

<style lang="less" scoped>
.comment1 {
  font-size: 14px;
  h3{
    font-size: 18px;
  }
  textarea {
    width: 100%;
  }
  .aaa{
    background-color: #ccc;
  }
}
</style>