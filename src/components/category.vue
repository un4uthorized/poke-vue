<template>
    <div class='category'>
      <span>{{name || 'default'}}</span>
    </div>
</template>

<script lang='ts'>
import { onMounted } from 'vue';

export default ({
  name: 'Category',
  props: {
    name: String,
  },
  setup(props: unknown): unknown {
    onMounted(() => {
      console.log(props);
    });
    return { props };
  },
});
</script>

<style lang='scss'>
.category{
    margin-right: 10px;
    margin-top: 10px;
    span{
        color: black;
        font-family: Poppins;
        font-size: 10px;
        background-color: rgb(42, 165, 104);
        color: white;
        font-weight: normal;
        border-radius: 5px;
        padding: 5px 10px;
        cursor: pointer;
        user-select: none;
    }
}
</style>
