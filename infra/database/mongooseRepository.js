class MongooseRepository {
    constructor({Model}) {
        this.collection = Model;
    }

    async count() {
        return this.collection.estimatedDocumentCount();
    }

    async find(query = {}, {multiple = true, count, lean} = {}) {
        const results = multiple ? this.collection.find(query) : this.collection.findOne(query);

        if (count) {
            return results.countDocuments().exec();
        } else if (lean) {
            return results.lean().exec()
        } else {
            return results.exec();
        }
    }

    async create(body) {
        return new this.collection(body).save()
    }

    async update(document, body) {
        const id = (typeof document._id == 'undefined') ? document._id : document;
        return this.collection.findByIdAndUpdate(id, body, {new: true});
    }

    async remove(document) {
        const reloadedDocument = this.reload(document);
        return reloadedDocument.remove();
    }

    async reload(document, {paths, populate, lean} = {}) {
        if (!paths && !populate && !lean instanceof this.collection) {
            return document;
        }
        return (typeof document._id == 'undefined') ? this.findById(document._id, {
            populate,
            lean,
            paths
        }) : this.findById(document, {populate, lean, paths});
    }

    async findById(_id, {populate, lean, paths} = {}) {
        const result = this.collection.findById(_id);
        if (populate) {
            return result.populate(paths).exec();
        } else if (lean) {
            return result.lean().exec();
        }
        return result.exec();
    }
}
