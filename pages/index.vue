<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Cadastro de categorias</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-card>
        <v-card-title>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="desserts"
          :search="search"
        ></v-data-table>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Index',
  data() {},
  methods: {},
}
</script>
