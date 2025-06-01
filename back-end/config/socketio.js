const socketIO = {
  io: null,
  
  // Initialize with the server's Socket.IO instance
  init(ioInstance) {
    this.io = ioInstance;
    return this.io;
  },
  
  // Get the Socket.IO instance
  getIO() {
    if (!this.io) {
      throw new Error('Socket.IO not initialized!');
    }
    return this.io;
  }
};

module.exports = socketIO;
// Also export io directly for backward compatibility
module.exports.io = socketIO.io;