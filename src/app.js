const express = require("express");
const path = require("path");
require("./db/conn");

// Require db
const User = require("./models/user");
const Transaction = require("./models/transaction");

const hbs = require("hbs");
const { registerPartials } = require("hbs");  

const app = express();

// To assign the Port Number
const port = process.env.PORT || 3000;

// Setting the paths
const staticpath = path.join(__dirname, "../public");
const templatepath = path.join(__dirname, "../templates/views");
const partialpath = path.join(__dirname, "../templates/partials");

// Middleware
app.use('/css', express.static(path.join(__dirname, "../node_modules/bootstrap/dist/css")));
app.use('/js', express.static(path.join(__dirname, "../node_modules/bootstrap/dist/js")));
app.use('/jq', express.static(path.join(__dirname, "../node_modules/jquery/dist")));

// Retreiving Data
app.use(express.urlencoded({extended: false}));

// Giving Static Path
// It is used when giving a simple static HTML, CSS, Assests files from the public folder.
app.use(express.static(staticpath));

// Adding handles bar
app.set("view engine", "hbs");

// Template(views and partials) path for handle bars 
app.set("views", templatepath);
hbs.registerPartials(partialpath);

// Routing
// app.get(path, callback)
app.get("/", (req, res) => {
    res.render("index");
})

app.get("/Create_User", (req, res) => {
    res.render("create");
})

app.get("/Contact_Us", (req, res) => {
    res.render("user");
})

// app.post("/Create_User", async(req, res) => {
//     try {
//         // res.send(req.body)
//         const userData = new User(req.body);
//         await userData.save();
//         res.status(201).render("create");
//     } catch (error) {
//         res.status(500).send(error);
//     }
// })

app.post("/Create_User", (req, res) => {
    const firstName = req.body.firstname;
    const lastName = req.body.lastname;
    const userEmail = req.body.email;
    const userGender = req.body.gender;
    const dob = req.body.dob;
    const userContact = req.body.contact;
    const userBalance = req.body.balance;
    const userAdd = req.body.address;
    const useraccno = req.body.accno;
    const userstatus = req.body.status;
  
    const user = new User({
      firstname: firstName,
      lastname: lastName,
      email: userEmail,
      dob: dob,
      balance: userBalance,
      gender: userGender,
      address: userAdd,
      contact: userContact,
      accno:useraccno,
      status: userstatus,
    });
    user.save();
    res.redirect("/Create_User");
});

app.post("/form", (req, res) => {

    const transferfrom = req.body.from;
    const transferto = req.body.to;
    const transferamt = parseInt(req.body.amt);
    let today = new Date();
    let date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    let time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date + "  " + time;

    const transaction = new Transaction({
        from: transferfrom,
        to: transferto,
        amt: transferamt,
        date: dateTime,
      });
      transaction.save();
      res.redirect("Transfer_Money");
});

app.post("/transferform", (req, res) => {
    res.redirect("/transferMoney-get/");
});

app.get("/transferMoney-get/", (req, res) => {  
    User.findOne((err, foundUser) => {
        res.render("transferform");
    });
});

// app.post("/form", (req, res) => {
//     res.redirect("/Transfer_Money");
// })


app.get("/Transaction_History", (req, res) => {

    Transaction.find((error, docs) => {

        if(!error){
            res.render("transaction", {
                transactions : docs
            });
        }
        else{
            console.log("error in data retreiving: " + error);
        }
    });
});


app.get("/Transfer_Money", (req, res) => {

    User.find((error, docs) => {

        if(!error){
            res.render("transfer", {
                users : docs
            });
        }
        else{
            console.log("error in data retreiving: " + error);
        }
    });
});


// Server Create
app.listen(port, () => {
    console.log(`Server is running at PORT NO ${port}`);
})