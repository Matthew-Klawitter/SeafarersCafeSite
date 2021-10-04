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
            data
        }).then(req => {
            return req.data
        })
    },
    async executeAuth (method, resource, data) {
        // let accessToken = await Vue.prototype.$auth.getAccessToken()
        return client({
            method,
            url: resource,
            data,
            // headers: {
            //     Authorization: `Bearers ${accessToken}`
            // }
        }).then(req => {
            return req.data
        })
    },

    // Photo API routes
    getPhotos() {
        return this.execute('get', '/api/pub/photos/all')
    },
    getPhoto(id) {
        return this.execute('get', `/api/pub/photos/${id}`)
    },
    // Create and Delete require Auth
    createPhoto(data) {
        return this.executeAuth('post', '/api/auth/photos/upload', data)
    },
    deletePhoto(data) {
        return this.executeAuth('post', `/api/auth/photos/delete`, data)
    },

    // Posts API routes
    getPosts() {
        return this.execute('get', '/api/pub/posts/all')
    },
    getPost(id) {
        return this.execute('get', `/api/pub/posts/${id}`)
    },
    // Create, Update, and Delete require Auth
    createPost(data) {
        return this.executeAuth('post', '/api/auth/posts/create', data)
    },
    updatePost(data) {
        return this.executeAuth('post', `/api/auth/posts/update`, data)
    },
    deletePost(data) {
        return this.executeAuth('post', `/api/auth/posts/delete`, data)
    },

    // Project API routes
    getProjects() {
        return this.execute('get', '/api/pub/projects/all')
    },
    getProject(id) {
        return this.execute('get', `/api/pub/projects/${id}`)
    },
    // Create, Update, and Delete require Auth
    createProject(data) {
        return this.executeAuth('post', '/api/auth/projects/create', data)
    },
    updateProject(data) {
        return this.executeAuth('post', `/api/auth/projects/update`, data)
    },
    deleteProject(data) {
        return this.executeAuth('post', `/api/auth/projects/delete`, data)
    },

    // Tag API routes
    getTags() {
        return this.execute('get', '/api/pub/tags/all')
    },
    getTag(id) {
        return this.execute('get', `/api/pub/tags/${id}`)
    },
    // Create, Update, and Delete require Auth
    createTag(data) {
        return this.executeAuth('post', '/api/auth/tags/create', data)
    },
    updateTag(data) {
        return this.executeAuth('post', `/api/auth/tags/update`, data)
    },
    deleteTag(data) {
        return this.executeAuth('delete', `/api/auth/tags/delete`, data)
    }
}