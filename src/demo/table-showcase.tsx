import { useMemo, useState } from "react";
import { CaretDown, CaretUp, Clock, DotsThree } from "@phosphor-icons/react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Chip } from "@/components/ui/chip";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ComponentPage, Subsection } from "./docs";
import { Demo } from "./components/demo";

/* -------------------------------------------------------------------------- */
/*                                    Data                                     */
/* -------------------------------------------------------------------------- */

interface Person {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "Pending" | "Active" | "Invited";
  avatar: string;
}

const PEOPLE: Person[] = [
  { id: 3131, name: "Alex", email: "alex@gmail.com", role: "Product Manager", status: "Pending", avatar: "https://i.pravatar.cc/80?img=12" },
  { id: 4842, name: "Sam", email: "sam@gmail.com", role: "Engineer", status: "Active", avatar: "https://i.pravatar.cc/80?img=32" },
  { id: 5273, name: "Riley", email: "riley@gmail.com", role: "Designer", status: "Invited", avatar: "https://i.pravatar.cc/80?img=45" },
];

const STATUS_COLOR: Record<Person["status"], "neutral" | "success" | "info"> = {
  Pending: "neutral",
  Active: "success",
  Invited: "info",
};

function StatusChip({ status }: { status: Person["status"] }) {
  return (
    <Chip
      variant="soft"
      color={STATUS_COLOR[status]}
      startIcon={<Clock weight="fill" />}
    >
      {status}
    </Chip>
  );
}

function RowActions() {
  return (
    <Button variant="ghost" color="neutral" size="sm" iconOnly aria-label="Row actions">
      <DotsThree weight="bold" />
    </Button>
  );
}

/* -------------------------------------------------------------------------- */
/*                                  Examples                                   */
/* -------------------------------------------------------------------------- */

function BasicTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-16">ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {PEOPLE.map((p) => (
          <TableRow key={p.id}>
            <TableCell className="text-muted-foreground">{p.id}</TableCell>
            <TableCell>
              <div className="flex items-center gap-3">
                <Avatar src={p.avatar} name={p.name} size="sm" />
                <div className="flex flex-col">
                  <span className="font-medium text-foreground">{p.name}</span>
                  <span className="text-muted-foreground">{p.email}</span>
                </div>
              </div>
            </TableCell>
            <TableCell>{p.role}</TableCell>
            <TableCell>
              <StatusChip status={p.status} />
            </TableCell>
            <TableCell className="text-right">
              <RowActions />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

const BASIC_CODE = `<Table>
  <TableHeader>
    <TableRow>
      <TableHead className="w-16">ID</TableHead>
      <TableHead>Name</TableHead>
      <TableHead>Role</TableHead>
      <TableHead>Status</TableHead>
      <TableHead className="text-right">Actions</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {people.map((p) => (
      <TableRow key={p.id}>
        <TableCell className="text-muted-foreground">{p.id}</TableCell>
        <TableCell>
          <div className="flex items-center gap-3">
            <Avatar src={p.avatar} name={p.name} size="sm" />
            <div className="flex flex-col">
              <span className="font-medium">{p.name}</span>
              <span className="text-muted-foreground">{p.email}</span>
            </div>
          </div>
        </TableCell>
        <TableCell>{p.role}</TableCell>
        <TableCell><StatusChip status={p.status} /></TableCell>
        <TableCell className="text-right"><RowActions /></TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>`;

function SimpleTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-16">ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {PEOPLE.map((p) => (
          <TableRow key={p.id}>
            <TableCell className="text-muted-foreground">{p.id}</TableCell>
            <TableCell>
              <div className="flex flex-col">
                <span className="font-medium text-foreground">{p.name}</span>
                <span className="text-muted-foreground">{p.email}</span>
              </div>
            </TableCell>
            <TableCell>{p.role}</TableCell>
            <TableCell>
              <StatusChip status={p.status} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

const SIMPLE_CODE = `<Table>
  <TableHeader>
    <TableRow>
      <TableHead className="w-16">ID</TableHead>
      <TableHead>Name</TableHead>
      <TableHead>Role</TableHead>
      <TableHead>Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {people.map((p) => (
      <TableRow key={p.id}>
        <TableCell className="text-muted-foreground">{p.id}</TableCell>
        <TableCell>
          <div className="flex flex-col">
            <span className="font-medium">{p.name}</span>
            <span className="text-muted-foreground">{p.email}</span>
          </div>
        </TableCell>
        <TableCell>{p.role}</TableCell>
        <TableCell><StatusChip status={p.status} /></TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>`;

