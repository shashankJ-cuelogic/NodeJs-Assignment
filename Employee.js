
var mongoose = require('mongoose');


var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var employee = new Schema({
    _id: ObjectId,
    first_name: { type: String, required: true, index: true },
    last_name: String,
    ID: String,
    designation: String
});

employee.path('first_name').set(function (v) {
    return v;
});

employee.path('last_name').set(function (v) {
    return v;
});

employee.path('ID').set(function (v) {
    return v;
});

employee.path('designation').set(function (v) {
    return v;
});

var MyModel = mongoose.model('Employee', employee);

module.exports = MyModel;