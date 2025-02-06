## React

### Effects

**Effects execution:**

`Mount -> Commit -> Browser Paint -> Effect`

Dependency changes (eg while searching title changes)

`Re-Render -> Commit -> Browser Paint -> Effect -> Unmount`

### Important

- Ref are persistent among the renders.
- Ref are used to select and store the DOM elements.
- Ref are not rendered in JSX.
- Ref are not re-rendered on update.
- Ref are used inside useEffect()
