<!-- eslint-disable vue/valid-v-slot -->
<!-- eslint-disable vue/v-slot-style -->
<template>
  <v-container style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">
    <v-row>
      <v-col class="d-flex justify-center align-center">
        <h1>Cadastro de Categorias</h1>
      </v-col>
    </v-row>
    <v-row class="d-flex justify-center align-center">
      <v-btn fab small color="green" @click="dialog = true">
        <v-icon> mdi-plus </v-icon>
      </v-btn>
    </v-row>
    <v-row style="padding-top: 20px;" class="d-flex justify-center align-center">
      <v-card width="900">
        <v-card-title>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table :headers="headers" :items="items" :search="search">
          <template v-slot:item.actions="{ item }">
            <v-icon small color="green" @click="update(item)">
              mdi-pencil
            </v-icon>
            <v-icon small color="red" @click="destroy(item)">
              mdi-delete
            </v-icon>
          </template>
        </v-data-table>
      </v-card>
    </v-row>
    <v-dialog v-model="dialog">
      <v-card>
        <v-card-title>
          <v-row>
            <v-col cols="2">
              <v-text-field
                v-model="id"
                outlined
                disabled
                color="green"
                placeholder="ID da Categoria"
                label="ID da Categoria"
              >
              </v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="nomeCategoria"
                outlined
                color="green"
                placeholder="Nome da Categoria"
                label="Nome da Categoria"
              >
              </v-text-field>
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green" @click="persist"> Salvar </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {
      search: null,
      items: [],
      dialog: false,
      nomeCategoria: null,
      id: null,
      headers: [
        {
          text: 'ID',
          value: 'id',
          align: 'center',
        },
        {
          text: 'Categoria',
          value: 'nome',
          align: 'center',
        },
        { text: 'Ações', value: 'actions', align: 'center', filterable: false },
      ],
    }
  },
  async created() {
    await this.getAllCategories()
  },

  methods: {
    update(item) {
      this.nomeCategoria = item.nome
      this.id = item.id
      this.dialog = true
    },

    async persist() {
      try {
        const request = {
          nome: this.nomeCategoria,
        }
        if (this.id) {
          await this.$api.patch(`/categorias/${this.id}`, request)
          this.$toast.success('Dado editado com êxito.')
        } else {
          await this.$api.post(`/categorias/`, request)
          this.$toast.success('Dado adicionado com êxito.')
        }
        this.nomeCategoria = null
        this.id = null
        this.dialog = false
        await this.getAllCategories()
      } catch (error) {
        return this.$toast.warning('Ocorreu um erro.')
      }
    },

    async destroy(item){
      try {
        await this.$api.delete(`/categorias/deletar/${item.id}`);
        await this.getAllCategories();
        this.$toast.success('Dado excluído com êxito.')
      } catch (error) {
        return this.$toast.warning('Ocorreu um erro.')
      }
    },

    async getAllCategories() {
      try {
        const response = await this.$api.get('/categorias')
        this.items = response.data
      } catch (error) {
        return this.$toast.warning('Ocorreu um erro.')
      }
    },
  },
}
</script>

<style></style>
