<template>
<div class="pokemon-detail">
    <header :style="`background-color: ${colors[getType(info)]}; box-shadow: 4px 4px 20px ${colors[getType(info)]}aa`">
        <div class="sub-header">
            <button @click="() => router.back()" class="back-button">
            <i class="gg-arrow-left"></i>
        </button>
        <div class="infos">
            <p class="name">{{info.name}}</p>
            <p class="id">#{{route.params.id}}</p>
        </div>
        </div>
        <img class="pokemon-animation" :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${route.params.id}.gif`" />
    </header>
    <div class="categories">
      <template v-for="category in info.types" :key="category.type.name">
        <Category :name="category.type.name" :color="category.type.name" />
      </template>
    </div>
    <div class="card">
        <div class="info">
            <div style="display: flex; justify-content: space-between">
            <p>{{info.name}}</p>
            <div>
              <p>{{info.height}}m / {{info.weight}}kg</p>
            </div>
        </div>
        </div>
    </div>

    <div class="card stats" v-if="info.stats && info.stats.length > 0">
        <template v-for="(stat, index) in info.stats" :key="index">
            <div class="card-status" >
                <span class="name">{{stat.stat.name}}</span>
                <span :style="`color: ${colors[getType(info)]}`" class="value">{{stat.base_stat}}</span>
            </div>
        </template>
    </div>
    </div>
</template>
<script lang='ts'>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import req from '../utils/api';
import colors from '../context/colors';
import { IPokemon } from '../interfaces/pokemon';
import Category from '../components/Category/index.vue';

export default ({
  name: 'Pokemon',
  components: {
    Category,
  },
  setup(): unknown {
    const route = useRoute();
    const router = useRouter();
    const info = ref({});

    const getInfo = async () => {
      const response = await req.get(`pokemon/${route.params.id}`).then((res) => res.data);
      return response;
    };

    const getType = (data: IPokemon) => data.types?.[0].type.name;

    onMounted(async () => {
      info.value = await getInfo();
    });
    return {
      info, colors, getType, route, router,
    };
  },
});
</script>
<style lang="scss" scoped>
.pokemon-detail{
     height: 100vh;
  margin: 0 auto;
  width: 375px;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0px 0px 20px #0000000a;
  display: flex;
  flex-direction: column;
}
header{
    height: 35vh;
    border-radius: 0px 0px 40% 0%;
    position: relative;
    .pokemon-animation{
        position: absolute;
        top: 50%; right: 50%;
        transform: translate(50%,0%);
        height: 150px;
    }
    .sub-header{
        padding: 30px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        user-select: none;
        .name{
            font-family: 'Poppins';
            text-transform: uppercase;
            font-weight: bold;
            font-size: 20px;
            color: white;
        }
        .id{
            font-family: 'Poppins';
            text-transform: uppercase;
            font-weight: bold;
            font-size: 15px;
            opacity: .3;
            color: black;
            text-align: end;
        }
    }
    .back-button{
        border: none;
        padding: 10px;
        border-radius: 10px;
        outline: 0;
        background-color: white;
        cursor: pointer;
        transition:ease-in-out .3s;
        &:hover{
            transform: scale(1.1);
        }
        i{
            transform: scale(.8);
        }
    }
}

.categories{
        padding: 30px;
        margin-top: 10px;
        display: flex;
        justify-content: flex-start;
        h2{
            font-family: 'Poppins';
        }
}

.stats{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}

.card{
    background-color: white;
    margin: 10px 30px ;
    padding: 15px;
    border-radius: 5px;
    font-family: 'Poppins';
    font-size: 12px;
    box-shadow: 4px 4px 10px #00000011;
    .info p{
        opacity: .3;
        font-weight: bold;
        text-transform: capitalize;
    }

    .card-status{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-bottom: 20px;
        width: 75px;
        .name{
            font-weight: normal;
            opacity: .2;
            text-align: center;
            text-transform: capitalize;
        }
        .value{
            font-size: 25px;
            font-weight: bold;
        }
    }
}
</style>
