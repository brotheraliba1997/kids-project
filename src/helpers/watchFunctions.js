const { Package, Notification } = require("../models");



const notificationDocumentChangeHelper = async ({ payload, io }) => {
    if (payload?.operationType === "insert") {        
      const populatedNotification = await Notification.findById(payload.documentKey?._id)
      console.log(populatedNotification, "populatedNotification")
      io.emit('new-notification', populatedNotification);
    }
  };


  module.exports = {
    notificationDocumentChangeHelper,
  };
  