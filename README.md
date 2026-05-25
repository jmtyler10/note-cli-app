# Note CLI

A simple command-line note-taking application built with Node.js. Create, manage, and view your notes from the terminal or through a web interface.

## Features

- Create notes with optional tags
- List all notes
- Search notes by content
- Remove individual or all notes
- View notes in a web browser interface
- JSON-based storage for simplicity and portability

## Installation

```bash
npm install
```

**First-time setup:** Create your database file by copying the sample:

```bash
cp db.sample.json db.json
```

For global usage:

```bash
npm link
```

After linking, you can use the `note` command from anywhere in your terminal.

## Usage

### Create a New Note

```bash
note new "Buy groceries"
```

With tags:

```bash
note new "Finish project report" --tags "work,urgent"
# or use the short form
note new "Team meeting notes" -t "work,meeting"
```

### View All Notes

```bash
note all
```

### Find Notes

Search for notes containing specific text:

```bash
note find "groceries"
```

### Remove a Note

Remove a note by its ID:

```bash
note remove 1776175819667
```

### Launch Web Interface

View your notes in a browser:

```bash
note web
```

Specify a custom port:

```bash
note web 3000
```

The web interface will automatically open in your default browser.

### Clean All Notes

Remove all notes from the database:

```bash
note clean
```

## Commands Reference

| Command         | Description             | Options                              |
| --------------- | ----------------------- | ------------------------------------ |
| `new <note>`    | Create a new note       | `-t, --tags` - Comma-separated tags  |
| `all`           | Display all notes       | -                                    |
| `find <filter>` | Search notes by content | -                                    |
| `remove <id>`   | Remove a note by ID     | -                                    |
| `web [port]`    | Launch web interface    | `port` - Port number (default: 5000) |
| `clean`         | Remove all notes        | -                                    |

## Data Storage

Notes are stored in `db.json` in the project root directory. Each note contains:

- `id`: Timestamp-based unique identifier
- `content`: The note text
- `tags`: Array of tags associated with the note

**Note:** `db.json` is gitignored to keep your personal notes private. See `db.sample.json` for the expected structure.

## Development

### Run Tests

```bash
npm test
```

### Project Structure

```
.
├── index.js           # CLI entry point
├── src/
│   ├── command.js     # Command definitions and handlers
│   ├── notes.js       # Note management logic
│   ├── db.js          # Database operations
│   ├── server.js      # Web server and HTML rendering
│   └── template.html  # HTML template for web interface
├── tests/
│   └── notes.test.js  # Test suite
├── db.json            # Note storage
└── package.json
```

## Roadmap

- [ ] **Filter notes by tag** - Build a `note tag <tagname>` command to list all notes with a specific tag. Practice array filtering and working with the existing tag system.

- [ ] **Todo system** - Implement a dedicated todo feature with `note todo <content>`, `note todos` to list all todos, and `note done <id>` to mark complete. Explore schema evolution and boolean flags.

Each feature builds on the existing architecture and provides hands-on practice with Node.js fundamentals, data manipulation, and CLI design patterns.

## Dependencies

- **yargs**: Command-line argument parsing
- **open**: Automatically open the web interface in a browser

## License

ISC
