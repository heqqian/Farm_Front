const db = wx.cloud.database()
const list = () => {
  return db.collection('farm').limit(10).get()
}

export default {
  list
}