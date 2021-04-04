<template>
    <header :style="`background-color: ${colors[getType(info)]}; box-shadow: 4px 4px 20px ${colors[getType(info)]}aa`">
        <button class="back-button">
            <i class="gg-arrow-left"></i>
        </button>
    </header>
</template>
<script lang='ts'>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import req from '../utils/api';
import colors from '../context/colors';
import { IPokemon } from '../interfaces/pokemon';

export default ({
  name: 'Pokemon',
  setup(): unknown {
    const route = useRoute();
    const info = ref({});

    const getInfo = async () => {
      const response = await req.get(`pokemon/${route.params.id}`).then((res) => res.data);
      return response;
    };

    const getType = (data: IPokemon) => data.types?.[0].type.name || null;

    onMounted(async () => {
      info.value = await getInfo();
      console.log(JSON.stringify(info.value));
    });
    return { info, colors, getType };
  },
});
</script>
<style lang="scss">
header{
    height: 40vh;
    border-radius: 0px 0px 40% 0%;
    position: relative;
    .back-button{
        border: none;
        position: absolute;
        left: 30px;
        top: 30px;
        padding: 10px;
        border-radius: 10px;
        outline: 0;
        background-color: white;
        cursor: pointer;
        i{
            transform: scale(.8);
        }
    }
}
</style>
