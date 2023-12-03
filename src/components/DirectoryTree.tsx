import { useListData } from "react-stately";
import {
  Cell,
  Column,
  Button,
  Row,
  Table,
  TableBody,
  TableHeader,
  useDragAndDrop,
} from "react-aria-components";

export function DirectoryTree() {
  const list = useListData({
    initialItems: [
      { id: 1, name: "Games", date: "6/7/2020", type: "File folder" },
      { id: 2, name: "Program Files", date: "4/7/2021", type: "File folder" },
      { id: 3, name: "bootmgr", date: "11/20/2010", type: "System file" },
      { id: 4, name: "log.txt", date: "1/18/2016", type: "Text Document" },
    ],
  });

  const { dragAndDropHooks } = useDragAndDrop({
    getItems: (keys) =>
      [...keys].map((key) => ({
        "text/plain": list.getItem(key).name,
      })),
    onReorder(e) {
      if (e.target.dropPosition === "before") {
        list.moveBefore(e.target.key, e.keys);
      } else if (e.target.dropPosition === "after") {
        list.moveAfter(e.target.key, e.keys);
      }
    },
  });

  return (
    <Table
      aria-label="Files"
      selectionMode="multiple"
      dragAndDropHooks={dragAndDropHooks}
    >
      <TableHeader>
        <Column></Column>
        <Column>🔽</Column>
        <Column isRowHeader>Name</Column>
        <Column>Type</Column>
        <Column>Date Modified</Column>
      </TableHeader>
      <TableBody items={list.items}>
        {(item) => (
          <Row>
            <Cell>
              <Button slot="drag">≡</Button>
            </Cell>
            <Cell>🔽</Cell>
            <Cell>{item.name}</Cell>
            <Cell>{item.type}</Cell>
            <Cell>{item.date}</Cell>
          </Row>
        )}
      </TableBody>
    </Table>
  );
}
