<template>
  <v-card
    :loading="loading"
    class="mx-auto my-12"
    max-width="374"
  >
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img
      height="250"
      :src="imagesrc"
    ></v-img>

    <v-card-title>{{ nome }}</v-card-title>

    <v-card-text>
      <v-row
        align="center"
        class="mx-0"
      >
        <v-rating
          :value="4.5"
          color="amber"
          dense
          half-increments
          readonly
          size="14"
        ></v-rating>

        <div class="grey--text ms-4">
          {{avaliacao}} ({{navaliacao}})
        </div>
      </v-row>

      <div class="my-4 text-subtitle-1">
        {{ profissao }}
      </div>

      <div> {{ especialidade }}</div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-title>Disponibilidade</v-card-title>

    <v-card-text>
      <v-chip-group
        v-model="selection"
        active-class="deep-purple accent-4 white--text"
        column
      >
        <v-chip>Junho</v-chip>

        <v-chip>Julho</v-chip>

        <v-chip>Agosto</v-chip>

        <v-chip>Setembro</v-chip>
      </v-chip-group>
    </v-card-text>

    <v-card-actions>
      <v-btn
        color="deep-purple lighten-2"
        text
        @click="reserve"
      >
        {{ nome }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'CardComponents',
  props: {
    nome: {
      type: String,
      default: null
    },
    imagesrc: {
      type: String,
      default: null
    },
    avaliacao: {
      type: Float32Array,
      default: null
    },
    navaliacao: {
      type: Int32Array,
      default: null
    },
    profissao: {
      type: String,
      default: null
    },
    especialidade: {
      type: String,
      default: null
    },
  },
  data() {
    return {
      loading: false,
      selection: 1,
    }
  },
  methods: {
    reserve () {
      this.loading = true

      setTimeout(() => (this.loading = false), 2000)
    },
  },
}
</script>