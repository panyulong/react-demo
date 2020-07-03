import modelExtend from 'dva-model-extend'
import { model } from './utils'

export default {
  namespace: 'home',
  state: {
    list: ['一切'],
    num:0
  },
  reducers: {
    ADD(state, {payload}) {
      return {
        ...state,
        num: state.num + payload.num
      }
    },
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
  },
  // action-异步请求
  effects: {
    *getData({ payload }, { put }) {
      yield put({ type: 'ADD', payload: {num:11}})
    }
  },
}
