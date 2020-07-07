import { getRecommendPlayListDao } from '@/pages/index/services'

export default {
  namespace: 'index',
  state: {
    personList:[
      {id:'1',name:'pan',age:12}
    ],
    recentPlay: [],
    isPlaying:true
  },
  effects: {
    *asyncGetRecentPlayAction({ payload }, { call, put }) {
      const { uid } = payload
      const res = yield call(getRecommendPlayListDao, uid)
      if (res.code === 200) {
        yield put({ type: 'updateState', payload: { recentPlay: res.allData }})
      }
    }
  },
  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
  }
}
