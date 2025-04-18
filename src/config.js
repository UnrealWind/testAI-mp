const config = {
  appId: process.env.VUE_APP_BASE_APPID,
  apiUrl: process.env.VUE_APP_BASE_URL,
  template:process.env.VUE_APP_BASE_TEMPLATE,
  jumpId:process.env.VUE_APP_JUMP_APPID
}
config.template = JSON.parse(config.template)
export default config
