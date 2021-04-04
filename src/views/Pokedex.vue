<template>
    <div class='pokedex'>
      <div class="container">
        <header>
          <div>
            <h2 class="title"><a href="#">Pokedex</a></h2>
            <span>Below is a list of all <b>first generation</b> pokemons.</span>
          </div>
          <button class="btn"><i class="gg-search"></i></button>
        </header>
        <div class="categories">
          <template v-for="(category, index) in categories" :key="category.name">
            <template v-if="index < previewCateories">
              <Category :name="category.name" :color="category.name"/>
            </template>
          </template>
          <Category @click="() => previewCateories < 6 ? previewCateories = categories.length : previewCateories = 5" :name="previewCateories > 6 ? 'hidden':'show more'" color="more"/>
        </div>
        <header>
          <div>
            <h2 class="title"><a href="#">Pokemons</a></h2>
            <span>List of pokemons.</span>
          </div>
        </header>
      </div>
      <div class="pokemons">
          <template v-for="pokemon in pokemons" :key="pokemon.name">
            <PokeCard :showPokemon="() => router.push(`/pokemon/${extractIdFromUrl(pokemon.url)}`)" :name="pokemon.name" :image="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${extractIdFromUrl(pokemon.url)}.gif`" />
          </template>
        </div>
    </div>
</template>

<script lang='ts'>

import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import Category from '../components/Category/index.vue';
import PokeCard from '../components/PokeCard/index.vue';

import req from '../utils/api';

export default ({
  name: 'Pokedex',
  components: {
    Category,
    PokeCard,
  },

  setup(): unknown {
    const categories = ref([]);
    const pokemons = ref([]);
    const previewCateories = ref(5);

    const router = useRouter();

    const getCategories = async () => {
      const response = await req.get('type').then((res) => res.data.results);
      return response;
    };

    const getPokemons = async () => {
      const response = await req.get('pokemon?limit=100').then((res) => res.data.results);
      return response;
    };

    const extractIdFromUrl = (url: string): string => {
      const id = url.split('/').slice(-2)[0];
      return id;
    };

    onMounted(async () => {
      categories.value = await getCategories();
      pokemons.value = await getPokemons();
    });

    return {
      categories, previewCateories, pokemons, extractIdFromUrl, router,
    };
  },
});
</script>

<style lang='scss'>
.pokedex {
  height: 100vh;
  margin: 0 auto;
  width: 375px;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0px 0px 20px #0000000a;
  display: flex;
  flex-direction: column;
}

.title{
  font-family: 'Poppins';
  font-weight: bold;
  user-select: none;
  a{
    text-decoration: none;
    color: black;
  }
}

.container{
  padding: 10px 30px;
}

.categories{
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
}

.pokemons{
  overflow-y: scroll;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 20px;
  margin-top: 1vh;
  background-color: #e0e0e0;
  border-radius: 0px 0px 20px 20px;
  box-shadow: 0px 5px 10px #0000000a;
}

.pokemons::-webkit-scrollbar {
  display: none;
}

.categories::-webkit-scrollbar {
  display: none;
}

header{
  display: flex;
  margin-top: 30px;
  justify-content: space-between;
  align-items: center;
  span {
      font-family: 'Poppins';
      font-size: 12px;
      font-weight: normal;
      opacity: .5;
  }
}

.btn{
  padding: 15px;
  border: none;
  border-radius: 10px;
  background: #000000;
  box-shadow: 5px 5px 20px #00000055;
  cursor: pointer;
  outline: 0;
  i{
    transform: scale(.7);
    color: #fff;
  }
}

</style>
