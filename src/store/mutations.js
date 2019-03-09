export default {
  selectNone (state) {
    state.homeSelect = false
    state.urlSelect = false
    state.fileSelect = false
  },
  selectHome (state) {
    state.homeSelect = true
    state.urlSelect = false
    state.fileSelect = false
  },
  selectURL (state) {
    state.urlSelect = true
    state.homeSelect = false
    state.fileSelect = false
  },
  selectFile (state) {
    state.fileSelect = true
    state.homeSelect = false
    state.urlSelect = false
  },


  setUser (state, user) {
    state.user = user
  },
  addErrMsg (state, msg) {
    state.errorMessages.push(msg)
  },
  clearErrMsg (state) {
    state.errorMessages = []
  },

  setMyLikeURLIds (state, ids) {
    state.myLikeURLIds = ids
  },
  pushMyLikeURLIds (state, id) {
    state.myLikeURLIds.push(id)
  },
  clearMyLikeURLIds (state) {
    state.myLikeURLIds = []
  },
  setMyLikeFileIds (state, ids) {
    state.myLikeFileIds = ids
  },
  pushMyLikeFileIds (state, id) {
    state.myLikeFileIds.push(id)
  },
  clearMyLikFileIds (state) {
    state.myLikeFileIds = []
  }

}
