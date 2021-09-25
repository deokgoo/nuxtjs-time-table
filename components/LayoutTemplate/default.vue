<template>
  <v-card flat tile>
    <v-toolbar color="cyan" dark>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title>
        <slot name="title"> Fallback Title </slot>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-toolbar>
    <slot name="child"> Fallback Child </slot>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'LayoutDefault',
});
</script>
