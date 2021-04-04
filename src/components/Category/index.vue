<template>
    <div class='category animate__bounceIn'>
      <span :style="`background-color: ${colors[color]}; box-shadow: 5px 5px 10px ${colors[color]}a5`">
      {{name || 'default'}}
      </span>
    </div>
</template>

<script lang='ts'>
import colors from '../../context/colors';

export default ({
  name: 'Category',
  props: {
    name: String,
    color: String,
  },
  setup(props: unknown): unknown {
    return { props, colors };
  },
});
</script>

<style lang='scss'>
.category{
    margin-left: 10px;
    margin-top: 15px;
    span{
        color: black;
        font-family: Poppins;
        font-size: 10px;
        color: white;
        font-weight: normal;
        border-radius: 5px;
        padding: 5px 15px;
        cursor: pointer;
        user-select: none;
    }
}
</style>
