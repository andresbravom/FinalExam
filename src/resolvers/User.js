import {ObjectID} from 'mongodb'

const User = {
    post: async (parent, args, ctx, info) => {
        const user = ObjectID(parent._id);
        const {client} = ctx;

        const db = client.db("BBDD");
        const collection = db.collection("Posts");
        const result = await collection.find({user: user}).toArray();

        return result;
    },
}

export {User as default};