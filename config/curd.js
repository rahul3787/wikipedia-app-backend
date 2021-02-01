const mongoose =require('mongoose')
const Schema = mongoose.Schema;

const curd = new Schema({
    name : String,
    age : String,
    title : String,

})

const Wikidata =mongoose.model('Wikidata',curd);
module.exports = Wikidata;