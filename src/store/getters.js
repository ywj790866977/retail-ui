const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  name: state => state.user.name,
  role: state => state.user.role
}
export default getters
