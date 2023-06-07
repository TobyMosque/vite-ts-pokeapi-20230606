<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed, onMounted } from 'vue'
import { usePokemonStore } from '../stores/pokemon'
import PokemonCard from '../components/PokemonCard.vue'

const pokemonStore = usePokemonStore()
const { data, isFetching, offset, limit } = storeToRefs(pokemonStore)
const { execute } = pokemonStore

const hasNext = computed(
  () => offset.value + limit.value < (data.value?.count || 0),
)
const hasPrev = computed(() => offset.value > 0)
function next() {
  if (hasNext.value)
    offset.value += limit.value
}
function prev() {
  if (hasPrev.value) {
    offset.value -= limit.value
    if (offset.value < 0)
      offset.value = 0
  }
}

onMounted(async () => {
  await execute()
})
</script>

<template>
  <q-page class="row flex justify-center">
    <div class="full-width">
      <div class="q-pa-sm flex justify-center">
        <q-btn
          :loading="isFetching"
          :disable="!hasPrev"
          label="Prev"
          @click="prev"
        />
        <q-btn
          :loading="isFetching"
          :disable="!hasNext"
          label="Next"
          @click="next"
        />
      </div>
      <div class="row q-col-gutter-sm q-pa-sm">
        <div
          v-for="pokemon in data?.results"
          :key="pokemon.name"
          class="col col-6 col-sm-4 col-md-3 col-lg-2"
        >
          <PokemonCard v-bind="pokemon" />
        </div>
      </div>
    </div>
  </q-page>
</template>
