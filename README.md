# sibyl-frontend

## Workflow Overview

```mermaid
sequenceDiagram
Frontend->>Keystone:Username + Password
Keystone->>Frontend:Token
Frontend->>Backend:Token + Request
Backend->>Keystone:Verify Token
Keystone->>Backend:Verify Result
Backend->>NTFS:Operate File
NTFS->>Backend:Operate Result
Backend->>Frontend:Request Result
```

## Frontend Architecture Overview

```mermaid
stateDiagram-v2
state Components {
    Aside
    Header
    vuex:vuex
    vuex:token
}
state Views {
    Drive:Drive
    Drive:dirList
    Drive:enterDir
    Drive:getFile
    Drive:makeDir
    Drive:changeScopedToken
    Home:Home
    Home:getInfo
    Home:setInfo
    Login:Login
    Login:getScopedToken
    Share:Share
    Share:getAssignments
    Share:addAssignments
    Share:delAssignments
}
Login --> vuex
Drive --> vuex
vuex --> Drive
vuex --> Home
vuex --> Share
```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
