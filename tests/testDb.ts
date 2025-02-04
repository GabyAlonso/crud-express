import mongoose from "mongoose";

module.exports.connect = async () => {
    await mongoose.connect('mongodb://localhost/crud-express-test');
};

module.exports.reset = async () => {
    const collections = mongoose.connection.collections;

    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany({});
    }
};

module.exports.disconnect = async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
};
