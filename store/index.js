import axios from '~/plugins/axios'
export const state = () => ({
  ids:  [],
  items: []
})

export const mutations = {
  setIds(state, ids) {
    state.ids = ids
  },

  setItems(state, items) {
    state.items = items
  }
}
export const actions = {
  async LOAD_ITEMS({commit}, dataUrl){
    /*
    /new -> newstories.json
    /ask -> askstories.json
    */

    const response = await axios.get(dataUrl)
    const ids = response.data
    const firstTenIds = ids.slice(0, 10)

    const itemsPromises = firstTenIds.map(id => axios.get(`item/${id}.json`))
    const itemsResponses = await Promise.all(itemsPromises)
    const items = itemsResponses.map(res => res.data)

    // commit("setIds", ids)
    commit("setItems", items)
  }
}
