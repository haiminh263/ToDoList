import mongoose from 'mongoose';

const dbConfig = {
    connectionString: 'mongodb://localhost:27017', // Đổi thông tin kết nối tới MongoDB
    dbName: 'ToDoListDB', // Đổi tên cơ sở dữ liệu nếu cần
};

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(`${dbConfig.connectionString}/${dbConfig.dbName}`, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to MongoDB');
        return mongoose.connection;
    } catch (error) {
        console.error('MongoDB Connection Failed:', error);
        throw error;
    }
};

export { connectToMongoDB };
