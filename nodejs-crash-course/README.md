## notes through the node crash course

#### Test server with basic front deployed on heroku [here](https://nodejs-server-madhav.herokuapp.com)

---

### What is node?

Node is a single-threaded event-driven javascript execution environment

*ab docs padho...*

### Why node? 

- fast, efficient, scalable
- event driven, non-blocking I/O model
  - single thread unlike php's synchrous multi-thread model
  - don't use node with cpu intensive long running tasks
- same lang front-back (js)

#### d event loop

![d loop](https://i.ibb.co/PQ0RR7N/image.png)

event trigerred --> callback --> looped (idk)

*asynchrously, blazing fast*

#### node proj types

- REST API, microservices
- CRUD
- db interactions

*node :heart: mongodb*

**just dont do anything CPU intensive**

*fun fact: REPL is `read, eval, print loop` :exploding_head: 

---

### idk title

- `package.json` installs dependencies (yea this was dumb)  
- get other functions, classes and objects from other files by 
```js
const v1 = require('core_module');
const v2 = require('file_path');
```
this be commonJS tho, we can't write 
```js
import v3 from 'file_path';
```
this be ES6, node doesnt support yet, Babel needed
- external files are wrapped around in a *module wrapper funcion* by node 

##### core modules
*read documentation ffs*
- path `reference/path_ref.js`
- filesystem (fs) `reference/fs_ref.js`
*other modules tested/learnt in REPL
- os
- url
- **event** :star: `reference/event_ref.js`
- **http** :star: `reference/http_ref.js`
