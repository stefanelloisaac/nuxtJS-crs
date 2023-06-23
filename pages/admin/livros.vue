<!-- eslint-disable vue/valid-v-slot -->
<!-- eslint-disable vue/v-slot-style -->
<template>
  <v-container style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">
    <v-row>
      <v-col class="d-flex justify-center align-center">
        <h1>Cadastro de Livros</h1>
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
            <v-col cols="1">
              <v-text-field
                v-model="id"
                outlined
                disabled
                color="green"
                placeholder="ID do Livro"
                label="ID do Livro"
              >
              </v-text-field>
            </v-col>
            <v-col>
              <v-autocomplete
                v-model="idAutor"
                :items="autores"
                item-text="nome"
                item-value="id"
                label="Nome do autor"
              />
            </v-col>
            <v-col>
              <v-autocomplete
                v-model="idCategoria"
                :items="categorias"
                item-text="nome"
                item-value="id"
                label="Categoria"
              />
            </v-col>
            <v-col>
              <v-text-field
                v-model="titulo"
                outlined
                color="green"
                placeholder="Título do Livro"
                label="Título do Livro"
              >
              </v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="sinopse"
                outlined
                color="green"
                placeholder="Sinopse"
                label="Sinopse"
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
      dialog: false,
      items: [],
      categorias: [],
      autores: [],
      id: null,
      idCategoria: null,
      idAutor: null,
      titulo: null,
      sinopse: null,
      headers: [
        {
          text: 'ID',
          value: 'id',
          align: 'center',
        },
        {
          text: 'Título do livro',
          value: 'titulo',
          align: 'center',
        },
        {
          text: 'Sinopse',
          value: 'sinopse',
          align: 'center',
        },
        {
          text: 'ID da Categoria',
          value: 'idCategoria',
          align: 'center',
        },
        {
          text: 'ID do Autor',
          value: 'idAutor',
          align: 'center',
        },
        { text: 'Ações', value: 'actions', align: 'center', filterable: false },
      ],
    }
  },
  async created() {
    await this.getAllBooks()
    await this.getAllAuthors()
    await this.getAllCategories()
  },

  methods: {
    update(item) {
      this.titulo = item.titulo
      this.sinopse = item.sinopse
      this.id = item.id
      this.idAutor = item.idAutor
      this.idCategoria = item.idCategoria
      this.dialog = true
    },

    async persist() {
      try {
        const request = {
          titulo: this.titulo,
          sinopse: this.sinopse,
          idAutor: this.idAutor,
          idCategoria: this.idCategoria
        }
        if (this.id) {
          await this.$api.patch(`/livros/${this.id}`, request)
          this.$toast.success('Dado editado com êxito.')
        } else {
          await this.$api.post(`/livros`, request)
          this.$toast.success('Dado adicionado com êxito.')
        }
        this.titulo = null
        this.sinopse = null
        this.id = null
        this.idAutor = null
        this.idCategoria = null
        this.dialog = false
        await this.getAllBooks()
      } catch (error) {
        return this.$toast.warning('Ocorreu um erro.')
      }
    },

    async destroy(item){
      try {
        await this.$api.delete(`/livros/deletar/${item.id}`);
        await this.getAllBooks();
        this.$toast.success('Dado excluído com êxito.')
      } catch (error) {
        return this.$toast.warning('Ocorreu um erro.')
      }
    },

    async getAllBooks() {
      try {
        const response = await this.$api.get('/livros')
        this.items = response.data
      } catch (error) {
        return this.$toast.warning('Ocorreu um erro.')
      }
    },
    async getAllCategories() {
        try {
          const response = await this.$api.get('/categorias')
          this.categorias = response.data
        } catch (error) {
          return this.$toast.warning('Ocorreu um erro.')
        }
      },
  
  
    async getAllAuthors() {
      try {
        const response = await this.$api.get('/autores')
        this.autores = response.data
      } catch (error) {
        return this.$toast.warning('Ocorreu um erro.')
      }
    },
  },
}
</script>

<style></style>
socorro