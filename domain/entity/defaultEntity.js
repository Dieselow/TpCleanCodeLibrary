class DefaultEntity {
    constructor() {
        this.id = '';
    }

    equals(otherEntity) {
        if (!otherEntity instanceof DefaultEntity) {
            return false;
        }
        return otherEntity.id ? this.referenceEquals(otherEntity.id) : this === otherEntity;
    }

    referenceEquals(id) {
        if (!this.id) {
            // ici on essaye l'object equality
            return this.equals(id);
        }
        const reference = typeof id !== 'string' ? id.toString() : id;
        return reference === this.id

    }

    toString() {
        return this.id;
    }
}

module.exports = DefaultEntity;
