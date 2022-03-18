<script setup>
import { RouterLink } from "vue-router";
import HelloWorld from "@/components/HelloWorld.vue";
import TheWelcome from "../components/TheWelcome.vue";
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/sudoku/endless">Sudoku</RouterLink>
      </nav>
    </div>
  </header>

  <main>
    <h1 class="text-3xl font-bold underline">Hello world!</h1>
    <TheWelcome />
  </main>
</template>
