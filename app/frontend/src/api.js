import axios from 'axios'

const client = axios.create({
    baseURL: `http://localhost:3000`,
    json: true
    }
)

export default {
    async execute (method, resource, data) {
        return client({
            method,
            url: resource,
            data: data
        }).then(req => {
            return req.data
        })
    },

    // Admin API routes
    getAdmins() {
        return this.execute('get', '/db/admins/all')
    },
    getAdmin(id) {
        return this.execute('get', `/db/admins/${id}`)
    },
    createAdmin(data) {
        return this.execute('post', '/db/admins/create', data)
    },
    // updateAdmin(id, data) {
    //     return this.execute('post', `/db/admins/update`, data)
    // },
    deleteAdmin(data) {
        return this.execute('post', `/db/admins/delete`, data)
    },

    // Photo API routes
    getPhotos() {
        return this.execute('get', '/db/photos/all')
    },
    getPhoto(id) {
        return this.execute('get', `/db/photos/${id}`)
    },
    createPhoto(data) {
        return this.execute('post', '/db/photos/upload', data)
    },
    // updatePhoto(id, data) {
    //     return this.execute('post', `/photos/${id}`, data)
    // },
    deletePhoto(data) {
        return this.execute('post', `/db/photos/delete`, data)
    },

    // Posts API routes
    getPosts() {
        return this.execute('get', '/db/posts/all')
    },
    getPost(id) {
        return this.execute('get', `/db/posts/${id}`)
    },
    createPost(data) {
        return this.execute('post', '/db/posts/create', data)
    },
    updatePost(data) {
        return this.execute('post', `/db/posts/update`, data)
    },
    deletePost(data) {
        return this.execute('post', `/db/posts/delete`, data)
    },

    // Project API routes
    getProjects() {
        return this.execute('get', '/db/projects/all')
    },
    getProject(id) {
        return this.execute('get', `/db/projects/${id}`)
    },
    createProject(data) {
        return this.execute('post', '/db/projects/create', data)
    },
    updateProject(data) {
        return this.execute('post', `/db/projects/update`, data)
    },
    deleteProject(data) {
        return this.execute('post', `/db/projects/delete`, data)
    },

    getTags() {
        return this.execute('get', '/db/tags/all')
    },
    getTag(id) {
        return this.execute('get', `/db/tags/${id}`)
    },
    createTag(data) {
        return this.execute('post', '/db/tags/create', data)
    },
    updateTag(data) {
        return this.execute('post', `/db/tags/update`, data)
    },
    deleteTag(data) {
        return this.execute('delete', `/db/tags/delete`, data)
    }
}