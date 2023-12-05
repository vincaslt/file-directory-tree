Task: https://allinbits.notion.site/Sr-Front-end-Engineer-Take-Home-Task-5d77d88478d34456bd7a99512616aa45

It took me around 9 hours of working time to do the task. It includes all the base features and the bonus features - creating files/folders and moving them using drag-drop. I found the task very interesting so I wanted to do the file creation and moving files/folders. The base features took me 5-6 hours, by hour 8 I was done with file/folder creation, then spent some extra time to finish it up.

## Instructions

Clone the repo locally.

```
npm i -g pnpm
pnpm i
pnpm run dev
```

then visit http://localhost:5173/

## Reasoning

I used https://react-spectrum.adobe.com/react-aria/ to implement the file browser. It provides unstyled primitive components and related state hooks, taking care of accessibility, but leaving the styling and implementation to the developer. I'd used a similar set of primitive components (Radix UI and Headless UI) in my previous company and side-projects with good results, I think this approach balances flexibility, control and speed of development quite well.

I also used Tailwind CSS for similar reasons, and because that's what I've been using lately.

I kept some of the UI components mostly rigid and inlined (not extracted separately) because I think it's the right way to start, and only after you're more or less certain of the requirements you need to cover you extract into reusable parts. The project was sufficiently small not to warrant it I think, and also I was running a bit low on time. Which leads me to improvements I could/would make...

## Potential Improvements

- Based on the given mock data, the root is a folder. In reality, the root doesn't need to be a tree node (folder), but it could be an array of nodes. This would allow moving/creating files outside of the "root" folder (i.e. `project` in our case), but because it's a folder I had to restrict file drag-drop outside of the project folder.
- Directory tree contains all of the logic at the moment and it's not overridable or modifiable from the outside, and it's not a controlled component, making it rather inflexible. It's ok in our case I think, but when there appears a need for flexibility I would move all that logic into a hook, e.g. `useDirectoryTree`, and accept all the methods and data from props, e.g. `toggleExpandedNode`, `handleSelectionChange`, `handleFolderAction` etc. Then anyone using it could opt-in to default behavior simply using: `const directoryTreeProps = useDirectoryTree(data)` with `<DirectoryTree {...directoryTreeProps} />` but those who need flexibility could pass their own overrides or custom implementation of the functions required.
- I didn't extract any reusable UI components (mostly because of lack of time). However, in the real project it would make sense to start creating a library of UI components rather early on, for things like Button, DropdownMenu. There's some duplication between File/Folder rows where it handles name changes - I think it's fine, but if we're really bothered by duplication it could be it's own component too.
- The odd/even row colors are blinking when dragging files/folders. I don't know why and haven't had time to investigate. It's likely that react-area removes the node from DOM and portals it back-in when dragging. Or maybe the indicator showing drop position is rendered into the table as a row. Because the styling is applied using `even:` prefix in tailwind it would mistakenly interpret those DOM elements as rows to style.
- `onSelect` returns key+tree, I think it gives good flexibility, but it exposes the internal structure used by the DirectoryTree. We could return the node in the original structure, but then we need to synchronize the internal/external data models, probably by remapping internal model to external before passing it to onSelect. I thought it was unnecessary, but it could be done.
- Not necessarily a potential improvement per se, but because I used react-area, the `tree` object has its own structure, which is not exactly the same as given in the task. I had the component accept the original structure, but internally work with the react-area structure. This mapping between two structures could be a source of potential issues, so it would be ideal if they could be aligned - either the original adapted to react-area, or a custom tree implementation built that works based on node relationships (references) rather than keys/ids (though maintaining that could be a source of issues on its own).

## Problems Faced / Pitfalls

### React-area Issues

I'd never worked with this latest version of react-area (it changed a lot from the time I'd used it), and it's a release candidate for v1, so it had some unforeseen issues. One of them tripped me up for a while.

They handle table row interactions in a weird way, when they're selecting (only allowing double click to interact). There was no way to override this (probably will be added in the future), so I implemented my own custom logic in `handleSelectionChange`. It works fine when you have a single selection, but I'm not sure how it would hold up when using multiple selections.

The result is rather simple, but it took me around an hour to debug issues related to this.

### False Assumption

The react-area tree needs globally unique IDs for the tree nodes to be used as keys. The initial data doesn't have them, so I assumed path could be the key, e.g. `project/src/index.js` assuming the file/folder names are unique.

Initially I traversed the tree and pre-generated paths for all the nodes in the tree, and that worked well until I tried to implement moving files/folders. When you move the file, it's path changes, and so does its key, however, there's no way to re-generate key for existing nodes using the react-area tree object. As a result, I switched to generating random UUIDs for any nodes added to the tree and using them as unique keys allowing me to move nodes without changing their key.

If I implemented a custom tree object for this task, I'd probably not use unique keys, and instead work with references to child/parent nodes, meaning all event handlers would return the tree node rather than key. The tradeoff would be limiting the ability to select tree nodes directly, because now you'd have to traverse the tree to find the node by path (when that's needed).
