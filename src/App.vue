<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import AppProvider from './components/common/AppProvider.vue'
</script>

<!-- <template>
  <AppProvider>
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </AppProvider>
</template> -->
<template>
  <AppProvider>
    <header>
      <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

      <div class="wrapper">
        <HelloWorld msg="You did it!" />

        <div class="text-red-500 p-4 rounded-lg">Hello UnoCSS!</div>

        <button class="btn btn-blue">Click me</button>
        <nav>
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/about">About</RouterLink>
        </nav>
      </div>
    </header>
  </AppProvider>

  <RouterView />
</template>
