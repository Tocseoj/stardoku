<script setup>
import { RouterView, RouterLink } from "vue-router";
</script>

<template>
  <header class="flex flex-col items-center text-center m-4">
    <img alt="Vue logo" class="block" src="@/assets/logo.svg" width="25" height="25" />
    <RouterLink to="/" class="text-sm px-1 border-b-2 border-green-300 border-double rounded-b">Stardoku</RouterLink>

    <nav class="w-screen flex justify-around">
      <RouterLink
        class="px-1 underline border border-transparent text-green-400 hover:text-green-200 active:text-green-600"
        active-class="no-underline border !border-green-600 text-green-600"
        to="/"
        >Home</RouterLink
      >
      <RouterLink
        class="px-1 underline border border-transparent text-green-400 hover:text-green-200 active:text-green-600"
        active-class="no-underline border !border-green-600 text-green-600"
        to="/sudoku"
        >Sudoku</RouterLink
      >
    </nav>
  </header>
  <main>
    <RouterView />
  </main>
</template>
