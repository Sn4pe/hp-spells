import { useEffect, useState } from "react";
import { HotKeys } from "react-hotkeys";
import "./App.css";
import { Spell } from "./types";

function App() {
  const [spells, setSpells] = useState<Spell[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    fetch("https://hp-api.onrender.com/api/spells")
      .then(res => res.json())
      .then((data: Spell[]) => setSpells(data))
      .catch(error => console.error("Error fetching spells:", error));
  }, []);

  const filteredSpells = spells.filter(spell =>
    spell.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    spell.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const keyMap = {
    FOCUS_SEARCH: "command+k",
  };

  const handlers = {
    FOCUS_SEARCH: () => {
      const searchInput = document.getElementById("searchInput");
      searchInput ? searchInput.focus() : null;
    },
  };

  return (
    <HotKeys keyMap={keyMap} handlers={handlers}>
      <main>
        <h1>HP Spells</h1>
        <div className="search-container">
          <input
            type="text"
            id="searchInput"
            placeholder="Search spells..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <table>
          <thead>
            <tr>
              <th>Spell Name</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {filteredSpells.map(spell => (
              <tr key={spell.id}>
                <td>{spell.name}</td>
                <td>{spell.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </HotKeys>
  );
}

export default App;
