<script setup lang="ts">

import NavBarBottomAdmin from "~/pages/navbar/NavBarBottomAdmin.vue";
import NavBarTopAdmin from "~/pages/navbar/NavBarTopAdmin.vue";
import NavBarTopUser from "~/pages/navbar/NavBarTopUser.vue";
import NavBarBottomUser from "~/pages/navbar/NavBarBottomUser.vue";

</script>
<template>
  <UpDownButton/>

  <NavBarTopAdmin/>
  <NavBarTopUser/>
  <NuxtPage />
  <NavBarBottomAdmin/>
  <NavBarBottomUser/>
</template>
