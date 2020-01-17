import {ObjectID} from 'mongodb'

const Query = {
    getAllPosts: async (parent, args, ctx, info) => {
        const {client} = ctx;

        const db = client.db("BBDD");
        const collection = db.collection("Posts");

        const result = await collection.find({}).toArray();

        return result;
    },

    getAuthor: async (parent, args, ctx, info) => {
        const {_id, token} = args;
        const {client} = ctx;

        const db = client.db("BBDD");
        const collection = db.collection("Users");

        const result = await collection.findOne({_id: ObjectID(_id), token});

        return result;
    },

    getPost: async (parent, args, ctx, info) => {
        const {user, token, _id} = args;
        const {client} = ctx;

        const db = client.db("BBDD");
        const collectionUsers = db.collection("Users");
        const collectionPosts = db.collection("Posts");

        const result = await collectionUsers.findOne({_id: ObjectID(user), token});

        if (result){
            const object = await collectionPosts.findOne({_id: ObjectID(_id)});
            return object;
        }else{
            return new Error("Not exist this post");
        }
        
    },
    
}
export {Query as default};