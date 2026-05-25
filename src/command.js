import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import {
  newNote,
  getAllNotes,
  findNotes,
  removeNote,
  removeAllNotes,
  editNote,
} from "./notes.js";
import { start } from "./server.js";

const listNotes = (notes) => {
  notes.forEach(({ id, content, tags }) => {
    console.log("content: ", content);
    console.log("id: ", id);
    console.log("tags: ", tags);
    console.log("\n");
  });
};

yargs(hideBin(process.argv))
  .command(
    "new <note>",
    "Create a new note",
    (yargs) => {
      return yargs.positional("note", {
        type: "string",
        description: "The content of the note to create",
      });
    },
    async (argv) => {
      const tags = argv.tags ? argv.tags.split(",") : [];
      const note = await newNote(argv.note, tags);
      console.log("New note! ", note);
    },
  )
  .option("tags", {
    alias: "t",
    type: "string",
    description: "Add tags to the note",
  })
  .command(
    "all",
    "get all notes",
    () => {},
    async (argv) => {
      const notes = await getAllNotes();
      listNotes(notes);
    },
  )
  .command(
    "find <filter>",
    "get matching notes",
    (yargs) => {
      return yargs.positional("filter", {
        describe:
          "The search term to filter notes by, will be applied to note.content",
        type: "string",
      });
    },
    async (argv) => {
      const matches = await findNotes(argv.filter);
      listNotes(matches);
    },
  )
  .command(
    "remove <id>",
    "remove a note by id",
    (yargs) => {
      return yargs.positional("id", {
        type: "number",
        description: "The id of the note you want to remove",
      });
    },
    async (argv) => {
      const id = await removeNote(argv.id);
      console.log(id);
    },
  )
  .command(
    "web [port]",
    "launch website to see notes",
    (yargs) => {
      return yargs.positional("port", {
        describe: "port to bind on",
        default: 5000,
        type: "number",
      });
    },
    async (argv) => {
      const notes = await getAllNotes();
      console.log("test ", notes);
      start(notes, argv.port);
    },
  )
  .command(
    "clean",
    "remove all notes",
    () => {},
    async (argv) => {
      await removeAllNotes();
      console.log("db reset");
    },
  )
  .command(
    "edit <id> <note>",
    "edit a note by id",
    (yargs) => {
      return yargs
        .positional("id", {
          type: "number",
          description: "The id of the note you want to edit",
        })
        .positional("note", {
          type: "string",
          description: "The new content for the note you want to edit",
        });
    },
    async (argv) => {
      const id = await editNote(argv.id, argv.note);
      console.log(id);
    },
  )

  .demandCommand(1)
  .parse();
