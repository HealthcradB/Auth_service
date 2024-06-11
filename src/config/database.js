import mongoose from 'mongoose';

export const connect = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/med', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1); // Exit process with failure
    }
};

// export default connect;
