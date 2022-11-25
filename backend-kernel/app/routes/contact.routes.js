module.exports = app => {
    const contacts = require("../controllers/contact.controller.js");
  
    var router = require("express").Router();
  
     // Retrieve all Contacts
     router.get("/", contacts.findAll);

    // Create a new Contact
    router.post("/add", contacts.create);
  

    // Retrieve a single Contact with id
    router.get("/:id", contacts.findOne);
  
    // Update a Contact with id
    router.put("/:id", contacts.update);
  
    // Delete a Contact with id
    router.delete("/:id", contacts.delete);

    // Delete Many
    router.post("/delete", contacts.deleteMany);
  
  
    app.use("/api/contacts", router);
  };
  