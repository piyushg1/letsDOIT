import 'dotenv/config'
import express from "express";
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import date from './date.js';
import { getYear } from './date.js'

const port = process.env.PORT || 5000
const app = express()

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

// db
const dbConnect = async () => {
    try {
        mongoose.connect(process.env.db_uri)
        console.log('db connected')
    } catch (error) {
        console.log(error)
    }
}
dbConnect()

const itemSchema = {
    name: String
}

const Item = mongoose.model('Item', itemSchema)


// get
app.get('/', (req, res) => {
    Item.find({}, (err, founditems) => {
        res.render('list', { day: date, newlistitems: founditems, year: getYear() })
    })
})

// post
app.post('/', (req, res) => {
    const itemName = req.body.new_item
    // console.log(item)
    const item = new Item({
        name: itemName
    })
    item.save()
    res.redirect('/')
})

app.post('/delete', (req, res) => {
    const checkid = req.body.checkbox

    Item.findByIdAndRemove(checkid, (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log('successfully deleted')
        }
    })
    res.redirect('/')
})

// listen
app.listen(port)