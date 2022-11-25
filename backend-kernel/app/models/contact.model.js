module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        nom: String,
        prenoms: String,
        telephone: String,
        email: String
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Contact = mongoose.model("contact", schema);
    return Contact;
  };
  