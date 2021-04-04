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
            <template v-if="index < 4">
              <Category :name="category.name"/>
            </template>
          </template>
          <Category name="others"/>
        </div>
      </div>
    </div>
</template>

<script lang='ts'>

import { onMounted, ref } from 'vue';
import Category from '../components/category.vue';
import req from '../utils/api';

export default ({
  name: 'Pokedex',
  components: {
    Category,
  },

  setup(): unknown {
    const categories = ref([]);
    const getCategories = async () => {
      const response = await req.get('type').then((res) => res.data.results);
      return response;
    };

    onMounted(async () => {
      categories.value = await getCategories();
    });

    return { categories };
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
  padding: 40px 30px;
}

.categories{
  margin-top: 20px;
  display: flex;
  padding: 10px;
  flex-wrap: wrap;
}

.categories::-webkit-scrollbar {
  display: none;
}

header{
  display: flex;
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
  background: #4286f4;
  box-shadow: 5px 5px 20px #4286f455;
  cursor: pointer;
  outline: 0;
  i{
    transform: scale(.7);
    color: #fff;
  }
}

</style>