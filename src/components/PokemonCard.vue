<script setup lang="ts">
import { computed, ref } from 'vue'
import type { PokemonDetail, PokemonItem } from '../types/pokemon'
import { apiUrl, useFetch } from '../composables/fetch'

const props = defineProps<PokemonItem>()

const slide = ref(1)

const fetch = useFetch()
const url = computed(() => props.url.replace(apiUrl || '', ''))
const { data, isFetching } = fetch(url, {
  refetch: true,
}).json<PokemonDetail>()
</script>

<template>
  <q-card>
    <q-card-section>
      <q-carousel v-model="slide" swipeable animated thumbnails infinite>
        <q-carousel-slide :name="1" :img-src="data?.sprites.front_default" />
        <q-carousel-slide :name="2" :img-src="data?.sprites.back_default" />
        <q-carousel-slide :name="3" :img-src="data?.sprites.front_shiny" />
        <q-carousel-slide :name="4" :img-src="data?.sprites.back_shiny" />
      </q-carousel>
    </q-card-section>
    <q-list dense bordered padding>
      <q-item>
        <q-item-section> Name </q-item-section>
        <q-item-section avatar>
          {{ data?.name }}
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section> Weight </q-item-section>
        <q-item-section avatar>
          {{ data?.weight }}
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section> Height </q-item-section>
        <q-item-section avatar>
          {{ data?.height }}
        </q-item-section>
      </q-item>
      <q-separator />
      <q-item v-for="stat of data?.stats" :key="stat.stat.name">
        <q-item-section> {{ stat.stat.name }} </q-item-section>
        <q-item-section avatar>
          {{ stat.base_stat }}
        </q-item-section>
      </q-item>
    </q-list>
    <q-inner-loading :showing="isFetching">
      <q-spinner-gears size="50px" color="primary" />
    </q-inner-loading>
  </q-card>
</template>
