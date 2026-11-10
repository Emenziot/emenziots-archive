import { useState } from "react";
import type { UpgradeNode, UpgradeStatus } from "../types/upgrade";

const STATUSES: UpgradeStatus[] = [
  "hidden",
  "available",
  "planned",
  "in-progress",
  "complete",
];

export default function NodeEditor() {
  // The list of all nodes. Updating it with setNodes re-renders the component.
  const [nodes, setNodes] = useState<UpgradeNode[]>([]);

  // One piece of state per form field.
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState<UpgradeStatus>("hidden");
  const [description, setdescription] = useState("");
  const [dmOnly, setDmOnly] = useState(false);

  function handleAdd() {
    if (name.trim() === "") return; // require a name

    const newNode: UpgradeNode = {
      id: crypto.randomUUID(),
      name: name.trim(),
      category: category.trim() || "other",
      status,
      prerequisites: [],
      description,
      dmOnly,
    };

    // Never mutate state directly: build a new array instead.
    setNodes([...nodes, newNode]);

    // Reset the form.
    setName("");
    setCategory("");
    setStatus("hidden");
    setdescription("");
    setDmOnly(false);
  }

  return (
    <div>
      <h2>Add upgrade node</h2>

      <div>
        <label>
          Name{" "}
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </label>
      </div>

      <div>
        <label>
          Category{" "}
          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="e.g. defense, farming, other"
          />
        </label>
      </div>

      <div>
        <label>
          Status{" "}
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as UpgradeStatus)}
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div>
        <label>
          Note from Arthur{" "}
          <textarea
            value={description}
            onChange={(e) => setdescription(e.target.value)}
          />
        </label>
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            checked={dmOnly}
            onChange={(e) => setDmOnly(e.target.checked)}
          />{" "}
          DM only
        </label>
      </div>

      <button onClick={handleAdd}>Add node</button>

      <h2>Nodes ({nodes.length})</h2>
      {nodes.length === 0 && <p>No nodes yet. Add one above.</p>}
      <ul>
        {nodes.map((n) => (
          <li key={n.id}>
            <strong>{n.name}</strong> ({n.category}, {n.status})
            {n.dmOnly && " [DM only]"}
            {n.description && <div>{n.description}</div>}
          </li>
        ))}
      </ul>
    </div>
  );
}