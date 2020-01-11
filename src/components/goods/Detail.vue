<template>
  <div>
    <div class="van-card">
      <div class="van-card-header"></div>
      <div class="van-card-content">
        <div class="van-card-content-inner">
          <van-swipe :autoplay="3000">
            <van-swipe-item v-for="(image, index) in imgArr" :key="index">
              <img v-lazy="image" />
            </van-swipe-item>
          </van-swipe>
        </div>
      </div>
    </div>

    <!-- 商品购买区域 -->
    <div class="van-card">
      <div class="van-card-header">{{goodsinfo.title}}</div>
      <div class="van-card-content">
        <div class="van-card-content-inner">
          <p class="price">
            市场价:
            <del>${{goodsinfo.market_price}}</del>&nbsp;&nbsp;销售价:
            <span class="now_price">${{goodsinfo.sell_price}}</span>
          </p>
          <h3>购买数量</h3>
          <van-stepper v-model="count" integer />
          <div>
            <van-button type="info">立即购买</van-button>
            <van-button type="warning">加入购物车</van-button>
          </div>
        </div>
      </div>
    </div>

    <!-- 商品参数区域 -->
    <div class="van-card">
      <div class="van-card-header">商品参数</div>
      <div class="van-card-content">
        <div class="van-card-content-inner">
          <p>商品货号:{{goodsinfo.goods_no}}</p>
          <p>存库情况:{{goodsinfo.stock_quantity}}</p>
          <p>上架时间:{{goodsinfo.add_time | dateFormat }}</p>
        </div>
      </div>
    </div>
    <div class="footer">
      <van-button class="ccc" size="large" type="info" @click="goDesc(imgid)">图文介绍</van-button>
      <van-button size="large" type="warning" @click="goComment(imgid)">商品评论</van-button>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      //图片id
      imgid: this.$route.params.id,
      //轮播图图片数组
      imgArr: [],
      count: '',
      //指定商品信息
      goodsinfo: {}
    }
  },
  created() {
    this.getImgArr(), this.getGoodsInfo()
  },
  methods: {
    async getImgArr() {
      const { data: res } = await this.$http.get(
        '/api/getthumimages/' + this.imgid
      )
      if (res.status != 0) {
        this.$message.error('获取图片数据失败!')
      }
      console.log(res)
      res.message.forEach(item => {
        item.img = item.src
      })
      this.imgArr = res.message
    },
    async getGoodsInfo() {
      const { data: res } = await this.$http.get(
        '/api/goods/getinfo/' + this.imgid
      )
      if (res.status != 0) {
        this.$message.error('获取详细商品信息失败!')
      }
      this.goodsinfo = res.message[0]
    },
    goDesc(id) {
      this.$router.push({ name: '/goodsdesc/', params: { id } })
    },
    goComment(id) {
      this.$router.push({ name: '/goodscomments/', params: { id } })
    }
  }
}
</script>


<style scoped>
.van-swipe {
  background-color: #fff;
}
.van-swipe-item {
  text-align: center;
}
img {
  height: 100%;
}
.van-card-header {
  font-size: 23px;
}
.price {
  font-size: 16px;
  color: #ccc;
}
.now_price {
  margin-left: 5px;
  color: red;
}
  .ccc {
    margin-top: 10px;
  }
</style>

