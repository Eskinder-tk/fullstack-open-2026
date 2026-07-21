const mongoose = require('mongoose')

const uri = "mongodb+srv://easkndrtk_db_user:qaz5CTyRoa7ePdEG@cluster0.tdncipc.mongodb.net/testBlogApp?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(uri)
  .then(() => {
    console.log('✅ connected successfully')
    return mongoose.connection.close()
  })
  .catch((error) => {
    console.log('❌ connection failed:', error.message)
  })