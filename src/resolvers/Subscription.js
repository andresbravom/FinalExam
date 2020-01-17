const Subscription = {
    newPost: {
        subscribe(parent, args, ctx, info){
            const {_id} = args;
            const {pubsub} = ctx;
            return pubsub.asyncIterator(_id);
        }
    }
}

export {Subscription as default};