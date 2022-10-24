<template>
  <div>
    <Introduction />
    <PlayProcess />
  </div>
</template>

<script>
import Introduction from "@/components/Introduction";
import PlayProcess from "@/components/PlayProcess";

export default {
  name: "Home",
  head() {
    return {
      title: "Spots : Une platforme pour les gameurs fait par les gameurs",
    };
  },
  components: { Introduction, PlayProcess },
};
</script>
