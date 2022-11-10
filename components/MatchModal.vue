<template>
  <div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="staticBackdropLabel">
              Equipe 1 vs Equipe 2
            </h1>
          </div>
          <div class="modal-body">...</div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              <close-icon />
            </button>
            <button type="button" class="btn btn-success">
              <check-icon />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import useMatchModal from "~~/composables/useMatchModal";
export default {
  setup() {
    const { modalValues } = useMatchModal();
    return { modalValues };
  },
};
</script>

<style scoped>
h1 {
  color: black;
}
</style>
