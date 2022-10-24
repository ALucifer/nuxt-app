<template>
  <div>
    <section id="all-trophies" class="pt-120 pb-120">
      <div class="container">
        <div class="tab-content">
          <div
            class="tab-pane fade show active"
            role="tabpanel"
            aria-labelledby="overview-tab"
          >
            <div class="row">
              <div
                class="col-lg-3 col-md-6"
                v-for="(rank, key) in user.ranking"
                :key="key"
              >
                <div class="single-trophies d-flex align-items-center">
                  <div
                    class="left d-flex align-items-center justify-content-center"
                  >
                    <img
                      :src="'images/trophies-icon-' + (key + 1) + '.png'"
                      alt="image"
                    />
                  </div>
                  <div class="right">
                    <p class="text-sm">{{ rank.libelle }}</p>
                    <h4>{{ rank.count }}</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <UserStatistiques :user="user" />
  </div>
</template>

<script>
import UserStatistiques from "@/components/UserStatistiques";
export default {
  components: { UserStatistiques },
  props: { user: { type: Object, required: true } },
};
</script>

<style></style>
