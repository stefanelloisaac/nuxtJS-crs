<!-- eslint-disable vue/no-template-shadow -->
<!-- eslint-disable vue/valid-v-slot -->
<!-- eslint-disable vue/v-slot-style -->
<template>
  <v-container
    style="
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI',
        Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
        sans-serif;
    "
  >
    <v-row>
      <v-col class="d-flex justify-center align-center">
        <h1>Cadastro de Empréstimos</h1>
      </v-col>
    </v-row>
    <v-row class="d-flex justify-center align-center">
      <v-btn fab small color="green" @click="dialog = true">
        <v-icon> mdi-plus </v-icon>
      </v-btn>
    </v-row>
    <v-row style="padding-top: 20px" class="d-flex justify-center align-center">
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
        <v-data-table
          :headers="headers"
          :items="items"
          :search="search"
          show-expand
          class="elevation-1"
          @click:row="clickRow"
        >
          <template v-slot:item.devolucao="{ item }">
            <v-chip
              v-if="item.devolucao"
              class="ma-2"
              text-color="white"
              color="green"
            >
              Devolvido
            </v-chip>
            <v-chip v-else class="ma-2" text-color="white" color="red">
              Pendente
            </v-chip>
          </template>
          <template v-slot:expanded-item="{ headers, item }">
            <td :colspan="headers.length">
              <v-card class="mx-auto" max-width="100%">
                <v-avatar  color="indigo" size="36">
                  <span>{{ item.id }}</span>
                </v-avatar>
                <v-chip
                  v-if="item.devolucao"
                  class="ma-2"
                  label
                  text-color="white"
                  color="green"
                >
                  Devolvido
                </v-chip>
                <v-chip
                  v-else
                  class="ma-2"
                  label
                  text-color="white"asdasdasdadsdasda
                  color="red"
                >
                  Pendente
                </v-chip>
                <v-chip-group>
                  <v-chip>
                    {{dadosEmprestimos.nome}}
                  </v-chip>
                  <v-chip>
                    Autor: {{  JSON.stringify(item.dados)  }}
                  </v-chip>
                </v-chip-group>
                <v-divider class="mx-4"></v-divider>
                <v-card-title class="text-h5 text--primary">
                  <span
                    ><span class="font-weight-bold">Nome: </span>
                    {{ item.usuario.nome }}</span
                  >
                </v-card-title>
                <v-divider class="mx-4"></v-divider>
                <v-card-text>
                  <p class="text-h7 mb-1">
                    <span class="font-weight-bold">Prazo de devolução: </span>
                    {{ $formatDate(item.prazo) }}
                  </p>
                  <p class="text-h7 mb-1">
                    <span class="font-weight-bold">Email para contato: </span>
                    {{ item.usuario.email }}
                  </p>
                  <p class="text-h7 mb-1">
                    <span class="font-weight-bold"
                      >Telefone para contato:
                    </span>
                    {{ item.usuario.telefone }}
                  </p>
                </v-card-text>
              </v-card>
            </td>
          </template>
          <template v-slot:item.prazo="{ item }">
            <p style="font-weight: bold">
              {{ $formatDate(item.prazo) }}
            </p>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon small color="green" @click="update(item)">
              mdi-pencil
            </v-icon>
            <v-icon small color="red" @click="destroy(item)">
              mdi-delete
            </v-icon>
            <v-icon small color="blue" @click="fimEmprestimo(item)">
              mdi mdi-check-bold
            </v-icon>
          </template>
        </v-data-table>
      </v-card>
    </v-row>
    <v-dialog v-model="dialog">
      <v-card>
        <v-card-title>
          <v-row>
            <v-col>
              <v-autocomplete
                v-model="idUsuario"
                :items="usuarios"
                item-text="nome"
                item-value="id"
                label="Usuário"
              />
            </v-col>
            <v-col>
              <v-autocomplete
                v-model="escolhidos"
                :items="disponiveis"
                item-text="titulo"
                item-value="id"
                label="Livros disponíveis"
                multiple
                small-chips
                deletable-chips
              />
            </v-col>
            <v-col>
              <v-text-field
                v-model="devolucao"
                readonly
                label="Devolução"
                prepend-icon="mdi-calendar"
              ></v-text-field>
            </v-col>
            <v-col>
              <datePicker titulo="Prazo de entrega" @salvarData="salvarPrazo" />
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
      expanded: [],
      escolhidos: [],
      singleExpand: false,
      dadosEmprestimos: [],
      items: [],
      usuarios: [],
      disponiveis: [],
      id: null,
      idUsuario: null,
      devolucao: null,
      prazo: null,
      headers: [
        {
          text: 'ID',
          value: 'id',
          align: 'center',
        },
        {
          text: 'ID do Usuário',
          value: 'idUsuario',
          align: 'center',
        },
        {
          text: 'Prazo',
          value: 'prazo',
          align: 'center',
        },
        {
          text: 'Status',
          value: 'devolucao',
          align: 'center',
        },
        { text: 'Ações', value: 'actions', filterable: false },
      ],
    }
  },

  async created() {
    await this.getAllEmprestimos()
    await this.getAllUsers()
    await this.getAvailableBooks()
    await this.getDadosEmprestimos()
  },

  methods: {
    clickRow(item, event) {
      if (event.isExpanded) {
        const indexExpanded = this.expanded.findIndex((i) => i === item)
        this.expanded.splice(indexExpanded, 1)
      } else {
        this.expanded.push(item)
      }
    },

    salvarDevolucao(data) {
      this.devolucao = data
    },

    salvarPrazo(data) {
      this.prazo = data
    },

    async fimEmprestimo(status) {
      const id = status.id
      const statusJSON = {
        devolucao: new Date(Date.now()).toISOString().substring(0, 10),
      }
      try {
        if (confirm(`Deseja terminar o empréstimo de id: ${id} ?`)) {
          await this.$axios.$patch(
            `http://localhost:3333/emprestimos/${id}`,
            statusJSON
          )
          this.$toast.success(
            `Empréstimo finalizado com a data de ${new Date(Date.now())
              .toISOString()
              .substring(0, 10)}`
          )
          this.getAllEmprestimos()
        }
      } catch (error) {
        this.$toast.warning('Ocorreu um erro.')
      }
    },

    update(item) {
      this.devolucao = this.$formatDate(item.devolucao)
      this.prazo = item.prazo
      this.id = item.id
      this.idUsuario = item.idUsuario
      this.dialog = true
    },

    async persist() {
      try {
        const request = {
          devolucao: this.devolucao,
          prazo: this.prazo,
          idUsuario: this.idUsuario,
          livros: this.escolhidos
        }
        if (this.id) {
          await this.$api.patch(`/emprestimos/${this.id}`, request)
          this.$toast.success('Dado editado com êxito.')
        } else {
          await this.$api.post(`/emprestimos`, request)
          this.$toast.success('Dado adicionado com êxito.')
        }
        this.devolucao = null
        this.prazo = null
        this.id = null
        this.dialog = false
        await this.getAllEmprestimos()
      } catch (error) {
        return this.$toast.warning('Ocorreu um erro.')
      }
    },

    async destroy(item) {
      try {
        await this.$api.delete(`/emprestimos/deletar/${item.id}`)
        await this.getAllEmprestimos()
        this.$toast.success('Dado excluído com êxito.')
      } catch (error) {
        return this.$toast.warning('Ocorreu um erro.')
      }
    },

    async getAllEmprestimos() {
      try {
        const response = await this.$api.get('/emprestimos')
        this.items = response.data
      } catch (error) {
        return this.$toast.warning('Ocorreu um erro.')
      }
    },

    async getAllUsers() {
      try {
        const response = await this.$api.get('/usuarios')
        this.usuarios = response.data
      } catch (error) {
        return this.$toast.warning('Ocorreu um erro.')
      }
    },

    async getAvailableBooks() {
      try {
        const response = await this.$api.get('/livros/disponiveis')
        this.disponiveis = response
      } catch (error) {
        return this.$toast.warning('Ocorreu um erro.')
      }
    },

    async getDadosEmprestimos() {
      try {
        const response = await this.$api.get('/emprestimos/dados')
        this.dadosEmprestimos = response.data
      } catch (error) {
        return this.$toast.warning('Ocorreu um erro.')
      }
    },
  },
}
</script>

<style></style>
