class MongooseRepository {
    constructor(Schema) {
        this.collection = Schema;
    }

    async count() {
        return this.collection.estimatedDocumentCount();
    }

    async find(query = {}, {multiple = true, populate, paths} = {}) {
        const results = multiple ? this.collection.find(query) : this.collection.findOne(query);

        if (populate) {
            return results.populate(paths).exec()
        }
        return results.exec();
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

    async reload(document, {paths, populate} = {}) {
        if (!paths && !populate instanceof this.collection) {
            return document;
        }
        return (typeof document._id == 'undefined') ? this.findById(document._id, {
            populate,
            paths
        }) : this.findById(document, {populate, paths});
    }

    async findById(_id, {populate, paths} = {}) {
        const result = this.collection.findById(_id);
        if (populate) {
            return result.populate(paths).exec();
        }
        return result.exec();
    }
}

module.exports = MongooseRepository;
