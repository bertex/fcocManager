import ApiData from "../../services/api-service"

const maps = {
  state: {
    myMaps:[],
    allMaps:[],
    mapsById: [],
  },
  mutations: {
    MY_MAPS(state, maps) {
      state.myMaps = maps;
    },
    ALL_MAPS(state, maps) {
      state.allMaps = maps;
    },
    MAPS_BYID(state, maps) {
      state.mapsById = maps;
    },
    ADD_MAP (state, map) {
      state.mapsById.unshift(map)
    } ,
    REMOVE_MAP: (state, id) => (
      state.myMaps.find(maps => maps.id !== id),
      state.myMaps.splice(maps => maps.id, 1)
  )
  },
  actions:{
    getMyMaps (context,user){
      ApiData.getMapsByUserId(user).then(res => {
        context.commit('MY_MAPS', res.data);
      }).catch(error => {
        throw new Error(`API ${error}`);
      });
    },
    getAllMaps (context){
      ApiData.getAll().then(res => {
        context.commit('ALL_MAPS', res.data);
      }).catch(error => {
        throw new Error(`API ${error}`);
      });
    },
    getMapsId (context, id){
      ApiData.getMapById(id).then(res => {
          context.commit('MAPS_BYID', res.data);
      }).catch(error => {
        throw new Error(`API ${error}`);
      });
    },
    removeMapById (context, id){
      ApiData.deleteMap(id).then(res => {
        context.commit('REMOVE_MAP', res.data);
      }).catch(error => {
        throw new Error(`API ${error}`);
      });
    },
  },
  getters: {
    my_maps:(state) => state.myMaps,
    all_maps:(state) => state.allMaps,
    maps_byid: (state) => state.mapsById,
  }
};

export default maps
