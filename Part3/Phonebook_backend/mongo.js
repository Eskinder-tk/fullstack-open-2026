const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const name = process.argv[3]

const number = process.argv[4]

const url = `mongodb+srv://easkndrtk_db_user:${password}@cluster0.tdncipc.mongodb.net/phonebookApp?appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url, { family: 4 })

const phonebookSchema = new mongoose.Schema({
  content: String,
  Phone_number : String,
})

const Person = mongoose.model('Person', phonebookSchema)

if (process.argv.length === 5) {
  const person = new Person({
    content: name,
    Phone_number : number,
  })
  person.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook!`)
    mongoose.connection.close()
  })
}


if (process.argv.length === 3) {
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })
}



