<template>
    <!-- 刷新 -->
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" success-text="刷新成功"> 
      
        <div class="goods_list">
          <div class="goods_item" v-for="(item) in goodsList" :key="item.id" @click="goDetail(item.id)">
            <img :src="item.img_url" />
            <h1 class="title">{{item.title}}</h1>
            <div class="info">
              <p class="price">
                <i class="now">¥{{item.sell_price}}</i>
                <i class="old"><del>¥{{item.market_price}}</del></i>
              </p>
              <p class="sell">
                热卖中&nbsp;&nbsp;第{{item.stock_quantity}}件
              </p>
            </div>
          </div>
        </div>

        <van-button type="danger" @click="getMore" size="large">加载更多</van-button>
      
    </van-pull-refresh>
    <!-- 商品展示 -->
</template>

<script>
import router from '../../router/index'
export default {
  data() {
    return {
      //查询参数对象
      queryInfo: {
        pageindex: 1
      },
      //商品列表数组
      goodsList: [],
      //默认刷新为false
      isLoading: false,
      loading: false,
      finished: false
    }
  },
  created() {
    this.getGoodsList()
  },
  methods: {
    async getGoodsList() {
      const { data: res } = await this.$http.get('/api/getgoods', {
        params: this.queryInfo
      })
      if (res.status != 0) {
        this.$message.error('获取商品列表数据失败!')
      }
      console.log(res.message)

      this.goodsList = this.goodsList.concat(res.message)
    },
    onRefresh() {
      setTimeout(() => {
        this.$toast('刷新成功')
        this.isLoading = false
        this.getGoodsList()
      }, 500)
    },
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.goodsList.push(this.goodsList.length + 1)
        }
        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.goodsList.length >= 40) {
          this.finished = true
        }
      }, 500)
    },
    getMore(){
      this.queryInfo.pageindex++;
      this.getGoodsList()
    },
    //路由跳转
    goDetail(id){
      console.log(id);
      
      router.push('/goods/detail/'+id)
    }
  }
}
</script>

<style lang="less" scoped>
.goods_list {
  display: flex;
  flex-wrap: wrap;
  padding:.4375rem;
  justify-content: space-between;
}
.goods_item {
  flex: 1;
  width: 49%;
  min-width: 49%;
  max-width: 49%;
  border: 1px solid #ccc;
  box-shadow: 0 0 8px #ccc;
  box-shadow: 0 0 8px #ccc;
  img {
    width: 100%;
  }
  .title {
    font-size: 14px;
    text-align: center;
  }

  .info {
  background-color: #eee;
  
  p {
    margin: 0;
    padding: 5px;
  }
  .price {
    .now {
      margin-left: 5px;
      color:red;
      font-weight: bolt;
      font-size: 16px;
    }
    .old {
      margin-left: 10px;
      font-size: 14px;
    }
  }
  .sell{ 
    height: 20px;
    font-size: 18px;
  }
}
}


</style>