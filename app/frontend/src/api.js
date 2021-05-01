import axios from 'axios'

const client = axios.create({
    baseURL: `http://db:${process.env.API_PORT}`,
    json: true
})

export default {
    async execute (method, resource, data) {
        let token = "test"

        return client({
            method,
            url: resource,
            data,
            headers: {
                Authorization: `Bearers ${token}`
            }
        }).then(req => {
            return req.data
        })
    },

    // Admin API routes
    getAdmins() {
        return this.execute('get', '/admins')
    },
    getAdmin(id) {
        return this.execute('get', `/admins/${id}`)
    },
    createAdmin(data) {
        return this.execute('post', '/admins', data)
    },
    updateAdmin(id, data) {
        return this.execute('put', `/admins/${id}`, data)
    },
    deleteAdmin(id) {
        return this.execute('delete', `/admins/${id}`)
    },

    // Photo API routes
    getPhotos() {
        return this.execute('get', '/photos')
    },
    getPhoto(id) {
        return this.execute('get', `/photos/${id}`)
    },
    getPhotoImg(id) {
        return this.execute('get', `/photos/img/${id}`)
    },
    createPhoto(data) {
        return this.execute('post', '/photos', data)
    },
    updatePhoto(id, data) {
        return this.execute('put', `/photos/${id}`, data)
    },
    deletePhoto(id) {
        return this.execute('delete', `/photos/${id}`)
    },

    // Posts API routes
    getPosts() {
        return this.execute('get', '/posts')
    },
    getPost(id) {
        return this.execute('get', `/posts/${id}`)
    },
    createPost(data) {
        return this.execute('post', '/posts', data)
    },
    updatePost(id, data) {
        return this.execute('put', `/posts/${id}`, data)
    },
    deletePost(id) {
        return this.execute('delete', `/posts/${id}`)
    },

    // Project API routes
    getProjects() {
        return this.execute('get', '/projects')
    },
    getProject(id) {
        return this.execute('get', `/projects/${id}`)
    },
    createProject(data) {
        return this.execute('post', '/projects', data)
    },
    updateProject(id, data) {
        return this.execute('put', `/projects/${id}`, data)
    },
    deleteProject(id) {
        return this.execute('delete', `/projects/${id}`)
    },

    getTags() {
        return this.execute('get', '/tags')
    },
    getTag(id) {
        return this.execute('get', `/tags/${id}`)
    },
    createTag(data) {
        return this.execute('post', '/tags', data)
    },
    updateTag(id, data) {
        return this.execute('put', `/tags/${id}`, data)
    },
    deleteTag(id) {
        return this.execute('delete', `/tags/${id}`)
    }
}