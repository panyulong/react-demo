// export const model = {
//   reducers: {
//     updateState(state, { payload }) {
//       return {
//         ...state,
//         ...payload,
//       }
//     },
//   },
// }

export default {
  namespace: 'utils',
  state: {},
  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
  }
}
