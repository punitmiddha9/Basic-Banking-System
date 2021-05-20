const mongoose = require("mongoose");


const transactionSchema = mongoose.Schema({

    from:{

        type: String,
    },

    to:{

        type: String,
    },

    amt:{

        type: Number,
    },

    date:{

        type: String,
    }
})

// we need to create a collection

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;