function SelectableTable() {
  const [selected, setSelected] = useState<Set<number>>(new Set([4842]));
  const allChecked = selected.size === PEOPLE.length;
  const someChecked = selected.size > 0 && !allChecked;

  const toggleAll = (next: boolean) =>
    setSelected(next ? new Set(PEOPLE.map((p) => p.id)) : new Set());

  const toggleOne = (id: number, next: boolean) =>
    setSelected((prev) => {
      const copy = new Set(prev);
      if (next) copy.add(id);
      else copy.delete(id);
      return copy;
    });

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-12">
            <Checkbox
              aria-label="Select all"
              checked={allChecked}
              indeterminate={someChecked}
              onCheckedChange={toggleAll}
            />
          </TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {PEOPLE.map((p) => {
          const isSelected = selected.has(p.id);
          return (
            <TableRow key={p.id} selected={isSelected}>
              <TableCell>
                <Checkbox
                  aria-label={`Select ${p.name}`}
                  checked={isSelected}
                  onCheckedChange={(next) => toggleOne(p.id, next)}
                />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar src={p.avatar} name={p.name} size="sm" />
                  <div className="flex flex-col">
                    <span className="font-medium text-foreground">{p.name}</span>
                    <span className="text-muted-foreground">{p.email}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell>{p.role}</TableCell>
              <TableCell>
                <StatusChip status={p.status} />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

const SELECTABLE_CODE = `function SelectableTable() {
  const [selected, setSelected] = useState(new Set([4842]));
  const allChecked = selected.size === people.length;
  const someChecked = selected.size > 0 && !allChecked;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-12">
            <Checkbox
              aria-label="Select all"
              checked={allChecked}
              indeterminate={someChecked}
              onCheckedChange={(next) =>
                setSelected(next ? new Set(people.map((p) => p.id)) : new Set())
              }
            />
          </TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {people.map((p) => (
          <TableRow key={p.id} selected={selected.has(p.id)}>
            <TableCell>
              <Checkbox
                aria-label={\`Select \${p.name}\`}
                checked={selected.has(p.id)}
                onCheckedChange={(next) => toggleOne(p.id, next)}
              />
            </TableCell>
            {/* …cells… */}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}`;

type SortKey = "name" | "role" | "status";
type SortDir = "asc" | "desc";

function SortableTable() {
  const [sort, setSort] = useState<{ key: SortKey; dir: SortDir }>({
    key: "name",
    dir: "asc",
  });

  const sorted = useMemo(() => {
    const rows = [...PEOPLE];
    rows.sort((a, b) => {
      const cmp = a[sort.key].localeCompare(b[sort.key]);
      return sort.dir === "asc" ? cmp : -cmp;
    });
    return rows;
  }, [sort]);

  const onSort = (key: SortKey) =>
    setSort((prev) =>
      prev.key === key
        ? { key, dir: prev.dir === "asc" ? "desc" : "asc" }
        : { key, dir: "asc" },
    );

  const SortHead = ({ label, k }: { label: string; k: SortKey }) => (
    <TableHead>
      <button
        type="button"
        onClick={() => onSort(k)}
        className="inline-flex items-center gap-1 transition-colors hover:text-foreground"
      >
        {label}
        {sort.key === k &&
          (sort.dir === "asc" ? (
            <CaretUp weight="bold" className="size-3.5" />
          ) : (
            <CaretDown weight="bold" className="size-3.5" />
          ))}
      </button>
    </TableHead>
  );

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <SortHead label="Name" k="name" />
          <SortHead label="Role" k="role" />
          <SortHead label="Status" k="status" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {sorted.map((p) => (
          <TableRow key={p.id} interactive>
            <TableCell>
              <div className="flex flex-col">
                <span className="font-medium text-foreground">{p.name}</span>
                <span className="text-muted-foreground">{p.email}</span>
              </div>
            </TableCell>
            <TableCell>{p.role}</TableCell>
            <TableCell>
              <StatusChip status={p.status} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

const SORTABLE_CODE = `function SortableTable() {
  const [sort, setSort] = useState({ key: "name", dir: "asc" });

  const sorted = useMemo(
    () =>
      [...people].sort((a, b) => {
        const cmp = a[sort.key].localeCompare(b[sort.key]);
        return sort.dir === "asc" ? cmp : -cmp;
      }),
    [sort],
  );

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            <button onClick={() => onSort("name")}>Name {arrow}</button>
          </TableHead>
          {/* …other sortable heads… */}
        </TableRow>
      </TableHeader>
      <TableBody>
        {sorted.map((p) => (
          <TableRow key={p.id} interactive>{/* …cells… */}</TableRow>
        ))}
      </TableBody>
    </Table>
  );
}`;

export function TableShowcase() {
  return (
    <ComponentPage
      id="table"
      title="Table"
      description="Display structured data in rows and columns. Composable header, body, rows and cells with support for selection, sorting and rich cell content."
    >
      <Subsection
        title="Basic"
        description="Compose header and body cells. Cells accept any content — avatars, chips, and action buttons."
      >
        <Demo code={BASIC_CODE} className="justify-stretch [&>*]:w-full">
          <BasicTable />
        </Demo>
      </Subsection>

      <Subsection
        title="Without avatar"
        description="A leaner layout with just the primary and secondary text in the name column."
      >
        <Demo code={SIMPLE_CODE} className="justify-stretch [&>*]:w-full">
          <SimpleTable />
        </Demo>
      </Subsection>

      <Subsection
        title="Selectable rows"
        description="Add a checkbox column. The header checkbox reflects an indeterminate state when only some rows are selected."
      >
        <Demo code={SELECTABLE_CODE} className="justify-stretch [&>*]:w-full">
          <SelectableTable />
        </Demo>
      </Subsection>

      <Subsection
        title="Sortable columns"
        description="Make headers interactive to sort by column; click again to reverse the direction."
      >
        <Demo code={SORTABLE_CODE} className="justify-stretch [&>*]:w-full">
          <SortableTable />
        </Demo>
      </Subsection>
    </ComponentPage>
  );
}
