const { Package } = require("../models");



const notificationDocumentChangeHelper = async ({ payload, io }) => {

    if (payload) {
   
        console.log(payload, "payload")
      const populatedNotification = await Package.findById(payload.documentKey?._id)
    //   console.log(populatedNotification, "populatedNotification")
      io.emit('welcome Message', populatedNotification);
      
    
     
    }
  };


  module.exports = {
    notificationDocumentChangeHelper,

  };
  