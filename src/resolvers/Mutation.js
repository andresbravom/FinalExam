import {ObjectID} from 'mongodb'
import * as uuid from 'uuid'

const Mutation = {
    addUser: async (parent, args, ctx, info) => {
        const {mail, password, status} = args;
        const {client} = ctx;

        const db = client.db("BBDD");
        const collection = db.collection("Users");
 

        const result = await collection.findOne({mail});

        if(!result){
           
                const object = await collection.insertOne({mail, password, status});
                return object.ops[0];
            
            
        }else{
            return new Error("Email incorrect");
        }
    },

    login: async (parent, args, ctx, info) => {
        const {mail, password} = args;
        const {client} = ctx;

        const db = client.db("BBDD");
        const collection = db.collection("Users");

        const result = await collection.findOne({mail, password});

        if(result) {
            const token = uuid.v4();
            await collection.updateOne({mail: mail}, {$set: {token: token}});
            return token;
        }else{
            return new Error("User not found")
        }
    },

    logout: async (parent, args, ctx, info) => {
        const {_id, token} = args;
        const {client} = ctx;

        const db = client.db("BBDD");
        const collection = db.collection("Users");

        const result = await collection.findOne({_id: ObjectID(_id), token});

        if(result) {
            const token = null;
            await collection.updateOne({_id: ObjectID(_id)}, {$set: {token: token}}, {returnOriginal: false});
            return result;
        }else{
            return new Error("Author not found");
        }
    },

    removeUser: async (parent, args, ctx, info) => {
        const {_id, token} = args;
        const  {client} = ctx;

        const db = client.db("BBDD");
        const collectionUsers = db.collection("Users");
        const collectionPosts = db.collection("Posts");

        const result = await collectionUsers.findOne({_id: ObjectID(_id), token});

        if(result){
            if(result.status === true){
                const deleteUser = () => {
                    return new Promise((resolve, reject) =>{
                        const result = collectionUsers.deleteOne({_id: ObjectID(_id)});
                        resolve(result);
                    }
                )};

                const deletePost = () => {
                    return new Promise((resolve, reject) => {
                        const result = collectionPosts.deleteMany({user: ObjectID(_id)});
                        resolve(result);
                    }
                )};
                
                (async function(){
                    const asyncFuntions = [
                        deleteUser(),
                        deletePost(),
                    ];
                    await Promise.all(asyncFuntions);
                })();
                return result;
            }else{
                const deleteUser = () => {
                    return new Promise((resolve, reject) =>{
                        const result = collectionUsers.deleteOne({_id: ObjectID(_id)});
                        resolve(result);
                    }
                )};

                (async function(){
                    const asyncFuntions = [
                        deleteUser(),
                    ];
                    await Promise.all(asyncFuntions);
                })();
                return result;
            }
        }else{
            return new Error("Couldn't remove author");
        }
        
    },

    addPost: async (parent, args, ctx, info) => {
        const {user, token, title, description} = args;
        const {client, pubsub} = ctx;
        const date = new Date().getDate();

        const db = client.db("BBDD");
        const collectionUsers = db.collection("Users")
        const collectionPosts = db.collection("Posts");

        const result = await collectionUsers.findOne({_id: ObjectID(user), token});
        
        if(result){
             if(result.status === true){
                const object = await collectionPosts.insertOne({title, description, user: ObjectID(user), date});
                
                pubsub.publish(user, {
                    newPost: object.ops[0]
                });

                return object.ops[0];

            }else{
                return new Error("Status invalided")
            }
        }else{
            return new Error("Could not add post");
        }
    },


    removePost: async (parent, args, ctx, info) => {
        const {user, token, _id} = args;
        const {client} = ctx;
        
        const db = client.db("BBDD");
        const collectionUsers = db.collection("Users");
        const collectionPosts = db.collection("Posts");

        const result = await collectionUsers.findOne({_id: ObjectID(user), token});

        if (result){
            const object = await collectionPosts.findOneAndDelete({_id: ObjectID(_id)}, {returnOriginal: false});
            return object.value;
                
        }else{
            return new Error("Could not add post");
        }
    },


}

export {Mutation as default};