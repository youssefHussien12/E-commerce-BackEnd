


export class ApiFeatures {

    constructor(mongooseQuery, searchQuery) {
        this.mongooseQuery = mongooseQuery
        this.searchQuery = searchQuery
    }

    pagination() {
        let pageNumber = this.searchQuery.page * 1 || 1
        if (pageNumber < 1) pageNumber = 1
        const limit = 2
        this.pageNumber = pageNumber
        let skip = (parseInt(pageNumber) - 1) * limit
        this.mongooseQuery.skip(skip).limit(limit)
        return this
    }

    filter() {
        let filterObj = structuredClone(this.searchQuery)
        filterObj = JSON.stringify(filterObj)
        filterObj = filterObj.replace(/(gt|gte|lt|lte)/g, value => `$${value}`)
        filterObj = JSON.parse(filterObj)
        let excludedFields = ['page', 'sort', 'fields', 'search']
        excludedFields.forEach(val => delete filterObj[val])
        this.mongooseQuery.find(filterObj)
        return this
    }

    sort() {
        if (this.searchQuery.sort) {
            let sortedBy = this.searchQuery.sort.split(",").join(' ')
            this.mongooseQuery.sort(sortedBy)
        }
        return this
    }

    fields() {
        if (this.searchQuery.fields) {
            let selectedFields = this.searchQuery.fields.split(",").join(' ')
            this.mongooseQuery.select(selectedFields)
        }
        return this
    }

    search() {
        if (this.searchQuery.search) {
            this.mongooseQuery.find(
                {
                    $or: [
                        { title: { $regex: this.searchQuery.search, $options: 'i' } },
                        { description: { $regex: this.searchQuery.search, $options: 'i' } },
                        { name: { $regex: this.searchQuery.search, $options: 'i' } },
                        { slug: { $regex: this.searchQuery.search, $options: 'i' } }
                    ]
                }
            )
        }
        return this
    }
}