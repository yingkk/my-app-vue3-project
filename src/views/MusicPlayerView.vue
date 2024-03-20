<template>
  <div class="music-player">
    <audio
      ref="audio"
      :src="audioUrl"
      controls
      @timeupdate="handleTimeUpdate"
    ></audio>
    <div ref="containerElement" class="container">
      <ul
        ref="ulElement"
        class="lrc-content"
        :style="{
          transform: `translateY(-${offSet}px)`,
        }"
        :data-offset="offSet"
      >
        <li
          :class="{ active: activeIndex === index }"
          v-for="(item, index) in lrcArray"
          :key="index"
        >
          {{ item.words }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts" setup>
// tips: <!-- li*30>lorem4 lorem:乱数假文 表示生成几个单词-->
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import audioUrl from "@/assets/music.mp3";
import { LRC } from "@/data/lyric";
import { computed, onMounted, ref, watch } from "vue";

const audio = ref(null);
const currentTime = ref(0);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function handleTimeUpdate(event: any) {
  currentTime.value = event.target.currentTime;
}
/**
 * 获取当前播放的行歌词下标
 */
const activeIndex = computed(() => {
  return lrcArray.findIndex((t) => t.time > currentTime.value) - 1;
});

/**
 * 解析歌词为LineLrc数组
 */
const lrcArray = LRC.split("\n").reduce((init: Array<LineLrc>, cur: string) => {
  init.push(parseLineLrc(cur));
  return init;
}, []);
/**
 * 解析一个行歌词字符串转为行歌词对象
 */
function parseLineLrc(lineStr: string): LineLrc {
  const temp: Array<string> = lineStr.split("]");
  return {
    time: parseTime(temp[0].substring(1)),
    words: temp[1],
  };
}
/**
 * 解析一个时间字符串为秒
 * timeStr: 已去掉[的时间字符串
 */
function parseTime(timeStr: string): number {
  const temp: Array<string> = timeStr.split(":");
  return +temp[0] * 60 + +temp[1];
}

const containerElement = ref<HTMLElement>();
const ulElement = ref<HTMLElement>();
const containerHeight = ref(0);
const ulHeight = ref(0);

onMounted(async () => {
  containerHeight.value = containerElement.value?.clientHeight || 0;
  ulHeight.value = ulElement.value?.clientHeight || 0;
});
const liHeight = computed(() => {
  return ulElement.value?.children[0].clientHeight || 0;
});

/**
 * 计算ul偏移量
 */
//最大偏移量
let maxOffset = ulHeight.value - containerHeight.value;
const offSet = computed(() => {
  console.log(
    activeIndex.value * liHeight.value +
      liHeight.value / 2 -
      containerHeight.value / 2
  );
  return (
    activeIndex.value * liHeight.value +
    liHeight.value / 2 -
    containerHeight.value / 2
  );
});

console.log(offSet.value);

watch(offSet, () => {
  if (offSet.value < 0) {
    return 0;
  }
  if (offSet.value > maxOffset) {
    return maxOffset;
  }
});

/**
 * 行歌词 model
 */
interface LineLrc {
  time: number; //秒
  words: string; //歌词
}
</script>
<style lang="less" scoped>
.music-player {
  width: 100%;
  height: 100%;
  background-color: #000;
  text-align: center;
  color: #666;
  audio {
    width: 450px;
    margin: 0 auto;
    padding-top: 40px;
  }
  .container {
    height: 420px;
    overflow: hidden;
    .lrc-content {
      li {
        height: 30px;
        line-height: 30px;
        transition: 0.6s;
      }
      .active {
        transform: scale(1.2);
        color: #fff;
      }
    }
  }
}
</style>
