<template>
  <div class="container">
    <div class="menu"></div>
    <div class="goods-list">
      <div class="goods-item">
        <div class="goods-img"></div>
        <div class="goods-info"></div>
      </div>
    </div>
  </div>
  <div class="footer"></div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { CartData } from "@/utils/cart";

const goods = [
  {
    pic: "../assets/1.jpg",
    title: "棒打鲜橙",
    desc: "大片橙子真给力，一杯满满有维C",
    sellNumber: 200,
    favorRate: 95,
    price: 32,
  },
  {
    pic: "../assets/2.jpg",
    title: "蜜桃四季春",
    desc: "蜜桃四季春，四季桃花运",
    sellNumber: 10,
    favorRate: 42,
    price: 19.9,
  },
  {
    pic: "../assets/3.jpg",
    title: "冰鲜柠檬水",
    desc: "",
    sellNumber: 100,
    favorRate: 64,
    price: 15.9,
  },
  {
    pic: "../assets/4.jpg",
    title: "芝士奶盖",
    desc: "绵绵咸芝士，新晋白月光",
    sellNumber: 20,
    favorRate: 35,
    price: 24.6,
  },
  {
    pic: "../assets/4.jpg",
    title: "草莓奶绿",
    desc: "草莓正当季，自然甜蜜蜜",
    sellNumber: 230,
    favorRate: 87,
    price: 26.9,
  },
  {
    pic: "../assets/4.jpg",
    title: "雪顶咖啡",
    desc: "鲜脆云南豆，国货好咖啡",
    sellNumber: 130,
    favorRate: 62,
    price: 28.9,
  },
];

const cartData = ref(new CartData(goods));
console.log(cartData.value);
</script>
<style lang="less" scoped></style>
