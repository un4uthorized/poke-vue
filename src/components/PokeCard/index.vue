<template>
    <div class='card animate__bounceIn'>
     <span>{{name}}</span>
     <img :src="image"/>
     <button><i class="gg-arrow-right"></i></button>
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
    width: 45%;
    border-radius: 10px;
    margin-bottom: 20px;
    font-family: 'Poppins';
    height: 100px;
    background-color: #fff;
    box-shadow: 4px 4px 5px #00000011;
    transition: ease-out .8s;
    cursor: pointer;
    position: relative;
    &:hover{
      transform: scale(1.1);
    }
    img{
      position: absolute;
      width: 75px;
      left: -10px;
      top: -10px
    }
    span{
      text-transform: uppercase;
      font-family: 'Poppins';
      font-weight: bold;
      font-size: 25px;
      word-break: break-word;
      position: absolute;
      width: 80%;
      line-height: 22.5px;
      bottom: 5px;
      left: 10px;
      opacity: .2;
    }
    button{
      position: absolute;
      right: 15px;
      top: 10px;
      border: none;
      padding: 4px;
      background-color: #000000;
      box-shadow: 4px 4px 10px #4286f455;
      border-radius: 8px;
      transition: ease .5s;
      cursor: pointer;
      &:hover{
        background-color: transparent;
        box-shadow: none;
        border: solid 1px black;
        i{
          color: black;
        }
      }
      i{
        transform: scale(.5);
        color: white;
      }
    }
}
</style>
