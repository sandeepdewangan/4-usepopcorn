## React

### Effects

**Effects execution:**

`Mount -> Commit -> Browser Paint -> Effect`

Dependency changes (eg while searching title changes)

`Re-Render -> Commit -> Browser Paint -> Effect -> Unmount`

### Important

**Ref**

- Ref are persistent among the renders.
- Ref are used to select and store the DOM elements.
- Ref are not rendered in JSX.
- Ref are not re-rendered on update.
- Ref are used inside useEffect()

Ref Eg.

```js
const countUserClick = useRef(0);
// set ref value
countUserClick.current = countUserClick.current + 1;
```
