<template>
    <div class='card animate__bounceIn'>
     <span>{{name}}</span>
    </div>
</template>

<script lang='ts'>
import { onMounted } from 'vue';
import colors from '../../context/colors';

export default ({
  name: 'PokeCard',
  props: {
    name: String,
    image: String,
  },
  setup(props: unknown): unknown {
    return { props, colors };
  },
});
</script>

<style lang='scss'>
.card{
    border: solid 1px #0000001a;
    width: 45%;
    border-radius: 10px;
    margin-bottom: 10px;
    font-family: 'Poppins';
    height: 100px;
    transition: ease-out .5s;
    cursor: pointer;
    &:hover{
      transform: scale(0.9);
    }
}
</style>
