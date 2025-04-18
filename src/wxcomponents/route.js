const init = {
  install: Vue => {
    const route = {
      push: async (url, query) => {
        let num = 0
        query ?(()=>{
          for (let i in query) {
            num === 0
                ? (url += `?${i}=${query[i]}`)
                : (url += `&${i}=${query[i]}`)
            num++
          }
        })():''
        uni.navigateTo({
          url: url
        })
      },
      back: async () => {
        uni.navigateBack()
      },
      reLaunch:async (url, query) => {
        let num = 0
        query ?(()=>{
          for (let i in query) {
            num === 0
                ? (url += `?${i}=${query[i]}`)
                : (url += `&${i}=${query[i]}`)
            num++
          }
        })():''
        uni.reLaunch({
          url: url
        })
      },
    }
    Vue.prototype.$route = route
  }
}

export default init
