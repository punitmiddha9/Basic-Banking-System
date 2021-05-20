const mongoose = require("mongoose");

const validator = require("validator");

const userSchema = mongoose.Schema({

    firstname:{

        type: String,
        required: true,
        minlength: 3
    },

    lastname:{

        type: String,
        minlength: 3
    },

    email:{

        type: String,
        required: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new error("invalid email i")
            }
        }
    },

    gender:{

        type: String,
        required: true
    },

    dob:{

        type: String,
    
    },

    contact:{

        type: Number,
        required: true,
        min: 10
    },

    address:{

        type: String,
        required: true,
        minlength: 7
    },

    accno:{

        type: Number
    },

    balance:{

        type: Number
    },

    status:{

        type: String
    }

})

// we need to create a collection

const User = mongoose.model("User", userSchema);

module.exports = User;



// const transactionSchema = mongoose.Schema({
//     from: {
//       type: String,
//       required: true,
//     },
//     to: {
//       type: String,
//       required: true,
//     },
//     amount: Number,
//     date: String,
//   });
//   /* Transaction-history model */
//   const Transaction = mongoose.model("Transaction", transactionSchema);