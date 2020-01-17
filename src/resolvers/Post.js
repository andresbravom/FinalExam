import {ObjectID} from 'mongodb'

const Post = {
    user: async (parent, args, ctx, info) => {
        const userID = ObjectID(parent.user);
        
        const {client} = ctx;

        const db = client.db("BBDD");
        const collection = db.collection("Users");

        const result = await collection.findOne({_id: userID});
        
        return result;
    },
}

export {Post as default};