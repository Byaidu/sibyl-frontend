import SibylHome from './views/SibylHome.vue'
import SibylDrive from './views/SibylDrive.vue'
import SibylLogin from './views/SibylLogin.vue'
import SibylShare from './views/SibylShare.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    // https://docs.openstack.org/api-ref/identity/v3/index.html#roles
    // https://docs.openstack.org/keystone/latest/api_curl_examples.html
    // curl -i -H "X-Auth-Token: $OS_TOKEN" "http://localhost:5000/v3/role_assignments"
    // sudo cat /var/log/keystone/keystone-wsgi-public.log
    // https://docs.openstack.org/keystone/latest/getting-started/architecture.html
    // https://docs.openstack.org/api-ref/identity/v3/index.html#identity-api-operations
    // (standard:demo,neutron,cinder,(premium:nova,glance,(admin:admin)))
    {path: '/', component: SibylHome},
    // Need Project Name For Auth
    // admin(group)    --> /drive/*(admin:CRUD)
    // premium(group)  --> /drive/[self|public](admin:CRUD)
    // standard(group) --> /drive/public(reader:R)
    // Frontend '/drive/:path*' --> Auth --> Backend '/drive/:path*'
    // Auth:    [POST]
    //          /v3/auth/tokens(scoped)
    // Method:  [POST|GET|DELETE]
    //          /drive/*
    {path: '/drive/:project/:path*', component: SibylDrive, props: true},
    {path: '/drive/', component: SibylDrive},
    // Need Project Name For Auth
    // Manage RBAC
    // admin(group)   --> /share/*(admin:CRUD)
    // premium(group) --> /share/[self|public](admin:CRUD)
    // Auth:    [POST]
    //          /drive/.+ -> /v3/auth/tokens(scoped)
    // Method:  [PUT|HEAD|DELETE]
    //          /v3/projects/{project_id}/users/{user_id}/roles/{role_id}
    //          [GET]
    //          /v3/role_assignments
    {path: '/share', component: SibylShare},
    // Login
    // Method:  [POST]
    //          /v3/auth/tokens
    {path: '/login', component: SibylLogin},
    {path: '/*', redirect: '/'},
]

export default createRouter({
    history: createWebHistory(),
    routes,
})